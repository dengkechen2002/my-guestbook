// Vercel Serverless Function — 通过 GitHub Gist 存储留言
const GIST_ID = '58f70ed7be349a8830bd97a1ed727500';
const GITHUB_TOKEN = process.env.GITHUB_TOKEN;
const GIST_RAW_URL = `https://gist.githubusercontent.com/dengkechen2002/${GIST_ID}/raw/messages.json`;

export default async function handler(req, res) {
  // CORS 头
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') return res.status(200).end();

  try {
    if (req.method === 'GET') {
      // 读取留言
      const resp = await fetch(GIST_RAW_URL);
      if (!resp.ok) throw new Error('Gist read failed');
      const data = await resp.json();
      return res.status(200).json(data.messages || []);
    }

    if (req.method === 'POST') {
      const { name, content } = req.body || {};
      if (!content) return res.status(400).json({ error: '内容不能为空' });

      // 读取当前数据
      const resp = await fetch(GIST_RAW_URL);
      if (!resp.ok) throw new Error('Gist read failed');
      const data = await resp.json();
      const messages = data.messages || [];

      // 添加新留言
      messages.unshift({
        id: Date.now(),
        name: (name || '匿名').trim().slice(0, 20),
        content: content.trim().slice(0, 200),
        created_at: new Date().toISOString()
      });

      // 限制保留最近 100 条
      if (messages.length > 100) messages.length = 100;

      // 写回 Gist
      const updateResp = await fetch(`https://api.github.com/gists/${GIST_ID}`, {
        method: 'PATCH',
        headers: {
          'Authorization': `Bearer ${GITHUB_TOKEN}`,
          'Content-Type': 'application/json',
          'Accept': 'application/vnd.github+json'
        },
        body: JSON.stringify({
          files: {
            'messages.json': {
              content: JSON.stringify({ messages }, null, 2)
            }
          }
        })
      });

      if (!updateResp.ok) {
        const errText = await updateResp.text();
        throw new Error(`Gist update failed: ${errText}`);
      }

      return res.status(201).json({ ok: true });
    }

    return res.status(405).json({ error: 'Method not allowed' });
  } catch (err) {
    console.error('API Error:', err);
    return res.status(500).json({ error: err.message });
  }
}
