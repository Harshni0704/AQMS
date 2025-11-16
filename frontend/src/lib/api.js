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
export async function fetchQueries(params = {}) {
  const qs = new URLSearchParams(params).toString();
  return request(BASE_QUERIES, qs ? `?${qs}` : "");
}

export async function fetchQuery(id) {
  return request(BASE_QUERIES, `/${id}`);
}

export async function createQuery(body) {
  return request(BASE_QUERIES, "", {
    method: "POST",
    body: JSON.stringify(body),
  });
}

export async function updateQuery(id, body) {
  return request(BASE_QUERIES, `/${id}`, {
    method: "PUT",
    body: JSON.stringify(body),
  });
}

export async function updateQueryStatus(id, body) {
  return request(BASE_QUERIES, `/${id}/status`, {
    method: "PUT",
    body: JSON.stringify(body),
  });
}

export async function assignQuery(id, body) {
  return request(BASE_QUERIES, `/${id}/assign`, {
    method: "PUT",
    body: JSON.stringify(body),
  });
}

export async function deleteQuery(id) {
  return request(BASE_QUERIES, `/${id}`, {
    method: "DELETE",
  });
}

// ================= ANALYTICS API =================
export async function analyticsSummary() {
  return request(BASE_ANALYTICS, "/summary");
}