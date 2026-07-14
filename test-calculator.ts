import { calculateGenerationBonus, calculateMultiScenarios } from './src/utils/calculator';
import { AdvancedCalculatorInput } from './src/types';

console.log('--------------------------------------------------');
console.log('Starting PM Calculator Logic Verification Tests...');
console.log('--------------------------------------------------');

// Test Case 1: Match the specific sample given in user request
// Formula: 5人 * 103积分 * 0.51系数 * 5%比例 * 8.2汇率
const count = 5;
const activeRate = 1.0;
const points = 103;
const coeff = 0.51;
const percentage = 0.05;
const exchangeRate = 8.2;

const { activeCount, totalPoints, bonusCNY } = calculateGenerationBonus(
  count,
  activeRate,
  points,
  coeff,
  percentage,
  exchangeRate
);

const expectedBonus = 5 * 103 * 0.51 * 0.05 * 8.2; // 107.6865
console.log(`Test 1 (Single Generation 1 Bonus):`);
console.log(`  - Active Count: ${activeCount} (Expected: 5)`);
console.log(`  - Total Points: ${totalPoints} (Expected: 515)`);
console.log(`  - Bonus (CNY):  ¥${bonusCNY.toFixed(4)}`);
console.log(`  - Expected:     ¥${expectedBonus.toFixed(4)}`);

if (Math.abs(bonusCNY - expectedBonus) < 0.0001) {
  console.log('  ✅ Test 1 Passed!');
} else {
  console.error('  ❌ Test 1 Failed! Math mismatch.');
  process.exit(1);
}

console.log('--------------------------------------------------');

// Test Case 2: Multi-scenario compound results
const mockInput: AdvancedCalculatorInput = {
  generations: [5, 10, 20, 10, 0, 0],
  avgPointsPerPerson: 103,
  exchangeRate: 8.2,
  activeRates: [1.0, 0.8, 0.7, 0.6, 0.5, 0.5],
  monthlyGrowth: 5,
  monthlyChurn: 0.1,
  refundRate: 0.02,
  personalProductCost: 973,
  marketingCost: 200,
  otherExpenses: 100,
  taxRate: 0.1,
  bonusCoefficient: 0.51,
  simulatedMonths: 12
};

const multiResults = calculateMultiScenarios(mockInput);
console.log(`Test 2 (Multi-Scenario Engine):`);
console.log(`  - Current Scenario Gross Bonus: ¥${multiResults.current.monthlyGrossBonus.toFixed(2)}`);
console.log(`  - Current Scenario Expenses:    ¥${multiResults.current.monthlyTotalCost.toFixed(2)}`);
console.log(`  - Current Scenario Tax-after:   ¥${multiResults.current.monthlyPostTaxNet.toFixed(2)}`);
console.log(`  - Break-Even points needed:    ${multiResults.breakEvenPointsNeeded.toFixed(0)} Points`);
console.log(`  - Trend Simulation month 1:     ¥${multiResults.trend12Months[0].grossBonus.toFixed(2)}`);
console.log(`  - Trend Simulation month 12:    ¥${multiResults.trend12Months[11].grossBonus.toFixed(2)}`);

if (multiResults.trend12Months.length === 12) {
  console.log('  ✅ Test 2 Passed! 12-month simulation trend is complete.');
} else {
  console.error('  ❌ Test 2 Failed!');
  process.exit(1);
}

console.log('--------------------------------------------------');
console.log('All Unit and Logic Tests Passed Successfully!');
console.log('--------------------------------------------------');
