import React from 'react';
import { WechatConsult } from '../components/WechatConsult';
import { MessageCircle, ShieldCheck, Mail, Info, Clock, AlertCircle } from 'lucide-react';
import { pmConfig } from '../config/pmConfig';

interface ContactProps {
  setCurrentPage: (page: string) => void;
}

export const Contact: React.FC<ContactProps> = ({ setCurrentPage }) => {
  const wechat = pmConfig.wechatContact.value;
  const handlePageClick = (pageId: string) => {
    setCurrentPage(pageId);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="mx-auto max-w-4xl px-4 py-12 sm:px-6 lg:px-8 space-y-10 animate-fadeIn" id="contact-page">
      
      {/* Page Header */}
      <div className="border-b border-gray-100 pb-6 text-center space-y-2">
        <h1 className="text-2xl sm:text-3xl font-bold text-[#12304A]">联系我们</h1>
        <p className="text-sm text-gray-500 max-w-2xl mx-auto">
          如果您对本站整理的数据、模拟器的计算规则仍有不解，或是需要获取最新的产品外包装高清中文标签，可以通过下方方式联系。
        </p>
      </div>

      {/* Main consulting card */}
      <div className="space-y-4" id="consultation-widget-container">
        <div className="text-center space-y-1">
          <h2 className="text-xl font-bold text-[#12304A]">还有问题，可以先聊清楚再决定</h2>
          <p className="text-xs text-gray-400">
            如果你希望了解产品标签、实际费用或奖金规则，可以通过微信咨询。咨询不代表必须购买或加入。
          </p>
        </div>
        <WechatConsult defaultTopic="我想了解产品成分与配料说明" />
      </div>

      {/* Privacy Statements Card */}
      <div className="bg-white border border-gray-100 rounded-xl p-6 sm:p-8 space-y-4 shadow-sm" id="privacy-notice">
        <h3 className="font-sans font-bold text-base text-[#12304A] flex items-center space-x-2 border-b border-gray-50 pb-3">
          <ShieldCheck className="h-5 w-5 text-[#C5A35A]" />
          <span>本站隐私保护声明（无数据库存储说明）</span>
        </h3>

        <div className="space-y-3 text-xs text-gray-600 leading-relaxed" id="privacy-points">
          <p>
            由于本网站属于纯公益、独立第三方的非商业信息整理平台，您的隐私安全是我们的首要关切。关于您的访问和输入，我们郑重说明：
          </p>
          <ul className="list-disc pl-5 space-y-2 text-gray-500">
            <li>
              <strong>第一版无注册要求：</strong>本平台当前版本不提供任何用户账号注册、手机验证码绑定或实名登录。所有浏览行为均完全匿名。
            </li>
            <li>
              <strong>运算数据纯本地留存：</strong>您在【收入情景模拟器】中滑动的人数、设定的人均分、估计的税率等一切数值，<strong>默认均完全保存在您当前设备的浏览器内置沙盒（localStorage）中</strong>。本站不设任何接收并收集数据的后台服务器。
            </li>
            <li>
              <strong>绝不上传任何商业机密：</strong>我们绝不上传、售卖您的团队规划参数、财务支出记录和可能计算出的负债/盈利数据。您可以安心自测，刷新页面后即可通过浏览器本地提取上次结果。
            </li>
            <li>
              <strong>微信咨询属纯自愿：</strong>添加本站客服微信号完全是您的个人自主选择行为。客服老师在微信沟通过程中，严禁索取您的任何银行账号、官方账号密码或敏感人脉数据。如有违规请立即投诉。
            </li>
            <li>
              <strong>第三方外链免责：</strong>在文案中提供的任何 PM 官网、南德质检局或商务部官方网址属于友情链接导航。点击跳转后，适用对应目标站点的隐私协议，与本站无关。
            </li>
          </ul>
        </div>
      </div>

      {/* Responsive Work hours */}
      <div className="bg-gray-50 border border-gray-100 rounded-xl p-5 flex items-start space-x-3" id="service-hours-card">
        <Clock className="h-5 w-5 text-[#1F5D7A] shrink-0 mt-0.5" />
        <div className="space-y-1">
          <h4 className="font-bold text-[#12304A] text-xs font-sans">日常回复时效说明</h4>
          <p className="text-[11px] text-gray-500 leading-normal">
            微信沟通属于义工互助和产品自用经验探讨性质。由于工作日客服老师有日常本职安排，一般会在<strong>每日早 9:00 - 晚 21:00 之间的空闲时段</strong>对留言进行解答。感谢您的理解与温和讨论，不喧哗、不争辩、讲科学、遵客观。
          </p>
        </div>
      </div>

      <div className="bg-white border border-gray-100 rounded-xl p-5 sm:p-6 shadow-sm space-y-3" id="contact-bottom-nav">
        <div className="flex items-center justify-between">
          <h4 className="font-sans font-bold text-sm text-[#12304A]">快捷导航</h4>
          <span className="text-[10px] text-gray-400 font-mono">NAVIGATION</span>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs">
          <button
            onClick={() => handlePageClick('home')}
            className="rounded-lg border border-gray-200 bg-gray-50 px-3 py-2 text-[#12304A] hover:bg-gray-100 transition-colors"
            id="contact-nav-home"
          >
            网站首页
          </button>
          <button
            onClick={() => handlePageClick('about')}
            className="rounded-lg border border-gray-200 bg-gray-50 px-3 py-2 text-[#12304A] hover:bg-gray-100 transition-colors"
            id="contact-nav-about"
          >
            认识PM
          </button>
          <button
            onClick={() => handlePageClick('plan')}
            className="rounded-lg border border-gray-200 bg-gray-50 px-3 py-2 text-[#12304A] hover:bg-gray-100 transition-colors"
            id="contact-nav-plan"
          >
            合作计划
          </button>
          <button
            onClick={() => handlePageClick('simulator')}
            className="rounded-lg border border-gray-200 bg-[#EEF6F8] px-3 py-2 text-[#1F5D7A] hover:bg-[#E3F0F4] transition-colors font-semibold"
            id="contact-nav-simulator"
          >
            收益试算
          </button>
        </div>
      </div>

    </div>
  );
};
