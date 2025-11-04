import React, { useEffect, useState } from 'react'
import { createPost, updatePost } from '../api/posts'

const empty = { author: '', content: '', imageUrl: '' }

export default function PostForm({ editing, onSaved = () => {}, onCancel = () => {} }) {
  const [form, setForm] = useState(empty)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  useEffect(() => {
    if (editing) {
      setForm({
        author: editing.author || '',
        content: editing.content || '',
        imageUrl: editing.imageUrl || '',
      })
    } else {
      setForm(empty)
    }
  }, [editing])

  async function submit(e) {
    e.preventDefault()
    setError(null)
    setLoading(true)
    try {
      if (editing && editing.id) {
        await updatePost(editing.id, form)
      } else {
        await createPost(form)
      }
      setForm(empty)
      onSaved()
    } catch (err) {
      setError(err.message || String(err))
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={submit} className="post-form">
      <h2>{editing ? 'Edit post' : 'Create post'}</h2>
      {error && <div className="error">{error}</div>}
      <div>
        <label>Author</label>
        <input value={form.author} onChange={e => setForm({ ...form, author: e.target.value })} maxLength={200} required />
      </div>
      <div>
        <label>Content</label>
        <textarea value={form.content} onChange={e => setForm({ ...form, content: e.target.value })} maxLength={5000} required />
      </div>
      <div>
        <label>Image URL (optional)</label>
        <input value={form.imageUrl} onChange={e => setForm({ ...form, imageUrl: e.target.value })} maxLength={2048} />
      </div>
      <div className="actions">
        <button type="submit" disabled={loading}>{loading ? 'Saving...' : (editing ? 'Save' : 'Create')}</button>
        {editing && <button type="button" onClick={() => { setForm(empty); onCancel(); }}>Cancel</button>}
      </div>
    </form>
  )
}