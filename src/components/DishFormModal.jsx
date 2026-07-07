import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { supabase } from '../supabaseClient.js'

const CATEGORIES = ['Fast Food', 'Local Dishes', 'Sides', 'Drinks']

export default function DishFormModal({ mode, dish, onClose, onSaved }) {
  const isEdit = mode === 'edit'

  const [name, setName] = useState(dish?.name || '')
  const [price, setPrice] = useState(dish?.price?.toString() || '')
  const [description, setDescription] = useState(dish?.description || '')
  const [category, setCategory] = useState(dish?.category || CATEGORIES[0])
  const [imageFile, setImageFile] = useState(null)
  const [previewUrl, setPreviewUrl] = useState(dish?.image_url || null)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState('')

  function handleImageChange(e) {
    const file = e.target.files[0]
    if (file) {
      setImageFile(file)
      setPreviewUrl(URL.createObjectURL(file))
    }
  }

  async function handleSubmit(e) {
    e.preventDefault()
    setError('')

    if (!name.trim() || !price) {
      setError('Please fill in name and price.')
      return
    }
    if (!isEdit && !imageFile) {
      setError('Please select an image for the new dish.')
      return
    }

    setSaving(true)

    try {
      let imageUrl = dish?.image_url || null

      if (imageFile) {
        const fileExt = imageFile.name.split('.').pop()
        const fileName = `${Date.now()}-${Math.random().toString(36).slice(2)}.${fileExt}`

        const { error: uploadError } = await supabase.storage
          .from('dish-images')
          .upload(fileName, imageFile)

        if (uploadError) throw uploadError

        const { data: urlData } = supabase.storage
          .from('dish-images')
          .getPublicUrl(fileName)

        imageUrl = urlData.publicUrl
      }

      const payload = {
        name: name.trim(),
        price: parseFloat(price),
        description: description.trim(),
        category,
        image_url: imageUrl,
      }

      if (isEdit) {
        const { error: updateError } = await supabase
          .from('dishes')
          .update(payload)
          .eq('id', dish.id)
        if (updateError) throw updateError
      } else {
        const { error: insertError } = await supabase
          .from('dishes')
          .insert({ ...payload, is_available: true })
        if (insertError) throw insertError
      }

      onSaved()
      onClose()
    } catch (err) {
      setError(err.message || 'Something went wrong. Try again.')
    } finally {
      setSaving(false)
    }
  }

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="fixed inset-0 bg-black/60 z-40"
      />
      <motion.div
        initial={{ y: '100%' }}
        animate={{ y: 0 }}
        exit={{ y: '100%' }}
        transition={{ type: 'spring', damping: 25, stiffness: 220 }}
        className="fixed bottom-0 left-0 right-0 bg-charcoal border-t border-white/10 rounded-t-2xl z-50 max-h-[90vh] overflow-y-auto"
      >
        <form onSubmit={handleSubmit} className="p-5">
          <div className="w-10 h-1 bg-white/20 rounded-full mx-auto mb-4" />
          <h2 className="text-white font-bold mb-4">
            {isEdit ? `Edit ${dish.name}` : 'Add New Dish'}
          </h2>

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
              <span className="text-white/50 text-xs mb-1 block">
                {isEdit ? 'Replace Photo (optional)' : 'Dish Image'}
              </span>
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

            <div className="flex gap-2 mt-2">
              <button
                type="button"
                onClick={onClose}
                className="flex-1 bg-white/10 text-white font-bold py-3 rounded-2xl"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={saving}
                className="flex-1 bg-gold text-charcoal font-bold py-3 rounded-2xl disabled:opacity-50"
              >
                {saving ? 'Saving...' : isEdit ? 'Save Changes' : 'Publish to Menu'}
              </button>
            </div>
          </div>
        </form>
      </motion.div>
    </AnimatePresence>
  )
}
