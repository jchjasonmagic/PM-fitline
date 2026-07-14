import React, { useState, useEffect } from 'react';
import { Calculator, RefreshCw, Copy, Check, HelpCircle, ShieldAlert, ChevronDown, ChevronUp, AlertCircle, Sparkles } from 'lucide-react';
import { pmConfig } from '../config/pmConfig';
import { AdvancedCalculatorInput, MultiScenarioResults } from '../types';
import { calculateMultiScenarios } from '../utils/calculator';

const STORAGE_KEY = 'PM_TRANSPARENT_CALCULATOR_STATE';
const STORAGE_VERSION = 3;

export const Simulator: React.FC = () => {
  // 1. Interactive state modes
  const [isAdvanced, setIsAdvanced] = useState<boolean>(false);
  const [showFormulaDetails, setShowFormulaDetails] = useState<boolean>(false);
  const [copied, setCopied] = useState<boolean>(false);

  // Default parameters from config
  const defPoints = pmConfig.validPointsPerPerson.value;
  const defCoeff = pmConfig.bonusCoefficient.value;
  const defRate = pmConfig.exchangeRate.value;
  const defPercentages = pmConfig.bonusPercentages.value;

  // 2. Form state inputs
  const [gen1, setGen1] = useState<number>(5);
  const [repRate1, setRepRate1] = useState<number>(2); // 1代人均推荐数
  const [repRate2, setRepRate2] = useState<number>(2); // 2代人均推荐数
  const [repRate3, setRepRate3] = useState<number>(1); // 3代人均推荐数
  const [repRate4, setRepRate4] = useState<number>(0); // 4代人均推荐数
  const [repRate5, setRepRate5] = useState<number>(0); // 5代人均推荐数

  const gen2 = Math.round(gen1 * repRate1);
  const gen3 = Math.round(gen2 * repRate2);
  const gen4 = Math.round(gen3 * repRate3);
  const gen5 = Math.round(gen4 * repRate4);
  const gen6 = Math.round(gen5 * repRate5);

  const [avgPoints, setAvgPoints] = useState<number>(defPoints);
  const [rate, setRate] = useState<number>(defRate);
  
  // Advanced variables
  const [activeRate1, setActiveRate1] = useState<number>(1.0);
  const [activeRate2, setActiveRate2] = useState<number>(0.8);
  const [activeRate3, setActiveRate3] = useState<number>(0.7);
  const [activeRate4, setActiveRate4] = useState<number>(0.6);
  const [activeRate5, setActiveRate5] = useState<number>(0.5);
  const [activeRate6, setActiveRate6] = useState<number>(0.5);

  const [monthlyGrowth, setMonthlyGrowth] = useState<number>(4);
  const [monthlyChurn, setMonthlyChurn] = useState<number>(0.08); // 8%
  const [refundRate, setRefundRate] = useState<number>(0.02); // 2%
  const [personalCost, setPersonalCost] = useState<number>(0);
  const [marketingCost, setMarketingCost] = useState<number>(0);
  const [otherCost, setOtherCost] = useState<number>(0);
  const [taxRate, setTaxRate] = useState<number>(0.05); // 5%
  const [bonusCoeff, setBonusCoeff] = useState<number>(defCoeff);

  // Load state from local storage on mount
  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        const storageVersion = parsed.version ?? 1;
        const g1 = parsed.gen1 ?? 5;
        const g2 = parsed.gen2 ?? 10;
        const g3 = parsed.gen3 ?? 20;
        const g4 = parsed.gen4 ?? 15;
        const g5 = parsed.gen5 ?? 5;
        const g6 = parsed.gen6 ?? 0;

        setGen1(g1);
        setRepRate1(Math.round(parsed.repRate1 ?? (g1 > 0 ? g2 / g1 : 2)));
        setRepRate2(Math.round(parsed.repRate2 ?? (g2 > 0 ? g3 / g2 : 2)));
        setRepRate3(Math.round(parsed.repRate3 ?? (g3 > 0 ? g4 / g3 : 1)));
        setRepRate4(Math.round(parsed.repRate4 ?? (g4 > 0 ? g5 / g4 : 0)));
        setRepRate5(Math.round(parsed.repRate5 ?? (g5 > 0 ? g6 / g5 : 0)));
        setAvgPoints(parsed.avgPoints ?? defPoints);
        setRate(parsed.rate ?? defRate);
        
        setIsAdvanced(parsed.isAdvanced ?? false);
        setActiveRate1(parsed.activeRate1 ?? 1.0);
        setActiveRate2(parsed.activeRate2 ?? 0.8);
        setActiveRate3(parsed.activeRate3 ?? 0.7);
        setActiveRate4(parsed.activeRate4 ?? 0.6);
        setActiveRate5(parsed.activeRate5 ?? 0.5);
        setActiveRate6(parsed.activeRate6 ?? 0.5);
        setMonthlyGrowth(parsed.monthlyGrowth ?? 4);
        setMonthlyChurn(parsed.monthlyChurn ?? 0.08);
        setRefundRate(parsed.refundRate ?? 0.02);
        setPersonalCost(storageVersion >= STORAGE_VERSION ? (parsed.personalCost ?? 0) : 0);
        setMarketingCost(storageVersion >= STORAGE_VERSION ? (parsed.marketingCost ?? 0) : 0);
        setOtherCost(storageVersion >= STORAGE_VERSION ? (parsed.otherCost ?? 0) : 0);
        setTaxRate(parsed.taxRate ?? 0.05);
        setBonusCoeff(parsed.bonusCoeff ?? defCoeff);
      }
    } catch (e) {
      console.warn('Could not read from local storage', e);
    }
  }, [defPoints, defCoeff, defRate]);

  // Save state on changes
  useEffect(() => {
    const stateToSave = {
      version: STORAGE_VERSION,
      gen1, gen2, gen3, gen4, gen5, gen6,
      repRate1, repRate2, repRate3, repRate4, repRate5,
      avgPoints, rate, isAdvanced,
      activeRate1, activeRate2, activeRate3, activeRate4, activeRate5, activeRate6,
      monthlyGrowth, monthlyChurn, refundRate, personalCost, marketingCost, otherCost,
      taxRate, bonusCoeff
    };
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(stateToSave));
    } catch (e) {
      console.error('Could not write to local storage', e);
    }
  }, [
    gen1, gen2, gen3, gen4, gen5, gen6,
    repRate1, repRate2, repRate3, repRate4, repRate5,
    avgPoints, rate, isAdvanced,
    activeRate1, activeRate2, activeRate3, activeRate4, activeRate5, activeRate6,
    monthlyGrowth, monthlyChurn, refundRate, personalCost, marketingCost, otherCost,
    taxRate, bonusCoeff
  ]);

  // Revert / Reset
  const handleReset = () => {
    setGen1(5);
    setRepRate1(2);
    setRepRate2(2);
    setRepRate3(1);
    setRepRate4(0);
    setRepRate5(0);
    setAvgPoints(defPoints);
    setRate(defRate);
    setActiveRate1(1.0);
    setActiveRate2(0.8);
    setActiveRate3(0.7);
    setActiveRate4(0.6);
    setActiveRate5(0.5);
    setActiveRate6(0.5);
    setMonthlyGrowth(4);
    setMonthlyChurn(0.08);
    setRefundRate(0.02);
    setPersonalCost(0);
    setMarketingCost(0);
    setOtherCost(0);
    setTaxRate(0.05);
    setBonusCoeff(defCoeff);
  };

  // Compile full input object
  const calcInput: AdvancedCalculatorInput = {
    generations: [gen1, gen2, gen3, gen4, gen5, gen6],
    avgPointsPerPerson: avgPoints,
    exchangeRate: rate,
    activeRates: isAdvanced 
      ? [activeRate1, activeRate2, activeRate3, activeRate4, activeRate5, activeRate6] 
      : [1.0, 1.0, 1.0, 1.0, 1.0, 1.0], // simple mode assumes 100% active
    monthlyGrowth: isAdvanced ? monthlyGrowth : 0,
    monthlyChurn: isAdvanced ? monthlyChurn : 0,
    refundRate: isAdvanced ? refundRate : 0,
    personalProductCost: isAdvanced ? personalCost : 0,
    marketingCost: isAdvanced ? marketingCost : 0,
    otherExpenses: isAdvanced ? otherCost : 0,
    taxRate: isAdvanced ? taxRate : 0,
    bonusCoefficient: isAdvanced ? bonusCoeff : defCoeff,
    simulatedMonths: 12
  };

  // Run Calculations
  const results: MultiScenarioResults = calculateMultiScenarios(calcInput);
  const cur = results.current;
  const totals = cur.generationDetails.reduce(
    (acc, d) => {
      acc.totalCount += d.totalCount;
      acc.effectiveCount += d.effectiveCount;
      acc.totalPoints += d.totalPoints;
      acc.totalIncome += d.bonusCNY;
      return acc;
    },
    { totalCount: 0, effectiveCount: 0, totalPoints: 0, totalIncome: 0 }
  );

  // Copy results summary
  const handleCopySummary = () => {
    const text = `【PM健康与事业指南-收入情景模拟测算摘要】
测算模式：${isAdvanced ? '高级真实经营模式' : '基础简易演示模式'}
团队人数规划：1代 ${gen1}人 | 2代 ${gen2}人 | 3代 ${gen3}人 | 4代 ${gen4}人 | 5代 ${gen5}人 | 6代 ${gen6}人
平均月度有效积分：${avgPoints} 分 (默认 ${defPoints}分)
结算汇率：${rate} (默认 ${defRate})
活跃率系数：${isAdvanced ? `1代${(activeRate1*100).toFixed(0)}% / 2代${(activeRate2*100).toFixed(0)}% / 3代${(activeRate3*100).toFixed(0)}%` : '默认100%'}

【测算情景结果】
1. 当前情景（您输入的参数）：
   - 月度毛奖金：¥ ${cur.monthlyGrossBonus.toFixed(2)} 元
   - 月度总支出：¥ ${cur.monthlyTotalCost.toFixed(2)} 元
   - 预计税前净收益：¥ ${cur.monthlyPreTaxNet.toFixed(2)} 元
   - 预计税后净收益：¥ ${cur.monthlyPostTaxNet.toFixed(2)} 元
   - 有效活动总积分：${cur.totalEffectivePoints.toFixed(0)} 分

2. 保守情景 (活跃率下调20%, 退货率增5%)：
   - 预计税后净收益：¥ ${results.conservative.monthlyPostTaxNet.toFixed(2)} 元

3. 乐观情景 (活跃率上调10%, 退货率降2%)：
   - 预计税后净收益：¥ ${results.optimistic.monthlyPostTaxNet.toFixed(2)} 元

* 达到当前自用及运营收支平衡所需有效团队积分：约 ${results.breakEvenPointsNeeded.toFixed(0)} 分

声明：本测算采用待官方确定的演示参数，仅供公式逻辑拆解说明之用，绝不构成任何收益承诺、诱导投资或财富保障保证。请以PM最新版薪酬政策及账户实际结算单为准。`;

    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8 space-y-10 animate-fadeIn" id="simulator-page">
      
      {/* 1. Header with warning banner */}
      <div className="border-b border-gray-100 pb-6 space-y-3">
        <h1 className="text-2xl sm:text-3xl font-bold text-[#12304A] flex items-center space-x-2">
          <Calculator className="h-6 w-6 text-[#C5A35A]" />
          <span>收入情景模拟器 (Scenario Simulator)</span>
        </h1>
        <p className="text-sm text-gray-500 max-w-4xl">
          这是一个<strong>完全本地化运算的财务逻辑推演工具</strong>。数据不上传任何后台。在此输入各代人数及假设条件，可以推演出理论上的奖金收益、个人运营支出以及潜在的净得结果。
        </p>
      </div>

      <div className="bg-[#FFF4E5] border border-orange-200/50 rounded-xl p-4 sm:p-5 text-xs text-orange-950 flex items-start space-x-3">
        <ShieldAlert className="h-5 w-5 shrink-0 mt-0.5 text-orange-600" />
        <div className="space-y-1">
          <p className="font-bold">合规与审慎提示 (Crucial Compliance Statement)：</p>
          <p className="leading-relaxed text-orange-900">
            {pmConfig.disclaimer.value} 此外，月度积分 {defPoints} 分、奖金系数 {defCoeff} 以及汇率 {defRate} 均属于<strong>“待官方资料进一步核实、确认的演示默认参数”</strong>，不得视作已经生效执行的官方数字，严禁用于向他人虚构、引诱高收入推广。
          </p>
        </div>
      </div>

      {/* 2. Main interactive container */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start" id="simulator-grid">
        
        {/* Left Col: Parameter Input Form (5 Columns) */}
        <div className="lg:col-span-5 bg-white border border-gray-100 rounded-xl p-6 shadow-sm space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="font-sans font-bold text-base text-[#12304A]">参数控制面板</h3>
            <div className="flex space-x-2">
              <button
                id="btn-toggle-simple"
                onClick={() => setIsAdvanced(false)}
                className={`px-3 py-1 text-xs rounded-full font-medium border transition-colors ${
                  !isAdvanced 
                    ? 'bg-[#1F5D7A] text-white border-transparent' 
                    : 'bg-white text-gray-500 border-gray-200 hover:bg-gray-50'
                }`}
              >
                简易模式
              </button>
              <button
                id="btn-toggle-advanced"
                onClick={() => setIsAdvanced(true)}
                className={`px-3 py-1 text-xs rounded-full font-medium border transition-colors ${
                  isAdvanced 
                    ? 'bg-[#1F5D7A] text-white border-transparent' 
                    : 'bg-white text-gray-500 border-gray-200 hover:bg-gray-50'
                }`}
              >
                高级模式
              </button>
            </div>
          </div>

          <div className="space-y-4" id="form-inputs">
            {/* Generations Count (Gen 1 - Gen 6) */}
            <div className="space-y-4">
              <label className="text-xs font-bold text-[#12304A] block uppercase tracking-wider">
                步骤 1：规划您的六代推荐链条（裂变裂变倍增模型）
              </label>

              {/* Gen 1 */}
              <div className="space-y-1 p-2 bg-[#1F5D7A]/5 rounded-lg border border-[#1F5D7A]/10">
                <div className="flex justify-between items-center text-xs text-gray-700 font-mono">
                  <span className="font-semibold text-[#12304A]">第一代 (您直接推荐的)</span>
                  <span className="font-bold text-[#1F5D7A]">{gen1} 人</span>
                </div>
                <input
                  type="range" min="0" max="50" step="1" value={gen1}
                  onChange={(e) => setGen1(parseInt(e.target.value) || 0)}
                  className="w-full h-1.5 bg-gray-100 rounded appearance-none cursor-pointer accent-[#1F5D7A]"
                  id="slider-gen1"
                />
                <span className="text-[10px] text-gray-400 block italic">您直接开出的核心直推人数</span>
              </div>

              {/* Gen 2 */}
              <div className="space-y-1 p-2 bg-gray-50/70 rounded-lg border border-gray-100">
                <div className="flex justify-between items-center text-xs text-gray-700 font-mono">
                  <span className="font-medium">第二代 (1代成员推荐)</span>
                  <span className="font-bold text-[#1F5D7A]">{gen2} 人</span>
                </div>
                <div className="flex justify-between items-center text-[10px] text-gray-500 mt-0.5">
                  <span>平均每位1代推荐新人数 (裂变系数)</span>
                  <span className="font-bold text-amber-600">{repRate1.toFixed(0)} 人</span>
                </div>
                <input
                  type="range" min="0" max="20" step="1" value={repRate1}
                  onChange={(e) => setRepRate1(parseInt(e.target.value) || 0)}
                  className="w-full h-1.5 bg-gray-200 rounded appearance-none cursor-pointer accent-[#1F5D7A]"
                  id="slider-repRate1"
                />
                <span className="text-[10px] text-gray-400 block italic font-mono">
                  计算逻辑：1代 ({gen1}人) × 裂变 ({repRate1.toFixed(0)}) = 约 {gen2}人
                </span>
              </div>

              {/* Gen 3 */}
              <div className="space-y-1 p-2 bg-gray-50/70 rounded-lg border border-gray-100">
                <div className="flex justify-between items-center text-xs text-gray-700 font-mono">
                  <span className="font-medium">第三代 (2代成员推荐)</span>
                  <span className="font-bold text-[#1F5D7A]">{gen3} 人</span>
                </div>
                <div className="flex justify-between items-center text-[10px] text-gray-500 mt-0.5">
                  <span>平均每位2代推荐新人数 (裂变系数)</span>
                  <span className="font-bold text-amber-600">{repRate2.toFixed(0)} 人</span>
                </div>
                <input
                  type="range" min="0" max="20" step="1" value={repRate2}
                  onChange={(e) => setRepRate2(parseInt(e.target.value) || 0)}
                  className="w-full h-1.5 bg-gray-200 rounded appearance-none cursor-pointer accent-[#1F5D7A]"
                  id="slider-repRate2"
                />
                <span className="text-[10px] text-gray-400 block italic font-mono">
                  计算逻辑：2代 ({gen2}人) × 裂变 ({repRate2.toFixed(0)}) = 约 {gen3}人
                </span>
              </div>

              {/* Gen 4 */}
              <div className="space-y-1 p-2 bg-gray-50/70 rounded-lg border border-gray-100">
                <div className="flex justify-between items-center text-xs text-gray-700 font-mono">
                  <span className="font-medium">第四代 (3代成员推荐)</span>
                  <span className="font-bold text-[#1F5D7A]">{gen4} 人</span>
                </div>
                <div className="flex justify-between items-center text-[10px] text-gray-500 mt-0.5">
                  <span>平均每位3代推荐新人数 (裂变系数)</span>
                  <span className="font-bold text-amber-600">{repRate3.toFixed(0)} 人</span>
                </div>
                <input
                  type="range" min="0" max="20" step="1" value={repRate3}
                  onChange={(e) => setRepRate3(parseInt(e.target.value) || 0)}
                  className="w-full h-1.5 bg-gray-200 rounded appearance-none cursor-pointer accent-[#1F5D7A]"
                  id="slider-repRate3"
                />
                <span className="text-[10px] text-gray-400 block italic font-mono">
                  计算逻辑：3代 ({gen3}人) × 裂变 ({repRate3.toFixed(0)}) = 约 {gen4}人
                </span>
              </div>

              {/* Gen 5 */}
              <div className="space-y-1 p-2 bg-gray-50/70 rounded-lg border border-gray-100">
                <div className="flex justify-between items-center text-xs text-gray-700 font-mono">
                  <span className="font-medium">第五代 (4代成员推荐)</span>
                  <span className="font-bold text-[#1F5D7A]">{gen5} 人</span>
                </div>
                <div className="flex justify-between items-center text-[10px] text-gray-500 mt-0.5">
                  <span>平均每位4代推荐新人数 (裂变系数)</span>
                  <span className="font-bold text-amber-600">{repRate4.toFixed(0)} 人</span>
                </div>
                <input
                  type="range" min="0" max="20" step="1" value={repRate4}
                  onChange={(e) => setRepRate4(parseInt(e.target.value) || 0)}
                  className="w-full h-1.5 bg-gray-200 rounded appearance-none cursor-pointer accent-[#1F5D7A]"
                  id="slider-repRate4"
                />
                <span className="text-[10px] text-gray-400 block italic font-mono">
                  计算逻辑：4代 ({gen4}人) × 裂变 ({repRate4.toFixed(0)}) = 约 {gen5}人
                </span>
              </div>

              {/* Gen 6 */}
              <div className="space-y-1 p-2 bg-gray-50/70 rounded-lg border border-gray-100">
                <div className="flex justify-between items-center text-xs text-gray-700 font-mono">
                  <span className="font-medium">第六代 (5代成员推荐)</span>
                  <span className="font-bold text-[#1F5D7A]">{gen6} 人</span>
                </div>
                <div className="flex justify-between items-center text-[10px] text-gray-500 mt-0.5">
                  <span>平均每位5代推荐新人数 (裂变系数)</span>
                  <span className="font-bold text-amber-600">{repRate5.toFixed(0)} 人</span>
                </div>
                <input
                  type="range" min="0" max="20" step="1" value={repRate5}
                  onChange={(e) => setRepRate5(parseInt(e.target.value) || 0)}
                  className="w-full h-1.5 bg-gray-200 rounded appearance-none cursor-pointer accent-[#1F5D7A]"
                  id="slider-repRate5"
                />
                <span className="text-[10px] text-gray-400 block italic font-mono">
                  计算逻辑：5代 ({gen5}人) × 裂变 ({repRate5.toFixed(0)}) = 约 {gen6}人
                </span>
              </div>
            </div>

            {/* Base parameters */}
            <div className="space-y-3 pt-2">
              <label className="text-xs font-bold text-[#12304A] block uppercase tracking-wider">
                步骤 2：业绩基础参数自填
              </label>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <span className="text-[10px] text-gray-400 block font-sans">人均月度有效积分 (分)</span>
                  <input
                    type="number" min="0" max="5000" value={avgPoints}
                    onChange={(e) => setAvgPoints(parseFloat(e.target.value) || 0)}
                    className="w-full text-xs border border-gray-200 rounded px-2.5 py-1.5 focus:outline-none focus:border-[#1F5D7A] font-mono font-bold"
                  />
                  <span className="text-[9px] text-amber-600 italic">默认演示参数：{defPoints}分</span>
                  <span className="text-[9px] text-gray-400 leading-relaxed block">
                    月度积分口径说明：奖金按“结算月份”核算。自动购通常每 {pmConfig.autoBuyCycleDays.value} 天扣款一次（约3个月/一周期），因此试算用“一位持续自动购成员在单月内折算产生的有效积分”作为起点；本站默认以每月约 {defPoints} 分演示，正式请以您后台当月结算清单为准。
                  </span>
                </div>
                <div className="space-y-1">
                  <span className="text-[10px] text-gray-400 block font-sans">结算汇率 (EUR-CNY)</span>
                  <input
                    type="number" min="0" max="20" step="0.01" value={rate}
                    onChange={(e) => setRate(parseFloat(e.target.value) || 0)}
                    className="w-full text-xs border border-gray-200 rounded px-2.5 py-1.5 focus:outline-none focus:border-[#1F5D7A] font-mono font-bold"
                  />
                  <span className="text-[9px] text-amber-600 italic">默认演示参数：{defRate}</span>
                </div>
              </div>
            </div>

            {/* Advanced parameters only when toggled */}
            {isAdvanced && (
              <div className="border-t border-gray-100 pt-4 space-y-4 animate-fadeIn" id="advanced-inputs-box">
                <span className="text-xs font-bold text-[#1F5D7A] block uppercase tracking-wider flex items-center space-x-1">
                  <Sparkles className="h-3.5 w-3.5 text-[#C5A35A]" />
                  <span>步骤 3：高级经营环境参数</span>
                </span>

                {/* Churn and active rates */}
                <div className="space-y-3 bg-gray-50 rounded-lg p-3 border border-gray-100">
                  <span className="text-[11px] font-bold text-[#12304A] block">各代活跃率规划：</span>
                  
                  <div className="grid grid-cols-3 gap-2 text-center text-[10px] text-gray-600 font-mono">
                    <div className="space-y-1">
                      <span>1代活跃率</span>
                      <input 
                        type="number" min="0" max="1" step="0.05" value={activeRate1}
                        onChange={(e) => setActiveRate1(parseFloat(e.target.value) || 0)}
                        className="w-full text-center border border-gray-200 bg-white rounded p-1 text-xs font-bold"
                      />
                    </div>
                    <div className="space-y-1">
                      <span>2代活跃率</span>
                      <input 
                        type="number" min="0" max="1" step="0.05" value={activeRate2}
                        onChange={(e) => setActiveRate2(parseFloat(e.target.value) || 0)}
                        className="w-full text-center border border-gray-200 bg-white rounded p-1 text-xs font-bold"
                      />
                    </div>
                    <div className="space-y-1">
                      <span>3代活跃率</span>
                      <input 
                        type="number" min="0" max="1" step="0.05" value={activeRate3}
                        onChange={(e) => setActiveRate3(parseFloat(e.target.value) || 0)}
                        className="w-full text-center border border-gray-200 bg-white rounded p-1 text-xs font-bold"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-3 gap-2 text-center text-[10px] text-gray-600 font-mono pt-1">
                    <div className="space-y-1">
                      <span>4代活跃率</span>
                      <input 
                        type="number" min="0" max="1" step="0.05" value={activeRate4}
                        onChange={(e) => setActiveRate4(parseFloat(e.target.value) || 0)}
                        className="w-full text-center border border-gray-200 bg-white rounded p-1 text-xs font-bold"
                      />
                    </div>
                    <div className="space-y-1">
                      <span>5代活跃率</span>
                      <input 
                        type="number" min="0" max="1" step="0.05" value={activeRate5}
                        onChange={(e) => setActiveRate5(parseFloat(e.target.value) || 0)}
                        className="w-full text-center border border-gray-200 bg-white rounded p-1 text-xs font-bold"
                      />
                    </div>
                    <div className="space-y-1">
                      <span>6代活跃率</span>
                      <input 
                        type="number" min="0" max="1" step="0.05" value={activeRate6}
                        onChange={(e) => setActiveRate6(parseFloat(e.target.value) || 0)}
                        className="w-full text-center border border-gray-200 bg-white rounded p-1 text-xs font-bold"
                      />
                    </div>
                  </div>
                </div>

                {/* Hard costs and parameters */}
                <div className="grid grid-cols-2 gap-3 text-xs">
                  <div className="space-y-1">
                    <span className="text-[10px] text-gray-400 block font-sans">个人月自用产品(元)</span>
                    <input
                      type="number" min="0" max="10000" value={personalCost}
                      onChange={(e) => setPersonalCost(parseFloat(e.target.value) || 0)}
                      className="w-full text-xs border border-gray-200 rounded px-2.5 py-1.5 focus:outline-none focus:border-[#1F5D7A] font-mono font-bold"
                    />
                  </div>
                  <div className="space-y-1">
                    <span className="text-[10px] text-gray-400 block font-sans">推广及活动成本(元/月)</span>
                    <input
                      type="number" min="0" max="10000" value={marketingCost}
                      onChange={(e) => setMarketingCost(parseFloat(e.target.value) || 0)}
                      className="w-full text-xs border border-gray-200 rounded px-2.5 py-1.5 focus:outline-none focus:border-[#1F5D7A] font-mono font-bold"
                    />
                  </div>
                  <div className="space-y-1">
                    <span className="text-[10px] text-gray-400 block font-sans">退款纠纷折减比</span>
                    <input
                      type="number" min="0" max="1" step="0.01" value={refundRate}
                      onChange={(e) => setRefundRate(parseFloat(e.target.value) || 0)}
                      className="w-full text-xs border border-gray-200 rounded px-2.5 py-1.5 focus:outline-none focus:border-[#1F5D7A] font-mono font-bold"
                    />
                    <span className="text-[9px] text-gray-400">退货发生概率（如0.02=2%）</span>
                  </div>
                  <div className="space-y-1">
                    <span className="text-[10px] text-gray-400 block font-sans">税费估扣比例</span>
                    <input
                      type="number" min="0" max="1" step="0.01" value={taxRate}
                      onChange={(e) => setTaxRate(parseFloat(e.target.value) || 0)}
                      className="w-full text-xs border border-gray-200 rounded px-2.5 py-1.5 focus:outline-none focus:border-[#1F5D7A] font-mono font-bold"
                    />
                    <span className="text-[9px] text-gray-400">预计个税税率</span>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3 text-xs border-t border-gray-100 pt-3">
                  <div className="space-y-1">
                    <span className="text-[10px] text-gray-400 block font-sans">月均新增(人)</span>
                    <input
                      type="number" min="0" max="100" value={monthlyGrowth}
                      onChange={(e) => setMonthlyGrowth(parseInt(e.target.value) || 0)}
                      className="w-full text-xs border border-gray-200 rounded px-2.5 py-1.5 focus:outline-none"
                    />
                  </div>
                  <div className="space-y-1">
                    <span className="text-[10px] text-gray-400 block font-sans">月均流失率</span>
                    <input
                      type="number" min="0" max="1" step="0.01" value={monthlyChurn}
                      onChange={(e) => setMonthlyChurn(parseFloat(e.target.value) || 0)}
                      className="w-full text-xs border border-gray-200 rounded px-2.5 py-1.5 focus:outline-none"
                    />
                  </div>
                </div>
              </div>
            )}

            {/* Action buttons */}
            <div className="flex gap-2 pt-4 border-t border-gray-100">
              <button
                id="btn-copy-summary"
                onClick={handleCopySummary}
                className="flex-1 bg-[#1F5D7A] hover:bg-[#12304A] text-white text-xs font-bold py-2.5 px-4 rounded-lg flex items-center justify-center space-x-1.5 transition-colors"
              >
                {copied ? (
                  <>
                    <Check className="h-4 w-4 text-green-400" />
                    <span className="text-green-400 font-semibold">摘要已复制</span>
                  </>
                ) : (
                  <>
                    <Copy className="h-4 w-4" />
                    <span>复制测算摘要</span>
                  </>
                )}
              </button>
              
              <button
                id="btn-reset-simulator"
                onClick={handleReset}
                title="重置所有参数"
                className="bg-gray-50 hover:bg-gray-100 border border-gray-200 rounded-lg p-2.5 text-gray-600 transition-colors"
              >
                <RefreshCw className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Right Col: Complex Dashboard (7 Columns) */}
        <div className="lg:col-span-7 space-y-6" id="results-dashboard">
          
          {/* 1. Side-by-side Three Scenarios Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4" id="scenarios-grid">
            {/* Conservative Card */}
            <div className="bg-gray-50 border border-gray-100 rounded-xl p-4 space-y-1">
              <span className="text-[10px] text-red-600 uppercase font-mono font-bold block">1. 保守情景 (Conservative)</span>
              <p className="text-[10px] text-gray-400">活跃下调20%/退货率增5%</p>
              <div className="pt-2">
                <span className={`text-lg font-mono font-bold block ${results.conservative.monthlyPostTaxNet >= 0 ? 'text-[#12304A]' : 'text-red-600'}`}>
                  ¥ {results.conservative.monthlyPostTaxNet.toFixed(2)}
                </span>
                <span className="text-[9px] text-gray-400 font-sans block">预计月度税后净收益</span>
              </div>
            </div>

            {/* Current Card */}
            <div className="bg-[#EEF6F8] border border-[#1F5D7A]/25 rounded-xl p-4 space-y-1 relative ring-2 ring-[#1F5D7A]/15">
              <span className="absolute -top-2 right-3 bg-[#1F5D7A] text-white font-sans text-[8px] font-bold px-1.5 py-0.5 rounded-full uppercase">Current</span>
              <span className="text-[10px] text-[#1F5D7A] uppercase font-mono font-bold block">2. 当前情景 (Selected)</span>
              <p className="text-[10px] text-gray-400">完全基于您设置的参数</p>
              <div className="pt-2">
                <span className={`text-xl font-mono font-bold block ${cur.monthlyPostTaxNet >= 0 ? 'text-[#12304A]' : 'text-red-600'}`}>
                  ¥ {cur.monthlyPostTaxNet.toFixed(2)}
                </span>
                <span className="text-[9px] text-gray-500 font-sans block">预计月度税后净收益</span>
              </div>
            </div>

            {/* Optimistic Card */}
            <div className="bg-green-50 border border-green-100 rounded-xl p-4 space-y-1">
              <span className="text-[10px] text-green-600 uppercase font-mono font-bold block">3. 乐观情景 (Optimistic)</span>
              <p className="text-[10px] text-gray-400">活跃上调10%/退货率降2%</p>
              <div className="pt-2">
                <span className={`text-lg font-mono font-bold block ${results.optimistic.monthlyPostTaxNet >= 0 ? 'text-[#12304A]' : 'text-red-600'}`}>
                  ¥ {results.optimistic.monthlyPostTaxNet.toFixed(2)}
                </span>
                <span className="text-[9px] text-gray-400 font-sans block">预计月度税后净收益</span>
              </div>
            </div>
          </div>

          {/* 2. Detailed Performance metrics */}
          <div className="bg-white border border-gray-100 rounded-xl p-6 shadow-sm space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-gray-50 pb-4">
              <h4 className="font-sans font-bold text-base text-[#12304A]">当前配置下的结算总览</h4>
              <span className="text-[11px] font-mono text-gray-400">
                团队规模计：{cur.totalEffectiveCount.toFixed(1)} 有效活动人 / {cur.totalEffectivePoints.toFixed(0)} 总积分
              </span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-center">
              <div className="bg-gray-50 rounded-lg p-3">
                <span className="text-[10px] text-gray-400 block font-sans">月度总业绩毛提成</span>
                <span className="text-base font-mono font-bold text-[#12304A] mt-1 block">¥ {cur.monthlyGrossBonus.toFixed(2)}</span>
              </div>
              <div className="bg-gray-50 rounded-lg p-3">
                <span className="text-[10px] text-gray-400 block font-sans">自用及推广等支出</span>
                <span className="text-base font-mono font-bold text-red-600 mt-1 block">¥ {cur.monthlyTotalCost.toFixed(2)}</span>
              </div>
              <div className="bg-gray-50 rounded-lg p-3">
                <span className="text-[10px] text-gray-400 block font-sans">扣除成本后税前净额</span>
                <span className={`text-base font-mono font-bold mt-1 block ${cur.monthlyPreTaxNet >= 0 ? 'text-[#12304A]' : 'text-red-600'}`}>
                  ¥ {cur.monthlyPreTaxNet.toFixed(2)}
                </span>
              </div>
              <div className="bg-[#EEF6F8] rounded-lg p-3">
                <span className="text-[10px] text-[#1F5D7A] block font-sans">税后到手参考额</span>
                <span className={`text-base font-mono font-bold mt-1 block ${cur.monthlyPostTaxNet >= 0 ? 'text-[#12304A]' : 'text-red-600'}`}>
                  ¥ {cur.monthlyPostTaxNet.toFixed(2)}
                </span>
              </div>
            </div>

            {/* Break-Even analysis */}
            <div className="bg-gray-50 border border-gray-100 rounded-lg p-4 text-xs flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
              <div className="space-y-1">
                <p className="font-semibold text-[#12304A]">自用及推广收支相抵平衡点（Break-Even Target）</p>
                <p className="text-gray-500 leading-normal text-[11px]">
                  若要通过推广提成覆盖月度总开支（当前 ¥ {cur.monthlyTotalCost.toFixed(2)} 元），您的团队当月需产生积分：
                </p>
              </div>
              <div className="text-right shrink-0 bg-white border border-gray-100 rounded p-2 shadow-sm font-mono text-xs">
                <span className="text-sm font-bold text-[#1F5D7A] block">{results.breakEvenPointsNeeded.toFixed(0)} 积分</span>
                <span className="text-[10px] text-gray-400">约 {(results.breakEvenPointsNeeded / defPoints).toFixed(1)} 套三合一基础套</span>
              </div>
            </div>
          </div>

          {/* 3. Generation Details List */}
          <div className="bg-white border border-gray-100 rounded-xl p-6 shadow-sm space-y-4">
            <div className="flex justify-between items-center border-b border-gray-50 pb-3">
              <h4 className="font-sans font-bold text-sm text-[#12304A]">一代至六代分销明细表格</h4>
              <button
                id="btn-toggle-formula"
                onClick={() => setShowFormulaDetails(!showFormulaDetails)}
                className="text-xs text-[#1F5D7A] hover:underline flex items-center space-x-1"
              >
                <span>{showFormulaDetails ? '隐藏公式分解' : '查看计算公式分解'}</span>
                {showFormulaDetails ? <ChevronUp className="h-3 w-3" /> : <ChevronDown className="h-3 w-3" />}
              </button>
            </div>

            <div className="overflow-x-auto text-xs" id="generations-table-wrapper">
              <table className="min-w-full divide-y divide-gray-100 text-left" id="generations-table">
                <thead>
                  <tr className="text-gray-400">
                    <th scope="col" className="pb-3 font-medium">代数</th>
                    <th scope="col" className="pb-3 font-medium">输入人/活跃人</th>
                    <th scope="col" className="pb-3 font-medium">月度有效积分</th>
                    <th scope="col" className="pb-3 font-medium">提成比</th>
                    <th scope="col" className="pb-3 font-medium text-right">折算奖金 (CNY)</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100 text-gray-600">
                  {cur.generationDetails.map((detail) => (
                    <React.Fragment key={detail.generation}>
                      <tr className="hover:bg-gray-50/50">
                        <td className="py-3 font-semibold text-[#12304A]">第 {detail.generation} 代</td>
                        <td className="py-3 font-mono">
                          {detail.totalCount}人 / <span className="text-[#1F5D7A] font-bold">{detail.effectiveCount.toFixed(1)}人</span>
                          <span className="text-[10px] text-gray-400 block">活跃率: {(detail.activeRate*100).toFixed(0)}%</span>
                        </td>
                        <td className="py-3 font-mono">{detail.totalPoints.toFixed(0)} 分</td>
                        <td className="py-3 font-mono font-semibold text-gray-700">{(detail.percentage * 100).toFixed(0)}%</td>
                        <td className="py-3 font-mono font-bold text-[#12304A] text-right">¥ {detail.bonusCNY.toFixed(2)}</td>
                      </tr>
                      {showFormulaDetails && (
                        <tr className="bg-gray-50/50">
                          <td colSpan={5} className="py-2 px-3 text-[10px] text-gray-400 font-mono leading-relaxed border-l-2 border-[#1F5D7A]">
                            公式分解: {detail.effectiveCount.toFixed(1)} 人 × {detail.pointsPerPerson} 月度积分 × 系数 {bonusCoeff} × 提成 {(detail.percentage*100).toFixed(0)}% × 汇率 {rate} = ¥ {detail.bonusCNY.toFixed(2)} 元
                          </td>
                        </tr>
                      )}
                    </React.Fragment>
                  ))}
                  <tr className="bg-[#EEF6F8] text-[#12304A] font-mono">
                    <td className="py-3 font-semibold">合计</td>
                    <td className="py-3">
                      {totals.totalCount}人 / <span className="text-[#1F5D7A] font-bold">{totals.effectiveCount.toFixed(1)}人</span>
                    </td>
                    <td className="py-3">{totals.totalPoints.toFixed(0)} 分</td>
                    <td className="py-3">-</td>
                    <td className="py-3 font-bold text-right">¥ {totals.totalIncome.toFixed(2)}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* 4. Beautiful SVG-based 12-Month Trend Line and Column Charts */}
          {isAdvanced && (
            <div className="bg-white border border-gray-100 rounded-xl p-6 shadow-sm space-y-4">
              <h4 className="font-sans font-bold text-sm text-[#12304A]">12个月增长与流失动态模拟趋势图 (SVG)</h4>
              <p className="text-xs text-gray-500 leading-relaxed">
                基于月均新增 <span className="font-semibold text-[#1F5D7A]">{monthlyGrowth}人</span>，结合月均流失率 <span className="font-semibold text-red-600">{(monthlyChurn*100).toFixed(0)}%</span>。模拟12个月后累积业绩产生的收益成本变化走势：
              </p>

              {/* Responsive SVG Chart */}
              <div className="w-full bg-gray-50 rounded-lg p-4 border border-gray-100 relative" id="trend-chart-wrapper">
                {/* Custom SVG Line Chart */}
                <svg viewBox="0 0 500 200" className="w-full h-auto">
                  {/* Grid Lines */}
                  <line x1="40" y1="20" x2="480" y2="20" stroke="#f1f3f5" strokeWidth="1" />
                  <line x1="40" y1="60" x2="480" y2="60" stroke="#f1f3f5" strokeWidth="1" />
                  <line x1="40" y1="100" x2="480" y2="100" stroke="#f1f3f5" strokeWidth="1" />
                  <line x1="40" y1="140" x2="480" y2="140" stroke="#f1f3f5" strokeWidth="1" />
                  <line x1="40" y1="170" x2="480" y2="170" stroke="#e9ecef" strokeWidth="1.5" />

                  {/* Generate Path Coordinates */}
                  {(() => {
                    // Find max value to scale the chart height
                    const maxIncome = Math.max(...results.trend12Months.map(t => Math.max(t.grossBonus, t.netIncome, t.totalCost, 1000)));
                    const scaleY = (val: number) => {
                      // Map range [0, maxIncome] to SVG height [170, 20]
                      const clampedVal = Math.max(-500, Math.min(val, maxIncome));
                      return 170 - (clampedVal / maxIncome) * 140;
                    };
                    const getX = (index: number) => 40 + (index * 40);

                    // Income Line Coordinates
                    const pointsGross = results.trend12Months.map((t, idx) => `${getX(idx)},${scaleY(t.grossBonus)}`).join(' ');
                    const pointsNet = results.trend12Months.map((t, idx) => `${getX(idx)},${scaleY(t.netIncome)}`).join(' ');
                    const pointsCost = results.trend12Months.map((t, idx) => `${getX(idx)},${scaleY(t.totalCost)}`).join(' ');

                    return (
                      <>
                        {/* Cost Line (Red dashed) */}
                        <polyline fill="none" stroke="#dc3545" strokeWidth="1.5" strokeDasharray="3,3" points={pointsCost} />
                        
                        {/* Gross Line (Blue) */}
                        <polyline fill="none" stroke="#1F5D7A" strokeWidth="2.5" points={pointsGross} />
                        
                        {/* Net Line (Warm Gold) */}
                        <polyline fill="none" stroke="#C5A35A" strokeWidth="2.5" points={pointsNet} />

                        {/* Labels for months */}
                        {results.trend12Months.map((t, idx) => (
                          <React.Fragment key={idx}>
                            <text x={getX(idx)} y="185" fill="#868e96" fontSize="8" textAnchor="middle" fontFamily="monospace">
                              {idx + 1}M
                            </text>
                            {/* Points dot on line */}
                            <circle cx={getX(idx)} cy={scaleY(t.netIncome)} r="3.5" fill="#C5A35A" stroke="#fff" strokeWidth="1" />
                          </React.Fragment>
                        ))}

                        {/* Y axis indicators */}
                        <text x="35" y={scaleY(maxIncome)} fill="#868e96" fontSize="8" textAnchor="end">¥{maxIncome.toFixed(0)}</text>
                        <text x="35" y={scaleY(maxIncome / 2)} fill="#868e96" fontSize="8" textAnchor="end">¥{(maxIncome/2).toFixed(0)}</text>
                        <text x="35" y="170" fill="#868e96" fontSize="8" textAnchor="end">¥0</text>
                      </>
                    );
                  })()}
                </svg>

                {/* Legend */}
                <div className="flex flex-wrap justify-center gap-4 pt-3 text-[10px] text-gray-500 font-sans border-t border-gray-100">
                  <div className="flex items-center space-x-1">
                    <span className="w-3 h-0.5 bg-[#1F5D7A] inline-block"></span>
                    <span>月度总毛佣金 (Gross)</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <span className="w-3 h-0.5 bg-[#C5A35A] inline-block"></span>
                    <span>预计税后净得 (Net)</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <span className="w-3 h-0.5 bg-[#dc3545] border-t border-dashed border-red-500 inline-block"></span>
                    <span>个人开支成本 (Cost)</span>
                  </div>
                </div>
              </div>

              {/* Text data table fallback */}
              <div className="rounded-lg border border-gray-100 bg-gray-50/50 p-3" id="trend-table-fallback">
                <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block mb-2">趋势数据文字备份：</span>
                <div className="grid grid-cols-4 text-[10px] text-gray-500 font-mono font-semibold border-b border-gray-200 pb-1.5">
                  <span>期数</span>
                  <span>月毛提成</span>
                  <span>个人总成本</span>
                  <span className="text-right">预计净收益</span>
                </div>
                <div className="space-y-1 pt-1 text-[10px] font-mono text-gray-500">
                  {[1, 3, 6, 12].map((mIdx) => {
                    const trendItem = results.trend12Months[mIdx - 1];
                    if (!trendItem) return null;
                    return (
                      <div key={mIdx} className="grid grid-cols-4">
                        <span>第 {mIdx} 个月</span>
                        <span>¥ {trendItem.grossBonus.toFixed(1)}</span>
                        <span className="text-red-600">¥ {trendItem.totalCost.toFixed(0)}</span>
                        <span className={`text-right font-bold ${trendItem.netIncome >= 0 ? 'text-[#12304A]' : 'text-red-600'}`}>
                          ¥ {trendItem.netIncome.toFixed(1)}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          )}

        </div>

      </div>

    </div>
  );
};
