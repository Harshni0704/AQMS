// Backend base URLs
const BASE_QUERIES = "https://aqms-backend-ki10.onrender.com/api/queries";
const BASE_ANALYTICS = "https://aqms-backend-ki10.onrender.com/api/analytics";

// Universal request helper
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
    data = text; // fallback for non-JSON responses
  }

  if (!res.ok) {
    const err = data?.error || res.statusText || "API error";
    throw new Error(err);
  }

  return data;
}

// Build query params
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

// ===============================
// Query APIs
// ===============================

// GET /api/queries
export async function fetchQueries(params = {}) {
  const path = buildQueryPath("", params);
  return request(BASE_QUERIES, path);
}

// GET /api/queries/:id
export async function fetchQuery(id) {
  return request(BASE_QUERIES, `/${id}`);
}

// POST /api/queries   (FIXED: removed /submit)
export async function createQuery(body) {
  return request(BASE_QUERIES, "", {
    method: "POST",
    body: JSON.stringify(body),
  });
}

// PATCH /api/queries/:id/status  (FIXED: PUT → PATCH)
export async function updateQueryStatus(id, body) {
  return request(BASE_QUERIES, `/${id}/status`, {
    method: "PATCH",
    body: JSON.stringify(body),
  });
}

// DELETE /api/queries/:id
export async function deleteQuery(id) {
  return request(BASE_QUERIES, `/${id}`, {
    method: "DELETE",
  });
}

// ===============================
// Analytics APIs
// ===============================

// GET /api/analytics/summary
export async function analyticsSummary(params = {}) {
  const path = buildQueryPath("/summary", params);
  return request(BASE_ANALYTICS, path);
}