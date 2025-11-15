const BASE = import.meta.env.VITE_API_BASE || 'http://localhost:5000/api/queries'

async function request(path = '', opts = {}) {
  const url = path.startsWith('http') ? path : BASE + path
  const res = await fetch(url, {
    headers: { 'Content-Type': 'application/json' },
    ...opts
  })
  const text = await res.text().catch(() => '')
  let data = null
  try { data = text ? JSON.parse(text) : null } catch (e) { data = text }

  if (!res.ok) {
    const err = (data && data.error) ? data.error : res.statusText || 'API error'
    throw new Error(err)
  }
  return data
}

function buildQueryPath(basePath = '', params = {}) {
  const qs = new URLSearchParams()
  Object.entries(params).forEach(([k, v]) => {
    if (v !== undefined && v !== null && v !== '') qs.set(k, v)
  })
  const q = qs.toString()
  return basePath + (q ? `?${q}` : '')
}

export async function fetchQueries(params = {}) {
  const path = buildQueryPath('/', params)
  return request(path)
}

export async function fetchQuery(id) {
  return request('/' + id)
}

export async function createQuery(body) {
  const url = BASE + '/submit'
  return request('/submit', { method: 'POST', body: JSON.stringify(body) })
}

export async function updateQueryStatus(id, body) {
  const url = BASE + '/' + id + '/status'
  return request('/' + id + '/status', { method: 'PUT', body: JSON.stringify(body) })
}

export async function deleteQuery(id) {
  return request('/' + id, { method: 'DELETE' })
}

/**
 * analyticsSummary(params)
 * params may include: search, from, to, type, priority, status, channel
 */
export async function analyticsSummary(params = {}) {
  const path = buildQueryPath('/analytics/summary', params)
  return request(path)
}
