'use client'

import { useState, useEffect } from 'react'
import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'
import ElementsSidebar from './ElementsSidebar'
import PageContent from './PageContent'
import { DevicePhoneMobileIcon, ComputerDesktopIcon, DeviceTabletIcon } from '@heroicons/react/24/outline'
import { usePageStore } from '@/store/pageStore'

interface PageBuilderProps {
  page: {
    id: string
    title: string
    name: string
    content: any[]
  }
  onUpdate: (content: any[]) => void
}

export default function PageBuilder({ page, onUpdate }: PageBuilderProps) {
  const [isPreview, setIsPreview] = useState(false)
  const [previewDevice, setPreviewDevice] = useState<'desktop' | 'mobile' | 'tablet'>('desktop')
  const setPageContent = usePageStore(state => state.setPageContent)
  const setPageTitle = usePageStore(state => state.setPageTitle)

  // Initialize with example sections if page content is empty
  useEffect(() => {
    if (!page.content || page.content.length === 0) {
      const exampleSections = [
        {
          id: 'example-topbar',
          type: 'topbar',
          content: {
            logo: '/example-logo.svg',
            menuItems: [
              { id: 'menu-1', label: 'Home', link: '/' },
              { id: 'menu-2', label: 'Products', link: '/products' },
              { id: 'menu-3', label: 'About Us', link: '/about' },
              { id: 'menu-4', label: 'Blog', link: '/blog' },
              { id: 'menu-5', label: 'Contact', link: '/contact' }
            ],
            backgroundColor: '#ffffff',
            textColor: '#1a1a1a'
          }
        },
        {
          id: 'example-transparent-topbar',
          type: 'transparent-topbar',
          content: {
            logo: '/example-logo-white.svg',
            logoPosition: 'center',
            menuItems: [
              { id: 'menu-1', label: 'Shop', link: '/shop' },
              { id: 'menu-2', label: 'New Arrivals', link: '/new' },
              { id: 'menu-3', label: 'Collections', link: '/collections' },
              { id: 'menu-4', label: 'Sale', link: '/sale' }
            ],
            textColor: '#ffffff'
          }
        },
        {
          id: 'example-hero',
          type: 'hero',
          content: {
            title: 'Welcome to Our Store',
            description: 'Discover our amazing products and services.',
            buttonText: 'Shop Now',
            buttonLink: '/shop',
            backgroundColor: '#1a1a1a',
            textColor: '#ffffff'
          }
        }
      ]
      onUpdate(exampleSections)
      setPageContent(exampleSections)
    } else {
      setPageContent(page.content)
    }
    setPageTitle(page.title)
  }, [page.content, page.title, onUpdate, setPageContent, setPageTitle])

  const handleAddComponent = (type: string) => {
    try {
      const newComponent = {
        id: `section-${Date.now()}`,
        type,
        content: getDefaultContent(type)
      }
      const updatedContent = Array.isArray(page.content) ? [...page.content, newComponent] : [newComponent]
      onUpdate(updatedContent)
      setPageContent(updatedContent)
    } catch (error) {
      console.error('Error adding component:', error)
      onUpdate(Array.isArray(page.content) ? page.content : [])
    }
  }

  const handleUpdateComponent = (id: string, content: any) => {
    const updatedContent = page.content.map(section =>
      section.id === id ? { ...section, content } : section
    )
    onUpdate(updatedContent)
    setPageContent(updatedContent)
  }

  const handleReorder = (dragIndex: number, hoverIndex: number) => {
    const newContent = [...page.content]
    const [draggedItem] = newContent.splice(dragIndex, 1)
    newContent.splice(hoverIndex, 0, draggedItem)
    onUpdate(newContent)
    setPageContent(newContent)
  }

  const handleDeleteComponent = (id: string) => {
    const updatedContent = page.content.filter(section => section.id !== id)
    onUpdate(updatedContent)
    setPageContent(updatedContent)
  }

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="flex h-[calc(100vh-4rem)] bg-gray-50">
        <main className={`flex-1 flex flex-col ${isPreview ? 'lg:mr-0' : ''}`}>
          {/* Top Bar - Always visible */}
          <div className="flex-shrink-0 bg-white border-b border-gray-200 p-4 flex justify-between items-center">
            <div className="flex items-center space-x-4">
              <h1 className="text-xl font-semibold">{page.title}</h1>
              {/* Desktop Preview Controls */}
              <div className="hidden lg:flex items-center space-x-2">
                <button
                  onClick={() => setIsPreview(!isPreview)}
                  className={`px-4 py-2 text-sm font-medium rounded-md transition-colors duration-200
                    ${isPreview 
                      ? 'bg-gray-700 text-white hover:bg-gray-800' 
                      : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50'
                    }`}
                >
                  {isPreview ? 'Exit Preview' : 'Preview Mode'}
                </button>
                {/* Device Toggle */}
                {isPreview && (
                  <div className="flex rounded-md border border-gray-300 p-1 bg-white">
                    <button
                      onClick={() => setPreviewDevice('desktop')}
                      className={`p-1.5 rounded transition-colors duration-200 ${
                        previewDevice === 'desktop' 
                          ? 'bg-gray-100 text-gray-900' 
                          : 'text-gray-500 hover:text-gray-900'
                      }`}
                      title="Desktop Preview"
                    >
                      <ComputerDesktopIcon className="w-5 h-5" />
                    </button>
                    <button
                      onClick={() => setPreviewDevice('tablet')}
                      className={`p-1.5 rounded transition-colors duration-200 ${
                        previewDevice === 'tablet' 
                          ? 'bg-gray-100 text-gray-900' 
                          : 'text-gray-500 hover:text-gray-900'
                      }`}
                      title="Tablet Preview"
                    >
                      <DeviceTabletIcon className="w-5 h-5" />
                    </button>
                    <button
                      onClick={() => setPreviewDevice('mobile')}
                      className={`p-1.5 rounded transition-colors duration-200 ${
                        previewDevice === 'mobile' 
                          ? 'bg-gray-100 text-gray-900' 
                          : 'text-gray-500 hover:text-gray-900'
                      }`}
                      title="Mobile Preview"
                    >
                      <DevicePhoneMobileIcon className="w-5 h-5" />
                    </button>
                  </div>
                )}
                {/* Preview in New Tab Button */}
                <button
                  onClick={() => {
                    const url = new URL('/preview', window.location.origin)
                    url.searchParams.set('device', previewDevice)
                    window.open(url.toString(), '_blank')
                  }}
                  className="flex items-center space-x-2 px-4 py-2 text-sm font-medium rounded-md bg-purple-600 text-white hover:bg-purple-700 transition-colors duration-200"
                >
                  <span>Preview Page</span>
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M11 3a1 1 0 100 2h2.586l-6.293 6.293a1 1 0 101.414 1.414L15 6.414V9a1 1 0 102 0V4a1 1 0 00-1-1h-5z" />
                    <path d="M5 5a2 2 0 00-2 2v8a2 2 0 002 2h8a2 2 0 002-2v-3a1 1 0 10-2 0v3H5V7h3a1 1 0 000-2H5z" />
                  </svg>
                </button>
              </div>
            </div>
            {/* Preview Mode Indicator */}
            {isPreview && (
              <div className="flex items-center space-x-2">
                <span className="text-sm font-medium text-gray-500">
                  {previewDevice.charAt(0).toUpperCase() + previewDevice.slice(1)} Preview
                </span>
              </div>
            )}
          </div>

          {/* Content Area */}
          <div className={`flex-1 overflow-y-auto ${isPreview ? 'pt-0' : 'pt-4'}`}>
            <div className={`relative min-h-full ${
              isPreview && previewDevice !== 'desktop'
                ? `max-w-${previewDevice === 'mobile' ? '[375px]' : '[768px]'} mx-auto shadow-lg rounded-lg overflow-hidden` 
                : ''
            }`}>
              <PageContent
                content={page.content}
                onUpdate={handleUpdateComponent}
                onReorder={handleReorder}
                onDelete={handleDeleteComponent}
                isPreview={isPreview}
                previewDevice={previewDevice}
              />
            </div>
          </div>
        </main>
        
        <ElementsSidebar 
          onAddElement={handleAddComponent} 
          isPreview={isPreview}
          onPreviewChange={setIsPreview}
        />
      </div>
    </DndProvider>
  )
}

