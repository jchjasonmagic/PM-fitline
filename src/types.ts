export type ParameterStatus = 'verified' | 'pending' | 'expired';

export interface ConfigParameter<T> {
  value: T;
  unit: string;
  status: ParameterStatus;
  source: string;
  updatedAt: string;
  note: string;
}

export interface PMConfig {
  productPrice: ConfigParameter<number>;
  autoBuyPrice: ConfigParameter<number>;
  autoBuyCycleDays: ConfigParameter<number>;
  dailyCost: ConfigParameter<number>;
  validPointsPerPerson: ConfigParameter<number>;
  bonusCoefficient: ConfigParameter<number>;
  exchangeRate: ConfigParameter<number>;
  bonusPercentages: ConfigParameter<number[]>; // [generation 1, ..., generation 6]
  minActivePoints: ConfigParameter<number>;
  planVersion: ConfigParameter<string>;
  effectiveDate: ConfigParameter<string>;
  disclaimer: ConfigParameter<string>;
  wechatContact: ConfigParameter<{
    nickname: string;
    account: string;
    qrPlaceholder: string;
  }>;
}

export interface SimpleCalculatorInput {
  generations: number[]; // [gen1Count, gen2Count, ..., gen6Count]
  avgPointsPerPerson: number;
  exchangeRate: number;
}

export interface AdvancedCalculatorInput extends SimpleCalculatorInput {
  activeRates: number[]; // [gen1Rate, ..., gen6Rate] (0 to 1)
  monthlyGrowth: number; // New members added per month
  monthlyChurn: number; // Monthly churn rate (0 to 1)
  refundRate: number; // Refund adjustment rate (0 to 1)
  personalProductCost: number; // Personal product expenses (CNY)
  marketingCost: number; // Promotional and activity costs (CNY)
  otherExpenses: number; // Other costs (CNY)
  taxRate: number; // Estimated tax rate (0 to 1)
  bonusCoefficient: number; // Bonus coefficient (0.51 default)
  simulatedMonths: number; // Simulated duration (e.g., 12 months)
}

export interface GenerationDetail {
  generation: number;
  totalCount: number;
  activeRate: number;
  effectiveCount: number;
  pointsPerPerson: number;
  totalPoints: number;
  percentage: number;
  bonusCNY: number;
}

export interface ScenarioResult {
  monthlyGrossBonus: number;
  monthlyTotalCost: number;
  monthlyPreTaxNet: number;
  monthlyPostTaxNet: number;
  generationDetails: GenerationDetail[];
  totalEffectiveCount: number;
  totalEffectivePoints: number;
}

export interface MultiScenarioResults {
  conservative: ScenarioResult;
  current: ScenarioResult;
  optimistic: ScenarioResult;
  breakEvenPointsNeeded: number;
  trend12Months: {
    month: number;
    grossBonus: number;
    totalCost: number;
    netIncome: number;
  }[];
}

export interface FAQItem {
  id: string;
  question: string;
  answer: string;
}

export interface DataSource {
  id: string;
  title: string;
  publisher: string;
  url: string;
  region: string;
  publishDate: string;
  checkDate: string;
  type: string;
  status: 'verified' | 'pending' | 'expired';
  supports: string;
}
