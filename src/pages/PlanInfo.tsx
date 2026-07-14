import React from 'react';
import { ShieldCheck, HelpCircle, AlertTriangle, Users, BookOpen, TrendingUp, DollarSign } from 'lucide-react';
import { pmConfig } from '../config/pmConfig';

export const PlanInfo: React.FC = () => {
  const percent = pmConfig.bonusPercentages.value;
  const points = pmConfig.validPointsPerPerson.value;
  const autoBuyPrice = pmConfig.autoBuyPrice.value;

  const identities = [
    {
      role: '访客 (Visitor)',
      desc: '未进行过任何官方注册的普通消费者。可以直接按官方零售价体验产品，无任何考核、积分或佣金提成资格。',
    },
    {
      role: '注册会员 (Registered Member)',
      desc: '在官方平台免费提交注册资料后的会员。享有会员参考价折扣自用，无任何强制消费。不具备代数奖金的考核与结算资格。',
    },
    {
      role: '自动购会员 (Auto-Ship Member)',
      desc: '开通了每3个月定期配送扣款计划的会员。可以享受更优惠的价格自用。在部分市场，自动购是维持个人活跃积分的基本配置。',
    },
    {
      role: '经销商/合作伙伴 (Distributor/Partner)',
      desc: '不仅自用，且希望通过推荐销售获得佣金者。必须满足官方设定的“活跃资格”（Active）和“级别考核”，方可按照代数计算奖金。',
    },
  ];

  const terms = [
    {
      name: '自动购 (Auto-Ship)',
      explain: '指会员签署的定期采购协议（通常90天配送一次并付一次款）。它既是锁定优惠自用价格的工具，也是最常被用作维持“基本活跃”的参考标志。',
    },
    {
      name: '有效积分 (Points)',
      explain: `每一件PM产品都有对应的系统积分。以常见“自动购”情景为例：基础套自动购约 ${autoBuyPrice} 元覆盖约3个月，系统奖金计算通常按“月度积分”折算；本站演示以每月约 ${points} 积分作为一位持续自动购成员的参考起点。奖金计算是以积分（而不是人民币支付额）为起点。`,
    },
    {
      name: '第一代至第六代',
      explain: '代数代表推荐链条中的层级关系。您直接推荐的A为第一代；A推荐的B为您的第二代，以此类推。在特定考核下，您可以拿到至多六代的代数提成。',
    },
    {
      name: '活跃资格 (Active Qualification)',
      explain: '要提取下代数中产生的业绩奖金，您自己的账户在当月必须是“活跃状态”。通常要求个人当月有100积分或通过订购自动购协议。否则即使团队业绩再高，当月奖金也可能归零。',
    },
    {
      name: '奖金系数 (Coefficient)',
      explain: '用来平抑不同地区价格差的乘数（如本站默认演示值 0.51）。积分在乘以提成比例前，需要先乘以此系数。',
    },
    {
      name: '汇率 (Exchange Rate)',
      explain: '系统采用统一的海外点数计算后，结算为人民币发放到国内卡。演示默认使用 8.2 的比例，它会随官方换算通道的政策波动。',
    },
    {
      name: '退款调整 (Refund Adjustment)',
      explain: '直销遵守严格的退货退款条例。如果您推荐的伙伴在犹豫期或规定内办理了退货退款，其产生的所有历史积分都将清零，已结算的奖金会在后续月份扣减回。',
    },
  ];

  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8 space-y-12 animate-fadeIn" id="plan-info-page">
      
      {/* 1. Header Banner */}
      <div className="border-b border-gray-100 pb-6 space-y-3">
        <h1 className="text-2xl sm:text-3xl font-bold text-[#12304A]">合作推广计划透明解析</h1>
        <p className="text-sm text-gray-500 max-w-3xl leading-relaxed">
          合作计划中的推广收入通常<strong>完全取决于您与团队实际产生的真实有效销售业绩、资格、积分与考核达标</strong>，绝非仅靠注册会员或充值买产品就能自动躺赚。
        </p>
      </div>

      {/* 2. Identity Concepts */}
      <div className="space-y-6" id="identity-section">
        <h3 className="font-sans font-bold text-lg text-[#12304A] flex items-center space-x-2">
          <Users className="h-5 w-5 text-[#C5A35A]" />
          <span>一、身份概念与资格边界</span>
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {identities.map((item, idx) => (
            <div key={idx} className="bg-white border border-gray-100 rounded-xl p-5 space-y-2 shadow-sm">
              <h4 className="font-bold text-[#12304A] text-sm">{item.role}</h4>
              <p className="text-xs text-gray-500 leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>

        <div className="bg-[#FFF4E5] border border-orange-200/50 rounded-lg p-3 text-xs text-orange-950 flex items-start space-x-2">
          <AlertTriangle className="h-4 w-4 shrink-0 mt-0.5 text-orange-600" />
          <p>
            <strong>特别提示：</strong>上述不同身份的注册条件、订购折扣和提成资格在不同国家、区域市场（例如大陆商贸渠道、港澳跨境电商渠道等）可能存在根本性区别。具体核实请务必参照您当前注册市场最新版的《PM官方商户运营守则》及《合作伙伴协议》。
          </p>
        </div>
      </div>

      {/* 3. Terminology */}
      <div className="space-y-6" id="terms-section">
        <h3 className="font-sans font-bold text-lg text-[#12304A] flex items-center space-x-2">
          <BookOpen className="h-5 w-5 text-[#C5A35A]" />
          <span>二、核心术语通俗解读</span>
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6" id="terms-grid">
          {terms.map((item, idx) => (
            <div key={idx} className="bg-gray-50 border border-gray-100 rounded-xl p-5 space-y-2">
              <h4 className="font-bold text-[#12304A] text-xs font-mono tracking-wide">{item.name}</h4>
              <p className="text-[11px] text-gray-500 leading-relaxed">{item.explain}</p>
            </div>
          ))}
        </div>
      </div>

      {/* 4. Tree Diagram */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start" id="tree-diagram-section">
        {/* Genealogy chart */}
        <div className="lg:col-span-6 bg-white border border-gray-100 rounded-xl p-6 shadow-sm space-y-4">
          <h3 className="font-sans font-bold text-base text-[#12304A] flex items-center space-x-2">
            <Users className="h-4 w-4 text-[#C5A35A]" />
            <span>三、团队代数推荐关系示意图</span>
          </h3>
          <p className="text-xs text-gray-500">
            代数仅代表在系统中的推荐引导人关系。不代表图中的每一个人都会持续产生购买，更不代表每个人都会去继续推荐他人：
          </p>

          {/* Tree Graphics via simple elegant CSS */}
          <div className="bg-gray-50 rounded-lg p-6 flex flex-col items-center justify-center font-mono text-xs text-[#12304A]">
            <div className="bg-[#12304A] text-white px-4 py-2 rounded-md font-bold shadow-sm">
              我 (My Account)
            </div>
            
            {/* Split lines */}
            <div className="h-4 w-0.5 bg-gray-300"></div>
            <div className="w-48 h-0.5 bg-gray-300"></div>
            <div className="flex justify-between w-52">
              <div className="h-4 w-0.5 bg-gray-300"></div>
              <div className="h-4 w-0.5 bg-gray-300"></div>
            </div>

            {/* Gen 1 */}
            <div className="flex justify-between w-64 text-center">
              <div className="bg-[#1F5D7A] text-white px-2 py-1.5 rounded text-[11px] shadow-sm w-28">
                第一代 A
                <div className="h-3 w-0.5 bg-gray-300 mx-auto mt-1"></div>
                <div className="w-16 h-0.5 bg-gray-300 mx-auto"></div>
                <div className="flex justify-between w-20 mx-auto">
                  <div className="h-3 w-0.5 bg-gray-300"></div>
                  <div className="h-3 w-0.5 bg-gray-300"></div>
                </div>
                <div className="flex justify-between gap-1 mt-1 text-[9px]">
                  <span className="bg-white text-gray-600 px-1 rounded border border-gray-100">第二代 A1</span>
                  <span className="bg-white text-gray-600 px-1 rounded border border-gray-100">第二代 A2</span>
                </div>
              </div>

              <div className="bg-[#1F5D7A] text-white px-2 py-1.5 rounded text-[11px] shadow-sm w-28">
                第一代 B
                <div className="h-3 w-0.5 bg-gray-300 mx-auto mt-1"></div>
                <div className="h-3 w-0.5 bg-gray-300 mx-auto"></div>
                <div className="mt-1 text-[9px] max-w-[80px] mx-auto">
                  <span className="bg-white text-gray-600 px-1 rounded border border-gray-100 block">第二代 B1</span>
                </div>
              </div>
            </div>

            <div className="mt-6 text-[10px] text-gray-400 font-sans text-center max-w-sm">
              *如上图，如果您是“活跃”状态，A、B购买的积分计入您的第一代业绩；A1、A2和B1购买的积分计入您的第二代业绩。
            </div>
          </div>
        </div>

        {/* Six Gen Percentages */}
        <div className="lg:col-span-6 bg-white border border-gray-100 rounded-xl p-6 shadow-sm space-y-4">
          <h3 className="font-sans font-bold text-base text-[#12304A] flex items-center space-x-2">
            <TrendingUp className="h-4 w-4 text-[#C5A35A]" />
            <span>四、代数奖金提成参考比例</span>
          </h3>
          <p className="text-xs text-gray-500">
            在当前的演示配置文件中，第一至第六代的分配系数如下。<strong>请特别注意，这仅作为测试演示参数，上线前需要根据官方最新文本进行重置。</strong>
          </p>

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-1 text-center" id="percent-grid">
            <div className="bg-[#EEF6F8] border border-gray-50 rounded-lg p-3">
              <span className="text-[10px] text-[#1F5D7A] block font-semibold font-mono">1st Gen / 第一代</span>
              <span className="text-xl font-bold font-mono text-[#12304A]">{(percent[0] * 100).toFixed(0)}%</span>
            </div>
            <div className="bg-gray-50 border border-gray-50 rounded-lg p-3">
              <span className="text-[10px] text-gray-400 block font-semibold font-mono">2nd Gen / 第二代</span>
              <span className="text-xl font-bold font-mono text-[#12304A]">{(percent[1] * 100).toFixed(0)}%</span>
            </div>
            <div className="bg-gray-50 border border-gray-50 rounded-lg p-3">
              <span className="text-[10px] text-gray-400 block font-semibold font-mono">3rd Gen / 第三代</span>
              <span className="text-xl font-bold font-mono text-[#12304A]">{(percent[2] * 100).toFixed(0)}%</span>
            </div>
            <div className="bg-gray-50 border border-gray-50 rounded-lg p-3">
              <span className="text-[10px] text-gray-400 block font-semibold font-mono">4th Gen / 第四代</span>
              <span className="text-xl font-bold font-mono text-[#12304A]">{(percent[3] * 100).toFixed(0)}%</span>
            </div>
            <div className="bg-[#EEF6F8] border border-gray-50 rounded-lg p-3">
              <span className="text-[10px] text-[#1F5D7A] block font-semibold font-mono">5th Gen / 第五代</span>
              <span className="text-xl font-bold font-mono text-[#12304A]">{(percent[4] * 100).toFixed(0)}%</span>
            </div>
            <div className="bg-[#EEF6F8] border border-gray-50 rounded-lg p-3">
              <span className="text-[10px] text-[#1F5D7A] block font-semibold font-mono">6th Gen / 第六代</span>
              <span className="text-xl font-bold font-mono text-[#12304A]">{(percent[5] * 100).toFixed(0)}%</span>
            </div>
          </div>

          <div className="bg-amber-50 rounded p-3 text-[11px] text-amber-950 space-y-1">
            <p className="font-semibold">为什么是 5%-3%-3%-3%-5%-5% 的倒沙漏结构？</p>
            <p className="text-gray-600 leading-normal">
              这是 PM 薪酬计划的一个特点，在最底层代数（第五、六代）提供了比中段（二、三、四代）更高的理论扣减率，旨在鼓励推荐者对深层团队成员的辅助和赋能。
            </p>
          </div>
        </div>
      </div>

      {/* 5. Costs and Risks checklist */}
      <div className="bg-gray-50 border border-gray-100 rounded-xl p-6 sm:p-8 space-y-4" id="risks-disclosure-box">
        <div className="flex items-center space-x-2 text-[#12304A]">
          <DollarSign className="h-5 w-5 text-red-600" />
          <h3 className="font-sans font-bold text-base sm:text-lg">合作推广潜在的成本与核心经营风险提示</h3>
        </div>
        <p className="text-xs text-gray-600 leading-normal">
          直销型合伙不是零成本零风险的。我们建议您在开始前，逐一对照并核算以下可能面临的实际资源与财务付出：
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs text-gray-700" id="risks-checklist">
          {/* Risk 1 */}
          <div className="border-b border-gray-200/50 pb-3 space-y-1">
            <strong className="text-red-700">1. 产品购买的硬性支出成本</strong>
            <p className="text-gray-500">
              购买产品自用需要消耗真实资金。如果您只是为了自用体验，这是一笔单纯的日常保健品消费，请合理评估自身家庭收入和预算，切勿超额借贷囤货。
            </p>
          </div>

          {/* Risk 2 */}
          <div className="border-b border-gray-200/50 pb-3 space-y-1">
            <strong className="text-red-700">2. 维持资格点数的要求限制</strong>
            <p className="text-gray-500">
              如果决定拿佣金，您必须每月达到“活跃点数”。这意味着如果自己当月不购买，或团队没有订购自动购，您可能会为了勉强维持积分而进行非理性消费。
            </p>
          </div>

          {/* Risk 3 */}
          <div className="border-b border-gray-200/50 pb-3 space-y-1">
            <strong className="text-red-700">3. 推广宣发与会务交通开支</strong>
            <p className="text-gray-500">
              线下宣讲、带伙伴体验、长途差旅、沙龙聚会都会产生门票、咖啡费和交通费。这些隐性推广成本很容易超出初期获得的微薄提成。
            </p>
          </div>

          {/* Risk 4 */}
          <div className="border-b border-gray-200/50 pb-3 space-y-1">
            <strong className="text-red-700">4. 极高的时间精力与社交投入</strong>
            <p className="text-gray-500">
              建立稳定的分享团队需要长年累月的沟通、解答问题和培训。如果您已有主业，这会极大挤占日常陪伴家庭和休息的时间。
            </p>
          </div>

          {/* Risk 5 */}
          <div className="border-b border-gray-200/50 pb-3 space-y-1">
            <strong className="text-red-700">5. 客户、伙伴极高的流失率</strong>
            <p className="text-gray-500">
              大多数体验者通常只购买一次，或是难以坚持饮用。团队成员极易因为各种客观原因（觉得贵、嫌麻烦、没效果）随时流失、断开自动购。
            </p>
          </div>

          {/* Risk 6 */}
          <div className="border-b border-gray-200/50 pb-3 space-y-1">
            <strong className="text-red-700">6. 跨国退款、汇率波动与个税扣减</strong>
            <p className="text-gray-500">
              国际结算通常使用非本地货币（如欧元、美元折算），汇率剧烈波动可能直接导致人民币到账缩水。此外，佣金到账均需按照当地法规扣缴个人所得税或手续费。
            </p>
          </div>
        </div>

        <div className="bg-[#FFF4E5] border border-orange-200/50 rounded-lg p-4 text-xs text-orange-950 flex items-start space-x-2" id="risks-important-notice">
          <ShieldCheck className="h-4 w-4 shrink-0 mt-0.5 text-orange-600" />
          <p>
            <strong>核心警示：</strong>购买三合一产品不等于购买了能升值的理财基金，也不等于买了一份必定获利的投资份额。<strong>不同成员由于人脉圈子、沟通技巧、地区市场不同，其产生的销售业绩和提成收益存在极其剧烈的个体差异。</strong>理性的看待它，不盲从，不浮躁。
          </p>
        </div>
      </div>

    </div>
  );
};
