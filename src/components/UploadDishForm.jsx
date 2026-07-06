import React, { useState } from 'react'
import { supabase } from '../supabaseClient.js'

const CATEGORIES = ['Fast Food', 'Local Dishes', 'Sides', 'Drinks']

export default function UploadDishForm({ onDishAdded }) {
  const [name, setName] = useState('')
  const [price, setPrice] = useState('')
  const [description, setDescription] = useState('')
  const [category, setCategory] = useState(CATEGORIES[0])
  const [imageFile, setImageFile] = useState(null)
  const [previewUrl, setPreviewUrl] = useState(null)
  const [uploading, setUploading] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')

  function handleImageChange(e) {
    const file = e.target.files[0]
    if (file) {
      setImageFile(file)
      setPreviewUrl(URL.createObjectURL(file))
    }
  }

  function resetForm() {
    setName('')
    setPrice('')
    setDescription('')
    setCategory(CATEGORIES[0])
    setImageFile(null)
    setPreviewUrl(null)
  }

  async function handleSubmit(e) {
    e.preventDefault()
    setError('')
    setSuccess('')

    if (!name.trim() || !price || !imageFile) {
      setError('Please fill in name, price, and select an image.')
      return
    }

    setUploading(true)

    try {
      const fileExt = imageFile.name.split('.').pop()
      const fileName = `${Date.now()}-${Math.random().toString(36).slice(2)}.${fileExt}`

      const { error: uploadError } = await supabase.storage
        .from('dish-images')
        .upload(fileName, imageFile)

      if (uploadError) throw uploadError

      const { data: urlData } = supabase.storage
        .from('dish-images')
        .getPublicUrl(fileName)

      const { error: insertError } = await supabase.from('dishes').insert({
        name: name.trim(),
        price: parseFloat(price),
        description: description.trim(),
        category,
        image_url: urlData.publicUrl,
        is_available: true,
      })

      if (insertError) throw insertError

      setSuccess('Dish published to menu!')
      resetForm()
      onDishAdded()
    } catch (err) {
      setError(err.message || 'Something went wrong. Try again.')
    } finally {
      setUploading(false)
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white/5 border border-white/10 rounded-2xl p-4 mb-6"
    >
      <h2 className="text-white font-bold mb-3">Upload New Dish</h2>

      <div className="space-y-3">
        <input
          type="text"
          placeholder="Food Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full bg-white/5 border border-white/10 rounded-2xl px-4 py-3 text-white text-sm placeholder-white/30 focus:outline-none focus:border-gold"
        />

        <input
          type="number"
          step="0.01"
          placeholder="Price (GHS)"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          className="w-full bg-white/5 border border-white/10 rounded-2xl px-4 py-3 text-white text-sm placeholder-white/30 focus:outline-none focus:border-gold"
        />

        <textarea
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          rows={2}
          className="w-full bg-white/5 border border-white/10 rounded-2xl px-4 py-3 text-white text-sm placeholder-white/30 focus:outline-none focus:border-gold resize-none"
        />

        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="w-full bg-white/5 border border-white/10 rounded-2xl px-4 py-3 text-white text-sm focus:outline-none focus:border-gold"
        >
          {CATEGORIES.map((cat) => (
            <option key={cat} value={cat} className="bg-charcoal">
              {cat}
            </option>
          ))}
        </select>

        <label className="block">
          <span className="text-white/50 text-xs mb-1 block">Dish Image</span>
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className="w-full text-white text-xs file:mr-3 file:py-2 file:px-4 file:rounded-2xl file:border-0 file:bg-gold file:text-charcoal file:font-bold"
          />
        </label>

        {previewUrl && (
          <img
            src={previewUrl}
            alt="Preview"
            className="w-full h-32 object-cover rounded-2xl"
          />
        )}

        {error && <p className="text-red-400 text-xs">{error}</p>}
        {success && <p className="text-green-400 text-xs">{success}</p>}

        <button
          type="submit"
          disabled={uploading}
          className="w-full bg-gold text-charcoal font-bold py-3 rounded-2xl disabled:opacity-50"
        >
          {uploading ? 'Publishing...' : 'Publish to Menu'}
        </button>
      </div>
    </form>
  )
}
