import React, { useState } from 'react';
import { HelpCircle, ChevronDown, ChevronUp, AlertCircle } from 'lucide-react';
import { pmConfig } from '../config/pmConfig';

export const FAQ: React.FC = () => {
  const [openId, setOpenId] = useState<string | null>(null);

  const toggleFAQ = (id: string) => {
    setOpenId(openId === id ? null : id);
  };

  const faqItems = [
    {
      id: 'faq-1',
      q: '1. 注册会员是否等于经销商/合作伙伴？',
      a: '不等于。注册会员仅代表您获得了以会员折扣自用购买产品的账号资格，您不需要进行任何推广销售，也不具备提取佣金奖金的默认考核。而经销商（合作伙伴）则是在自用基础上，主动参与推广计划，且必须按月通过官方设定的“活跃考核资格”，方能参与当代奖金发放结算。',
    },
    {
      id: 'faq-2',
      q: '2. 自动购（Auto-Ship）是什么？',
      a: '自动购是 PM 官方为长期忠实自用客户提供的一种自动订阅计划。客户签约后，系统通常每 90 天自动发起扣款并在对应周期寄送一整套基础自用产品。开通自动购可享有优惠零售价，也是在许多国家市场中，合作伙伴个人账户维持当月“活跃状态（Active）”以享有下属团队提成资格的便捷达标手段。',
    },
    {
      id: 'faq-3',
      q: '3. 自动购是否可以随时暂停或取消？',
      a: '可以。通常情况下，会员有权在下一次扣款发货周期前的规定天数内（具体天数依不同注册地市场政策而异，通常为10天至15天前），联系官方客服、登录个人后台或递交正式书面撤销协议，申请暂停、修改绑定卡号或彻底取消自动订阅计划。请避免通过非正规第三方传言操作，以免发生多余扣款。',
    },
    {
      id: 'faq-4',
      q: '4. 购买产品后一定能获得收入吗？',
      a: '绝对不等于。购买三合一基础套只是自愿的产品消费行为。这与“投资理财”完全是不同的性质。购买产品本身不会产生任何自动派发的红利。所有的合作推广收益，必须来自于您以及您推荐团队所发生的“实际有效商品销售额”。如果仅仅是购买自用且没有后续推广销售，您的收入回报将是 0 元。',
    },
    {
      id: 'faq-5',
      q: '5. 积分（Points）和人民币是什么关系？',
      a: '每一件产品在 PM 全球系统里都设定了对应数值的系统积分（比如一套基础套计 103 积分）。计算奖金时，是以当月团队产生的积分总和为基准，先乘以“奖金换算系数（如0.51）”，再乘以对应代数提成比（如第一代5%），最后乘以结算币种的“演示兑换汇率（如8.2）”转换得出最终的人民币金额。积分是全球系统统一计价的桥梁。',
    },
    {
      id: 'faq-6',
      q: '6. 第一代和第二代推荐关系是什么意思？',
      a: '代数代表推荐注册链条中的上下级隶属关系。您自己直接提供推荐码注册的会员是您的“第一代（Generation 1）”；而由您的第一代会员直接提供码推荐注册进来的新会员，就是您的“第二代（Generation 2）”，以此往深层类推至第六代。代数关系一旦在系统确立，后续结算均以此进行层级核算。',
    },
    {
      id: 'faq-7',
      q: '7. 为什么模拟器计算结果与实际奖金可能不一致？',
      a: '因为模拟器是基于设定的固定参数进行的纯理论逻辑推算。而实际经营中有很多变量：① 如果您自己当月没有达成“活跃资格（Active）”，当代奖金比例将不予结算；② 汇率会随着官方结算渠道的最新浮动政策随时微调；③ 如果您团队下属当月发生了商品退货退款，对应的积分业绩会在当月被整笔扣回；④ 各个国家和地区具体奖金政策有本地合规差异。',
    },
    {
      id: 'faq-8',
      q: '8. 模拟器结果是否已经包含了个税或手续费扣减？',
      a: '基础简易模式没有计入任何费用，显示的是纯理论毛奖金；而在“高级模式”下，我们主动增加了“税费估算比例（默认5%）”、“推广和活动支出成本”等控制项。如果您开通高级模式并输入预计个税率，模拟器会在最后一项扣减展示“税后情景值”。最终税款代扣详情请查看官方发放的月度佣金账单。',
    },
    {
      id: 'faq-9',
      q: '9. 基础三合一产品能否治疗或预防某种疾病？',
      a: '绝对不能。FitLine 三合一属于膳食营养补充产品，**不是药物，完全不具备任何预防、改善、缓解、控制或治愈临床疾病的作用。** 任何人宣称该产品能“代替降糖药”、“扩张心血管治心脏病”或“排毒治愈偏头痛”，均属于严重夸大产品功效的违规违法宣传。任何身体不适，应严格听从执业医生的医学诊断并服用临床药品。',
    },
    {
      id: 'faq-10',
      q: '10. 孕期、未成年人等特殊人群是否可以使用？',
      a: '在自用说明中，因为 Activize（小红）含有纯天然的咖啡因及高比例烟酸，其引发的微循环发热潮红属于正常生理状态，但**对于孕期、哺乳期女性、婴幼儿、未成年人、重度咖啡因过敏以及具有严重心脑血管病史的人群，是不宜使用的**。若强行想自用体验，请务必拿着商品配料标签当面咨询您的执业医生。',
    },
    {
      id: 'faq-11',
      q: '11. 本网站是 PM 官方的网站吗？',
      a: '不是。本网站为个人独立整理的客观科普与计算辅助说明平台，**不是 PM 官方网站**。我们与 PM 公司在资金、股权、行政及日常运营上没有利益关联。全站整理公开信息并开放公式，旨在提供一个理性、透明的第三方评估工具。请读者始终以产品外包装标签印文及官方最新通知为绝对准则。',
    },
    {
      id: 'faq-12',
      q: '12. 如何核实最新的奖金制度及参与条款？',
      a: '在免费注册账户后，您可以直接登录 PM-International 官方的合作伙伴后台（Partner Backoffice），下载最新生效的官方中文《分销与薪酬计划说明书》（Compensation Plan）。如果发现网上流传的版本与官方后台PDF文件不一致，一切以官方后台下载的原件为准。',
    },
    {
      id: 'faq-13',
      q: '13. 本网站会不会保存或上传我输入的测算数据？',
      a: '完全不会。本网站没有任何后台数据库或网络上传接口。您在模拟器中输入的人数、成本、比例等信息，全部仅存储于您当前的浏览器本地（使用localStorage本地缓存以方便您刷新后不用重新输入），绝不会上传至第三方服务器。您的商业规划和隐私数据完全安全。',
    },
    {
      id: 'faq-14',
      q: '14. 为什么有些网传资料显示103分，有些显示106分？',
      a: '现有资料存在不同口径，不同国家或结算渠道对基础套的积分标定各不相同。因此，本站第一版计算器采用了可配置的演示参数（默认103分），并标为待核实。正式使用前，建议您直接查阅您对应注册地市场后台的当月实扣结算清单。',
    },
  ];

  return (
    <div className="mx-auto max-w-4xl px-4 py-12 sm:px-6 lg:px-8 space-y-10 animate-fadeIn" id="faq-page">
      
      {/* Page Header */}
      <div className="border-b border-gray-100 pb-6 text-center space-y-2">
        <h1 className="text-2xl sm:text-3xl font-bold text-[#12304A]">常见问题客观答疑 (FAQ)</h1>
        <p className="text-sm text-gray-500 max-w-2xl mx-auto">
          我们收集了对 PM 初次接触者最关心的 14 个核心疑问，不兜圈子，用中立客观的事实为您解惑。
        </p>
      </div>

      {/* Accordion Wrapper */}
      <div className="space-y-4" id="faq-accordion-list">
        {faqItems.map((item) => {
          const isOpen = openId === item.id;
          return (
            <div 
              key={item.id} 
              id={item.id}
              className="bg-white border border-gray-100 rounded-xl overflow-hidden shadow-sm hover:border-[#1F5D7A]/30 transition-colors"
            >
              <button
                onClick={() => toggleFAQ(item.id)}
                className="w-full flex items-center justify-between px-6 py-4 text-left font-semibold text-[#12304A] hover:bg-gray-50 transition-colors focus:outline-none"
                id={`faq-btn-${item.id}`}
              >
                <span className="text-sm sm:text-base font-sans">{item.q}</span>
                {isOpen ? (
                  <ChevronUp className="h-5 w-5 text-[#C5A35A] shrink-0" />
                ) : (
                  <ChevronDown className="h-5 w-5 text-gray-400 shrink-0" />
                )}
              </button>

              {isOpen && (
                <div className="px-6 pb-5 pt-1 text-xs sm:text-sm text-gray-600 leading-relaxed border-t border-gray-50 bg-gray-50/20">
                  <p>{item.a}</p>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Compliant reminder at bottom */}
      <div className="bg-amber-50 border border-amber-200/50 rounded-xl p-5 text-xs text-amber-950 flex items-start space-x-2">
        <AlertCircle className="h-4 w-4 shrink-0 mt-0.5 text-amber-600" />
        <p className="leading-relaxed">
          若您还有其他尚未在此列出的产品批次、具体物流关税或退货理算问题，我们建议您<strong>下载 PM 官方授权客户端</strong>咨询在线人工客服，或通过本站【联系咨询】入口，向有自用背景的第三方顾问进行探讨。
        </p>
      </div>

    </div>
  );
};
