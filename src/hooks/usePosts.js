import { useMemo } from 'react'
import useLocalStorage from './useLocalStorage'
import { v4 as uuidv4 } from 'uuid'

function readingTime(text) {
  const words = text ? text.split(/\s+/).length : 0
  return Math.max(1, Math.ceil(words / 200))
}

export default function usePosts() {
  const [posts, setPosts] = useLocalStorage('marknote:posts', [])

  const createPost = (payload) => {
    const now = new Date().toISOString()
    const post = {
      id: uuidv4(),
      title: payload.title || 'Untitled',
      content: payload.content || '',
      tags: payload.tags || [],
      createdAt: now,
      updatedAt: now,
      published: !!payload.published,
      views: 0
    }
    setPosts([post, ...posts])
    return post
  }

  const updatePost = (id, patch) => {
    setPosts(posts.map(p => p.id === id ? { ...p, ...patch, updatedAt: new Date().toISOString() } : p))
  }

  const deletePost = (id) => setPosts(posts.filter(p => p.id !== id))

  const getPost = (id) => posts.find(p => p.id === id)

  const togglePublished = (id) => {
    setPosts(posts.map(p => p.id === id ? { ...p, published: !p.published } : p))
  }

  const exportPostMarkdown = (id) => {
    const p = getPost(id)
    if (!p) return ''
    const header = `---\ntitle: ${p.title}\ndate: ${p.createdAt}\ntags: ${p.tags.join(', ')}\n---\n\n`
    return header + p.content
  }

  const exportAll = () => posts.map(p => exportPostMarkdown(p.id)).join('\n\n')

  const withReading = useMemo(() => posts.map(p => ({ ...p, readingTime: readingTime(p.content) })), [posts])

  return {
    posts: withReading,
    createPost,
    updatePost,
    deletePost,
    getPost,
    togglePublished,
    exportPostMarkdown,
    exportAll
  }
}
