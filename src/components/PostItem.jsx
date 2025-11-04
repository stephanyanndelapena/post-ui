import React from 'react'

export default function PostItem({ post, onEdit = () => {}, onDelete = () => {} }) {
  return (
    <div className="post-item">
      <div className="meta">
        <strong>{post.author}</strong>
        <span className="date">{post.createdDate ? new Date(post.createdDate).toLocaleString() : ''}</span>
      </div>
      <p>{post.content}</p>
      {post.imageUrl && (
        <div className="img-wrap">
          <img src={post.imageUrl} alt="post" onError={(e)=>{ e.target.style.display='none' }} />
        </div>
      )}
      <div className="actions">
        <button onClick={onEdit}>Edit</button>
        <button onClick={onDelete} className="danger">Delete</button>
      </div>
    </div>
  )
}