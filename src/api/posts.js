// src/api/posts.js
// Uses VITE_API_URL when provided (baked at build time).
const API_HOST = (import.meta.env.VITE_API_URL || '').replace(/\/$/, '')
const base = API_HOST ? `${API_HOST}/api/posts` : '/api/posts'

async function handleResp(resp) {
  if (!resp.ok) {
    const txt = await resp.text()
    throw new Error(txt || resp.statusText)
  }
  if (resp.status === 204) return null
  return resp.json()
}

export async function listPosts() {
  const resp = await fetch(base)
  return handleResp(resp)
}

export async function getPost(id) {
  const resp = await fetch(`${base}/${id}`)
  return handleResp(resp)
}

export async function createPost(payload) {
  const resp = await fetch(base, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  })
  return handleResp(resp)
}

export async function updatePost(id, payload) {
  const resp = await fetch(`${base}/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  })
  return handleResp(resp)
}

export async function deletePost(id) {
  const resp = await fetch(`${base}/${id}`, { method: 'DELETE' })
  return handleResp(resp)
}