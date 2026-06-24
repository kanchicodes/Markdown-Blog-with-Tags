import React, { useState } from 'react'

export default function TagInput({ tags = [], onChange }) {
  const [input, setInput] = useState('')

  const add = () => {
    const t = input.trim()
    if (!t) return
    const next = Array.from(new Set([...tags, t]))
    onChange(next)
    setInput('')
  }

  const remove = (t) => onChange(tags.filter(x => x !== t))

  return (
    <div>
      <div className="flex gap-2 mb-2">
        {tags.map(t => (
          <span key={t} className="bg-gray-200 px-2 py-1 rounded text-sm">
            {t} <button onClick={() => remove(t)} className="ml-1 text-red-600">×</button>
          </span>
        ))}
      </div>
      <div className="flex gap-2">
        <input value={input} onChange={e => setInput(e.target.value)} className="border p-1 rounded flex-1" placeholder="Add tag" />
        <button type="button" onClick={add} className="bg-blue-600 text-white px-3 rounded">Add</button>
      </div>
    </div>
  )
}
