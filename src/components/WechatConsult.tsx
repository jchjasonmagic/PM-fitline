import React, { useState } from 'react';
import { Copy, Check, MessageSquare, Shield, Send } from 'lucide-react';
import { pmConfig } from '../config/pmConfig';

export const WechatConsult: React.FC<{ defaultTopic?: string }> = ({ defaultTopic = '' }) => {
  const [copied, setCopied] = useState(false);
  const [selectedTopic, setSelectedTopic] = useState(defaultTopic);
  const [isSent, setIsSent] = useState(false);
  const [customText, setCustomText] = useState('');

  const wechat = pmConfig.wechatContact.value;

  const handleCopy = () => {
    navigator.clipboard.writeText(wechat.account);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleTopicClick = (topic: string) => {
    setSelectedTopic(topic);
    setIsSent(false);
  };

  const handleSendPrompt = () => {
    setIsSent(true);
  };

  return (
    <div className="rounded-xl border border-dashed border-[#C5A35A]/50 bg-[#EEF6F8] p-6 shadow-sm" id="wechat-consult-box">
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
        
        {/* Left Side: Text and Copy */}
        <div className="md:col-span-8 space-y-4">
          <div className="flex items-center space-x-2 text-[#12304A]">
            <MessageSquare className="h-5 w-5 text-[#C5A35A]" />
            <h3 className="font-sans font-bold text-lg">还有疑惑？聊清楚，更踏实</h3>
          </div>
          <p className="text-sm text-[#263238]/90 leading-relaxed">
            任何关于营养成分、持续成本、活跃条件或佣金系数的疑问，均可通过微信联系咨询。我们将为您提供客观、中立的解答，不进行强制推销，尊重您的自主选择。
          </p>

          {/* Copy actions */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 pt-1">
            <div className="flex items-center justify-between rounded-lg bg-white border border-[#1F5D7A]/20 px-3 py-2.5 shadow-inner">
              <div className="flex flex-col mr-6">
                <span className="text-[10px] text-gray-400 font-mono">微信号 ID</span>
                <span className="text-sm font-semibold font-mono text-[#12304A] select-all">{wechat.account}</span>
              </div>
              <button
                id="btn-copy-wechat"
                onClick={handleCopy}
                className="flex items-center space-x-1 rounded-md bg-[#EEF6F8] px-2.5 py-1.5 text-xs text-[#12304A] hover:bg-[#1F5D7A]/10 transition-colors"
                title="复制微信号"
              >
                {copied ? (
                  <>
                    <Check className="h-3.5 w-3.5 text-green-600" />
                    <span className="text-green-600 font-medium">已复制</span>
                  </>
                ) : (
                  <>
                    <Copy className="h-3.5 w-3.5" />
                    <span>复制</span>
                  </>
                )}
              </button>
            </div>
            
            <div className="flex flex-col justify-center text-xs text-gray-500">
              <p className="font-medium">客服：{wechat.nickname}</p>
              <p className="text-[10px]">咨询不代表必须购买，理性讨论</p>
            </div>
          </div>

          {/* Topics selection */}
          <div className="space-y-2 pt-2">
            <span className="text-xs text-gray-500 font-medium block">您想咨询哪方面？</span>
            <div className="flex flex-wrap gap-2">
              <button
                id="btn-consult-topic-product"
                onClick={() => handleTopicClick('我想了解产品成分与配料说明')}
                className={`rounded-full px-3 py-1.5 text-xs font-medium border transition-all ${
                  selectedTopic === '我想了解产品成分与配料说明'
                    ? 'bg-[#1F5D7A] text-white border-transparent shadow-sm'
                    : 'bg-white text-gray-600 border-gray-200 hover:border-[#1F5D7A] hover:bg-[#EEF6F8]'
                }`}
              >
                我想了解产品
              </button>
              <button
                id="btn-consult-topic-plan"
                onClick={() => handleTopicClick('我想了解合作计划规则与算分规则')}
                className={`rounded-full px-3 py-1.5 text-xs font-medium border transition-all ${
                  selectedTopic === '我想了解合作计划规则与算分规则'
                    ? 'bg-[#1F5D7A] text-white border-transparent shadow-sm'
                    : 'bg-white text-gray-600 border-gray-200 hover:border-[#1F5D7A] hover:bg-[#EEF6F8]'
                }`}
              >
                我想了解合作计划
              </button>
            </div>
          </div>

          {/* Custom chat simulator just to be engaging */}
          {selectedTopic && (
            <div className="bg-white border border-[#1F5D7A]/10 rounded-lg p-3 space-y-2 animate-fadeIn">
              <div className="flex items-start space-x-2">
                <span className="text-xs font-bold text-[#1F5D7A] bg-[#EEF6F8] p-1 rounded font-mono">准备发送的信息:</span>
                <p className="text-xs text-[#263238] italic font-medium py-1">“你好，我已阅读了透明了解中心的内容，{selectedTopic}。”</p>
              </div>
              <div className="flex items-center space-x-2">
                <input 
                  type="text" 
                  placeholder="可补充其他问题（如：多久发货、如何维持自动购...）" 
                  value={customText}
                  onChange={(e) => setCustomText(e.target.value)}
                  className="flex-1 text-xs border border-gray-200 rounded px-2.5 py-1.5 focus:outline-none focus:border-[#1F5D7A]"
                  disabled={isSent}
                />
                <button
                  id="btn-simulate-send"
                  onClick={handleSendPrompt}
                  className="bg-[#C5A35A] hover:bg-[#b08e45] text-[#12304A] px-3 py-1.5 rounded text-xs font-semibold flex items-center space-x-1 transition-colors"
                  disabled={isSent}
                >
                  {isSent ? (
                    <>
                      <Check className="h-3 w-3" />
                      <span>已准备</span>
                    </>
                  ) : (
                    <>
                      <Send className="h-3 w-3" />
                      <span>确认</span>
                    </>
                  )}
                </button>
              </div>
              {isSent && (
                <div className="text-[11px] text-green-700 bg-green-50 p-2 rounded-md border border-green-200/50">
                  已为您复制咨询话题。请<strong>点击上方【复制】按钮</strong>复制微信号 <strong>{wechat.account}</strong> 并在微信中添加，即可将上述信息发送给客服老师，获得更快速的解答。
                </div>
              )}
            </div>
          )}
        </div>

        {/* Right Side: QR code placeholder */}
        <div className="md:col-span-4 flex flex-col items-center justify-center p-3" id="wechat-qr-wrapper">
          <div className="relative border-4 border-white bg-white shadow-md rounded-xl p-4 w-40 h-40 flex flex-col items-center justify-center">
            {/* SVG styling to look like a beautiful, premium tech QR code placeholder */}
            <div className="absolute inset-2 border border-gray-100 flex flex-col items-center justify-center rounded-lg bg-gray-50/50">
              <div className="grid grid-cols-3 gap-1 w-24 h-24 p-2 opacity-80">
                <div className="border-4 border-[#12304A] w-6 h-6 rounded-sm"></div>
                <div className="flex items-center justify-center text-[8px] font-mono text-gray-400 font-bold">QR</div>
                <div className="border-4 border-[#12304A] w-6 h-6 rounded-sm"></div>
                <div className="flex items-center justify-center text-[6px] font-mono text-gray-300">WECHAT</div>
                <div className="bg-[#C5A35A] w-4 h-4 m-1 rounded-sm self-center justify-self-center"></div>
                <div className="flex items-center justify-center text-[6px] font-mono text-gray-300">PM</div>
                <div className="border-4 border-[#12304A] w-6 h-6 rounded-sm"></div>
                <div className="flex items-center justify-center text-[6px] font-mono text-gray-300">INFO</div>
                <div className="border-4 border-[#C5A35A] w-6 h-6 rounded-sm"></div>
              </div>
              <span className="text-[10px] font-semibold text-gray-500 mt-1">微信号二维码</span>
            </div>
          </div>
          <span className="text-xs text-gray-500 font-sans mt-3 text-center">
            扫一扫 或 复制微信号添加
          </span>
        </div>
      </div>
    </div>
  );
};
