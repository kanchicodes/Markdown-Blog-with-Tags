import React, { useState, useMemo } from 'react'
import usePosts from '../hooks/usePosts'
import PostList from '../components/PostList'

export default function Home() {
  const { posts, deletePost, togglePublished, exportPostMarkdown, exportAll } = usePosts()
  const [q, setQ] = useState('')
  const [tagFilter, setTagFilter] = useState('')

  const filtered = useMemo(() => {
    return posts.filter(p => {
      const matchesQ = q ? (p.title + ' ' + p.content).toLowerCase().includes(q.toLowerCase()) : true
      const matchesTag = tagFilter ? p.tags.includes(tagFilter) : true
      return matchesQ && matchesTag
    })
  }, [posts, q, tagFilter])

  const tags = Array.from(new Set(posts.flatMap(p => p.tags)))

  return (
    <div>
      <div className="mb-4 flex gap-2">
        <input value={q} onChange={e => setQ(e.target.value)} placeholder="Search" className="border p-2 rounded flex-1" />
        <select value={tagFilter} onChange={e=>setTagFilter(e.target.value)} className="border p-2 rounded">
          <option value="">All tags</option>
          {tags.map(t => <option key={t} value={t}>{t}</option>)}
        </select>
        <button onClick={() => { const m = exportAll(); navigator.clipboard?.writeText(m) }} className="px-3 py-2 border rounded">Export All</button>
      </div>

      <PostList posts={filtered} onDelete={deletePost} onToggle={togglePublished} onExport={(id)=>{ const md = exportPostMarkdown(id); navigator.clipboard?.writeText(md) }} />
    </div>
  )
}
