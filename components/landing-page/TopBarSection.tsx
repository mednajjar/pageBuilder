import { useState, useEffect } from 'react'
import Image from 'next/image'
import { Button } from '@/components/ui/Button'
import { isMobile, isTablet } from 'react-device-detect'

interface MenuItem {
  id: string
  label: string
  link: string
}

interface TopBarSectionProps {
  id: string
  content: {
    logo: string
    menuItems: MenuItem[]
    backgroundColor: string
    textColor: string
  }
  onUpdate: (id: string, content: any) => void
  isEditing?: boolean
  setIsEditing?: (isEditing: boolean) => void
  isPreview?: boolean
  previewDevice?: 'mobile' | 'tablet' | 'desktop'
}

export default function TopBarSection({ 
  id, 
  content, 
  onUpdate,
  isEditing = false,
  setIsEditing = () => {},
  isPreview = false,
  previewDevice = 'desktop'
}: TopBarSectionProps) {
  const [editedContent, setEditedContent] = useState(content)
  const [newMenuItem, setNewMenuItem] = useState({ label: '', link: '' })
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [windowWidth, setWindowWidth] = useState(typeof window !== 'undefined' ? window.innerWidth : 0)

  // Determine if we should show mobile/tablet view
  const showMobileView = isPreview 
    ? previewDevice === 'mobile' || previewDevice === 'tablet'
    : windowWidth <= 1024

  // Update window width on resize
  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth)
      if (window.innerWidth > 1024) {
        setIsMobileMenuOpen(false)
      }
    }

    if (typeof window !== 'undefined') {
      window.addEventListener('resize', handleResize)
      return () => window.removeEventListener('resize', handleResize)
    }
  }, [])

  // Close mobile menu when switching preview device
  useEffect(() => {
    setIsMobileMenuOpen(false)
  }, [previewDevice])

  const handleLogoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        setEditedContent({ ...editedContent, logo: reader.result as string })
      }
      reader.readAsDataURL(file)
    }
  }

  const handleAddMenuItem = () => {
    if (newMenuItem.label && newMenuItem.link) {
      const updatedMenuItems = [
        ...editedContent.menuItems,
        { ...newMenuItem, id: `menu-${Date.now()}` }
      ]
      setEditedContent({ ...editedContent, menuItems: updatedMenuItems })
      setNewMenuItem({ label: '', link: '' })
    }
  }

  const handleRemoveMenuItem = (itemId: string) => {
    const updatedMenuItems = editedContent.menuItems.filter(item => item.id !== itemId)
    setEditedContent({ ...editedContent, menuItems: updatedMenuItems })
  }

  const handleSave = () => {
    onUpdate(id, editedContent)
    setIsEditing(false)
  }

  if (isEditing && !isPreview) {
    return (
      <div className="p-6 border rounded-lg bg-white">
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">Logo</label>
            <input
              type="file"
              accept="image/*"
              onChange={handleLogoChange}
              className="w-full"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Background Color</label>
            <input
              type="color"
              value={editedContent.backgroundColor}
              onChange={(e) => setEditedContent({ ...editedContent, backgroundColor: e.target.value })}
              className="w-full"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Text Color</label>
            <input
              type="color"
              value={editedContent.textColor}
              onChange={(e) => setEditedContent({ ...editedContent, textColor: e.target.value })}
              className="w-full"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Menu Items</label>
            {editedContent.menuItems.map((item) => (
              <div key={item.id} className="flex items-center space-x-2 mb-2">
                <input
                  type="text"
                  value={item.label}
                  onChange={(e) => {
                    const updatedItems = editedContent.menuItems.map((menuItem) =>
                      menuItem.id === item.id
                        ? { ...menuItem, label: e.target.value }
                        : menuItem
                    )
                    setEditedContent({ ...editedContent, menuItems: updatedItems })
                  }}
                  className="flex-1 border rounded px-2 py-1"
                  placeholder="Label"
                />
                <input
                  type="text"
                  value={item.link}
                  onChange={(e) => {
                    const updatedItems = editedContent.menuItems.map((menuItem) =>
                      menuItem.id === item.id
                        ? { ...menuItem, link: e.target.value }
                        : menuItem
                    )
                    setEditedContent({ ...editedContent, menuItems: updatedItems })
                  }}
                  className="flex-1 border rounded px-2 py-1"
                  placeholder="Link"
                />
                <button
                  onClick={() => handleRemoveMenuItem(item.id)}
                  className="text-red-500 hover:text-red-700"
                >
                  Remove
                </button>
              </div>
            ))}

            <div className="flex items-center space-x-2 mt-2">
              <input
                type="text"
                value={newMenuItem.label}
                onChange={(e) => setNewMenuItem({ ...newMenuItem, label: e.target.value })}
                className="flex-1 border rounded px-2 py-1"
                placeholder="New menu item label"
              />
              <input
                type="text"
                value={newMenuItem.link}
                onChange={(e) => setNewMenuItem({ ...newMenuItem, link: e.target.value })}
                className="flex-1 border rounded px-2 py-1"
                placeholder="New menu item link"
              />
              <button
                onClick={handleAddMenuItem}
                className="text-blue-500 hover:text-blue-700"
              >
                Add
              </button>
            </div>
          </div>

          <div className="flex justify-end space-x-2">
            <Button
              variant="outline"
              onClick={() => {
                setEditedContent(content)
                setIsEditing(false)
              }}
            >
              Cancel
            </Button>
            <Button onClick={handleSave}>Save Changes</Button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="relative">
      <nav
        className={`w-full mx-auto px-4 py-4 relative ${
          previewDevice === 'mobile' ? 'phone' : 
          previewDevice === 'tablet' ? 'tablet' : 
          'desktop'
        }`}
        style={{ backgroundColor: content.backgroundColor }}
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            {content.logo && content.logo !== '/example-logo.png' ? (
              <Image
                src={content.logo}
                alt="Logo"
                width={previewDevice === 'mobile' ? 90 : 120}
                height={previewDevice === 'mobile' ? 30 : 40}
                className="object-contain"
              />
            ) : (
              <svg
                width={previewDevice === 'mobile' ? "90" : "120"}
                height={previewDevice === 'mobile' ? "30" : "40"}
                viewBox="0 0 120 40"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="object-contain"
              >
                <path
                  d="M20 10h-6c-2.2 0-4 1.8-4 4v12c0 2.2 1.8 4 4 4h12c2.2 0 4-1.8 4-4v-6"
                  stroke={content.textColor}
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M30 10l-5.5-5.5M30 10l-5.5 5.5M30 10h-10"
                  stroke={content.textColor}
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <text
                  x="45"
                  y="25"
                  style={{ fill: content.textColor, fontSize: '16px', fontWeight: 'bold' }}
                >
                  LOGO
                </text>
              </svg>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className={`${
              showMobileView ? 'block' : 'lg:hidden block'
            } inline-flex items-center p-2 rounded-md hover:opacity-80 ml-auto lg:ml-0`}
            style={{ color: content.textColor }}
          >
            <svg
              className={`${previewDevice === 'mobile' ? 'h-5 w-5' : 'h-6 w-6'}`}
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              {isMobileMenuOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>

          {/* Desktop Menu */}
          <div className={`${
            showMobileView ? 'hidden' : 'lg:flex hidden'
          } items-center space-x-6`}>
            {content.menuItems.map((item) => (
              <a
                key={item.id}
                href={item.link}
                className="text-sm font-medium hover:opacity-80 transition-opacity"
                style={{ color: content.textColor }}
              >
                {item.label}
              </a>
            ))}
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div 
            className={`${
              showMobileView ? 'block' : 'lg:hidden block'
            } fixed lg:absolute top-[72px] lg:top-full left-0 right-0 z-50 shadow-lg min-h-[calc(100vh-72px)] lg:min-h-0 ${
              previewDevice === 'mobile' ? 'phone' : 
              previewDevice === 'tablet' ? 'tablet' : 
              'desktop'
            }`}
            style={{ backgroundColor: content.backgroundColor }}
          >
            <div className="mx-auto px-4 py-6 space-y-4">
              {content.menuItems.map((item) => (
                <a
                  key={item.id}
                  href={item.link}
                  className={`block ${
                    previewDevice === 'mobile' ? 'text-sm' : 'text-base'
                  } font-medium hover:opacity-80 transition-opacity text-center`}
                  style={{ color: content.textColor }}
                >
                  {item.label}
                </a>
              ))}
            </div>
          </div>
        )}
      </nav>

      <style jsx>{`
        .phone {
          max-width: 375px;
          margin-left: auto;
          margin-right: auto;
        }
        .tablet {
          max-width: 768px;
          margin-left: auto;
          margin-right: auto;
        }
        .desktop {
          max-width: 1280px;
          margin-left: auto;
          margin-right: auto;
        }
      `}</style>
    </div>
  )
} 