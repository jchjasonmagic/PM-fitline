import React from 'react';
import { ShieldCheck, ArrowUpRight } from 'lucide-react';
import { pmConfig } from '../config/pmConfig';

interface FooterProps {
  navigateTo: (page: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ navigateTo }) => {
  const handlePageClick = (pageId: string) => {
    navigateTo(pageId);
  };

  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[#12304A] text-white border-t border-white/10" id="main-footer">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8" id="footer-top-grid">
          {/* Column 1: Identity & Purpose */}
          <div className="space-y-4" id="footer-col-identity">
            <div className="flex items-center space-x-2">
              <div className="flex h-8 w-8 items-center justify-center rounded bg-[#C5A35A] text-[#12304A] font-bold text-sm">
                PM
              </div>
              <span className="font-sans font-semibold tracking-tight text-lg">PM健康与事业指南</span>
            </div>
            <p className="text-sm text-white/70 leading-relaxed max-w-sm">
              我们致力于用简单、客观、理性且完全透明的方式，帮助您全方位评估PM FitLine产品配料成分及合作奖金结算机制。
            </p>
            <div className="inline-flex items-center space-x-1.5 rounded-full bg-white/5 border border-white/10 px-3 py-1 text-xs text-white/80">
              <ShieldCheck className="h-3.5 w-3.5 text-[#C5A35A]" />
              <span>第三方独立说明页面</span>
            </div>
          </div>

          {/* Column 2: Navigation Links */}
          <div id="footer-col-links">
            <h3 className="font-sans font-semibold text-white mb-4 text-sm tracking-wider uppercase">快捷指南导航</h3>
            <div className="grid grid-cols-2 gap-2 text-sm text-white/70">
              <button onClick={() => handlePageClick('home')} className="text-left hover:text-[#C5A35A] py-1 transition-colors">网站首页</button>
              <button onClick={() => handlePageClick('about')} className="text-left hover:text-[#C5A35A] py-1 transition-colors">认识公司</button>
              <button onClick={() => handlePageClick('products')} className="text-left hover:text-[#C5A35A] py-1 transition-colors">产品系列</button>
              <button onClick={() => handlePageClick('compare')} className="text-left hover:text-[#C5A35A] py-1 transition-colors">对比指南</button>
              <button onClick={() => handlePageClick('plan')} className="text-left hover:text-[#C5A35A] py-1 transition-colors">合作计划</button>
              <button onClick={() => handlePageClick('simulator')} className="text-left hover:text-[#C5A35A] py-1 transition-colors">收益试算</button>
              <button onClick={() => handlePageClick('qa')} className="text-left hover:text-[#C5A35A] py-1 transition-colors">内容问答</button>
              <button onClick={() => handlePageClick('faq')} className="text-left hover:text-[#C5A35A] py-1 transition-colors">常见问题</button>
              <button onClick={() => handlePageClick('sources')} className="text-left hover:text-[#C5A35A] py-1 transition-colors">资料来源</button>
              <button onClick={() => handlePageClick('contact')} className="text-left hover:text-[#C5A35A] py-1 transition-colors">联系咨询</button>
            </div>
          </div>

          {/* Column 3: Contact & Meta info */}
          <div className="space-y-4" id="footer-col-meta">
            <h3 className="font-sans font-semibold text-white text-sm tracking-wider uppercase">平台状态与计划</h3>
            <div className="text-xs text-white/60 space-y-2 font-mono">
              <div>
                <span className="text-white/40 block">测算模型版本</span>
                <span className="text-[#C5A35A]">{pmConfig.planVersion.value} ({pmConfig.effectiveDate.value})</span>
              </div>
              <div>
                <span className="text-white/40 block">微信咨询昵称</span>
                <span className="text-white/80 font-sans">{pmConfig.wechatContact.value.nickname}</span>
              </div>
              <div>
                <span className="text-white/40 block">咨询联系微信号</span>
                <span className="text-white/80 select-all font-mono">{pmConfig.wechatContact.value.account}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Core Disclaimer Section */}
        <div className="border-t border-white/10 pt-8" id="footer-disclaimer-container">
          <div className="bg-white/5 border border-white/10 rounded-lg p-4 sm:p-6 text-xs text-white/80 leading-relaxed space-y-2">
            <div className="flex items-center space-x-2 text-[#C5A35A] font-semibold mb-2">
              <ShieldCheck className="h-4 w-4" />
              <span className="font-sans uppercase">核心合规与免责声明 (Important Disclaimer)</span>
            </div>
            <p id="footer-disclaimer-text">
              {pmConfig.disclaimer.value}
            </p>
            <p>
              产品说明、食用效果、成分表述等均整理自公开资料及商品包装，不能代替医生的诊断或治疗。本网站属于个人信息整理页面，<strong>并非PM-International官方网站</strong>。您在阅读或进行计算时，应当充分认识到直销与合作伙伴计划中存在销售成本、人际流动性、退款及汇率等多重不确定性。最终制度及结算结果，请务必以产品标签、PM官方最新书面文件以及您账户的实际结算账单为准。
            </p>
          </div>
        </div>

        {/* Bottom copyright */}
        <div className="mt-8 border-t border-white/5 pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-white/40" id="footer-bottom-bar">
          <p>© {currentYear} PM健康与事业指南. All Rights Reserved. 本站为独立第三方研究整理，与PM官方无资本或运营关联。</p>
          <div className="mt-4 sm:mt-0 flex space-x-4">
            <button onClick={() => handlePageClick('sources')} className="hover:text-white flex items-center space-x-1">
              <span>资料核对来源</span>
              <ArrowUpRight className="h-3 w-3" />
            </button>
            <button onClick={() => handlePageClick('contact')} className="hover:text-white flex items-center space-x-1">
              <span>联系咨询</span>
              <ArrowUpRight className="h-3 w-3" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
