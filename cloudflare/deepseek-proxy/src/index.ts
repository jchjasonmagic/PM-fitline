type Env = {
  DEEPSEEK_API_KEY: string;
  DEEPSEEK_API_BASE?: string;
  DEEPSEEK_MODEL?: string;
  ALLOW_ORIGIN?: string;
  RATE_LIMIT_PER_MINUTE?: number | string;
  RATE_LIMIT_PER_DAY?: number | string;
  RATE_LIMITER: DurableObjectNamespace;
};

type IncomingMessage = { role: 'user' | 'assistant'; content: string };

type DurableObjectStorage = {
  get<T = unknown>(key: string): Promise<T | undefined>;
  put(key: string, value: unknown): Promise<void>;
};

type DurableObjectState = {
  storage: DurableObjectStorage;
};

type DurableObjectStub = {
  fetch(input: RequestInfo | URL, init?: RequestInit): Promise<Response>;
};

type DurableObjectNamespace = {
  idFromName(name: string): unknown;
  get(id: unknown): DurableObjectStub;
};

const json = (data: unknown, init?: ResponseInit) =>
  new Response(JSON.stringify(data), {
    ...init,
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
      ...(init?.headers ?? {}),
    },
  });

const corsHeaders = (origin: string) => ({
  'Access-Control-Allow-Origin': origin,
  'Access-Control-Allow-Methods': 'POST,OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type,Authorization',
  'Access-Control-Max-Age': '86400',
});

const getClientIp = (request: Request) => {
  const direct = request.headers.get('cf-connecting-ip')?.trim();
  if (direct) return direct;
  const forwarded = request.headers.get('x-forwarded-for')?.split(',')?.[0]?.trim();
  if (forwarded) return forwarded;
  return 'unknown';
};

export class RateLimiter {
  private state: DurableObjectState;
  constructor(state: DurableObjectState) {
    this.state = state;
  }

  async fetch(request: Request): Promise<Response> {
    if (request.method !== 'POST') return new Response('Method Not Allowed', { status: 405 });

    let payload: any = {};
    try {
      payload = await request.json();
    } catch {}

    const now = Number(payload?.now ?? Date.now());
    const limitPerMinute = Math.max(1, Number(payload?.limitPerMinute ?? 20));
    const limitPerDay = Math.max(1, Number(payload?.limitPerDay ?? 100));
    const minute = Math.floor(now / 60000);
    const day = Math.floor(now / 86400000);

    const stored =
      (await this.state.storage.get<{ minute: number; minuteCount: number; day: number; dayCount: number }>('rl')) ??
      { minute, minuteCount: 0, day, dayCount: 0 };

    const next = {
      minute,
      minuteCount: stored.minute === minute ? stored.minuteCount + 1 : 1,
      day,
      dayCount: stored.day === day ? stored.dayCount + 1 : 1,
    };
    await this.state.storage.put('rl', next);

    const minuteAllowed = next.minuteCount <= limitPerMinute;
    const dayAllowed = next.dayCount <= limitPerDay;
    const allowed = minuteAllowed && dayAllowed;

    const minuteRemaining = Math.max(0, limitPerMinute - next.minuteCount);
    const dayRemaining = Math.max(0, limitPerDay - next.dayCount);

    const resetMinuteInMs = (minute + 1) * 60000 - now;
    const resetDayInMs = (day + 1) * 86400000 - now;

    return new Response(
      JSON.stringify({
        allowed,
        minuteAllowed,
        dayAllowed,
        minuteRemaining,
        dayRemaining,
        resetMinuteInMs,
        resetDayInMs,
      }),
      {
      status: 200,
      headers: { 'Content-Type': 'application/json; charset=utf-8' },
      }
    );
  }
}

