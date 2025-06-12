'use client'

import { useState } from 'react'

interface Plan {
  id: string
  name: string
  price: string
  features: string[]
  cta: string
  ctaLink: string
}

interface PricingSectionProps {
  id: string
  content: {
    title: string
    description: string
    plans: Plan[]
    backgroundColor: string
    textColor: string
  }
  onUpdate: (id: string, content: any) => void
  isPreview?: boolean
}

export default function PricingSection({ id, content, onUpdate, isPreview = false }: PricingSectionProps) {
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

  const handleAddPlan = () => {
    const newPlan: Plan = {
      id: `plan-${Date.now()}`,
      name: 'New Plan',
      price: '$0',
      features: ['Feature 1', 'Feature 2', 'Feature 3'],
      cta: 'Get Started',
      ctaLink: '#'
    }
    setEditedContent({
      ...editedContent,
      plans: [...editedContent.plans, newPlan]
    })
  }

  const handleUpdatePlan = (planId: string, updatedPlan: Plan) => {
    setEditedContent({
      ...editedContent,
      plans: editedContent.plans.map(plan =>
        plan.id === planId ? updatedPlan : plan
      )
    })
  }

  const handleDeletePlan = (planId: string) => {
    setEditedContent({
      ...editedContent,
      plans: editedContent.plans.filter(plan => plan.id !== planId)
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
                Plans
              </label>
              <button
                onClick={handleAddPlan}
                className="px-3 py-1 text-sm bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
              >
                Add Plan
              </button>
            </div>
            <div className="mt-4 space-y-4">
              {editedContent.plans.map((plan) => (
                <div key={plan.id} className="p-4 border rounded-lg">
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700">
                        Plan Name
                      </label>
                      <input
                        type="text"
                        value={plan.name}
                        onChange={(e) =>
                          handleUpdatePlan(plan.id, {
                            ...plan,
                            name: e.target.value
                          })
                        }
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">
                        Price
                      </label>
                      <input
                        type="text"
                        value={plan.price}
                        onChange={(e) =>
                          handleUpdatePlan(plan.id, {
                            ...plan,
                            price: e.target.value
                          })
                        }
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">
                        Features (one per line)
                      </label>
                      <textarea
                        value={plan.features.join('\n')}
                        onChange={(e) =>
                          handleUpdatePlan(plan.id, {
                            ...plan,
                            features: e.target.value.split('\n').filter(Boolean)
                          })
                        }
                        rows={4}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">
                        CTA Text
                      </label>
                      <input
                        type="text"
                        value={plan.cta}
                        onChange={(e) =>
                          handleUpdatePlan(plan.id, {
                            ...plan,
                            cta: e.target.value
                          })
                        }
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">
                        CTA Link
                      </label>
                      <input
                        type="text"
                        value={plan.ctaLink}
                        onChange={(e) =>
                          handleUpdatePlan(plan.id, {
                            ...plan,
                            ctaLink: e.target.value
                          })
                        }
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                      />
                    </div>
                    <button
                      onClick={() => handleDeletePlan(plan.id)}
                      className="text-sm text-red-600 hover:text-red-800"
                    >
                      Delete Plan
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
          {content.plans.map((plan) => (
            <div
              key={plan.id}
              className="bg-white rounded-lg shadow-lg overflow-hidden"
            >
              <div className="px-6 py-8">
                <h3
                  className="text-2xl font-semibold text-center"
                  style={{ color: content.textColor }}
                >
                  {plan.name}
                </h3>
                <p
                  className="mt-4 text-4xl font-extrabold text-center"
                  style={{ color: content.textColor }}
                >
                  {plan.price}
                </p>
                <ul className="mt-8 space-y-4">
                  {plan.features.map((feature, index) => (
                    <li
                      key={index}
                      className="flex items-center"
                      style={{ color: content.textColor }}
                    >
                      <svg
                        className="h-5 w-5 text-green-500"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                      <span className="ml-3">{feature}</span>
                    </li>
                  ))}
                </ul>
                <div className="mt-8">
                  <a
                    href={plan.ctaLink}
                    className="block w-full bg-indigo-600 text-white text-center px-4 py-2 rounded-md hover:bg-indigo-700"
                  >
                    {plan.cta}
                  </a>
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