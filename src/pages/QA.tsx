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

type Block =
  | { type: 'p'; lines: string[] }
  | { type: 'ul'; items: string[] }
  | { type: 'ol'; items: string[] }
  | { type: 'h'; level: 1 | 2 | 3; text: string }
  | { type: 'code'; lines: string[] };

const parseMarkdownBlocks = (raw: string): Block[] => {
  const text = (raw ?? '').replace(/\r\n/g, '\n');
  const lines = text.split('\n');
  const blocks: Block[] = [];

  let inCode = false;
  let codeLines: string[] = [];
  let paraLines: string[] = [];
  let ulItems: string[] = [];
  let olItems: string[] = [];

  const flushPara = () => {
    if (paraLines.length) {
      blocks.push({ type: 'p', lines: paraLines });
      paraLines = [];
    }
  };
  const flushUl = () => {
    if (ulItems.length) {
      blocks.push({ type: 'ul', items: ulItems });
      ulItems = [];
    }
  };
  const flushOl = () => {
    if (olItems.length) {
      blocks.push({ type: 'ol', items: olItems });
      olItems = [];
    }
  };
  const flushLists = () => {
    flushUl();
    flushOl();
  };

  for (const line of lines) {
    const trimmed = line.trimEnd();

    if (trimmed.trim() === '```') {
      flushPara();
      flushLists();
      if (!inCode) {
        inCode = true;
        codeLines = [];
      } else {
        inCode = false;
        blocks.push({ type: 'code', lines: codeLines });
        codeLines = [];
      }
      continue;
    }

    if (inCode) {
      codeLines.push(line);
      continue;
    }

    if (!trimmed.trim()) {
      flushPara();
      flushLists();
      continue;
    }

    const heading = trimmed.match(/^(#{1,3})\s+(.+)$/);
    if (heading) {
      flushPara();
      flushLists();
      const level = heading[1].length as 1 | 2 | 3;
      blocks.push({ type: 'h', level, text: heading[2] });
      continue;
    }

    const ul = trimmed.match(/^\-\s+(.+)$/);
    if (ul) {
      flushPara();
      flushOl();
      ulItems.push(ul[1]);
      continue;
    }

    const ol = trimmed.match(/^\d+\.\s+(.+)$/);
    if (ol) {
      flushPara();
      flushUl();
      olItems.push(ol[1]);
      continue;
    }

    if (ulItems.length || olItems.length) {
      if (ulItems.length) ulItems[ulItems.length - 1] = `${ulItems[ulItems.length - 1]}\n${trimmed.trim()}`;
      if (olItems.length) olItems[olItems.length - 1] = `${olItems[olItems.length - 1]}\n${trimmed.trim()}`;
      continue;
    }

    paraLines.push(trimmed);
  }

  if (inCode && codeLines.length) {
    blocks.push({ type: 'code', lines: codeLines });
  }

  flushPara();
  flushLists();
  return blocks;
};

const renderInline = (text: string, keyPrefix: string) => {
  const parts: React.ReactNode[] = [];
  let rest = text ?? '';
  let idx = 0;

  while (rest.length) {
    const bold = rest.match(/\*\*([^*]+?)\*\*/);
    const code = rest.match(/`([^`]+?)`/);

    const boldIndex = bold ? rest.indexOf(bold[0]) : -1;
    const codeIndex = code ? rest.indexOf(code[0]) : -1;

    const nextIndexCandidates = [boldIndex, codeIndex].filter((n) => n >= 0);
    const nextIndex = nextIndexCandidates.length ? Math.min(...nextIndexCandidates) : -1;

    if (nextIndex < 0) {
      parts.push(rest);
      break;
    }

    if (nextIndex > 0) {
      parts.push(rest.slice(0, nextIndex));
      rest = rest.slice(nextIndex);
      continue;
    }

    if (bold && boldIndex === 0) {
      parts.push(
        <strong key={`${keyPrefix}-b-${idx++}`} className="font-semibold">
          {bold[1]}
        </strong>
      );
      rest = rest.slice(bold[0].length);
      continue;
    }

    if (code && codeIndex === 0) {
      parts.push(
        <code
          key={`${keyPrefix}-c-${idx++}`}
          className="rounded bg-black/5 px-1 py-0.5 font-mono text-[12px]"
        >
          {code[1]}
        </code>
      );
      rest = rest.slice(code[0].length);
      continue;
    }

    parts.push(rest[0]);
    rest = rest.slice(1);
  }

  return parts;
};

const renderMarkdown = (content: string, keyPrefix: string) => {
  const blocks = parseMarkdownBlocks(content);
  return (
    <div className="space-y-2">
      {blocks.map((b, i) => {
        const k = `${keyPrefix}-blk-${i}`;
        if (b.type === 'h') {
          const cls =
            b.level === 1
              ? 'text-base font-bold'
              : b.level === 2
                ? 'text-sm font-bold'
                : 'text-sm font-semibold';
          return (
            <div key={k} className={cls}>
              {renderInline(b.text, k)}
            </div>
          );
        }
        if (b.type === 'ul') {
          return (
            <ul key={k} className="list-disc pl-5 space-y-1">
              {b.items.map((it, j) => (
                <li key={`${k}-li-${j}`} className="whitespace-pre-wrap">
                  {renderInline(it, `${k}-li-${j}`)}
                </li>
              ))}
            </ul>
          );
        }
        if (b.type === 'ol') {
          return (
            <ol key={k} className="list-decimal pl-5 space-y-1">
              {b.items.map((it, j) => (
                <li key={`${k}-li-${j}`} className="whitespace-pre-wrap">
                  {renderInline(it, `${k}-li-${j}`)}
                </li>
              ))}
            </ol>
          );
        }
        if (b.type === 'code') {
          return (
            <pre key={k} className="overflow-auto rounded-lg bg-black/80 p-3 text-[12px] text-white/90">
              <code className="whitespace-pre">{b.lines.join('\n')}</code>
            </pre>
          );
        }
        return (
          <p key={k} className="whitespace-pre-wrap">
            {renderInline(b.lines.join('\n'), k)}
          </p>
        );
      })}
    </div>
  );
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
          <span>内容问答</span>
        </h1>
        <p className="text-sm text-gray-500 max-w-3xl">
          本模块为自动生成的内容解读，仅用于信息理解辅助，不构成任何收益承诺、产品功效承诺或官方解释。涉及政策与结算，请以官方最新书面文件与账户结算单为准。
        </p>
      </div>

      <div className="relative bg-white border border-gray-100 rounded-xl shadow-sm overflow-hidden" id="qa-chat-card">
        <button
          type="button"
          id="btn-qa-clear"
          onClick={handleClear}
          className="absolute right-4 top-4 inline-flex items-center space-x-2 rounded-lg border border-gray-200 bg-white/95 px-3 py-2 text-xs font-medium text-gray-600 shadow-sm hover:bg-white"
        >
          <Trash2 className="h-4 w-4" />
          <span className="hidden sm:inline">清空对话</span>
        </button>

        <div className="p-5 sm:p-6 space-y-4" id="qa-messages">
          {messages.map((m, idx) => {
            const isUser = m.role === 'user';
            return (
              <div
                key={`${m.role}-${idx}`}
                className={`flex ${isUser ? 'justify-end' : 'justify-start pr-16 sm:pr-0'}`}
              >
                <div
                  className={`max-w-[92%] sm:max-w-[78%] rounded-2xl px-4 py-3 text-sm leading-relaxed ${
                    isUser
                      ? 'bg-[#1F5D7A] text-white'
                      : 'bg-gray-50 text-[#263238] border border-gray-100'
                  }`}
                >
                  {renderMarkdown(m.content, `${m.role}-${idx}`)}
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
