import { useState } from 'react'
import { ChevronLeftIcon, ChevronRightIcon, EyeIcon, EyeSlashIcon } from '@heroicons/react/24/outline'

interface ElementsSidebarProps {
  onAddElement: (type: string) => void
  isPreview?: boolean
  onPreviewChange?: (isPreview: boolean) => void
}

const elements = [
  {
    type: 'topbar',
    name: 'Top Bar',
    description: 'A customizable navigation bar with logo and menu',
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h8m-8 6h16" />
      </svg>
    )
  },
  {
    type: 'transparent-topbar',
    name: 'Transparent Top Bar',
    description: 'A transparent navigation bar with adjustable logo position',
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h8m-8 6h16" />
      </svg>
    )
  },
  {
    type: 'hero',
    name: 'Hero Section',
    description: 'A large header section with title, text, and call to action',
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
      </svg>
    )
  },
  {
    type: 'features',
    name: 'Features Grid',
    description: 'Display your product features in a grid layout',
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
      </svg>
    )
  },
  {
    type: 'testimonials',
    name: 'Testimonials',
    description: 'Show customer testimonials in a carousel',
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
      </svg>
    )
  },
  {
    type: 'pricing',
    name: 'Pricing Table',
    description: 'Display your pricing plans',
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    )
  },
  {
    type: 'cta',
    name: 'Call to Action',
    description: 'Add a compelling call to action section',
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5.882V19.24a1.76 1.76 0 01-3.417.592l-2.147-6.15M18 13a3 3 0 100-6M5.436 13.683A4.001 4.001 0 017 6h1.832c4.1 0 7.625-1.234 9.168-3v14c-1.543-1.766-5.067-3-9.168-3H7a3.988 3.988 0 01-1.564-.317z" />
      </svg>
    )
  }
]

export default function ElementsSidebar({ 
  onAddElement, 
  isPreview = false,
  onPreviewChange = () => {}
}: ElementsSidebarProps) {
  const [isCollapsed, setIsCollapsed] = useState(false)
  const [isMobileOpen, setIsMobileOpen] = useState(false)

  return (
    <>
      {/* Mobile Overlay */}
      {isMobileOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={() => setIsMobileOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div
        className={`fixed inset-y-0 right-0 top-16 bg-card shadow-lg transform transition-all duration-300 ease-in-out z-30
          ${(isMobileOpen && !isPreview) ? 'translate-x-0' : 'translate-x-full'}
          ${isCollapsed ? 'w-[72px]' : 'w-80'}
          ${(!isPreview) ? 'lg:translate-x-0' : 'lg:translate-x-full'}
        `}
      >
        {/* Collapse Toggle (Desktop only) */}
        <button
          className="hidden lg:flex absolute -left-3 top-20 transform items-center justify-center bg-white rounded-full p-1.5 shadow-md hover:bg-gray-50 group"
          onClick={() => setIsCollapsed(!isCollapsed)}
        >
          {isCollapsed ? (
            <>
              <ChevronRightIcon className="w-4 h-4 text-gray-600" />
              <span className="absolute left-full ml-2 px-2 py-1 bg-gray-800 text-white text-xs rounded opacity-0 group-hover:opacity-100 whitespace-nowrap">
                Expand sidebar
              </span>
            </>
          ) : (
            <>
              <ChevronLeftIcon className="w-4 h-4 text-gray-600" />
              <span className="absolute left-full ml-2 px-2 py-1 bg-gray-800 text-white text-xs rounded opacity-0 group-hover:opacity-100 whitespace-nowrap">
                Collapse sidebar
              </span>
            </>
          )}
        </button>

        <div className="h-[calc(100vh-4rem)] overflow-y-auto">
          <div className="p-4">
            <h2 
              className={`text-lg font-semibold mb-4 transition-all duration-200 ease-in-out px-2
                ${isCollapsed ? 'text-2xl' : ''}
              `}
            >
              {isCollapsed ? '+' : 'Add Elements'}
            </h2>
            <div className="space-y-3">
              {elements.map((element) => (
                <button
                  key={element.type}
                  onClick={() => {
                    onAddElement(element.type)
                    if (window.innerWidth < 1024) {
                      setIsMobileOpen(false)
                    }
                  }}
                  className={`w-full rounded-lg transition-all duration-200 ease-in-out group relative
                    ${isCollapsed 
                      ? 'p-2 flex items-center hover:bg-accent/50' 
                      : 'p-3 flex items-start space-x-3 hover:bg-accent/50'
                    }
                  `}
                >
                  <div className={`text-gray-600 shrink-0 transition-transform duration-200 ${
                    isCollapsed ? 'transform hover:scale-110 ml-1' : ''
                  }`}>
                    {element.icon}
                  </div>
                  {isCollapsed ? (
                    <span className="absolute left-full ml-2 px-2 py-1 bg-gray-800 text-white text-xs rounded opacity-0 group-hover:opacity-100 whitespace-nowrap z-50">
                      {element.name}
                    </span>
                  ) : (
                    <div className="min-w-0">
                      <h3 className="font-medium text-gray-900 truncate">{element.name}</h3>
                      <p className="text-sm text-gray-500 line-clamp-2">{element.description}</p>
                    </div>
                  )}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Content Margin (Desktop only) */}
      <div
        className={`hidden lg:block transition-all duration-300 ease-in-out
          ${isCollapsed ? 'mr-[72px]' : 'mr-80'}
          ${isPreview ? '!mr-0' : ''}
        `}
      />

      {/* Mobile Controls - Always visible in mobile, hidden in desktop */}
      <div className="fixed bottom-4 right-4 flex items-center space-x-2 lg:hidden z-50">
        {/* Preview Toggle */}
        <button
          className={`p-3 rounded-full shadow-lg transition-colors duration-200
            ${isPreview 
              ? 'bg-gray-700 text-white hover:bg-gray-800' 
              : 'bg-indigo-600 text-white hover:bg-indigo-700'
            }`}
          onClick={() => {
            onPreviewChange(!isPreview)
            if (!isPreview) {
              setIsMobileOpen(false)
            }
          }}
          title={isPreview ? "Exit Preview" : "Enter Preview"}
        >
          {isPreview ? (
            <EyeSlashIcon className="w-6 h-6" />
          ) : (
            <EyeIcon className="w-6 h-6" />
          )}
        </button>

        {/* Sidebar Toggle - Only show when not in preview mode */}
        {!isPreview && (
          <button
            className="bg-indigo-600 text-white p-3 rounded-full shadow-lg hover:bg-indigo-700 transition-colors duration-200"
            onClick={() => setIsMobileOpen(!isMobileOpen)}
          >
            {isMobileOpen ? (
              <ChevronLeftIcon className="w-6 h-6" />
            ) : (
              <ChevronRightIcon className="w-6 h-6" />
            )}
          </button>
        )}
      </div>
    </>
  )
} 