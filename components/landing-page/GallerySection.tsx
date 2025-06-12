import { useState } from 'react'
import Image from 'next/image'

interface GallerySectionProps {
  id: string
  content: {
    title: string
    description: string
    images: Array<{
      id: string
      url: string
      title: string
      description: string
    }>
    backgroundColor: string
    textColor: string
    columns: number
  }
  onUpdate: (id: string, content: any) => void
}

export default function GallerySection({ id, content, onUpdate }: GallerySectionProps) {
  const [isEditing, setIsEditing] = useState(false)
  const [formData, setFormData] = useState(content)
  const [selectedImage, setSelectedImage] = useState<{ id: string; url: string; title: string; description: string } | null>(null)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onUpdate(id, formData)
    setIsEditing(false)
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleImageChange = (index: number, field: string, value: string) => {
    const newImages = [...formData.images]
    newImages[index] = {
      ...newImages[index],
      [field]: value
    }
    setFormData(prev => ({ ...prev, images: newImages }))
  }

  const addImage = () => {
    setFormData(prev => ({
      ...prev,
      images: [
        ...prev.images,
        {
          id: `image-${Date.now()}`,
          url: '',
          title: 'New Image',
          description: 'Image description'
        }
      ]
    }))
  }

  const removeImage = (index: number) => {
    setFormData(prev => ({
      ...prev,
      images: prev.images.filter((_, i) => i !== index)
    }))
  }

  const handleColumnsChange = (value: number) => {
    setFormData(prev => ({
      ...prev,
      columns: Math.max(1, Math.min(4, value))
    }))
  }

  if (isEditing) {
    return (
      <form onSubmit={handleSubmit} className="p-4 border rounded-lg">
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Section Title</label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Section Description</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows={3}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Background Color</label>
            <input
              type="color"
              name="backgroundColor"
              value={formData.backgroundColor}
              onChange={handleChange}
              className="mt-1 block w-full h-10 rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Text Color</label>
            <input
              type="color"
              name="textColor"
              value={formData.textColor}
              onChange={handleChange}
              className="mt-1 block w-full h-10 rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Number of Columns (1-4)</label>
            <input
              type="number"
              min="1"
              max="4"
              value={formData.columns}
              onChange={(e) => handleColumnsChange(parseInt(e.target.value))}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            />
          </div>
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-medium">Gallery Images</h3>
              <button
                type="button"
                onClick={addImage}
                className="px-3 py-1 text-sm font-medium text-white bg-indigo-600 rounded-md hover:bg-indigo-700"
              >
                Add Image
              </button>
            </div>
            {formData.images.map((image, index) => (
              <div key={image.id} className="p-4 border rounded-lg">
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Image URL</label>
                    <input
                      type="text"
                      value={image.url}
                      onChange={(e) => handleImageChange(index, 'url', e.target.value)}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Title</label>
                    <input
                      type="text"
                      value={image.title}
                      onChange={(e) => handleImageChange(index, 'title', e.target.value)}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Description</label>
                    <textarea
                      value={image.description}
                      onChange={(e) => handleImageChange(index, 'description', e.target.value)}
                      rows={2}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                    />
                  </div>
                  <button
                    type="button"
                    onClick={() => removeImage(index)}
                    className="text-sm text-red-600 hover:text-red-800"
                  >
                    Remove Image
                  </button>
                </div>
              </div>
            ))}
          </div>
          <div className="flex justify-end space-x-2">
            <button
              type="button"
              onClick={() => setIsEditing(false)}
              className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 text-sm font-medium text-white bg-indigo-600 border border-transparent rounded-md hover:bg-indigo-700"
            >
              Save
            </button>
          </div>
        </div>
      </form>
    )
  }

  return (
    <div
      className="py-16 px-4 sm:px-6 lg:px-8"
      style={{ backgroundColor: content.backgroundColor }}
    >
      <div className="max-w-7xl mx-auto">
        <div className="text-center">
          <h2
            className="text-3xl font-extrabold tracking-tight sm:text-4xl"
            style={{ color: content.textColor }}
          >
            {content.title}
          </h2>
          <p
            className="mt-4 max-w-2xl mx-auto text-xl"
            style={{ color: content.textColor }}
          >
            {content.description}
          </p>
        </div>

        <div className={`mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-${content.columns}`}>
          {content.images.map((image) => (
            <div
              key={image.id}
              className="relative group cursor-pointer"
              onClick={() => setSelectedImage(image)}
            >
              <div className="relative h-64 w-full overflow-hidden rounded-lg">
                <Image
                  src={image.url}
                  alt={image.title}
                  fill
                  className="object-cover transition-transform duration-300 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-40 transition-opacity duration-300">
                  <div className="absolute bottom-0 left-0 right-0 p-4 text-white transform translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                    <h3 className="text-lg font-medium">{image.title}</h3>
                    <p className="mt-1 text-sm">{image.description}</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {selectedImage && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-75">
          <div className="relative max-w-4xl w-full bg-white rounded-lg overflow-hidden">
            <button
              onClick={() => setSelectedImage(null)}
              className="absolute top-4 right-4 p-2 text-gray-400 hover:text-gray-500"
            >
              <span className="sr-only">Close</span>
              <svg
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
            <div className="relative h-[60vh]">
              <Image
                src={selectedImage.url}
                alt={selectedImage.title}
                fill
                className="object-contain"
              />
            </div>
            <div className="p-6">
              <h3 className="text-xl font-medium text-gray-900">
                {selectedImage.title}
              </h3>
              <p className="mt-2 text-gray-600">{selectedImage.description}</p>
            </div>
          </div>
        </div>
      )}

      <button
        onClick={() => setIsEditing(true)}
        className="absolute top-4 right-4 p-2 text-gray-400 hover:text-gray-500"
      >
        <span className="sr-only">Edit</span>
        <svg
          className="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
          />
        </svg>
      </button>
    </div>
  )
} 