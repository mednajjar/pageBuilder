'use client'

import { useState } from 'react'

interface FAQ {
  id: string
  question: string
  answer: string
}

interface FAQSectionProps {
  id: string
  content: {
    title: string
    description: string
    faqs: FAQ[]
    backgroundColor: string
    textColor: string
  }
  onUpdate: (id: string, content: any) => void
  isPreview?: boolean
}

export default function FAQSection({ id, content, onUpdate, isPreview = false }: FAQSectionProps) {
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

  const handleAddFAQ = () => {
    const newFAQ: FAQ = {
      id: `faq-${Date.now()}`,
      question: 'New Question',
      answer: 'Answer goes here.'
    }
    setEditedContent({
      ...editedContent,
      faqs: [...editedContent.faqs, newFAQ]
    })
  }

  const handleUpdateFAQ = (faqId: string, updatedFAQ: FAQ) => {
    setEditedContent({
      ...editedContent,
      faqs: editedContent.faqs.map(faq =>
        faq.id === faqId ? updatedFAQ : faq
      )
    })
  }

  const handleDeleteFAQ = (faqId: string) => {
    setEditedContent({
      ...editedContent,
      faqs: editedContent.faqs.filter(faq => faq.id !== faqId)
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
                FAQs
              </label>
              <button
                onClick={handleAddFAQ}
                className="px-3 py-1 text-sm bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
              >
                Add FAQ
              </button>
            </div>
            <div className="mt-4 space-y-4">
              {editedContent.faqs.map((faq) => (
                <div key={faq.id} className="p-4 border rounded-lg">
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700">
                        Question
                      </label>
                      <input
                        type="text"
                        value={faq.question}
                        onChange={(e) =>
                          handleUpdateFAQ(faq.id, {
                            ...faq,
                            question: e.target.value
                          })
                        }
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">
                        Answer
                      </label>
                      <textarea
                        value={faq.answer}
                        onChange={(e) =>
                          handleUpdateFAQ(faq.id, {
                            ...faq,
                            answer: e.target.value
                          })
                        }
                        rows={3}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                      />
                    </div>
                    <button
                      onClick={() => handleDeleteFAQ(faq.id)}
                      className="text-sm text-red-600 hover:text-red-800"
                    >
                      Delete FAQ
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
        <div className="mt-12 max-w-3xl mx-auto">
          <dl className="space-y-8">
            {content.faqs.map((faq) => (
              <div key={faq.id}>
                <dt
                  className="text-lg font-semibold"
                  style={{ color: content.textColor }}
                >
                  {faq.question}
                </dt>
                <dd
                  className="mt-2 text-base"
                  style={{ color: content.textColor }}
                >
                  {faq.answer}
                </dd>
              </div>
            ))}
          </dl>
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