import React, { useState } from 'react';
import { Layers, ArrowRight, ShieldAlert, CheckCircle, Calculator } from 'lucide-react';
import { pmConfig } from '../config/pmConfig';

interface HomeProps {
  navigateTo: (page: string) => void;
}

export const Home: React.FC<HomeProps> = ({ navigateTo }) => {
  // Mini simulator state for the preview section
  const [gen1Count, setGen1Count] = useState<number>(5);
  
  // Formulas parameters from unified config
  const points = pmConfig.validPointsPerPerson.value;
  const coeff = pmConfig.bonusCoefficient.value;
  const gen1Percent = pmConfig.bonusPercentages.value[0];
  const rate = pmConfig.exchangeRate.value;

  // Calculate: Count * Points * Coeff * Percentage * Rate
  const miniCalculationResult = gen1Count * points * coeff * gen1Percent * rate;

  return (
    <div className="space-y-12 pb-16 animate-fadeIn" id="home-page-container">
      
      {/* 1. Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-b from-[#12304A] to-[#1F5D7A] text-white py-16 px-4 sm:px-6 lg:px-8 text-center" id="hero-section">
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute -bottom-10 left-1/2 w-[520px] -translate-x-1/2 opacity-[0.28] blur-2xl sm:w-[720px] sm:opacity-[0.34]" style={{ background: 'radial-gradient(circle at 50% 60%, rgba(197,163,90,0.65), rgba(31,93,122,0.0) 60%)' }} />
          <div className="absolute bottom-[-36px] left-1/2 w-[380px] -translate-x-1/2 sm:bottom-[-44px] sm:w-[560px]">
            <img
              src="assets/products/bg.jpg"
              alt=""
              className="w-full select-none opacity-95 drop-shadow-[0_24px_48px_rgba(0,0,0,0.38)]"
              draggable={false}
            />
          </div>
          <div className="absolute inset-0 bg-gradient-to-b from-black/55 via-black/20 to-transparent" />
        </div>
        <div className="relative z-10 max-w-4xl mx-auto space-y-6">
          <h1 className="font-sans font-bold text-3xl sm:text-4xl md:text-5xl tracking-tight text-white leading-tight drop-shadow-[0_3px_10px_rgba(0,0,0,0.55)]">
            先了解产品，再判断这是否适合你
          </h1>
          <p className="text-base sm:text-lg text-white/90 max-w-2xl mx-auto font-sans leading-relaxed drop-shadow-[0_2px_8px_rgba(0,0,0,0.45)]">
            这里用简单、透明、客观的方式，详细说明 PM 基础三合一营养补充套、合作伙伴准入门槛、运营持续成本与奖金计算模型。
          </p>
          <div className="flex flex-col sm:flex-row justify-center items-center gap-4 pt-4">
            <button
              id="hero-btn-products"
              onClick={() => {
                navigateTo('products');
              }}
              className="w-full sm:w-auto px-6 py-3 rounded-lg bg-[#C5A35A] hover:bg-[#b08e45] text-[#12304A] font-bold text-sm shadow transition-colors flex items-center justify-center space-x-2"
            >
              <Layers className="h-4 w-4" />
              <span>了解三合一产品</span>
            </button>
            <button
              id="hero-btn-simulator"
              onClick={() => {
                navigateTo('simulator');
              }}
              className="w-full sm:w-auto px-6 py-3 rounded-lg bg-white/10 hover:bg-white/20 text-white border border-white/25 font-bold text-sm shadow transition-colors flex items-center justify-center space-x-2"
            >
              <Calculator className="h-4 w-4" />
              <span>试算收益情景</span>
            </button>
          </div>
          <div className="pt-3 flex items-center justify-center">
            <div className="inline-flex items-center space-x-2 rounded-full bg-black/45 border border-white/15 px-3 py-1.5 text-[11px] text-white/90 font-mono backdrop-blur-sm drop-shadow-[0_2px_10px_rgba(0,0,0,0.65)]">
              <span className="inline-block w-2 h-2 rounded-full bg-green-500"></span>
              <span>非官方网站 | 独立信息整理测算工具</span>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Two Directories Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-2 gap-8" id="two-paths-section">
        {/* Left Card: Understand Product */}
        <div className="border border-[#1F5D7A]/15 rounded-xl bg-white p-6 sm:p-8 hover:shadow-md transition-shadow flex flex-col justify-between">
          <div className="space-y-4">
            <div className="inline-flex h-12 w-12 items-center justify-center rounded-lg bg-[#EEF6F8] text-[#1F5D7A]">
              <Layers className="h-6 w-6" />
            </div>
            <h3 className="text-xl font-bold text-[#12304A]">我想客观了解产品</h3>
            <p className="text-sm text-gray-600 leading-relaxed">
              全面解构 PM FitLine 三合一产品套组。我们从配料表、主要营养成分、咖啡因及敏感人群提醒等多个方面整理了详细的中立资料。
            </p>
            <ul className="space-y-2 text-xs text-gray-500 pt-2">
              <li className="flex items-center space-x-1.5">
                <CheckCircle className="h-3.5 w-3.5 text-[#6F9272]" />
                <span>不夸大功效，不替代药物，遵守健康合规</span>
              </li>
              <li className="flex items-center space-x-1.5">
                <CheckCircle className="h-3.5 w-3.5 text-[#6F9272]" />
                <span>提供一日营养食用时间轴与敏感成分预警</span>
              </li>
            </ul>
          </div>
          <button
            id="path-btn-products"
            onClick={() => {
              navigateTo('products');
            }}
            className="mt-6 inline-flex items-center space-x-1 text-sm font-semibold text-[#1F5D7A] hover:text-[#12304A] self-start"
          >
            <span>进入产品详情</span>
            <ArrowRight className="h-4 w-4" />
          </button>
        </div>

        {/* Right Card: Understand partnership */}
        <div className="border border-[#1F5D7A]/15 rounded-xl bg-white p-6 sm:p-8 hover:shadow-md transition-shadow flex flex-col justify-between">
          <div className="space-y-4">
            <div className="inline-flex h-12 w-12 items-center justify-center rounded-lg bg-[#FFF4E5] text-[#C5A35A]">
              <ShieldAlert className="h-6 w-6" />
            </div>
            <h3 className="text-xl font-bold text-[#12304A]">我想客观了解合作计划</h3>
            <p className="text-sm text-gray-600 leading-relaxed">
              梳理注册会员、自动购、有效业绩、第一至第六代提成比例以及活跃资格判定条件。同时对潜在的推广、时间以及伙伴流失风险进行剖析。
            </p>
            <ul className="space-y-2 text-xs text-gray-500 pt-2">
              <li className="flex items-center space-x-1.5">
                <CheckCircle className="h-3.5 w-3.5 text-[#C5A35A]" />
                <span>明晰判定标准，解读考核细节</span>
              </li>
              <li className="flex items-center space-x-1.5">
                <CheckCircle className="h-3.5 w-3.5 text-[#C5A35A]" />
                <span>不承诺高额躺赚，揭示推广和退款潜在成本</span>
              </li>
            </ul>
          </div>
          <button
            id="path-btn-plan"
            onClick={() => {
              navigateTo('plan');
            }}
            className="mt-6 inline-flex items-center space-x-1 text-sm font-semibold text-[#1F5D7A] hover:text-[#12304A] self-start"
          >
            <span>解读合作条款</span>
            <ArrowRight className="h-4 w-4" />
          </button>
        </div>
      </section>

      {/* 4. Partner Plan Four-Step Instructions */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8" id="four-step-instruction">
        <div className="text-center space-y-2">
          <h2 className="text-2xl font-bold text-[#12304A]">合作计划参与的客观四步骤</h2>
          <p className="text-xs sm:text-sm text-gray-500 max-w-xl mx-auto">
            清晰的参与全流程，帮助您规避信息盲区。我们坚决倡导理性评估，拒绝冲动加盟。
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 relative" id="steps-grid">
          {/* Step 1 */}
          <div className="bg-white border border-gray-100 rounded-xl p-5 space-y-2 relative shadow-sm">
            <span className="absolute top-3 right-4 font-mono font-bold text-3xl text-[#EEF6F8]">01</span>
            <h4 className="font-bold text-[#12304A] text-sm pt-2">注册与阅读官方资料</h4>
            <p className="text-xs text-gray-500 leading-relaxed">
              通过合规渠道进行官方免费账户注册，首先应自行查阅、核对该市场最新版《薪酬计划》和产品说明文件。
            </p>
          </div>

          {/* Step 2 */}
          <div className="bg-white border border-gray-100 rounded-xl p-5 space-y-2 relative shadow-sm">
            <span className="absolute top-3 right-4 font-mono font-bold text-3xl text-[#EEF6F8]">02</span>
            <h4 className="font-bold text-[#12304A] text-sm pt-2">按需决定自用或推广</h4>
            <p className="text-xs text-gray-500 leading-relaxed">
              购买产品只代表个人消费，自用和推广完全出于自愿。购买产品不等于必然获得收入。
            </p>
          </div>

          {/* Step 3 */}
          <div className="bg-white border border-gray-100 rounded-xl p-5 space-y-2 relative shadow-sm">
            <span className="absolute top-3 right-4 font-mono font-bold text-3xl text-[#EEF6F8]">03</span>
            <h4 className="font-bold text-[#12304A] text-sm pt-2">确认活跃资格与有效分</h4>
            <p className="text-xs text-gray-500 leading-relaxed">
              了解佣金提成所需满足的“活跃度点数”（如自用满100分或推荐自动购），避免漏单或佣金失效。
            </p>
          </div>

          {/* Step 4 */}
          <div className="bg-white border border-gray-100 rounded-xl p-5 space-y-2 relative shadow-sm">
            <span className="absolute top-3 right-4 font-mono font-bold text-3xl text-[#EEF6F8]">04</span>
            <h4 className="font-bold text-[#12304A] text-sm pt-2">按照官方规则核对奖金</h4>
            <p className="text-xs text-gray-500 leading-relaxed">
              严格按照官方月结报表，代数系数、汇率扣减及税费政策核查本币实发奖金，警惕退款纠纷。
            </p>
          </div>
        </div>

        <div className="bg-[#FFF4E5] border border-orange-200/50 rounded-lg p-4 text-xs text-orange-950 flex items-start space-x-2 max-w-3xl mx-auto" id="warning-bar-steps">
          <ShieldAlert className="h-4 w-4 shrink-0 mt-0.5 text-orange-600" />
          <div>
            <strong>特别强调：</strong>购买产品和加入计划是两个概念。购买产品仅为自用体验，<strong>绝对不等于获得了投资本金收益，也并不代表您必定能获得任何推广奖金</strong>。任何宣称“零门槛躺赚”、“只要买就能赚钱”的描述均属违规不实宣传。
          </div>
        </div>
      </section>

      {/* 5. Simulator Preview Section */}
      <section className="bg-[#EEF6F8] border-y border-[#1F5D7A]/10 py-12" id="simulator-preview">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            {/* Left side info */}
            <div className="lg:col-span-5 space-y-4">
              <span className="text-xs uppercase font-mono tracking-wider text-[#1F5D7A] font-bold">INTERACTIVE TOOL PREVIEW</span>
              <h3 className="text-2xl font-bold text-[#12304A]">团队第一代奖金试算示范</h3>
              <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
                这是奖金计算公式的直观说明。用户可以调整滑动条，改变第一代的推荐有效会员人数，从而直观看到公式的拆解。
              </p>
              <p className="text-xs text-gray-400">
                默认演示参数：每人月度有效积分：{points} 分 | 奖金系数：{coeff} | 第一代比例：{(gen1Percent*100).toFixed(0)}% | 汇率：{rate}
              </p>
              <button
                id="preview-btn-full-simulator"
                onClick={() => {
                  navigateTo('simulator');
                }}
                className="mt-2 inline-flex items-center space-x-1 text-xs font-semibold text-[#1F5D7A] hover:text-[#12304A]"
              >
                <span>进入多代数、多场景的完整高级模拟器</span>
                <ArrowRight className="h-3.5 w-3.5" />
              </button>
            </div>

            {/* Right side interactive card */}
            <div className="lg:col-span-7 bg-white rounded-xl border border-gray-100 p-6 shadow-sm space-y-4" id="mini-calc-box">
              <div className="space-y-3">
                <div className="flex justify-between items-center text-xs">
                  <span className="font-bold text-[#12304A]">第一代有效人数: <span className="text-base text-[#1F5D7A] font-mono font-bold">{gen1Count}</span> 人</span>
                  <span className="text-gray-400 font-mono">Range: 0 - 50人</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="50"
                  value={gen1Count}
                  onChange={(e) => setGen1Count(parseInt(e.target.value) || 0)}
                  className="w-full h-2 bg-gray-100 rounded-lg appearance-none cursor-pointer accent-[#1F5D7A]"
                  id="mini-calc-slider"
                />
              </div>

              {/* Dynamic Formula Display */}
              <div className="bg-gray-50 rounded p-3 text-xs font-mono text-gray-600 space-y-1.5 border border-gray-100">
                <div className="text-[10px] text-gray-400 font-sans font-semibold">演示奖金公式：人数 × 月度积分 × 奖金系数 × 提成比例 × 汇率</div>
                <div className="flex flex-wrap items-center gap-1 text-[#12304A] font-medium text-[11px] sm:text-xs">
                  <span className="bg-[#EEF6F8] px-1 rounded text-[#1F5D7A]">{gen1Count}人</span>
                  <span>×</span>
                  <span className="bg-gray-100 px-1 rounded">{points}月度积分</span>
                  <span>×</span>
                  <span className="bg-gray-100 px-1 rounded">{coeff}系数</span>
                  <span>×</span>
                  <span className="bg-gray-100 px-1 rounded">{(gen1Percent*100).toFixed(0)}%</span>
                  <span>×</span>
                  <span className="bg-gray-100 px-1 rounded">汇率 {rate}</span>
                </div>
              </div>

              {/* Calculation output */}
              <div className="flex justify-between items-center border-t border-gray-100 pt-4">
                <div className="space-y-0.5">
                  <span className="text-xs text-gray-400 block font-sans">第一代预计月度毛奖金示范</span>
                  <span className="text-[#C5A35A] text-xs font-sans font-semibold">待官方确认的演示参数</span>
                </div>
                <div className="text-right">
                  <span className="text-2xl font-mono font-bold text-[#12304A]" id="mini-calc-output">
                    ¥ {miniCalculationResult.toFixed(2)}
                  </span>
                  <span className="text-xs text-gray-400 block font-mono">CNY (元)</span>
                </div>
              </div>

              <div className="text-[10px] text-gray-400 bg-gray-50/50 p-2 rounded leading-relaxed border border-gray-100/50">
                *这仅为理论计算公式演示。在实际结算中，任何佣金的产生均需要您的账户在对应结算月份具备<strong>合规的活跃资格</strong>。如果整代中发生产品退货，奖金将按比例扣减或扣回。
              </div>
            </div>

          </div>
        </div>
      </section>

    </div>
  );
};
