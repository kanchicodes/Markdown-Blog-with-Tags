import React from 'react'
import { Routes, Route, Link } from 'react-router-dom'
import Home from './pages/Home'
import NewPost from './pages/NewPost'
import EditPost from './pages/EditPost'
import PostView from './pages/PostView'

export default function App() {
  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow">
        <div className="max-w-4xl mx-auto p-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold">MarkNote</h1>
          <nav className="space-x-3">
            <Link to="/" className="text-blue-600">Home</Link>
            <Link to="/new" className="text-blue-600">New Post</Link>
          </nav>
        </div>
      </header>

      <main className="max-w-4xl mx-auto p-4">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/new" element={<NewPost />} />
          <Route path="/edit/:id" element={<EditPost />} />
          <Route path="/post/:id" element={<PostView />} />
        </Routes>
      </main>
    </div>
  )
}
