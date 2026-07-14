import React, { useState } from 'react';
import { Layers, ArrowRight, HelpCircle, ShieldAlert, CheckCircle, Percent, Calculator } from 'lucide-react';
import { pmConfig } from '../config/pmConfig';

interface HomeProps {
  setCurrentPage: (page: string) => void;
}

export const Home: React.FC<HomeProps> = ({ setCurrentPage }) => {
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
      <section className="bg-gradient-to-b from-[#12304A] to-[#1F5D7A] text-white py-16 px-4 sm:px-6 lg:px-8 text-center" id="hero-section">
        <div className="max-w-4xl mx-auto space-y-6">
          <h1 className="font-sans font-bold text-3xl sm:text-4xl md:text-5xl tracking-tight text-white leading-tight">
            先了解产品，再判断这是否适合你
          </h1>
          <p className="text-base sm:text-lg text-white/85 max-w-2xl mx-auto font-sans leading-relaxed">
            这里用简单、透明、客观的方式，详细说明 PM 基础三合一营养补充套、合作伙伴准入门槛、运营持续成本与奖金计算模型。
          </p>
          <div className="flex flex-col sm:flex-row justify-center items-center gap-4 pt-4">
            <button
              id="hero-btn-products"
              onClick={() => {
                setCurrentPage('products');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="w-full sm:w-auto px-6 py-3 rounded-lg bg-[#C5A35A] hover:bg-[#b08e45] text-[#12304A] font-bold text-sm shadow transition-colors flex items-center justify-center space-x-2"
            >
              <Layers className="h-4 w-4" />
              <span>了解三合一产品</span>
            </button>
            <button
              id="hero-btn-simulator"
              onClick={() => {
                setCurrentPage('simulator');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="w-full sm:w-auto px-6 py-3 rounded-lg bg-white/10 hover:bg-white/20 text-white border border-white/25 font-bold text-sm shadow transition-colors flex items-center justify-center space-x-2"
            >
              <Calculator className="h-4 w-4" />
              <span>试算收益情景</span>
            </button>
          </div>
          <div className="text-xs text-white/50 pt-2 font-mono flex items-center justify-center space-x-1">
            <span className="inline-block w-2 h-2 rounded-full bg-green-500"></span>
            <span>非官方网站 | 独立信息整理测算工具</span>
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
              setCurrentPage('products');
              window.scrollTo({ top: 0, behavior: 'smooth' });
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
              setCurrentPage('plan');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="mt-6 inline-flex items-center space-x-1 text-sm font-semibold text-[#1F5D7A] hover:text-[#12304A] self-start"
          >
            <span>解读合作条款</span>
            <ArrowRight className="h-4 w-4" />
          </button>
        </div>
      </section>

      {/* 3. Three-In-One Suite Overview */}
      <section className="bg-gray-50 py-12" id="three-products-overview">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          <div className="text-center space-y-2 max-w-2xl mx-auto">
            <h2 className="text-2xl font-bold text-[#12304A]">三合一基础营养套组概览</h2>
            <p className="text-xs sm:text-sm text-gray-500">
              三合一基础套由早、晚两个不同的营养冲饮系列组成，用中立、纯粹的营养科学视角解释：
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Activize - 小红 */}
            <div className="bg-white border border-gray-100 rounded-xl p-5 shadow-sm space-y-3">
              <div className="flex justify-between items-start">
                <span className="text-[10px] uppercase font-mono font-bold px-2 py-0.5 rounded bg-red-50 text-red-600 border border-red-100">晨间搭配</span>
                <span className="text-xs text-gray-400 font-mono">Activize</span>
              </div>
              <h4 className="font-bold text-[#12304A] text-lg">
                Activize <span className="text-sm text-gray-400 font-normal">（俗称“小红”）</span>
              </h4>
              <p className="text-xs text-gray-500 leading-relaxed">
                晨间饮用的草本复合产品。主要配料为维生素B群（B1, B2, B6, B12, 烟酸, 叶酸等）、瓜拉纳提取物。
              </p>
              <div className="text-[11px] bg-red-50/50 p-2.5 rounded border border-red-100/30 text-red-900 leading-normal">
                <strong>重要提醒：</strong>本品含有天然咖啡因，对咖啡因敏感、孕妇、未成年人及心脏不适者使用前应遵医嘱或注意用量。食用后由于烟酸成分可能引起局部皮肤发红微热，属正常生理反应。
              </div>
            </div>

            {/* Basics - 大白 */}
            <div className="bg-white border border-gray-100 rounded-xl p-5 shadow-sm space-y-3">
              <div className="flex justify-between items-start">
                <span className="text-[10px] uppercase font-mono font-bold px-2 py-0.5 rounded bg-green-50 text-[#6F9272] border border-green-100">晨间/日常</span>
                <span className="text-xs text-gray-400 font-mono">Basics</span>
              </div>
              <h4 className="font-bold text-[#12304A] text-lg">
                Basics <span className="text-sm text-gray-400 font-normal">（俗称“大白”）</span>
              </h4>
              <p className="text-xs text-gray-500 leading-relaxed">
                晨间日常搭配冲调的谷物复合膳食纤维产品。含有多种果蔬提取物、乳酸菌、可溶性及不可溶性纤维、维生素C及维生素E。
              </p>
              <div className="text-[11px] bg-green-50/50 p-2.5 rounded border border-green-100/30 text-[#2c402e] leading-normal">
                <strong>重要提醒：</strong>不含化学防腐剂。不应替代每日正常饮食；膳食纤维摄入过快、过多可能会导致部分胃肠敏感人群初期出现腹胀、排气增加，建议循序渐进饮用。
              </div>
            </div>

            {/* Restorate - 小白 */}
            <div className="bg-white border border-gray-100 rounded-xl p-5 shadow-sm space-y-3">
              <div className="flex justify-between items-start">
                <span className="text-[10px] uppercase font-mono font-bold px-2 py-0.5 rounded bg-blue-50 text-blue-600 border border-blue-100">晚间搭配</span>
                <span className="text-xs text-gray-400 font-mono">Restorate</span>
              </div>
              <h4 className="font-bold text-[#12304A] text-lg">
                Restorate <span className="text-sm text-gray-400 font-normal">（俗称“小白”）</span>
              </h4>
              <p className="text-xs text-gray-500 leading-relaxed">
                晚间临睡前一小时饮用的复合矿物质冲剂。主要富含钙、镁、锌、铁、铜、铬、硒、维生素D3等微量元素。
              </p>
              <div className="text-[11px] bg-blue-50/50 p-2.5 rounded border border-blue-100/30 text-blue-900 leading-normal">
                <strong>重要提醒：</strong>晚间补充微量元素。泡制时会有轻微气泡释放，冲泡后应静置至不再冒泡后小口慢饮。切勿直接干吞粉末。不适宜严重肾功能不全者等特殊人群。
              </div>
            </div>
          </div>
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
                默认演示参数：每人有效积分：{points} 分 | 奖金系数：{coeff} | 第一代比例：{(gen1Percent*100).toFixed(0)}% | 汇率：{rate}
              </p>
              <button
                id="preview-btn-full-simulator"
                onClick={() => {
                  setCurrentPage('simulator');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
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
                <div className="text-[10px] text-gray-400 font-sans font-semibold">演示奖金公式：人数 × 积分 × 奖金系数 × 提成比例 × 汇率</div>
                <div className="flex flex-wrap items-center gap-1 text-[#12304A] font-medium text-[11px] sm:text-xs">
                  <span className="bg-[#EEF6F8] px-1 rounded text-[#1F5D7A]">{gen1Count}人</span>
                  <span>×</span>
                  <span className="bg-gray-100 px-1 rounded">{points}积分</span>
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

      {/* 6. Why Emphasize Transparency */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8" id="why-transparency">
        <div className="text-center space-y-2">
          <h2 className="text-2xl font-bold text-[#12304A]">为什么我们极度强调信息透明？</h2>
          <p className="text-xs sm:text-sm text-gray-500 max-w-xl mx-auto">
            摒弃传统夸大式的营销话术。理性消费和客观创业是建立持久合作的前提。
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center" id="transparency-grid">
          {/* Item 1 */}
          <div className="space-y-3 p-4">
            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-[#EEF6F8] text-[#1F5D7A]">
              <CheckCircle className="h-6 w-6" />
            </div>
            <h4 className="font-bold text-[#12304A]">标签与官方资料为准</h4>
            <p className="text-xs text-gray-500 leading-relaxed max-w-xs mx-auto">
              产品成分、使用剂量、原产国认证信息均来源于原厂外包装标签或可追溯的官方PDF手册。我们不编造神秘功效，不替代医疗建议。
            </p>
          </div>

          {/* Item 2 */}
          <div className="space-y-3 p-4">
            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-[#FFF4E5] text-[#C5A35A]">
              <Percent className="h-6 w-6" />
            </div>
            <h4 className="font-bold text-[#12304A]">计算过程完全可追溯</h4>
            <p className="text-xs text-gray-500 leading-relaxed max-w-xs mx-auto">
              我们的模拟器完全公开公式，每项奖金、转换积分和最终税前税后扣减细节均可通过“展开详情”查看，绝非不透明黑盒数据。
            </p>
          </div>

          {/* Item 3 */}
          <div className="space-y-3 p-4">
            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-green-50 text-[#6F9272]">
              <ShieldAlert className="h-6 w-6" />
            </div>
            <h4 className="font-bold text-[#12304A]">收益取决于多项不确定因素</h4>
            <p className="text-xs text-gray-500 leading-relaxed max-w-xs mx-auto">
              在测算中，我们主动融入了流失率、不活跃比例、税费比以及推广物料费用。明确告知成本对收益的抵消，真实还原经营场景。
            </p>
          </div>
        </div>
      </section>

    </div>
  );
};
