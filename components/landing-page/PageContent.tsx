'use client'

import { useDrag, useDrop } from 'react-dnd'
import HeroSection from './sections/HeroSection'
import ProductSection from './sections/ProductSection'
import ContactSection from './sections/ContactSection'
import VarietySection from './sections/VarietySection'
import TestimonialsSection from './sections/TestimonialsSection'
import PricingSection from './sections/PricingSection'
import FAQSection from './sections/FAQSection'
import TopBarSection from './TopBarSection'
import TransparentTopBarSection from './TransparentTopBarSection'
import { useState } from 'react'

interface PageContentProps {
  content: Array<{
    id: string
    type: string
    content: any
  }>
  onUpdate: (id: string, content: any) => void
  onReorder: (dragIndex: number, hoverIndex: number) => void
  onDelete: (id: string) => void
  isPreview: boolean
  previewDevice?: 'desktop' | 'mobile' | 'tablet'
}

const DraggableSection = ({ section, index, onUpdate, onDelete, onReorder, totalSections, isPreview, previewDevice = 'desktop' }: {
  section: { id: string; type: string; content: any }
  index: number
  onUpdate: (id: string, content: any) => void
  onDelete: (id: string) => void
  onReorder: (dragIndex: number, hoverIndex: number) => void
  totalSections: number
  isPreview: boolean
  previewDevice?: 'desktop' | 'mobile' | 'tablet'
}) => {
  const [{ isDragging }, drag] = useDrag({
    type: 'SECTION',
    item: { index },
    collect: (monitor) => ({
      isDragging: monitor.isDragging()
    })
  })

  const [, drop] = useDrop({
    accept: 'SECTION',
    hover: (item: { index: number }) => {
      if (item.index === index) {
        return
      }
      onReorder(item.index, index)
      item.index = index
    }
  })

  const [isEditing, setIsEditing] = useState(false)

  const renderSectionContent = () => {
    const props = {
      id: section.id,
      content: section.content,
      onUpdate,
      isPreview,
      isEditing,
      setIsEditing
    }

    switch (section.type) {
      case 'topbar':
        return <TopBarSection {...props} />
      case 'transparent-topbar':
        return <TransparentTopBarSection {...props} />
      case 'hero':
        return <HeroSection {...props} />
      case 'products':
        return <ProductSection {...props} />
      case 'contact':
        return <ContactSection {...props} />
      case 'variety':
        return <VarietySection {...props} />
      case 'testimonials':
        return <TestimonialsSection {...props} />
      case 'pricing':
        return <PricingSection {...props} />
      case 'faq':
        return <FAQSection {...props} />
      default:
        return null
    }
  }

  return (
    <div
      ref={(node) => {
        drag(node)
        drop(node)
      }}
      className={`relative group ${isDragging ? 'opacity-50' : ''} ${
        section.type.includes('topbar') ? 'z-50' : ''
      }`}
    >
      {!isPreview && (
        <div className={`sticky ${section.type.includes('topbar') ? 'top-0' : 'top-2'} z-50 flex justify-end`}>
          <div className="flex space-x-2 bg-white shadow-md rounded-md p-1">
            <button
              onClick={() => setIsEditing(true)}
              className="p-2 text-gray-400 hover:text-gray-500"
              title="Edit Section"
            >
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
            <div className="w-px bg-gray-200" />
            <button
              onClick={() => onReorder(index, index - 1)}
              disabled={index === 0}
              className="p-2 text-gray-400 hover:text-gray-500 disabled:opacity-50 disabled:cursor-not-allowed"
              title="Move Up"
            >
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
                  d="M5 15l7-7 7 7"
                />
              </svg>
            </button>
            <button
              onClick={() => onReorder(index, index + 1)}
              disabled={index === totalSections - 1}
              className="p-2 text-gray-400 hover:text-gray-500 disabled:opacity-50 disabled:cursor-not-allowed"
              title="Move Down"
            >
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
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </button>
            <div className="w-px bg-gray-200" />
            <button
              onClick={() => onDelete(section.id)}
              className="p-2 text-red-600 hover:text-red-800"
              title="Delete Section"
            >
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
                  d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                />
              </svg>
            </button>
          </div>
        </div>
      )}
      <div className={`relative ${section.type.includes('topbar') ? 'min-h-[64px]' : ''} ${isPreview ? 'pointer-events-none' : ''}`}>
        {renderSectionContent()}
      </div>
    </div>
  )
}

export default function PageContent({ content = [], onUpdate, onReorder, onDelete, isPreview, previewDevice }: PageContentProps) {
  if (!Array.isArray(content) || content.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500">No content yet. Start building your page!</p>
      </div>
    )
  }

  return (
    <div className="space-y-8">
      {content.map((section, index) => (
        <DraggableSection
          key={section.id}
          section={section}
          index={index}
          onUpdate={onUpdate}
          onDelete={onDelete}
          onReorder={onReorder}
          totalSections={content.length}
          isPreview={isPreview}
          previewDevice={previewDevice}
        />
      ))}
    </div>
  )
} 