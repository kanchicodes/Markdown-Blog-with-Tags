import React from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import usePosts from '../hooks/usePosts'
import PostEditor from '../components/PostEditor'

export default function EditPost(){
  const { id } = useParams()
  const { getPost, updatePost, togglePublished } = usePosts()
  const navigate = useNavigate()
  const post = getPost(id)
  if (!post) return <div>Post not found</div>

  const onSave = (data) => {
    updatePost(id, data)
    navigate('/')
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">Edit Post</h2>
        <div className="flex gap-2">
          <button onClick={() => togglePublished(id)} className="px-3 py-1 border rounded">{post.published? 'Unpublish' : 'Publish'}</button>
        </div>
      </div>
      <PostEditor initial={post} onSave={onSave} />
    </div>
  )
}