const enforceRateLimit = async (request: Request, env: Env) => {
  const ip = getClientIp(request);
  const limitPerMinute = Math.max(1, Number(env.RATE_LIMIT_PER_MINUTE ?? 20));
  const limitPerDay = Math.max(1, Number(env.RATE_LIMIT_PER_DAY ?? 100));
  const id = env.RATE_LIMITER.idFromName(ip);
  const stub = env.RATE_LIMITER.get(id);
  const resp = await stub.fetch('https://rate-limiter/check', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ now: Date.now(), limitPerMinute, limitPerDay }),
  });
  const data = (await resp.json()) as {
    allowed?: boolean;
    minuteAllowed?: boolean;
    dayAllowed?: boolean;
    minuteRemaining?: number;
    dayRemaining?: number;
    resetMinuteInMs?: number;
    resetDayInMs?: number;
  };
  return {
    allowed: Boolean(data.allowed),
    minuteAllowed: Boolean(data.minuteAllowed),
    dayAllowed: Boolean(data.dayAllowed),
    minuteRemaining: Number(data.minuteRemaining ?? 0),
    dayRemaining: Number(data.dayRemaining ?? 0),
    resetMinuteInMs: Number(data.resetMinuteInMs ?? 0),
    resetDayInMs: Number(data.resetDayInMs ?? 0),
    limitPerMinute,
    limitPerDay,
  };
};

const knowledgeContext = `【站内知识（2026-07 整理口径）】
- 基础三合一产品：Basics / Activize / Restorate（不同地区与版本配方可能不同，以当地外包装与官方说明为准）
- 站内昵称对照：小红=Activize；大白=Basics；小白=Restorate（仅为站内页面称呼，非官方命名）
- 自动购参考：约 2919 元 / 90 天（通常按约 3 个月配送计算）
- 月度有效积分口径：按自动购折算，每人每月约 106 分（演示口径，可能随市场/政策/资格条件变化）
- 演示参数：奖金系数 0.51；汇率 8.2；一至六代比例：5% / 3% / 3% / 3% / 5% / 5%（均为演示用途）
- 活跃资格参考：最低约 100 分（演示口径）
- 免责声明：本回答仅用于信息理解辅助，不构成任何产品功效承诺或收益承诺；涉及政策与结算请以官方最新书面文件与账户结算单为准

【使用说明】
1) 仅当问题明确涉及“本站页面/模拟器/积分口径/演示参数”时，才引用以上参考值，并标注“本站演示口径/参考值”
2) 对于不在口径内的问题：用通用知识给出中立解释框架与可核对建议，避免编造具体数值/政策细节
3) 不要在回答中提及“知识库/站内知识库限制”等内部措辞`;

const isSiteTopic = (question: string, history: IncomingMessage[]) => {
  const text = `${question}\n${(history ?? []).map((m) => m.content).join('\n')}`.toLowerCase();
  const keywords = [
    '模拟器',
    '收益',
    '试算',
    '结算',
    '奖金',
    '积分',
    '月度有效积分',
    '活跃率',
    '有效积分',
    '106',
    '103',
    '2919',
    '0.51',
    '8.2',
    '一代',
    '二代',
    '三代',
    '四代',
    '五代',
    '六代',
    '本站',
    '页面',
    'fitline',
    'pm fitline',
  ];
  return keywords.some((k) => text.includes(k.toLowerCase()));
};

const isPmTopic = (question: string, history: IncomingMessage[]) => {
  const text = `${question}\n${(history ?? []).map((m) => m.content).join('\n')}`.toLowerCase();
  const keywords = [
    'pm',
    'fitline',
    'pm fitline',
    'activize',
    'basics',
    'restorate',
    '小红',
    '大白',
    '小白',
    '三合一',
    '基础三合一',
    '自动购',
    '合作计划',
    '合作伙伴',
    '推荐',
    '奖金',
    '积分',
    '活跃',
    '月度',
    '有效积分',
    '产品',
    '配方',
    '成分',
    '用量',
    '怎么吃',
    '怎么喝',
    '饮用',
    '食用',
    '注意事项',
    '孕妇',
    '哺乳',
    '儿童',
    '老人',
    '慢性病',
    '用药',
  ];
  return keywords.some((k) => text.includes(k.toLowerCase()));
};

