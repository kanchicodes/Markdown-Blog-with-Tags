import React from 'react'
import { useParams, Link } from 'react-router-dom'
import usePosts from '../hooks/usePosts'
import ReactMarkdown from 'react-markdown'
import rehypeHighlight from 'rehype-highlight'

export default function PostView(){
  const { id } = useParams()
  const { getPost } = usePosts()
  const p = getPost(id)
  if (!p) return <div>Post not found</div>

  return (
    <article className="prose max-w-none bg-white p-6 rounded shadow">
      <h1>{p.title}</h1>
      <p className="text-sm text-gray-500">{new Date(p.createdAt).toLocaleString()} • {p.readingTime} min</p>
      <ReactMarkdown rehypePlugins={[rehypeHighlight]}>{p.content}</ReactMarkdown>
      <div className="mt-4">
        <Link to={`/edit/${p.id}`} className="text-blue-600">Edit</Link>
      </div>
    </article>
  )
}
