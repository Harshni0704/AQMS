// Backend base URL
const BASE = "https://aqms-backend-ki10.onrender.com/api/queries";

// Universal request function
async function request(path = "", opts = {}) {
  const url = `${BASE}${path}`;

  const res = await fetch(url, {
    headers: { "Content-Type": "application/json" },
    ...opts,
  });

  const text = await res.text().catch(() => "");
  let data = null;

  try {
    data = text ? JSON.parse(text) : null;
  } catch (e) {
    data = text;
  }

  if (!res.ok) {
    const err = data?.error || res.statusText || "API error";
    throw new Error(err);
  }

  return data;
}

// Build query parameters for filters
function buildQueryPath(basePath = "", params = {}) {
  const qs = new URLSearchParams();

  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined && value !== null && value !== "") {
      qs.set(key, value);
    }
  });

  const q = qs.toString();
  return basePath + (q ? `?${q}` : "");
}

// GET /api/queries
export async function fetchQueries(params = {}) {
  const path = buildQueryPath("", params);
  return request(path);
}

// GET /api/queries/:id
export async function fetchQuery(id) {
  return request(`/${id}`);
}

// POST /api/queries/submit
export async function createQuery(body) {
  return request("/submit", {
    method: "POST",
    body: JSON.stringify(body),
  });
}

// PUT /api/queries/:id/status
export async function updateQueryStatus(id, body) {
  return request(`/${id}/status`, {
    method: "PUT",
    body: JSON.stringify(body),
  });
}

// DELETE /api/queries/:id
export async function deleteQuery(id) {
  return request(`/${id}`, {
    method: "DELETE",
  });
}

// GET /api/queries/analytics/summary
export async function analyticsSummary(params = {}) {
  const path = buildQueryPath("/analytics/summary", params);
  return request(path);
}