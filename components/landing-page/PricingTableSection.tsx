import { useState } from 'react'

interface PricingTableSectionProps {
  id: string
  content: {
    title: string
    description: string
    plans: Array<{
      id: string
      name: string
      price: number
      period: string
      description: string
      features: string[]
      buttonText: string
      buttonLink: string
      isPopular?: boolean
    }>
    backgroundColor: string
    textColor: string
  }
  onUpdate: (id: string, content: any) => void
}

export default function PricingTableSection({ id, content, onUpdate }: PricingTableSectionProps) {
  const [isEditing, setIsEditing] = useState(false)
  const [formData, setFormData] = useState(content)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onUpdate(id, formData)
    setIsEditing(false)
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handlePlanChange = (index: number, field: string, value: any) => {
    const newPlans = [...formData.plans]
    newPlans[index] = {
      ...newPlans[index],
      [field]: value
    }
    setFormData(prev => ({ ...prev, plans: newPlans }))
  }

  const handleFeatureChange = (planIndex: number, featureIndex: number, value: string) => {
    const newPlans = [...formData.plans]
    newPlans[planIndex].features[featureIndex] = value
    setFormData(prev => ({ ...prev, plans: newPlans }))
  }

  const addFeature = (planIndex: number) => {
    const newPlans = [...formData.plans]
    newPlans[planIndex].features.push('')
    setFormData(prev => ({ ...prev, plans: newPlans }))
  }

  const removeFeature = (planIndex: number, featureIndex: number) => {
    const newPlans = [...formData.plans]
    newPlans[planIndex].features = newPlans[planIndex].features.filter((_, i) => i !== featureIndex)
    setFormData(prev => ({ ...prev, plans: newPlans }))
  }

  const addPlan = () => {
    setFormData(prev => ({
      ...prev,
      plans: [
        ...prev.plans,
        {
          id: `plan-${Date.now()}`,
          name: 'New Plan',
          price: 0,
          period: 'month',
          description: 'Plan description',
          features: ['Feature 1', 'Feature 2'],
          buttonText: 'Get Started',
          buttonLink: '#',
          isPopular: false
        }
      ]
    }))
  }

  const removePlan = (index: number) => {
    setFormData(prev => ({
      ...prev,
      plans: prev.plans.filter((_, i) => i !== index)
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
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-medium">Pricing Plans</h3>
              <button
                type="button"
                onClick={addPlan}
                className="px-3 py-1 text-sm font-medium text-white bg-indigo-600 rounded-md hover:bg-indigo-700"
              >
                Add Plan
              </button>
            </div>
            {formData.plans.map((plan, planIndex) => (
              <div key={plan.id} className="p-4 border rounded-lg">
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Plan Name</label>
                    <input
                      type="text"
                      value={plan.name}
                      onChange={(e) => handlePlanChange(planIndex, 'name', e.target.value)}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Price</label>
                    <input
                      type="number"
                      value={plan.price}
                      onChange={(e) => handlePlanChange(planIndex, 'price', parseFloat(e.target.value))}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Period</label>
                    <input
                      type="text"
                      value={plan.period}
                      onChange={(e) => handlePlanChange(planIndex, 'period', e.target.value)}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Description</label>
                    <textarea
                      value={plan.description}
                      onChange={(e) => handlePlanChange(planIndex, 'description', e.target.value)}
                      rows={2}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Button Text</label>
                    <input
                      type="text"
                      value={plan.buttonText}
                      onChange={(e) => handlePlanChange(planIndex, 'buttonText', e.target.value)}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Button Link</label>
                    <input
                      type="text"
                      value={plan.buttonLink}
                      onChange={(e) => handlePlanChange(planIndex, 'buttonLink', e.target.value)}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                    />
                  </div>
                  <div>
                    <label className="flex items-center">
                      <input
                        type="checkbox"
                        checked={plan.isPopular}
                        onChange={(e) => handlePlanChange(planIndex, 'isPopular', e.target.checked)}
                        className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                      />
                      <span className="ml-2 text-sm text-gray-700">Popular Plan</span>
                    </label>
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <label className="block text-sm font-medium text-gray-700">Features</label>
                      <button
                        type="button"
                        onClick={() => addFeature(planIndex)}
                        className="text-sm text-indigo-600 hover:text-indigo-800"
                      >
                        Add Feature
                      </button>
                    </div>
                    {plan.features.map((feature, featureIndex) => (
                      <div key={featureIndex} className="flex items-center space-x-2">
                        <input
                          type="text"
                          value={feature}
                          onChange={(e) => handleFeatureChange(planIndex, featureIndex, e.target.value)}
                          className="flex-1 rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                        />
                        <button
                          type="button"
                          onClick={() => removeFeature(planIndex, featureIndex)}
                          className="text-red-600 hover:text-red-800"
                        >
                          Remove
                        </button>
                      </div>
                    ))}
                  </div>
                  <button
                    type="button"
                    onClick={() => removePlan(planIndex)}
                    className="text-sm text-red-600 hover:text-red-800"
                  >
                    Remove Plan
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

        <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {content.plans.map((plan) => (
            <div
              key={plan.id}
              className={`relative rounded-lg shadow-lg p-6 ${
                plan.isPopular
                  ? 'bg-indigo-600 text-white'
                  : 'bg-white text-gray-900'
              }`}
            >
              {plan.isPopular && (
                <div className="absolute top-0 right-0 -mt-3 -mr-3">
                  <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-yellow-400 text-gray-900">
                    Popular
                  </span>
                </div>
              )}
              <div className="text-center">
                <h3 className="text-xl font-semibold">{plan.name}</h3>
                <div className="mt-4">
                  <span className="text-4xl font-extrabold">${plan.price}</span>
                  <span className="text-base font-medium">/{plan.period}</span>
                </div>
                <p className="mt-4 text-sm">{plan.description}</p>
                <a
                  href={plan.buttonLink}
                  className={`mt-8 block w-full py-2 px-4 border border-transparent rounded-md text-center font-medium ${
                    plan.isPopular
                      ? 'bg-white text-indigo-600 hover:bg-gray-50'
                      : 'bg-indigo-600 text-white hover:bg-indigo-700'
                  }`}
                >
                  {plan.buttonText}
                </a>
              </div>
              <ul className="mt-8 space-y-4">
                {plan.features.map((feature, index) => (
                  <li key={index} className="flex items-start">
                    <svg
                      className={`h-6 w-6 ${
                        plan.isPopular ? 'text-white' : 'text-indigo-600'
                      }`}
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
                    <span className="ml-3 text-sm">{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
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