// Use Render backend in production
const BASE = import.meta.env.VITE_API_BASE || 'https://aqms-backend-ki10.onrender.com/api/queries'

// Main request function
async function request(path = '', opts = {}) {
  const url = path.startsWith('http') ? path : BASE + path

  const res = await fetch(url, {
    headers: { 'Content-Type': 'application/json' },
    ...opts
  })

  const text = await res.text().catch(() => '')
  let data = null

  try { 
    data = text ? JSON.parse(text) : null 
  } catch (e) { 
    data = text 
  }

  if (!res.ok) {
    const err = (data && data.error) ? data.error : res.statusText || 'API error'
    throw new Error(err)
  }

  return data
}

// Build query params
function buildQueryPath(basePath = '', params = {}) {
  const qs = new URLSearchParams()

  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined && value !== null && value !== '') {
      qs.set(key, value)
    }
  })

  const q = qs.toString()
  return basePath + (q ? `?${q}` : '')
}

// Fetch all queries
export async function fetchQueries(params = {}) {
  const path = buildQueryPath('/', params)
  return request(path)
}

// Fetch single query
export async function fetchQuery(id) {
  return request('/' + id)
}

// Create a query (POST)
export async function createQuery(body) {
  return request('/submit', {
    method: 'POST',
    body: JSON.stringify(body)
  })
}

// Update query status
export async function updateQueryStatus(id, body) {
  return request('/' + id + '/status', {
    method: 'PUT',
    body: JSON.stringify(body)
  })
}

// Delete a query
export async function deleteQuery(id) {
  return request('/' + id, {
    method: 'DELETE'
  })
}

// Analytics summary GET
export async function analyticsSummary(params = {}) {
  const path = buildQueryPath('/analytics/summary', params)
  return request(path)
}