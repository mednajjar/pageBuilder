'use client'

import { useState } from 'react'

interface Testimonial {
  id: string
  name: string
  role: string
  content: string
  imageUrl: string
}

interface TestimonialsSectionProps {
  id: string
  content: {
    title: string
    description: string
    testimonials: Testimonial[]
    backgroundColor: string
    textColor: string
  }
  onUpdate: (id: string, content: any) => void
  isPreview?: boolean
}

export default function TestimonialsSection({ id, content, onUpdate, isPreview = false }: TestimonialsSectionProps) {
  const [isEditing, setIsEditing] = useState(false)
  const [editedContent, setEditedContent] = useState(content)

  const handleSave = () => {
    onUpdate(id, editedContent)
    setIsEditing(false)
  }

  const handleCancel = () => {
    setEditedContent(content)
    setIsEditing(false)
  }

  const handleAddTestimonial = () => {
    const newTestimonial: Testimonial = {
      id: `testimonial-${Date.now()}`,
      name: 'New Testimonial',
      role: 'Role',
      content: 'Testimonial content goes here.',
      imageUrl: '/placeholder.jpg'
    }
    setEditedContent({
      ...editedContent,
      testimonials: [...editedContent.testimonials, newTestimonial]
    })
  }

  const handleUpdateTestimonial = (testimonialId: string, updatedTestimonial: Testimonial) => {
    setEditedContent({
      ...editedContent,
      testimonials: editedContent.testimonials.map(testimonial =>
        testimonial.id === testimonialId ? updatedTestimonial : testimonial
      )
    })
  }

  const handleDeleteTestimonial = (testimonialId: string) => {
    setEditedContent({
      ...editedContent,
      testimonials: editedContent.testimonials.filter(testimonial => testimonial.id !== testimonialId)
    })
  }

  if (isEditing && !isPreview) {
    return (
      <div className="p-6 border rounded-lg">
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Title
            </label>
            <input
              type="text"
              value={editedContent.title}
              onChange={(e) =>
                setEditedContent({ ...editedContent, title: e.target.value })
              }
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Description
            </label>
            <textarea
              value={editedContent.description}
              onChange={(e) =>
                setEditedContent({ ...editedContent, description: e.target.value })
              }
              rows={3}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            />
          </div>
          <div>
            <div className="flex justify-between items-center">
              <label className="block text-sm font-medium text-gray-700">
                Testimonials
              </label>
              <button
                onClick={handleAddTestimonial}
                className="px-3 py-1 text-sm bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
              >
                Add Testimonial
              </button>
            </div>
            <div className="mt-4 space-y-4">
              {editedContent.testimonials.map((testimonial) => (
                <div key={testimonial.id} className="p-4 border rounded-lg">
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700">
                        Name
                      </label>
                      <input
                        type="text"
                        value={testimonial.name}
                        onChange={(e) =>
                          handleUpdateTestimonial(testimonial.id, {
                            ...testimonial,
                            name: e.target.value
                          })
                        }
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">
                        Role
                      </label>
                      <input
                        type="text"
                        value={testimonial.role}
                        onChange={(e) =>
                          handleUpdateTestimonial(testimonial.id, {
                            ...testimonial,
                            role: e.target.value
                          })
                        }
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">
                        Content
                      </label>
                      <textarea
                        value={testimonial.content}
                        onChange={(e) =>
                          handleUpdateTestimonial(testimonial.id, {
                            ...testimonial,
                            content: e.target.value
                          })
                        }
                        rows={3}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">
                        Image URL
                      </label>
                      <input
                        type="text"
                        value={testimonial.imageUrl}
                        onChange={(e) =>
                          handleUpdateTestimonial(testimonial.id, {
                            ...testimonial,
                            imageUrl: e.target.value
                          })
                        }
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                      />
                    </div>
                    <button
                      onClick={() => handleDeleteTestimonial(testimonial.id)}
                      className="text-sm text-red-600 hover:text-red-800"
                    >
                      Delete Testimonial
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="flex space-x-4">
            <button
              onClick={handleSave}
              className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
            >
              Save
            </button>
            <button
              onClick={handleCancel}
              className="px-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div
      className="relative py-16 px-4 sm:px-6 lg:px-8"
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
            className="mt-3 max-w-2xl mx-auto text-xl sm:mt-4"
            style={{ color: content.textColor }}
          >
            {content.description}
          </p>
        </div>
        <div className="mt-12 grid gap-8 lg:grid-cols-3">
          {content.testimonials.map((testimonial) => (
            <div key={testimonial.id} className="text-center space-y-6 sm:space-y-8">
              <img
                className="mx-auto h-20 w-20 rounded-full"
                src={testimonial.imageUrl}
                alt={testimonial.name}
              />
              <div className="space-y-2">
                <p
                  className="text-xl font-medium"
                  style={{ color: content.textColor }}
                >
                  {testimonial.content}
                </p>
                <div className="text-base">
                  <p
                    className="font-semibold"
                    style={{ color: content.textColor }}
                  >
                    {testimonial.name}
                  </p>
                  <p style={{ color: content.textColor }}>{testimonial.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      {!isPreview && (
        <button
          onClick={() => setIsEditing(true)}
          className="absolute top-4 left-4 p-2 text-gray-400 hover:text-gray-500"
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
      )}
    </div>
  )
} 