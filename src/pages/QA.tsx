import React, { useMemo, useState } from 'react';
import { Bot, Send, Trash2, AlertCircle } from 'lucide-react';

type ChatRole = 'user' | 'assistant';

type ChatMessage = {
  role: ChatRole;
  content: string;
};

const buildApiUrl = (base: string | undefined) => {
  const raw = (base ?? '').trim();
  if (!raw) return '/api/ask';
  return `${raw.replace(/\/+$/, '')}/api/ask`;
};

export const QA: React.FC = () => {
  const apiUrl = useMemo(() => buildApiUrl(import.meta.env.VITE_QA_API_BASE), []);
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      role: 'assistant',
      content:
        '你可以在这里提问与 PM FitLine 产品、合作计划、积分口径与本站内容相关的问题。我会尽量给出中立、可核对的解释；涉及结算与政策请以官方最新文件与账户结算单为准。',
    },
  ]);
  const [input, setInput] = useState('');
  const [isSending, setIsSending] = useState(false);
  const [error, setError] = useState<string>('');

  const handleClear = () => {
    setMessages([
      {
        role: 'assistant',
        content:
          '你可以在这里提问与 PM FitLine 产品、合作计划、积分口径与本站内容相关的问题。我会尽量给出中立、可核对的解释；涉及结算与政策请以官方最新文件与账户结算单为准。',
      },
    ]);
    setInput('');
    setError('');
  };

  const sendQuestion = async () => {
    const question = input.trim();
    if (!question || isSending) return;

    setError('');
    setIsSending(true);

    const nextMessages: ChatMessage[] = [...messages, { role: 'user', content: question }];
    setMessages(nextMessages);
    setInput('');

    try {
      const history = nextMessages
        .filter((m) => m.role === 'user' || m.role === 'assistant')
        .slice(-12)
        .map((m) => ({ role: m.role, content: m.content }));

      const resp = await fetch(apiUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ question, history }),
      });

      const data = (await resp.json()) as { answer?: string; error?: string };
      if (!resp.ok) {
        throw new Error(data.error || `请求失败 (${resp.status})`);
      }
      const answer = (data.answer ?? '').trim();
      if (!answer) {
        throw new Error('服务返回为空');
      }

      setMessages((prev) => [...prev, { role: 'assistant', content: answer }]);
    } catch (e) {
      const msg = e instanceof Error ? e.message : '请求失败';
      setError(msg);
      setMessages((prev) => [
        ...prev,
        {
          role: 'assistant',
          content: '这次没有成功获取回答。你可以稍后再试，或换一种问法。',
        },
      ]);
    } finally {
      setIsSending(false);
    }
  };

  return (
    <div className="mx-auto max-w-5xl px-4 py-12 sm:px-6 lg:px-8 space-y-8 animate-fadeIn" id="qa-page">
      <div className="border-b border-gray-100 pb-6 space-y-2">
        <h1 className="text-2xl sm:text-3xl font-bold text-[#12304A] flex items-center space-x-2">
          <Bot className="h-6 w-6 text-[#C5A35A]" />
          <span>AI 问答</span>
        </h1>
        <p className="text-sm text-gray-500 max-w-3xl">
          本模块由 AI 生成内容，仅用于信息理解辅助，不构成任何收益承诺、产品功效承诺或官方解释。涉及政策与结算，请以官方最新书面文件与账户结算单为准。
        </p>
      </div>

      <div className="bg-white border border-gray-100 rounded-xl shadow-sm overflow-hidden" id="qa-chat-card">
        <div className="p-5 sm:p-6 border-b border-gray-100 flex items-center justify-between">
          <div className="text-sm text-gray-600">
            接口：<span className="font-mono text-xs text-gray-500">{apiUrl}</span>
          </div>
          <button
            type="button"
            id="btn-qa-clear"
            onClick={handleClear}
            className="inline-flex items-center space-x-2 rounded-lg border border-gray-200 bg-white px-3 py-2 text-xs font-medium text-gray-600 hover:bg-gray-50"
          >
            <Trash2 className="h-4 w-4" />
            <span>清空对话</span>
          </button>
        </div>

        <div className="p-5 sm:p-6 space-y-4" id="qa-messages">
          {messages.map((m, idx) => {
            const isUser = m.role === 'user';
            return (
              <div
                key={`${m.role}-${idx}`}
                className={`flex ${isUser ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[92%] sm:max-w-[78%] rounded-2xl px-4 py-3 text-sm leading-relaxed whitespace-pre-wrap ${
                    isUser
                      ? 'bg-[#1F5D7A] text-white'
                      : 'bg-gray-50 text-[#263238] border border-gray-100'
                  }`}
                >
                  {m.content}
                </div>
              </div>
            );
          })}

          {error && (
            <div className="flex items-start space-x-2 rounded-lg border border-red-200 bg-red-50 p-3 text-xs text-red-700">
              <AlertCircle className="h-4 w-4 shrink-0 mt-0.5" />
              <div>
                <div className="font-semibold">请求失败</div>
                <div className="font-mono text-[11px] mt-1">{error}</div>
              </div>
            </div>
          )}
        </div>

        <div className="p-5 sm:p-6 border-t border-gray-100 bg-gray-50/50" id="qa-input-bar">
          <div className="flex flex-col sm:flex-row gap-3">
            <textarea
              id="qa-input"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="输入你想问的问题，例如：月度有效积分怎么理解？模拟器里的活跃率如何影响计算？"
              className="flex-1 min-h-[44px] sm:min-h-[48px] max-h-40 resize-y rounded-xl border border-gray-200 bg-white px-3 py-2.5 text-base sm:text-sm leading-relaxed focus:outline-none focus:border-[#1F5D7A]"
              disabled={isSending}
            />
            <button
              type="button"
              id="btn-qa-send"
              onClick={sendQuestion}
              disabled={isSending || !input.trim()}
              className="inline-flex items-center justify-center space-x-2 rounded-xl bg-[#C5A35A] px-4 py-3 text-sm font-bold text-[#12304A] shadow-sm hover:bg-[#b08e45] disabled:opacity-60 disabled:cursor-not-allowed"
            >
              <Send className="h-4 w-4" />
              <span>{isSending ? '生成中…' : '发送'}</span>
            </button>
          </div>
          <div className="text-[11px] text-gray-500 mt-2">
            提示：尽量描述清楚你关心的页面、参数名或口径关键词，回答会更准确。
          </div>
        </div>
      </div>
    </div>
  );
};

