import Link from 'next/link'
import { Suspense } from 'react'

// Separate the features section into its own component
function Features() {
  return (
    <div className="py-12 bg-white">
      <div className="max-w-xl mx-auto px-4 sm:px-6 lg:max-w-7xl lg:px-8">
        <h2 className="sr-only">Features</h2>
        <div className="grid grid-cols-1 gap-y-16 sm:grid-cols-2 sm:gap-x-6 lg:grid-cols-3 lg:gap-x-8">
          <div className="flex flex-col">
            <dt className="text-lg leading-6 font-medium text-gray-900">
              Drag and Drop
            </dt>
            <dd className="mt-2 text-base text-gray-500">
              Easily create and customize your landing pages with our intuitive drag-and-drop interface.
            </dd>
          </div>

          <div className="flex flex-col">
            <dt className="text-lg leading-6 font-medium text-gray-900">
              Responsive Design
            </dt>
            <dd className="mt-2 text-base text-gray-500">
              Your landing pages will look great on all devices, from mobile to desktop.
            </dd>
          </div>

          <div className="flex flex-col">
            <dt className="text-lg leading-6 font-medium text-gray-900">
              Custom Components
            </dt>
            <dd className="mt-2 text-base text-gray-500">
              Choose from a variety of pre-built components or create your own custom ones.
            </dd>
          </div>
        </div>
      </div>
    </div>
  )
}

// Static metadata for better SEO
export const metadata = {
  title: 'Page Builder - Create Beautiful Landing Pages',
  description: 'Create stunning landing pages with our drag-and-drop builder. No coding required.',
}

// Static page component
export default function Home() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-6">
          <div className="flex items-center">
            <h1 className="text-3xl font-bold text-gray-900">Page Builder</h1>
          </div>
          <div className="flex items-center space-x-4">
            <Link
              href="/auth/signin"
              prefetch={true}
              className="text-gray-600 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium"
            >
              Sign in
            </Link>
            <Link
              href="/auth/register"
              prefetch={true}
              className="bg-indigo-600 text-white hover:bg-indigo-700 px-4 py-2 rounded-md text-sm font-medium"
            >
              Register
            </Link>
          </div>
        </div>

        <div className="max-w-7xl mx-auto py-16 px-4 sm:py-24 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-extrabold text-gray-900 sm:text-5xl md:text-6xl">
            Build Beautiful Landing Pages
          </h2>
          <p className="mt-3 max-w-md mx-auto text-base text-gray-500 sm:text-lg md:mt-5 md:text-xl md:max-w-3xl">
            Create stunning landing pages with our drag-and-drop builder. No coding required.
          </p>
          <div className="mt-5 max-w-md mx-auto sm:flex sm:justify-center md:mt-8">
            <div className="rounded-md shadow">
              <Link
                href="/auth/register"
                prefetch={true}
                className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 md:py-4 md:text-lg md:px-10"
              >
                Get Started
              </Link>
            </div>
            <div className="mt-3 sm:mt-0 sm:ml-3">
              <Link
                href="/auth/signin"
                prefetch={true}
                className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-indigo-700 bg-indigo-100 hover:bg-indigo-200 md:py-4 md:text-lg md:px-10"
              >
                Sign In
              </Link>
            </div>
          </div>
        </div>

        <Suspense fallback={
          <div className="animate-pulse">
            <div className="h-48 bg-gray-200 rounded mb-8"></div>
          </div>
        }>
          <Features />
        </Suspense>
      </div>
    </div>
  )
} 