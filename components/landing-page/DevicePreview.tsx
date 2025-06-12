import { useState, useEffect } from 'react'
import { Children, cloneElement, isValidElement, ReactElement } from 'react'
import { setUserAgent } from 'react-device-detect'

interface DevicePreviewProps {
  children: React.ReactNode
}

type DeviceSize = 'mobile' | 'tablet' | 'desktop'

interface PreviewProps {
  previewDevice?: DeviceSize
  isPreview?: boolean
  [key: string]: any // Allow additional props
}

const deviceSizes = {
  mobile: { width: '375px', height: '667px', userAgent: 'Mozilla/5.0 (iPhone; CPU iPhone OS 14_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/14.0 Mobile/15E148 Safari/604.1' },
  tablet: { width: '768px', height: '1024px', userAgent: 'Mozilla/5.0 (iPad; CPU OS 14_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/14.0 Mobile/15E148 Safari/604.1' },
  desktop: { width: '100%', height: '100%', userAgent: navigator.userAgent }
}

export default function DevicePreview({ children }: DevicePreviewProps) {
  const [deviceSize, setDeviceSize] = useState<DeviceSize>('desktop')

  // Update user agent when device size changes
  useEffect(() => {
    setUserAgent(deviceSizes[deviceSize].userAgent)
  }, [deviceSize])

  // Clone children with previewDevice prop
  const childrenWithProps = Children.map(children, child => {
    if (isValidElement(child)) {
      const element = child as ReactElement<PreviewProps>
      return cloneElement(element, {
        ...element.props,
        previewDevice: deviceSize,
        isPreview: true
      })
    }
    return child
  })

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
      <div className="mb-4 flex space-x-2">
        <button
          onClick={() => setDeviceSize('mobile')}
          className={`px-4 py-2 rounded-md flex items-center space-x-2 ${
            deviceSize === 'mobile'
              ? 'bg-indigo-600 text-white'
              : 'bg-white text-gray-700 hover:bg-gray-50'
          }`}
        >
          <svg
            className="w-5 h-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z"
            />
          </svg>
          <span>Mobile</span>
        </button>
        <button
          onClick={() => setDeviceSize('tablet')}
          className={`px-4 py-2 rounded-md flex items-center space-x-2 ${
            deviceSize === 'tablet'
              ? 'bg-indigo-600 text-white'
              : 'bg-white text-gray-700 hover:bg-gray-50'
          }`}
        >
          <svg
            className="w-5 h-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 18h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z"
            />
          </svg>
          <span>Tablet</span>
        </button>
        <button
          onClick={() => setDeviceSize('desktop')}
          className={`px-4 py-2 rounded-md flex items-center space-x-2 ${
            deviceSize === 'desktop'
              ? 'bg-indigo-600 text-white'
              : 'bg-white text-gray-700 hover:bg-gray-50'
          }`}
        >
          <svg
            className="w-5 h-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
            />
          </svg>
          <span>Desktop</span>
        </button>
      </div>

      <div
        className={`relative bg-white shadow-xl rounded-lg overflow-hidden ${
          deviceSize === 'desktop' ? 'w-full' : 'border-8 border-gray-800 rounded-[2rem]'
        }`}
        style={{
          width: deviceSizes[deviceSize].width,
          height: deviceSizes[deviceSize].height,
          maxHeight: '90vh'
        }}
      >
        {deviceSize !== 'desktop' && (
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-6 bg-gray-800 rounded-b-3xl" />
        )}
        <div className="overflow-auto h-full">
          {childrenWithProps}
        </div>
      </div>
    </div>
  )
} 