function getDefaultContent(type: string) {
  switch (type) {
    case 'topbar':
      return {
        logo: '/example-logo.png',
        menuItems: [
          { id: 'menu-1', label: 'Home', link: '/' },
          { id: 'menu-2', label: 'Products', link: '/products' },
          { id: 'menu-3', label: 'About Us', link: '/about' },
          { id: 'menu-4', label: 'Blog', link: '/blog' },
          { id: 'menu-5', label: 'Contact', link: '/contact' }
        ],
        backgroundColor: '#ffffff',
        textColor: '#1a1a1a'
      }
    case 'transparent-topbar':
      return {
        logo: '/example-logo-white.png',
        logoPosition: 'center',
        menuItems: [
          { id: 'menu-1', label: 'Shop', link: '/shop' },
          { id: 'menu-2', label: 'New Arrivals', link: '/new' },
          { id: 'menu-3', label: 'Collections', link: '/collections' },
          { id: 'menu-4', label: 'Sale', link: '/sale' }
        ],
        textColor: '#ffffff'
      }
    case 'hero':
      return {
        title: 'Welcome to Our Store',
        description: 'Discover our amazing products and services.',
        buttonText: 'Get Started',
        buttonLink: '#',
        backgroundColor: '#ffffff',
        textColor: '#000000'
      }
    case 'products':
      return {
        title: 'Our Products',
        description: 'Explore our collection of high-quality products.',
        products: [
          {
            id: 'product-1',
            title: 'Product 1',
            description: 'Product description goes here.',
            price: '$99.99',
            imageUrl: '/placeholder.jpg'
          },
          {
            id: 'product-2',
            title: 'Product 2',
            description: 'Product description goes here.',
            price: '$149.99',
            imageUrl: '/placeholder.jpg'
          }
        ],
        backgroundColor: '#f9fafb',
        textColor: '#000000'
      }
    case 'contact':
      return {
        title: 'Contact Us',
        description: 'Get in touch with us for any questions or concerns.',
        backgroundColor: '#ffffff',
        textColor: '#000000'
      }
    case 'variety':
      return {
        title: 'Why Choose Us',
        description: 'Discover what makes us different from the competition.',
        items: [
          {
            id: 'item-1',
            title: 'Quality',
            description: 'We offer the highest quality products.',
            icon: 'M5 13l4 4L19 7'
          },
          {
            id: 'item-2',
            title: 'Service',
            description: 'Our customer service is second to none.',
            icon: 'M13 10V3L4 14h7v7l9-11h-7z'
          }
        ],
        backgroundColor: '#f9fafb',
        textColor: '#000000'
      }
    case 'testimonials':
      return {
        title: 'What Our Customers Say',
        description: 'Read testimonials from our satisfied customers.',
        testimonials: [
          {
            id: 'testimonial-1',
            quote: 'Great products and excellent service!',
            author: 'John Doe',
            role: 'Customer',
            imageUrl: '/placeholder.jpg',
            rating: 5
          },
          {
            id: 'testimonial-2',
            quote: 'I love shopping here!',
            author: 'Jane Smith',
            role: 'Customer',
            imageUrl: '/placeholder.jpg',
            rating: 5
          }
        ],
        backgroundColor: '#ffffff',
        textColor: '#000000'
      }
    case 'pricing':
      return {
        title: 'Our Pricing Plans',
        description: 'Choose the perfect plan for your needs.',
        plans: [
          {
            id: 'plan-1',
            name: 'Basic',
            price: '$29',
            period: 'month',
            description: 'Perfect for small businesses',
            features: ['Feature 1', 'Feature 2', 'Feature 3'],
            buttonText: 'Get Started',
            buttonLink: '#',
            isPopular: false
          },
          {
            id: 'plan-2',
            name: 'Pro',
            price: '$99',
            period: 'month',
            description: 'Best for growing businesses',
            features: ['Feature 1', 'Feature 2', 'Feature 3', 'Feature 4'],
            buttonText: 'Get Started',
            buttonLink: '#',
            isPopular: true
          }
        ],
        backgroundColor: '#f9fafb',
        textColor: '#000000'
      }
    case 'faq':
      return {
        title: 'Frequently Asked Questions',
        description: 'Find answers to common questions about our products and services.',
        faqs: [
          {
            id: 'faq-1',
            question: 'What payment methods do you accept?',
            answer: 'We accept all major credit cards, PayPal, and bank transfers.'
          },
          {
            id: 'faq-2',
            question: 'How long does shipping take?',
            answer: 'Shipping typically takes 3-5 business days within the continental US.'
          },
          {
            id: 'faq-3',
            question: 'What is your return policy?',
            answer: 'We offer a 30-day money-back guarantee on all products.'
          }
        ],
        backgroundColor: '#ffffff',
        textColor: '#000000'
      }
    default:
      return {}
  }
} 