import React from 'react'
import usePosts from '../hooks/usePosts'
import PostEditor from '../components/PostEditor'
import { useNavigate } from 'react-router-dom'

export default function NewPost() {
  const { createPost } = usePosts()
  const navigate = useNavigate()

  const onSave = (data) => {
    const post = createPost({ ...data, published: false })
    navigate(`/edit/${post.id}`)
  }

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">New Post</h2>
      <PostEditor onSave={onSave} />
    </div>
  )
}
