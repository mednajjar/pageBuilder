import { useState, useEffect } from 'react'
import { useSearchParams } from 'next/navigation'
import TopBarSection from '@/components/landing-page/TopBarSection'
import { usePageStore } from '@/store/pageStore'
import PageContent from '@/components/landing-page/PageContent'

export default function PreviewPage() {
  const searchParams = useSearchParams()
  const initialDevice = (searchParams?.get('device') as 'mobile' | 'tablet' | 'desktop') || 'desktop'
  const initialViewMode = (searchParams?.get('mode') as 'frame' | 'full') || 'frame'

  const [previewDevice, setPreviewDevice] = useState<'mobile' | 'tablet' | 'desktop'>(initialDevice)
  const [viewMode, setViewMode] = useState<'frame' | 'full'>(initialViewMode)
  
  const pageContent = usePageStore(state => state.pageContent)
  const pageTitle = usePageStore(state => state.pageTitle)

  const handleOpenInNewTab = () => {
    const url = new URL(window.location.href)
    url.searchParams.set('device', previewDevice)
    url.searchParams.set('mode', viewMode)
    window.open(url.toString(), '_blank')
  }

  if (!pageContent.length) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="text-center">
          <h1 className="text-2xl font-semibold text-gray-800 mb-2">No Content Available</h1>
          <p className="text-gray-600">Please create some content in the page builder first.</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Fixed Control Panels */}
      <div className="fixed bottom-4 left-1/2 transform -translate-x-1/2 flex flex-col items-center gap-4 z-50">
        {/* Device Controls */}
        <div className="bg-white rounded-full shadow-lg px-4 py-2">
          <div className="flex items-center space-x-4">
            <div className="flex space-x-4">
              <button
                onClick={() => setPreviewDevice('mobile')}
                className={`px-4 py-2 rounded-full transition-colors ${
                  previewDevice === 'mobile'
                    ? 'bg-blue-500 text-white'
                    : 'hover:bg-gray-100'
                }`}
              >
                Mobile
              </button>
              <button
                onClick={() => setPreviewDevice('tablet')}
                className={`px-4 py-2 rounded-full transition-colors ${
                  previewDevice === 'tablet'
                    ? 'bg-blue-500 text-white'
                    : 'hover:bg-gray-100'
                }`}
              >
                Tablet
              </button>
              <button
                onClick={() => setPreviewDevice('desktop')}
                className={`px-4 py-2 rounded-full transition-colors ${
                  previewDevice === 'desktop'
                    ? 'bg-blue-500 text-white'
                    : 'hover:bg-gray-100'
                }`}
              >
                Desktop
              </button>
            </div>
          </div>
        </div>

        {/* View Mode Controls */}
        <div className="bg-white rounded-full shadow-lg px-4 py-2">
          <div className="flex space-x-4">
            <button
              onClick={() => setViewMode('frame')}
              className={`px-4 py-2 rounded-full transition-colors ${
                viewMode === 'frame'
                  ? 'bg-green-500 text-white'
                  : 'hover:bg-gray-100'
              }`}
            >
              Device Frame
            </button>
            <button
              onClick={() => setViewMode('full')}
              className={`px-4 py-2 rounded-full transition-colors ${
                viewMode === 'full'
                  ? 'bg-green-500 text-white'
                  : 'hover:bg-gray-100'
              }`}
            >
              Full Width
            </button>
          </div>
        </div>
      </div>

      {/* Preview Content */}
      <div className="p-8">
        <div
          className={`mx-auto bg-white ${
            viewMode === 'frame' ? (
              previewDevice === 'mobile'
                ? 'max-w-[375px] rounded-3xl shadow-lg'
                : previewDevice === 'tablet'
                ? 'max-w-[768px] rounded-3xl shadow-lg'
                : 'max-w-[1280px]'
            ) : (
              previewDevice === 'mobile'
                ? 'w-full max-w-[375px]'
                : previewDevice === 'tablet'
                ? 'w-full max-w-[768px]'
                : 'w-full max-w-[1280px]'
            )
          }`}
        >
          {/* Device Frame Header */}
          {viewMode === 'frame' && (previewDevice === 'mobile' || previewDevice === 'tablet') && (
            <div className="h-6 border-b flex items-center justify-center">
              <div className="w-16 h-4 bg-gray-200 rounded-full"></div>
            </div>
          )}

          {/* Preview Content */}
          <div className={`${viewMode === 'frame' && previewDevice !== 'desktop' ? 'p-4' : ''}`}>
            <PageContent
              content={pageContent}
              onUpdate={() => {}}
              onReorder={() => {}}
              onDelete={() => {}}
              isPreview={true}
              previewDevice={previewDevice}
            />
          </div>
        </div>
      </div>
    </div>
  )
} 