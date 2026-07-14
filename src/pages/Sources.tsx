import React from 'react';
import { BookOpen, ShieldAlert, CheckCircle, Clock, ExternalLink, Info } from 'lucide-react';
import { dataSources } from '../config/pmConfig';

export const Sources: React.FC = () => {
  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8 space-y-12 animate-fadeIn" id="sources-page">
      
      {/* Page Header */}
      <div className="border-b border-gray-100 pb-6 space-y-2">
        <h1 className="text-2xl sm:text-3xl font-bold text-[#12304A]">资料来源、核验状态与合规提示</h1>
        <p className="text-sm text-gray-500">
          我们秉持科研级别的严谨态度，公开全站文案的客观信息源。未经标签印证的传言，一律不作为事实陈述。
        </p>
      </div>

      {/* Trust & Verification statement */}
      <div className="bg-[#EEF6F8] border border-[#1F5D7A]/15 rounded-xl p-6 sm:p-8 space-y-4" id="sources-statement-box">
        <div className="flex items-center space-x-2 text-[#12304A]">
          <Info className="h-5 w-5 text-[#C5A35A]" />
          <h3 className="font-sans font-bold text-base sm:text-lg">关于数据事实的“去水分”声明</h3>
        </div>
        <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
          在直销推广网络中，存在大量被中介层层转述、脱离原始包装、断章取义乃至蓄意编造的数据（如“吸收率98%”、“5分钟修复血管”等）。
        </p>
        <p className="text-xs text-[#263238] font-medium leading-relaxed bg-white p-4 border border-[#1F5D7A]/10 rounded-lg">
          本站郑重声称：<strong>本站所有关于产品的配料配比描述，均直接提取自已经通过国家海关或跨境平台进口的实体产品纸盒、罐体原印标签（Nutrition Facts）。</strong> 凡是没有获得官方原厂书面核准的文件或不具备追溯原始域名的宣称，本站一律作“未证实占位”或“待核实演示”处理，不向读者灌输任何伪科学、伪医学观念。
        </p>
      </div>

      {/* Sources list */}
      <div className="space-y-6" id="sources-list-section">
        <h3 className="font-sans font-bold text-lg text-[#12304A] flex items-center space-x-2">
          <BookOpen className="h-5 w-5 text-[#C5A35A]" />
          <span>文案和数据源对照表</span>
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6" id="sources-grid">
          {dataSources.map((source) => (
            <div 
              key={source.id} 
              id={source.id}
              className="bg-white border border-gray-100 rounded-xl p-5 space-y-3 shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="flex justify-between items-start gap-2">
                <span className="text-[10px] font-bold font-mono uppercase bg-gray-100 text-gray-600 px-2 py-0.5 rounded border border-gray-200">
                  {source.type}
                </span>
                {source.status === 'verified' ? (
                  <span className="inline-flex items-center space-x-1 text-[10px] text-green-700 bg-green-50 border border-green-100 px-2 py-0.5 rounded-full font-sans font-bold">
                    <CheckCircle className="h-3 w-3" />
                    <span>官方印证 / 已核实</span>
                  </span>
                ) : (
                  <span className="inline-flex items-center space-x-1 text-[10px] text-amber-700 bg-amber-50 border border-amber-200/50 px-2 py-0.5 rounded-full font-sans font-bold">
                    <Clock className="h-3 w-3" />
                    <span>演示数据 / 待核准</span>
                  </span>
                )}
              </div>

              <h4 className="font-bold text-sm text-[#12304A]">{source.title}</h4>
              
              <div className="text-[11px] text-gray-500 font-sans space-y-1">
                <p><strong>发布机构：</strong>{source.publisher}</p>
                <p><strong>适用地区：</strong>{source.region}</p>
                <p><strong>发布时间：</strong>{source.publishDate} | <strong>最近核查：</strong>{source.checkDate}</p>
              </div>

              <div className="text-[11px] bg-gray-50 p-2.5 rounded border border-gray-100 text-gray-600 leading-normal">
                <strong>支持的站内表述：</strong>{source.supports}
              </div>

              {source.url && (
                <a 
                  href={source.url} 
                  target="_blank" 
                  rel="noreferrer"
                  className="inline-flex items-center space-x-1 text-xs text-[#1F5D7A] font-semibold hover:underline"
                >
                  <span>访问溯源链接</span>
                  <ExternalLink className="h-3.5 w-3.5" />
                </a>
              )}
            </div>
          ))}
        </div>
      </div>

    </div>
  );
};
