'use client'

import { useState } from 'react'

interface Product {
  id: string
  title: string
  description: string
  price: string
  imageUrl: string
}

interface ProductSectionProps {
  id: string
  content: {
    title: string
    description: string
    products: Product[]
    backgroundColor: string
    textColor: string
  }
  onUpdate: (id: string, content: any) => void
  isPreview?: boolean
}

export default function ProductSection({ id, content, onUpdate, isPreview = false }: ProductSectionProps) {
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

  const handleAddProduct = () => {
    const newProduct: Product = {
      id: `product-${Date.now()}`,
      title: 'New Product',
      description: 'Product description goes here.',
      price: '$0',
      imageUrl: '/placeholder.jpg'
    }
    setEditedContent({
      ...editedContent,
      products: [...editedContent.products, newProduct]
    })
  }

  const handleUpdateProduct = (productId: string, updatedProduct: Product) => {
    setEditedContent({
      ...editedContent,
      products: editedContent.products.map(product =>
        product.id === productId ? updatedProduct : product
      )
    })
  }

  const handleDeleteProduct = (productId: string) => {
    setEditedContent({
      ...editedContent,
      products: editedContent.products.filter(product => product.id !== productId)
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
                Products
              </label>
              <button
                onClick={handleAddProduct}
                className="px-3 py-1 text-sm bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
              >
                Add Product
              </button>
            </div>
            <div className="mt-4 space-y-4">
              {editedContent.products.map((product) => (
                <div key={product.id} className="p-4 border rounded-lg">
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700">
                        Product Title
                      </label>
                      <input
                        type="text"
                        value={product.title}
                        onChange={(e) =>
                          handleUpdateProduct(product.id, {
                            ...product,
                            title: e.target.value
                          })
                        }
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">
                        Description
                      </label>
                      <textarea
                        value={product.description}
                        onChange={(e) =>
                          handleUpdateProduct(product.id, {
                            ...product,
                            description: e.target.value
                          })
                        }
                        rows={2}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">
                        Price
                      </label>
                      <input
                        type="text"
                        value={product.price}
                        onChange={(e) =>
                          handleUpdateProduct(product.id, {
                            ...product,
                            price: e.target.value
                          })
                        }
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">
                        Image URL
                      </label>
                      <input
                        type="text"
                        value={product.imageUrl}
                        onChange={(e) =>
                          handleUpdateProduct(product.id, {
                            ...product,
                            imageUrl: e.target.value
                          })
                        }
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                      />
                    </div>
                    <button
                      onClick={() => handleDeleteProduct(product.id)}
                      className="text-sm text-red-600 hover:text-red-800"
                    >
                      Delete Product
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
            className="mt-3 max-w-2xl mx-auto text-xl text-gray-500 sm:mt-4"
            style={{ color: content.textColor }}
          >
            {content.description}
          </p>
        </div>
        <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {content.products.map((product) => (
            <div key={product.id} className="group relative">
              <div className="w-full min-h-80 bg-gray-200 aspect-w-1 aspect-h-1 rounded-md overflow-hidden group-hover:opacity-75 lg:h-80 lg:aspect-none">
                <img
                  src={product.imageUrl}
                  alt={product.title}
                  className="w-full h-full object-center object-cover lg:w-full lg:h-full"
                />
              </div>
              <div className="mt-4 flex justify-between">
                <div>
                  <h3 className="text-sm text-gray-700">
                    <a href="#">
                      <span aria-hidden="true" className="absolute inset-0" />
                      {product.title}
                    </a>
                  </h3>
                  <p className="mt-1 text-sm text-gray-500">{product.description}</p>
                </div>
                <p className="text-sm font-medium text-gray-900">{product.price}</p>
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