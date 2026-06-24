import React from 'react'
import { useForm } from 'react-hook-form'
import EditorSplit from './EditorSplit'
import TagInput from './TagInput'

export default function PostEditor({ initial = {}, onSave }) {
  const { register, handleSubmit, setValue, watch } = useForm({ defaultValues: { title: initial.title || '', content: initial.content || '', tags: initial.tags || [] } })

  const content = watch('content')

  return (
    <form onSubmit={handleSubmit(data => onSave(data))} className="space-y-4">
      <input {...register('title', { required: true })} placeholder="Title" className="w-full p-2 border rounded" />

      <div>
        <label className="block mb-2 font-medium">Content</label>
        <EditorSplit value={content} onChange={val => setValue('content', val)} />
      </div>

      <div>
        <label className="block mb-2 font-medium">Tags</label>
        <TagInput tags={watch('tags')} onChange={(tags) => setValue('tags', tags)} />
      </div>

      <div className="flex gap-2">
        <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">Save</button>
      </div>
    </form>
  )
}
