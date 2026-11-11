/**
 * Vercel Serverless Function: API Thống Kê & Cập Nhật Lượt Tải Về
 */

const defaultCounts = {
  "zenvibe": 0,
  "quan-ly-hang-hoa": 0,
  "capcut-mini": 0,
  "app-truyen-tranh": 0
};

module.exports = async function handler(req, res) {
  // Thiết lập CORS cho phép gọi từ mọi thiết bị
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  res.setHeader("Cache-Control", "no-store, no-cache, must-revalidate");

  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }

  const KV_URL = process.env.KV_REST_API_URL || process.env.UPSTASH_REDIS_REST_URL;
  const KV_TOKEN = process.env.KV_REST_API_TOKEN || process.env.UPSTASH_REDIS_REST_TOKEN;

  // GET: Lấy toàn bộ số lượt tải về hiện tại
  if (req.method === "GET") {
    if (KV_URL && KV_TOKEN) {
      try {
        const resp = await fetch(`${KV_URL}/get/vibe_download_counts`, {
          headers: { Authorization: `Bearer ${KV_TOKEN}` }
        });
        const json = await resp.json();
        if (json && json.result) {
          const cloudCounts = typeof json.result === "string" ? JSON.parse(json.result) : json.result;
          return res.status(200).json({ ...defaultCounts, ...cloudCounts });
        }
      } catch (e) {
        // Fallback về defaultCounts nếu kết nối cloud lỗi
      }
    }
    return res.status(200).json(defaultCounts);
  }

  // POST: Tăng lượt tải của 1 app lên +1
  if (req.method === "POST") {
    let body = req.body;
    if (typeof body === "string") {
      try { body = JSON.parse(body); } catch (e) {}
    }

    const appId = body && body.appId;
    if (!appId) {
      return res.status(400).json({ error: "Thiếu appId" });
    }

    let current = { ...defaultCounts };

    if (KV_URL && KV_TOKEN) {
      try {
        const resp = await fetch(`${KV_URL}/get/vibe_download_counts`, {
          headers: { Authorization: `Bearer ${KV_TOKEN}` }
        });
        const json = await resp.json();
        if (json && json.result) {
          const parsed = typeof json.result === "string" ? JSON.parse(json.result) : json.result;
          current = { ...defaultCounts, ...parsed };
        }

        current[appId] = (current[appId] || 0) + 1;

        await fetch(`${KV_URL}/set/vibe_download_counts`, {
          method: "POST",
          headers: {
            Authorization: `Bearer ${KV_TOKEN}`,
            "Content-Type": "application/json"
          },
          body: JSON.stringify(current)
        });

        return res.status(200).json({ success: true, count: current[appId], counts: current });
      } catch (e) {
        // Fallback nếu không có KV
      }
    }

    current[appId] = (current[appId] || 0) + 1;
    return res.status(200).json({ success: true, count: current[appId] });
  }

  return res.status(405).json({ error: "Method not allowed" });
};
