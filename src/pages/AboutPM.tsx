import React from 'react';
import { Calendar, Award, ExternalLink, HelpCircle, Shield, Globe, Landmark } from 'lucide-react';

export const AboutPM: React.FC = () => {
  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8 space-y-12 animate-fadeIn" id="about-pm-page">
      
      {/* 1. Page Header */}
      <div className="border-b border-gray-100 pb-6 space-y-2">
        <h1 className="text-2xl sm:text-3xl font-bold text-[#12304A]">认识 PM-International 公司</h1>
        <p className="text-sm text-gray-500">
          客观整理 PM 的企业背景、生产质控体系和运营主体，拒绝盲信，多方核实。
        </p>
      </div>

      {/* 2. Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8" id="about-main-grid">
        
        {/* Left 8 Columns: Info Blocks */}
        <div className="lg:col-span-8 space-y-8">
          
          {/* Brief Intro with Placeholders */}
          <div className="bg-white border border-gray-100 rounded-xl p-6 shadow-sm space-y-4">
            <h3 className="font-sans font-bold text-lg text-[#12304A] flex items-center space-x-2">
              <Landmark className="h-5 w-5 text-[#C5A35A]" />
              <span>公司基本面及主要经营指标</span>
            </h3>
            <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
              PM-International 是一家总部位于卢森堡的跨国企业，专注于高端营养补充品与化妆品的研发、生产和分销。
            </p>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              <div className="bg-gray-50 border border-gray-100 rounded-lg p-4">
                <span className="text-[10px] text-gray-400 block uppercase font-mono font-bold">全球营业额 / 排名</span>
                <div className="mt-1 space-y-1">
                  <span className="text-sm font-semibold text-[#12304A] font-sans block">DSN Global 100：Top 5（基于 2025 Retail Revenue）</span>
                  <span className="text-xs text-gray-500 font-mono block">2025 Retail Sales：&gt; US$4B（公司披露）</span>
                </div>
                <a
                  href="https://chronicle.lu/category/awards/60645-pm-international-enters-top-5-of-dsn-global-100-ranking"
                  target="_blank"
                  rel="noreferrer"
                  className="text-[10px] text-[#1F5D7A] hover:underline mt-2 inline-flex items-center space-x-1"
                >
                  <span>来源：Chronicle.lu（2026-04-15）</span>
                  <ExternalLink className="h-3 w-3" />
                </a>
              </div>
              <div className="bg-gray-50 border border-gray-100 rounded-lg p-4">
                <span className="text-[10px] text-gray-400 block uppercase font-mono font-bold">卢森堡及欧洲总部</span>
                <span className="text-sm font-semibold text-[#12304A] font-sans mt-1 block">Schengen, Luxembourg</span>
                <a
                  href="https://chronicle.lu/category/awards/60645-pm-international-enters-top-5-of-dsn-global-100-ranking"
                  target="_blank"
                  rel="noreferrer"
                  className="text-[10px] text-[#1F5D7A] hover:underline mt-2 inline-flex items-center space-x-1"
                >
                  <span>来源：Chronicle.lu（2026-04-15）</span>
                  <ExternalLink className="h-3 w-3" />
                </a>
              </div>
              <div className="bg-gray-50 border border-gray-100 rounded-lg p-4">
                <span className="text-[10px] text-gray-400 block uppercase font-mono font-bold">中国大陆经营主体信息</span>
                <span className="text-sm font-semibold text-[#12304A] font-sans mt-1 block">皮埃姆（中国）日用品有限公司</span>
                <span className="text-[10px] text-gray-400 mt-1 block">统一社会信用代码（待核验）：91510100091277880T</span>
                <a
                  href="https://www.gsxt.gov.cn/"
                  target="_blank"
                  rel="noreferrer"
                  className="text-[10px] text-[#1F5D7A] hover:underline mt-2 inline-flex items-center space-x-1"
                >
                  <span>建议核对：国家企业信用信息公示系统</span>
                  <ExternalLink className="h-3 w-3" />
                </a>
                <span className="text-[10px] text-gray-400 mt-1 block">请以公示系统检索结果与最新经营范围为准。</span>
              </div>
              <div className="bg-gray-50 border border-gray-100 rounded-lg p-4">
                <span className="text-[10px] text-gray-400 block uppercase font-mono font-bold">官方网站入口</span>
                <a 
                  href="https://www.pm-international.com/" 
                  target="_blank" 
                  rel="noreferrer"
                  className="text-xs font-semibold text-[#1F5D7A] hover:underline mt-1.5 flex items-center space-x-1"
                >
                  <span>访问 PM 国际官网</span>
                  <ExternalLink className="h-3.5 w-3.5" />
                </a>
                <span className="text-[10px] text-gray-400 mt-1 block">核对最新信息请认准官方域名。</span>
              </div>
            </div>
          </div>

          {/* Timeline of Brand Growth */}
          <div className="bg-white border border-gray-100 rounded-xl p-6 shadow-sm space-y-6">
            <h3 className="font-sans font-bold text-lg text-[#12304A] flex items-center space-x-2">
              <Calendar className="h-5 w-5 text-[#C5A35A]" />
              <span>品牌历史发展里程碑</span>
            </h3>

            {/* Vertial Timeline */}
            <div className="space-y-6 border-l border-gray-100 pl-4 ml-2 relative" id="history-timeline">
              {/* Dot 1 */}
              <div className="relative">
                <div className="absolute -left-[21px] top-1.5 bg-[#C5A35A] rounded-full h-2.5 w-2.5 border-2 border-white"></div>
                <div className="space-y-1">
                  <span className="font-mono text-xs font-bold text-[#C5A35A]">1993 年</span>
                  <h4 className="font-bold text-sm text-[#12304A]">创立伊始</h4>
                  <p className="text-xs text-gray-500 leading-relaxed">
                    PM-International 在德国由 Rolf Sorg 创立，并于同年开始分销 FitLine 营养补充食品。
                  </p>
                </div>
              </div>

              {/* Dot 2 */}
              <div className="relative">
                <div className="absolute -left-[21px] top-1.5 bg-[#1F5D7A] rounded-full h-2.5 w-2.5 border-2 border-white"></div>
                <div className="space-y-1">
                  <span className="font-mono text-xs font-bold text-[#1F5D7A]">2015 年</span>
                  <h4 className="font-bold text-sm text-[#12304A]">卢森堡总部搬迁与全球物流枢纽建设</h4>
                  <p className="text-xs text-gray-500 leading-relaxed">
                    卢森堡国际总部正式投入运营，并加强了其在新加坡的亚太分销枢纽功能，全球销售地区覆盖扩展至数十个国家。
                  </p>
                </div>
              </div>

              {/* Dot 3 */}
              <div className="relative">
                <div className="absolute -left-[21px] top-1.5 bg-gray-300 rounded-full h-2.5 w-2.5 border-2 border-white"></div>
                <div className="space-y-1">
                  <span className="font-mono text-xs font-bold text-gray-400">目前阶段</span>
                  <h4 className="font-bold text-sm text-[#12304A]">大中华区市场开拓</h4>
                  <p className="text-xs text-gray-500 leading-relaxed">
                    [ 待补充官方正式文件确认 ] 大中华区的注册政策、实体办事处、跨境电商和物流配送方案仍以官方最新发布的运营章程为准。
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Production and Quality / Certification */}
          <div className="bg-white border border-gray-100 rounded-xl p-6 shadow-sm space-y-4">
            <h3 className="font-sans font-bold text-lg text-[#12304A] flex items-center space-x-2">
              <Award className="h-5 w-5 text-[#C5A35A]" />
              <span>生产标准与国际第三方检验认证</span>
            </h3>
            <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
              FitLine 产品标称在德国及欧盟进行全产业链质控。以下为产品宣称获得的主要认证，用户可在对应机构官方公开库查询真伪。
            </p>

            <div className="space-y-3 pt-2" id="certification-list">
              {/* Cert 1 */}
              <div className="border-b border-gray-50 pb-3 flex items-start space-x-3">
                <span className="font-mono text-xs font-bold bg-[#EEF6F8] text-[#1F5D7A] px-2 py-0.5 rounded shrink-0">GMP</span>
                <div className="space-y-1">
                  <h4 className="font-bold text-xs text-[#12304A]">欧盟/德国 GMP (良好生产规范) 制药标准</h4>
                  <p className="text-[11px] text-gray-500">
                    表明产品生产在德国按照医药级纯净及质控制度执行，确保无杂质和重金属残留。
                  </p>
                </div>
              </div>

              {/* Cert 2 */}
              <div className="border-b border-gray-50 pb-3 flex items-start space-x-3">
                <span className="font-mono text-xs font-bold bg-[#EEF6F8] text-[#1F5D7A] px-2 py-0.5 rounded shrink-0">Cologne List</span>
                <div className="space-y-1">
                  <h4 className="font-bold text-xs text-[#12304A]">科隆名单 (Cologne List®) 认证</h4>
                  <p className="text-[11px] text-gray-500">
                    全线 FitLine 产品均被纳入科隆名单。科隆名单是针对运动营养品进行兴奋剂物质筛查检测的国际独立公开平台，可保护职业运动员免受禁用成分侵害。
                  </p>
                </div>
              </div>

              {/* Cert 3 */}
              <div className="pb-1 flex items-start space-x-3">
                <span className="font-mono text-xs font-bold bg-amber-50 text-[#C5A35A] px-2 py-0.5 rounded shrink-0">TÜV SÜD</span>
                <div className="space-y-1">
                  <h4 className="font-bold text-xs text-[#12304A]">TÜV SÜD (德国南德意志集团) 独立实验室日常检测</h4>
                  <p className="text-[11px] text-gray-500">
                    产品外包装附带二维码，供消费者直接扫码跳转至 TÜV SÜD 独立数据库，实时查看该批次产品的重金属、农残等理化指标报告。 [ 待补充官方最新溯源码核对 ]
                  </p>
                </div>
              </div>
            </div>
          </div>

        </div>

        {/* Right 4 Columns: Data Checklist */}
        <div className="lg:col-span-4 space-y-6">
          
          {/* Trustworthiness Check Box */}
          <div className="bg-[#EEF6F8] border border-[#1F5D7A]/20 rounded-xl p-6 space-y-4">
            <div className="flex items-center space-x-2 text-[#12304A]">
              <HelpCircle className="h-5 w-5 text-[#C5A35A]" />
              <h3 className="font-sans font-bold text-base">如何判断资料是否可靠？</h3>
            </div>
            <p className="text-xs text-gray-600 leading-relaxed">
              关于直销型产品，网络上的宣传往往存在过度夸张或刻意抹黑。在阅读任何来源的产品或制度介绍时，建议进行以下核对：
            </p>

            <ol className="space-y-3 pt-2 text-xs text-gray-700" id="reliability-steps">
              <li className="flex items-start space-x-2">
                <span className="flex h-5 w-5 items-center justify-center rounded-full bg-[#12304A] text-white font-mono text-[10px] shrink-0 mt-0.5">1</span>
                <div>
                  <strong>是否来自官方网站文件？</strong>
                  <p className="text-gray-500 mt-0.5">拒绝相信任何个人制作的PPT、收益截图或无印章PDF。</p>
                </div>
              </li>
              <li className="flex items-start space-x-2">
                <span className="flex h-5 w-5 items-center justify-center rounded-full bg-[#12304A] text-white font-mono text-[10px] shrink-0 mt-0.5">2</span>
                <div>
                  <strong>是否标明适用市场和日期？</strong>
                  <p className="text-gray-500 mt-0.5">不同国家和地区（如港版、德版、中国跨境版）的成分配料和考核积分可能完全不同，旧文件随时失效。</p>
                </div>
              </li>
              <li className="flex items-start space-x-2">
                <span className="flex h-5 w-5 items-center justify-center rounded-full bg-[#12304A] text-white font-mono text-[10px] shrink-0 mt-0.5">3</span>
                <div>
                  <strong>是否能找到公开的原始链接？</strong>
                  <p className="text-gray-500 mt-0.5">靠谱的表述应能提供官方域名或第三方检测机构的直接查询跳转。</p>
                </div>
              </li>
              <li className="flex items-start space-x-2">
                <span className="flex h-5 w-5 items-center justify-center rounded-full bg-[#12304A] text-white font-mono text-[10px] shrink-0 mt-0.5">4</span>
                <div>
                  <strong>是否与商品包装标签一致？</strong>
                  <p className="text-gray-500 mt-0.5">拿到手的产品外包装，其成分、原产地、制造商名称必须与宣传资料完全对应。</p>
                </div>
              </li>
            </ol>
          </div>

          {/* Compliant Banner */}
          <div className="bg-amber-50 border border-amber-200/50 rounded-xl p-5 text-xs text-amber-950 space-y-2">
            <div className="flex items-center space-x-1.5 text-[#C5A35A] font-semibold">
              <Shield className="h-4 w-4" />
              <span>本站守则 (Our Principle)</span>
            </div>
            <p className="leading-relaxed">
              为了践行合规与透明，本站<strong>不引用</strong>任何非官方的书面数据、野鸡排名、高大上的专利治愈截图，或任何自称“全球第一”的无印证名次。我们建议您始终秉持理性思考与审慎态度。
            </p>
          </div>

        </div>

      </div>

    </div>
  );
};