export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    const allowOrigin = env.ALLOW_ORIGIN?.trim() || '*';

    if (request.method === 'OPTIONS') {
      return new Response(null, { status: 204, headers: corsHeaders(allowOrigin) });
    }

    if (request.method !== 'POST') {
      return json(
        { error: 'Method Not Allowed' },
        { status: 405, headers: corsHeaders(allowOrigin) }
      );
    }

    const rl = await enforceRateLimit(request, env);
    if (!rl.allowed) {
      const exceededMinute = !rl.minuteAllowed;
      const exceededDay = !rl.dayAllowed;
      const retryAfterMs = exceededMinute && exceededDay ? Math.min(rl.resetMinuteInMs, rl.resetDayInMs) : exceededMinute ? rl.resetMinuteInMs : rl.resetDayInMs;
      const retryAfterSeconds = Math.max(1, Math.ceil(retryAfterMs / 1000));
      const detail = exceededDay
        ? `Rate limit exceeded (${rl.limitPerDay}/day)`
        : `Rate limit exceeded (${rl.limitPerMinute}/min)`;
      return json(
        { error: 'Too Many Requests', detail },
        {
          status: 429,
          headers: { ...corsHeaders(allowOrigin), 'Retry-After': String(retryAfterSeconds) },
        }
      );
    }

    if (!env.DEEPSEEK_API_KEY) {
      return json({ error: 'Missing DEEPSEEK_API_KEY' }, { status: 500, headers: corsHeaders(allowOrigin) });
    }

    let payload: any;
    try {
      payload = await request.json();
    } catch {
      return json({ error: 'Invalid JSON' }, { status: 400, headers: corsHeaders(allowOrigin) });
    }

    const question = String(payload?.question ?? '').trim();
    const history = (payload?.history ?? []) as IncomingMessage[];

    if (!question) {
      return json({ error: 'Question is required' }, { status: 400, headers: corsHeaders(allowOrigin) });
    }

    const safeHistory = Array.isArray(history)
      ? history
          .filter((m) => m && (m.role === 'user' || m.role === 'assistant') && typeof m.content === 'string')
          .slice(-12)
          .map((m) => ({ role: m.role, content: String(m.content).slice(0, 4000) }))
      : [];

    const systemPrompt = `你是一个中立的中文问答助手，回答与 PM FitLine、合作伙伴计划、积分口径、本站测算逻辑相关问题。

合规与边界：
1) 不要夸大产品功效，不要做收益承诺，不要引导投资或财富保障。
2) 涉及政策与结算：提示以官方最新书面文件与账户结算单为准。
3) 对不确定内容：明确说明不确定，并给出可核对的来源/路径。
4) 对于健康/疾病/孕哺/用药等问题：只提供一般性信息与就医建议，不做个体化医学判断。`;

    const offTopicPrompt = `你是一个中立的中文问答助手。用户的问题与 PM FitLine/本站内容无关时，按以下格式回复：
1) 先用 1–3 句给出通用、低风险的回答（避免编造具体政策/数字/结论）。
2) 用 1 句说明“这与 PM FitLine/本站内容不直接相关”。
3) 给出 2–3 个可继续追问的 PM/本站相关问题示例，引导用户回到产品、积分口径或模拟器参数。`;

    const systemContent = !isPmTopic(question, safeHistory)
      ? offTopicPrompt
      : isSiteTopic(question, safeHistory)
        ? `${systemPrompt}\n\n${knowledgeContext}`
        : systemPrompt;

    const model = env.DEEPSEEK_MODEL?.trim() || 'deepseek-chat';
    const apiBase = env.DEEPSEEK_API_BASE?.trim() || 'https://api.deepseek.com';
    const endpoint = `${apiBase.replace(/\/+$/, '')}/v1/chat/completions`;

    const upstream = await fetch(endpoint, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${env.DEEPSEEK_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model,
        temperature: 0.2,
        messages: [{ role: 'system', content: systemContent }, ...safeHistory, { role: 'user', content: question }],
      }),
    });

    const text = await upstream.text();
    if (!upstream.ok) {
      return json(
        { error: 'Upstream error', detail: text.slice(0, 2000) },
        { status: 502, headers: corsHeaders(allowOrigin) }
      );
    }

    let parsed: any;
    try {
      parsed = JSON.parse(text);
    } catch {
      return json({ error: 'Invalid upstream response' }, { status: 502, headers: corsHeaders(allowOrigin) });
    }

    const answer = String(parsed?.choices?.[0]?.message?.content ?? '').trim();
    if (!answer) {
      return json({ error: 'Empty answer' }, { status: 502, headers: corsHeaders(allowOrigin) });
    }

    return json({ answer }, { status: 200, headers: corsHeaders(allowOrigin) });
  },
};
