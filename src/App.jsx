import React, { useState } from 'react'
import PostList from './components/PostList'
import PostForm from './components/PostForm'

export default function App() {
  const [editing, setEditing] = useState(null)

  return (
    <div className="container">
      <h1>FacebookAPI — Posts</h1>
      <PostForm editing={editing} onSaved={() => setEditing(null)} onCancel={() => setEditing(null)} />
      <hr />
      <PostList onEdit={post => setEditing(post)} />
    </div>
  )
}