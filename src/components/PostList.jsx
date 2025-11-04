import React, { useEffect, useState } from 'react'
import { listPosts, deletePost } from '../api/posts'
import PostItem from './PostItem'

export default function PostList({ onEdit = () => {} }) {
  const [posts, setPosts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  async function load() {
    setLoading(true)
    setError(null)
    try {
      const data = await listPosts()
      setPosts(data.sort((a,b)=> new Date(b.createdDate) - new Date(a.createdDate)))
    } catch (err) {
      setError(err.message || String(err))
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    load()
  }, [])

  async function onDelete(id) {
    if (!confirm('Delete this post?')) return
    try {
      await deletePost(id)
      setPosts(p => p.filter(x => x.id !== id))
    } catch (err) {
      alert('Delete failed: ' + (err.message || err))
    }
  }

  if (loading) return <div>Loading posts...</div>
  if (error) return <div className="error">Error loading posts: {error}</div>

  return (
    <div className="post-list">
      {posts.length === 0 && <div>No posts yet</div>}
      {posts.map(p => (
        <PostItem key={p.id} post={p} onEdit={() => onEdit(p)} onDelete={() => onDelete(p.id)} />
      ))}
    </div>
  )
}