import { SimpleCalculatorInput, AdvancedCalculatorInput, ScenarioResult, MultiScenarioResults, GenerationDetail } from '../types';
import { pmConfig } from '../config/pmConfig';

/**
 * Calculates bonus for a single generation
 */
export function calculateGenerationBonus(
  count: number,
  activeRate: number,
  pointsPerPerson: number,
  bonusCoefficient: number,
  percentage: number,
  exchangeRate: number
): {
  activeCount: number;
  totalPoints: number;
  bonusCNY: number;
} {
  const activeCount = count * activeRate;
  const totalPoints = activeCount * pointsPerPerson;
  const bonusCNY = totalPoints * bonusCoefficient * percentage * exchangeRate;
  
  return {
    activeCount,
    totalPoints,
    bonusCNY,
  };
}

/**
 * Calculates single scenario results based on specific inputs
 */
export function calculateSingleScenario(
  input: AdvancedCalculatorInput,
  activeRates: number[],
  refundRate: number,
  churnRate: number
): ScenarioResult {
  const percentages = pmConfig.bonusPercentages.value;
  const coeff = input.bonusCoefficient;
  const rate = input.exchangeRate;

  const generationDetails: GenerationDetail[] = [];
  let totalEffectiveCount = 0;
  let totalEffectivePoints = 0;
  let monthlyGrossBonus = 0;

  for (let g = 0; g < 6; g++) {
    const totalCount = input.generations[g] || 0;
    const activeRate = activeRates[g] !== undefined ? activeRates[g] : 1.0;
    const pointsPerPerson = input.avgPointsPerPerson;
    const percentage = percentages[g] || 0.03;

    const { activeCount, totalPoints, bonusCNY } = calculateGenerationBonus(
      totalCount,
      activeRate,
      pointsPerPerson,
      coeff,
      percentage,
      rate
    );

    generationDetails.push({
      generation: g + 1,
      totalCount,
      activeRate,
      effectiveCount: activeCount,
      pointsPerPerson,
      totalPoints,
      percentage,
      bonusCNY,
    });

    totalEffectiveCount += activeCount;
    totalEffectivePoints += totalPoints;
    monthlyGrossBonus += bonusCNY;
  }

  // Adjust monthly gross bonus by refund rate
  const refundAdjustment = monthlyGrossBonus * refundRate;
  const adjustedGrossBonus = monthlyGrossBonus - refundAdjustment;

  const monthlyTotalCost = input.personalProductCost + input.marketingCost + input.otherExpenses;
  const monthlyPreTaxNet = adjustedGrossBonus - monthlyTotalCost;
  const monthlyPostTaxNet = monthlyPreTaxNet > 0 
    ? monthlyPreTaxNet * (1 - input.taxRate) 
    : monthlyPreTaxNet; // Do not apply tax to negative income

  return {
    monthlyGrossBonus: adjustedGrossBonus,
    monthlyTotalCost,
    monthlyPreTaxNet,
    monthlyPostTaxNet,
    generationDetails,
    totalEffectiveCount,
    totalEffectivePoints,
  };
}

/**
 * Generates all scenario results (conservative, current, optimistic), trends and break-even calculations
 */
export function calculateMultiScenarios(input: AdvancedCalculatorInput): MultiScenarioResults {
  // 1. Current Scenario
  const current = calculateSingleScenario(input, input.activeRates, input.refundRate, input.monthlyChurn);

  // 2. Conservative Scenario
  // - active rate is 20% lower than user input (clamped 0 to 1)
  // - refund rate is 5% higher (clamped 0 to 1)
  // - churn is 10% higher
  const conservativeRates = input.activeRates.map(r => Math.max(0, r - 0.20));
  const conservativeRefundRate = Math.min(1.0, input.refundRate + 0.05);
  const conservativeChurnRate = Math.min(1.0, input.monthlyChurn + 0.05);
  const conservative = calculateSingleScenario(input, conservativeRates, conservativeRefundRate, conservativeChurnRate);

  // 3. Optimistic Scenario
  // - active rate is 10% higher than user input (capped at 1)
  // - refund rate is 2% lower (min 0)
  // - churn is 5% lower
  const optimisticRates = input.activeRates.map(r => Math.min(1.0, r + 0.10));
  const optimisticRefundRate = Math.max(0, input.refundRate - 0.02);
  const optimisticChurnRate = Math.max(0, input.monthlyChurn - 0.05);
  const optimistic = calculateSingleScenario(input, optimisticRates, optimisticRefundRate, optimisticChurnRate);

  // 4. Break-Even Points Needed
  // We need: Gross Bonus = Total Cost
  // If active points > 0, we can calculate average CNY per point = grossBonus / totalEffectivePoints
  // Then break-even points = totalCost / (CNY per point)
  let breakEvenPointsNeeded = 0;
  const totalCost = current.monthlyTotalCost;
  
  if (current.totalEffectivePoints > 0 && current.monthlyGrossBonus > 0) {
    const cnyPerPoint = current.monthlyGrossBonus / current.totalEffectivePoints;
    breakEvenPointsNeeded = cnyPerPoint > 0 ? totalCost / cnyPerPoint : 0;
  } else {
    // If no team performance, assume average generation rate of 4%
    const avgPercentage = 0.04;
    const cnyPerPoint = input.bonusCoefficient * avgPercentage * input.exchangeRate;
    breakEvenPointsNeeded = cnyPerPoint > 0 ? totalCost / cnyPerPoint : 0;
  }

  // 5. 12-Month Trend Simulation
  // Simple compound growth model:
  // Each month, team size grows by input.monthlyGrowth (distributed proportionally to generations)
  // Each month, existing members churn by input.monthlyChurn.
  const trend12Months: { month: number; grossBonus: number; totalCost: number; netIncome: number }[] = [];
  
  // Current generation counts
  let activeGenCounts = [...input.generations];
  const personalCost = input.personalProductCost;
  const marketingCost = input.marketingCost;
  const otherCost = input.otherExpenses;
  const totalMonthlyCost = personalCost + marketingCost + otherCost;

  for (let m = 1; m <= Math.max(12, input.simulatedMonths); m++) {
    // Simulate compounding growth and churn
    if (m > 1) {
      // Apply growth and churn to each generation
      activeGenCounts = activeGenCounts.map((count, i) => {
        // Apply churn
        const afterChurn = count * (1 - input.monthlyChurn);
        // Distribute growth (e.g., higher growth in upper generations, tapering down)
        // Distribution weights for Gen 1-6: [0.35, 0.25, 0.15, 0.12, 0.08, 0.05]
        const growthWeights = [0.35, 0.25, 0.15, 0.12, 0.08, 0.05];
        const added = input.monthlyGrowth * growthWeights[i];
        return Math.max(0, afterChurn + added);
      });
    }

    // Calculate this month's values using current activeGenCounts and input.activeRates
    const monthInput: AdvancedCalculatorInput = {
      ...input,
      generations: activeGenCounts,
    };

    const monthResult = calculateSingleScenario(monthInput, input.activeRates, input.refundRate, input.monthlyChurn);

    trend12Months.push({
      month: m,
      grossBonus: monthResult.monthlyGrossBonus,
      totalCost: monthResult.monthlyTotalCost,
      netIncome: monthResult.monthlyPostTaxNet,
    });
  }

  return {
    conservative,
    current,
    optimistic,
    breakEvenPointsNeeded,
    trend12Months,
  };
}
