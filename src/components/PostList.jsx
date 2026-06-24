import React from 'react'
import { Link } from 'react-router-dom'

export default function PostList({ posts = [], onDelete, onToggle, onExport }) {
  return (
    <div className="space-y-4">
      {posts.map(p => (
        <article key={p.id} className="p-4 bg-white rounded shadow">
          <div className="flex justify-between">
            <div>
              <h2 className="text-xl font-semibold"><Link to={`/post/${p.id}`} className="text-blue-600">{p.title}</Link></h2>
              <p className="text-sm text-gray-500">{new Date(p.createdAt).toLocaleString()} • {p.readingTime} min</p>
            </div>
            <div className="flex items-center gap-2">
              <button onClick={() => onToggle(p.id)} className="text-sm px-2 py-1 border rounded">{p.published ? 'Published' : 'Draft'}</button>
              <Link to={`/edit/${p.id}`} className="text-sm px-2 py-1 border rounded">Edit</Link>
              <button onClick={() => onDelete(p.id)} className="text-sm px-2 py-1 border rounded text-red-600">Delete</button>
              <button onClick={() => onExport(p.id)} className="text-sm px-2 py-1 border rounded">Export</button>
            </div>
          </div>

          <p className="mt-2 text-gray-700 line-clamp-3">{p.content.slice(0, 200)}{p.content.length>200?'...':''}</p>
          <div className="mt-2 flex gap-2">
            {p.tags.map(t => <span key={t} className="text-xs bg-gray-100 px-2 py-1 rounded">{t}</span>)}
          </div>
        </article>
      ))}
    </div>
  )
}
