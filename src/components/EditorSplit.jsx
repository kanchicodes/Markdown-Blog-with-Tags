import React from 'react'
import ReactMarkdown from 'react-markdown'
import rehypeHighlight from 'rehype-highlight'

export default function EditorSplit({ value, onChange }) {
  return (
    <div className="grid grid-cols-2 gap-4">
      <textarea
        className="p-3 border rounded h-96 resize-none"
        value={value}
        onChange={e => onChange(e.target.value)}
      />

      <div className="p-3 border rounded h-96 overflow-auto bg-white">
        <ReactMarkdown rehypePlugins={[rehypeHighlight]}>{value}</ReactMarkdown>
      </div>
    </div>
  )
}
