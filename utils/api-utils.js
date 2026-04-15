const baseUrl = 'http://localhost:8001'

export const planTrip = async (payload) => {
  const response = await fetch(baseUrl + '/trips/plan', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload)
  })
  if (!response.ok) {
    const err = await response.json().catch(() => ({}))
    const detail = err.detail
    const msg = typeof detail === 'string'
      ? detail
      : Array.isArray(detail)
        ? detail.map((e) => e.msg || JSON.stringify(e)).join('; ')
        : `Server error ${response.status}`
    throw new Error(msg)
  }
  return response.json()
}
