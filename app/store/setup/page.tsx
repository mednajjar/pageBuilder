'use client'

import { useState, useMemo } from 'react'
import { useRouter } from 'next/navigation'

const languages = [
  { code: 'en', name: 'English' },
  { code: 'ar', name: 'العربية' }
]

const currencies = [
  { code: 'USD', name: 'USD (US Dollar)', symbol: '$' },
  { code: 'MAD', name: 'MAD (Moroccan Dirham)', symbol: 'DH' },
  { code: 'EUR', name: 'EUR (Euro)', symbol: '€' },
  { code: 'SAR', name: 'SAR (Saudi Riyal)', symbol: '﷼' },
  { code: 'KWD', name: 'KWD (Kuwaiti Dinar)', symbol: 'د.ك' },
  { code: 'AED', name: 'AED (UAE Dirham)', symbol: 'د.إ' },
  { code: 'BHD', name: 'BHD (Bahraini Dinar)', symbol: '.د.ب' },
  { code: 'JOD', name: 'JOD (Jordanian Dinar)', symbol: 'د.ا' },
  { code: 'QAR', name: 'QAR (Qatari Riyal)', symbol: 'ر.ق' },
  { code: 'OMR', name: 'OMR (Omani Rial)', symbol: 'ر.ع.' }
]

export default function StoreSetup() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [formData, setFormData] = useState({
    storeName: '',
    language: 'en',
    currency: 'USD'
  })

  const subdomain = useMemo(() => {
    return formData.storeName.toLowerCase().replace(/[^a-z0-9]/g, '')
  }, [formData.storeName])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)
    setLoading(true)

    try {
      const response = await fetch('/api/store/setup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: formData.storeName,
          subdomain: `${subdomain}.pagebuilder.com`,
          language: formData.language,
          currency: formData.currency
        }),
      })

      if (!response.ok) {
        const data = await response.json()
        throw new Error(data.error || 'Failed to setup store')
      }

      // Redirect to dashboard after successful setup
      router.push('/dashboard')
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to setup store')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Set up your store
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            Just a few more details to get your store ready
          </p>
        </div>

        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="rounded-md shadow-sm space-y-4">
            <div>
              <label htmlFor="storeName" className="block text-sm font-medium text-gray-700">
                Store Name
              </label>
              <div className="mt-1 flex rounded-md shadow-sm">
                <input
                  id="storeName"
                  name="storeName"
                  type="text"
                  required
                  value={formData.storeName}
                  onChange={handleChange}
                  className="flex-1 min-w-0 block w-full px-3 py-2 rounded-none rounded-l-md focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm border-gray-300"
                  placeholder="mystore"
                />
                <span className="inline-flex items-center px-3 rounded-r-md border border-l-0 border-gray-300 bg-gray-50 text-gray-500 sm:text-sm">
                  .pagebuilder.com
                </span>
              </div>
              {formData.storeName && (
                <p className="mt-2 text-sm text-gray-500">
                  Your store will be available at: {subdomain}.pagebuilder.com
                </p>
              )}
            </div>

            <div>
              <label htmlFor="language" className="block text-sm font-medium text-gray-700">
                Language
              </label>
              <select
                id="language"
                name="language"
                value={formData.language}
                onChange={handleChange}
                className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
              >
                {languages.map(lang => (
                  <option key={lang.code} value={lang.code}>
                    {lang.name}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label htmlFor="currency" className="block text-sm font-medium text-gray-700">
                Currency
              </label>
              <select
                id="currency"
                name="currency"
                value={formData.currency}
                onChange={handleChange}
                className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
              >
                {currencies.map(currency => (
                  <option key={currency.code} value={currency.code}>
                    {currency.name}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {error && (
            <div className="text-red-500 text-sm text-center">{error}</div>
          )}

          <div>
            <button
              type="submit"
              disabled={loading || !subdomain}
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50"
            >
              {loading ? 'Setting up...' : 'Complete Setup'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
} 