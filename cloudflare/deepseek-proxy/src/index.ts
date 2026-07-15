type Env = {
  DEEPSEEK_API_KEY: string;
  DEEPSEEK_API_BASE?: string;
  DEEPSEEK_MODEL?: string;
  ALLOW_ORIGIN?: string;
};

type IncomingMessage = { role: 'user' | 'assistant'; content: string };

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

const knowledgeContext = `【站内知识（2026-07 整理口径）】
- 基础三合一产品：Basics / Activize / Restorate（不同地区与版本配方可能不同，以当地外包装与官方说明为准）
- 自动购参考：约 2919 元 / 90 天（通常按约 3 个月配送计算）
- 月度有效积分口径：按自动购折算，每人每月约 106 分（演示口径，可能随市场/政策/资格条件变化）
- 演示参数：奖金系数 0.51；汇率 8.2；一至六代比例：5% / 3% / 3% / 3% / 5% / 5%（均为演示用途）
- 活跃资格参考：最低约 100 分（演示口径）
- 免责声明：本回答仅用于信息理解辅助，不构成任何产品功效承诺或收益承诺；涉及政策与结算请以官方最新书面文件与账户结算单为准

【回答要求】
1) 优先使用以上口径解释，并标注“本站演示口径/参考值”
2) 遇到无法确认或超出口径的问题，明确说明不确定，并建议用户核对来源与官方文件`;

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

    const systemPrompt =
      '你是一个中立的中文问答助手，回答与 PM FitLine 产品、合作伙伴计划、积分口径、网站测算逻辑相关问题。不要夸大产品功效，不要做收益承诺，不要引导投资或财富保障。涉及政策与结算请提示以官方最新书面文件与账户结算单为准。对不确定内容请明确说明不确定，并建议用户核对来源。';
    const systemContent = `${systemPrompt}\n\n${knowledgeContext}`;

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
