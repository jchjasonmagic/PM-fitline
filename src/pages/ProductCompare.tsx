import React from 'react';
import { Layers, HelpCircle, Check, Info } from 'lucide-react';

export const ProductCompare: React.FC = () => {
  const compareRows = [
    {
      dimension: '产品类型',
      pmInfo: '复合维生素、膳食纤维、矿物质颗粒冲饮（非片剂）',
      toCheck: '是否为肠道易吸收的液体冲饮形态，或是传统的压制片剂、胶囊（通常含有较多硬脂酸镁粘合剂）。',
    },
    {
      dimension: '配料表完整性',
      pmInfo: '全成分公开。包含复合维生素B、燕麦/苹果纤维、乳酸菌、多种矿物质。',
      toCheck: '配料表是否具有化学合成防腐剂、合成人工色素。是否详细标注菌株名称（如罗伊氏乳杆菌）。',
    },
    {
      dimension: '每份营养素含量',
      pmInfo: '高浓度维生素B群、数亿益生菌、微量元素（钙、镁、锌等）科学定量。',
      toCheck: '标签是否定量标明每份成分的毫克数（mg）或微克数（µg），避免用模糊的“复合物”一笔带过。',
    },
    {
      dimension: '食用与冲调方式',
      pmInfo: '温水冲饮。每日晨、晚两冲，需搅拌静置反应。',
      toCheck: '冲泡是否繁琐，温度是否有严格要求（部分乳酸菌在超过35℃水温中会迅速失活）。',
    },
    {
      dimension: '天然与合成咖啡因',
      pmInfo: 'Activize 含有天然瓜拉纳提取物咖啡因。',
      toCheck: '产品是否含有提神性咖啡因或麻黄碱。如果是天然来源，每份含量是否在安全限值内。',
    },
    {
      dimension: '糖分与甜味剂',
      pmInfo: '采用果糖或微量甜菊糖苷（天然植物甜味剂）。',
      toCheck: '是否含有阿斯巴甜、安赛蜜等人工合成代糖，或高比例蔗糖。控糖及糖尿病人群应核实升糖指数。',
    },
    {
      dimension: '过敏原声称',
      pmInfo: 'Basics 含有燕麦麸质。不含大豆、乳制品过敏原。',
      toCheck: '包装是否有明确的“过敏原提示”（如：本生产线亦处理坚果、麸质或甲壳类）。',
    },
    {
      dimension: '每日自用成本',
      pmInfo: '自动购参考每日自用成本约 32.43 元（2919元/90天）。',
      toCheck: '每日单剂量成本多少。很多看似便宜的大罐装，折算到同等有效成分浓度的日均消耗后可能更高。',
    },
    {
      dimension: '适宜与禁用人群',
      pmInfo: '标明孕妇、未成年及咖啡因敏感者慎用。非药，不防病治病。',
      toCheck: '包装是否明示不适宜人群。警惕任何宣称“上至老人、下至婴儿、孕妇皆可包治百病”的无知宣传。',
    },
    {
      dimension: '制造源头与认证',
      pmInfo: '德国生产。宣称符合欧盟 GMP 规范，有科隆名单、南德 TÜV 溯源。',
      toCheck: '生产工厂是否具有权威第三方认证。在对应认证机构（如 NSF, USP, TÜV）官网是否能查到对应批次或工厂代码。',
    },
    {
      dimension: '是否容易长期坚持',
      pmInfo: '水果酸甜风味，液态好吞咽，按早/晚独立分装。',
      toCheck: '颗粒是否过大导致吞咽困难。味道是否有难以忍受的化学药味。是否方便出差随身携带。',
    },
    {
      dimension: '特定成分与专利吸收率',
      pmInfo: '【等待官方资料核准确认】',
      toCheck: '官方专利局是否能查到其宣称专利号。在没有核验原厂批文前，不轻信中介口头保证的“98%吸收率”。',
    },
  ];

  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8 space-y-12 animate-fadeIn" id="compare-page">
      
      {/* Page Header */}
      <div className="border-b border-gray-100 pb-6 space-y-2">
        <h1 className="text-2xl sm:text-3xl font-bold text-[#12304A]">如何理性对比、选择营养补充品</h1>
        <p className="text-sm text-gray-500">
          我们不主张“PM全方位秒杀一切品牌”的偏激营销。这里为您梳理挑选膳食补充剂时的通用核心科学维度。
        </p>
      </div>

      {/* Guide Banner */}
      <div className="bg-[#EEF6F8] rounded-xl p-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-4" id="compare-guide-banner">
        <div className="space-y-1 max-w-2xl">
          <h4 className="font-sans font-bold text-[#12304A] text-sm sm:text-base">中立的态度，是健康的底线</h4>
          <p className="text-xs text-gray-600 leading-relaxed">
            不同的人身体素质、过敏状态和财务承受力大不相同。世界上没有适合所有人的完美神药。购买任何保健食品前，最安全的方式就是：<strong>翻到包装背后的配料表与成分比（Nutrition Facts）进行逐字比对</strong>。
          </p>
        </div>
        <div className="inline-flex items-center space-x-1.5 rounded-lg bg-white border border-[#1F5D7A]/10 px-3 py-2 text-xs text-gray-500 shrink-0 font-mono">
          <Info className="h-4 w-4 text-[#C5A35A]" />
          <span>对比基准：德国原厂标签</span>
        </div>
      </div>

      {/* Comparison Table */}
      <div className="overflow-x-auto rounded-xl border border-gray-100 bg-white shadow-sm" id="compare-table-wrapper">
        <table className="min-w-full divide-y divide-gray-100 text-left text-sm" id="compare-table">
          <thead className="bg-gray-50">
            <tr>
              <th scope="col" className="px-6 py-4 font-sans font-bold text-[#12304A] w-1/4">比较维度</th>
              <th scope="col" className="px-6 py-4 font-sans font-bold text-[#12304A] w-3/8">PM FitLine 基础产品信息</th>
              <th scope="col" className="px-6 py-4 font-sans font-bold text-[#12304A] w-3/8">用户应当对其他产品核查的内容</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100 text-gray-700">
            {compareRows.map((row, idx) => (
              <tr key={idx} className="hover:bg-gray-50/50 transition-colors">
                <td className="px-6 py-4 font-semibold text-[#12304A] bg-gray-50/30">
                  {row.dimension}
                </td>
                <td className="px-6 py-4 leading-relaxed text-xs">
                  {row.pmInfo === '【等待官方资料核准确认】' ? (
                    <span className="inline-block rounded bg-amber-50 border border-amber-200/50 text-amber-800 px-2.5 py-1 text-[10px] font-medium">
                      待官方原件核对确认后补充
                    </span>
                  ) : (
                    row.pmInfo
                  )}
                </td>
                <td className="px-6 py-4 leading-relaxed text-xs text-gray-500">
                  {row.toCheck}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Source callout */}
      <div className="text-center text-xs text-gray-400 space-y-1">
        <p>表格中的 PM 基础数据均提取自 2026 年销售的大中华跨境版商品外盒标签配料印刷，若官方配方发生变更，请以最新实物标签为准。</p>
        <p>本站杜绝使用诸如“98%细胞吸收率”、“3-5分钟入血”等无确凿原厂书面溯源证明的结论。</p>
      </div>

    </div>
  );
};
