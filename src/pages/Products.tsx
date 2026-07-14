import React from 'react';
import { Layers, Clock, AlertTriangle, ShieldCheck, HelpCircle, Check, Info } from 'lucide-react';

export const Products: React.FC = () => {
  const productsList = [
    {
      id: 'activize',
      name: 'FitLine Activize Oxyplus',
      commonName: '小红 / 激活氧',
      category: '晨间草本微循环营养冲饮',
      ingredients: '葡萄糖、瓜拉纳提取物粉末（提供天然咖啡因）、柠檬酸、甜菜根红、烟酸、泛酸钙、维生素B1、B2、B6、B12、叶酸、维生素C、甜菊糖苷。',
      nutrition: '每份提供高浓度复合维生素B群（帮助能量代谢）、天然果糖、微量元素。',
      timing: '晨间空腹或上午饮用最佳，不建议下午4点后饮用以免影响睡眠质量。',
      portion: '每次1.67g（约包装附带小匙3勺），兑入40ml-100ml的常温水（30℃以下）中，可单独冲调或与Basics混合。',
      warning: '【天然咖啡因与烟酸潮红反应】本品含天然咖啡因。对咖啡因极度敏感者、孕妇、哺乳期妇女、未成年人及有心血管病史者应严格控量。食用后由于富含烟酸，可能在3-15分钟内引发皮肤发热、泛红、轻微刺痒，属正常植物微循环激活的生理反应，一般在半小时内自然褪去，多喝常温水可缓解。',
      suitability: '【适宜】日常易疲劳、高强度脑力工作者、运动健身人群、维生素B群缺乏者。【不适宜】婴幼儿、孕妇、哺乳期、对瓜拉纳或咖啡因重度敏感者。',
      labelSource: '商品原产国（德国）外包装标签 / 官方FitLine手册',
      updatedAt: '2026-07',
      bgBorder: 'border-red-200',
      tagColor: 'bg-red-50 text-red-600',
    },
    {
      id: 'basics',
      name: 'FitLine Basics',
      commonName: '大白 / 基础纤维',
      category: '肠道生态平衡与膳食营养基础',
      ingredients: '燕麦纤维、豌豆纤维、苹果纤维、瓜尔胶、阿拉伯胶、西印度樱桃粉、复合果蔬浓缩提取物、活性乳酸菌（罗伊氏乳杆菌、嗜酸乳杆菌）、多种消化酶、维生素C、维生素E、β-胡萝卜素、甜菊糖苷。',
      nutrition: '富含多种可溶性及不可溶性天然果蔬膳食纤维、数亿级活性益生菌、强效抗氧化群（维C/维E）。',
      timing: '早晨空腹，与Activize（小红）混合冲泡，作为每日晨间营养早餐伴侣。',
      portion: '每日一次，每次1袋（约12g），加入约200ml常温纯净水中。充分搅拌溶解，并于泡好后5-10分钟内饮毕（膳食纤维久置会吸水变稠）。',
      warning: '【麸质与谷物过敏原】本品含有燕麦等麸质谷物成分。已知对麸质过敏者应避免使用。部分肠胃极度敏感或纤维摄取偏少人群，初期使用可能出现暂时性腹胀、排气增多等肠道菌群调节现象，建议从半量开始循序渐进使用。',
      suitability: '【适宜】膳食纤维摄入不足者、经常外卖、需调节肠道微生态平衡者。【不适宜】严重麸质过敏者、肠梗阻患者、婴幼儿。',
      labelSource: '商品原产国（德国）外包装标签 / 官方FitLine手册',
      updatedAt: '2026-07',
      bgBorder: 'border-green-200',
      tagColor: 'bg-green-50 text-green-600',
    },
    {
      id: 'restorate',
      name: 'FitLine Restorate Exotic / Citrus',
      commonName: '小白 / 矿世夜护',
      category: '晚间多重矿物质与碱性微量元素平衡',
      ingredients: '柠檬酸、碳酸钙、碳酸镁、乳酸钙、柠檬酸钾、乳酸锌、乳酸铁、葡萄糖酸铜、铬、硒、维生素D3、甜菊糖苷、天然橙/柠檬风味提取物。',
      nutrition: '科学配比的钙、镁、钾、锌、铁、铜、铬、硒及辅促吸收的维生素D3等微量矿物质。',
      timing: '晚间睡前约30-60分钟小口慢饮。不建议运动或剧烈活动中饮用。',
      portion: '每日一次，每次1袋（约6.7g），倒入250ml常温纯净水中。<strong>核心要点：</strong>倒入后会发生中和起泡。必须充分搅拌，静置约1-2分钟，直到微小气泡完全消失、溶液变澄清后再小口缓慢饮用。',
      warning: '【严禁干吞】由于含有高比例矿物质碳酸盐，本粉末接触水分会发生起泡反应，<strong>绝对禁止直接干吞粉末</strong>，否则可能在喉咙和食道引发灼烧或呛咳风险。严重肾功能不全、尿毒症等排矿障碍患者不宜自用，需遵医嘱。',
      suitability: '【适宜】夜间睡眠质量欠佳、高强度运动后电解质流失、矿物质缺乏者。【不适宜】重度肾脏疾病或透析患者、婴幼儿。',
      labelSource: '商品原产国（德国）外包装标签 / 官方FitLine手册',
      updatedAt: '2026-07',
      bgBorder: 'border-blue-200',
      tagColor: 'bg-blue-50 text-blue-600',
    },
  ];

  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8 space-y-12 animate-fadeIn" id="products-page">
      
      {/* 1. Top Section */}
      <div className="border-b border-gray-100 pb-6 space-y-3">
        <h1 className="text-2xl sm:text-3xl font-bold text-[#12304A]">三合一基础套（FitLine Core Suite）</h1>
        <p className="text-sm text-gray-500 max-w-3xl leading-relaxed">
          三合一基础套由三个不同时间使用的营养补充产品组成。<strong>不同市场（如德国原装、港版、亚太跨境版）的配方比例、外包装文案和标签可能存在客观差异</strong>，请始终以您收到的实体包装上的原厂成分表为准。
        </p>
      </div>

      {/* 2. Timeline of Intake */}
      <div className="bg-[#EEF6F8] rounded-xl p-6 sm:p-8 space-y-4" id="daily-timeline-section">
        <div className="flex items-center space-x-2 text-[#12304A]">
          <Clock className="h-5 w-5 text-[#C5A35A]" />
          <h3 className="font-sans font-bold text-base sm:text-lg">“一天如何饮用”时间轴指引</h3>
        </div>
        <p className="text-xs text-gray-600 leading-normal">
          在日常饮用中，建议配合人体的作息规律，合理排布营养补充时机，无需死记硬背复杂流程：
        </p>

        {/* Timeline graphics */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2" id="timeline-cards">
          {/* Morning */}
          <div className="bg-white border border-gray-100 rounded-lg p-5 flex space-x-4">
            <div className="flex-shrink-0 flex flex-col items-center">
              <span className="text-[#C5A35A] font-bold text-xs uppercase font-mono tracking-wider">AM</span>
              <div className="h-10 w-10 rounded-full bg-[#FFF4E5] flex items-center justify-center font-bold text-sm text-[#C5A35A]">晨</div>
            </div>
            <div className="space-y-1.5">
              <h4 className="font-bold text-sm text-[#12304A]">晨起空腹：Activize（小红）+ Basics（大白）</h4>
              <p className="text-xs text-gray-500 leading-relaxed">
                起床后用250ml常温水（不超过30℃，避免灭活活性乳酸菌与酶），将1袋大白和3小勺小红一同倒入，搅拌均匀后在10分钟内小口喝完。此举帮助开启晨间胃肠微生态与维生素补充。
              </p>
            </div>
          </div>

          {/* Night */}
          <div className="bg-white border border-gray-100 rounded-lg p-5 flex space-x-4">
            <div className="flex-shrink-0 flex flex-col items-center">
              <span className="text-[#1F5D7A] font-bold text-xs uppercase font-mono tracking-wider">PM</span>
              <div className="h-10 w-10 rounded-full bg-[#EEF6F8] flex items-center justify-center font-bold text-sm text-[#1F5D7A]">晚</div>
            </div>
            <div className="space-y-1.5">
              <h4 className="font-bold text-sm text-[#12304A]">睡前一小时：Restorate（小白）</h4>
              <p className="text-xs text-gray-500 leading-relaxed">
                睡前一小时，用250ml常温水冲泡1袋小白，<strong>务必在杯中用筷子/勺子充分搅拌使其碳酸中和反应起泡完成</strong>，静置1分钟，见水质变清澈、气泡完全平息后再慢饮，不可像喝水一样急促灌下。
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* 3. Detailed Products */}
      <div className="space-y-8" id="products-list-wrapper">
        <h3 className="font-sans font-bold text-xl text-[#12304A]">三款产品单体结构拆解</h3>
        
        <div className="grid grid-cols-1 gap-8">
          {productsList.map((prod) => (
            <div 
              key={prod.id} 
              id={`prod-card-${prod.id}`}
              className={`border-t-4 ${prod.bgBorder} bg-white border border-gray-100 rounded-xl p-6 sm:p-8 space-y-4 shadow-sm`}
            >
              {/* Product Header */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-gray-50 pb-4">
                <div>
                  <span className={`text-[10px] font-bold uppercase font-mono px-2 py-0.5 rounded ${prod.tagColor}`}>
                    {prod.commonName}
                  </span>
                  <h3 className="text-xl font-bold text-[#12304A] mt-1.5 font-sans">{prod.name}</h3>
                  <p className="text-xs text-gray-500">{prod.category}</p>
                </div>
                <div className="text-right text-[11px] text-gray-400 font-mono">
                  <span>信息源：{prod.labelSource} | 2026</span>
                </div>
              </div>

              {/* Data Rows */}
              <div className="grid grid-cols-1 md:grid-cols-12 gap-4 text-xs">
                
                {/* Left col of data */}
                <div className="md:col-span-8 space-y-4">
                  <div>
                    <strong className="text-[#12304A] block mb-1">主要配料（依据标签）</strong>
                    <p className="text-gray-600 leading-relaxed">{prod.ingredients}</p>
                  </div>
                  <div>
                    <strong className="text-[#12304A] block mb-1">营养成分定位</strong>
                    <p className="text-gray-600 leading-relaxed">{prod.nutrition}</p>
                  </div>
                  <div>
                    <strong className="text-[#12304A] block mb-1">建议食用时间与量</strong>
                    <div className="space-y-1 text-gray-600">
                      <p><strong>时间：</strong>{prod.timing}</p>
                      <p><strong>用量：</strong>{prod.portion}</p>
                    </div>
                  </div>
                </div>

                {/* Right col of data - Warn & suitability */}
                <div className="md:col-span-4 bg-gray-50 border border-gray-100 rounded-lg p-4 space-y-3">
                  <div className="space-y-1">
                    <span className="text-red-700 font-bold flex items-center space-x-1">
                      <AlertTriangle className="h-3.5 w-3.5" />
                      <span>过敏原与安全提醒</span>
                    </span>
                    <p className="text-[11px] text-gray-500 leading-relaxed">{prod.warning}</p>
                  </div>
                  <div className="border-t border-gray-200/50 pt-2.5 space-y-1">
                    <span className="text-[#12304A] font-bold flex items-center space-x-1">
                      <Info className="h-3.5 w-3.5" />
                      <span>适用与不适宜人群</span>
                    </span>
                    <p className="text-[11px] text-gray-500 leading-relaxed">{prod.suitability}</p>
                  </div>
                </div>

              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 4. Crucial Instructions ("使用前请注意") */}
      <div className="bg-red-50 border border-red-200 rounded-xl p-6 sm:p-8 space-y-4" id="vital-cautions-box">
        <div className="flex items-center space-x-2 text-red-800">
          <AlertTriangle className="h-5 w-5" />
          <h3 className="font-sans font-bold text-base sm:text-lg">自用体验前的核心守则（安全合规提醒）</h3>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs text-red-950" id="caution-points">
          <div className="flex items-start space-x-2">
            <Check className="h-4 w-4 text-red-700 shrink-0 mt-0.5" />
            <p><strong>阅读产品标签：</strong>首次开封前，请务必仔细通读瓶身、纸袋等原装印刷标签中的配料、制造地及保质期。不同批次可能配料有微调。</p>
          </div>
          <div className="flex items-start space-x-2">
            <Check className="h-4 w-4 text-red-700 shrink-0 mt-0.5" />
            <p><strong>防范配料过敏：</strong>若已知自身对麸质、特定果蔬、甜味剂或瓜拉纳过敏，切勿抱持侥幸心理使用。发生任何皮疹或持续腹泻，应立即停止饮用。</p>
          </div>
          <div className="flex items-start space-x-2">
            <Check className="h-4 w-4 text-red-700 shrink-0 mt-0.5" />
            <p><strong>特定人群咨询医生：</strong>孕期、哺乳期、未成年人、重度肾脏疾病、心脏病患者或正在服用抗凝药/降糖药等临床药品的患者，请务必在饮用前咨询主管医生意见。</p>
          </div>
          <div className="flex items-start space-x-2">
            <Check className="h-4 w-4 text-red-700 shrink-0 mt-0.5" />
            <p><strong>不能替代药物与饮食：</strong>营养膳食补充品是用于均衡身体素养的，<strong>不能替代日常多元化的均衡膳食，本品绝对不是药品，没有任何治疗或治愈疾病的功能。</strong></p>
          </div>
        </div>
      </div>

    </div>
  );
};
