// ================= BASE URLS =================
const BASE_QUERIES = `${import.meta.env.VITE_API_URL}/api/queries`;
const BASE_ANALYTICS = `${import.meta.env.VITE_API_URL}/api/analytics`;

// ================= UNIVERSAL REQUEST HELPER =================
async function request(base, path = "", opts = {}) {
  const url = `${base}${path}`;

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

// ================= QUERIES API =================

// GET /api/queries
export async function fetchQueries(params = {}) {
  const qs = new URLSearchParams(params).toString();
  return request(BASE_QUERIES, qs ? `?${qs}` : "");
}

// GET /api/queries/:id
export async function fetchQuery(id) {
  return request(BASE_QUERIES, `/${id}`);
}

// POST /api/queries
export async function createQuery(body) {
  return request(BASE_QUERIES, "", {
    method: "POST",
    body: JSON.stringify(body),
  });
}

// PUT /api/queries/:id
export async function updateQuery(id, body) {
  return request(BASE_QUERIES, `/${id}`, {
    method: "PUT",
    body: JSON.stringify(body),
  });
}

// PUT /api/queries/:id/status
export async function updateQueryStatus(id, body) {
  return request(BASE_QUERIES, `/${id}/status`, {
    method: "PUT",
    body: JSON.stringify(body),
  });
}

// PUT /api/queries/:id/assign
export async function assignQuery(id, body) {
  return request(BASE_QUERIES, `/${id}/assign`, {
    method: "PUT",
    body: JSON.stringify(body),
  });
}

// DELETE /api/queries/:id
export async function deleteQuery(id) {
  return request(BASE_QUERIES, `/${id}`, {
    method: "DELETE",
  });
}

// ================= ANALYTICS API =================

// GET /api/analytics/summary
export async function analyticsSummary() {
  return request(BASE_ANALYTICS, "/summary");
}