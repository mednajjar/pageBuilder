import { useState, useEffect } from 'react'
import Image from 'next/image'
import { Button } from '@/components/ui/Button'

interface MenuItem {
  id: string
  label: string
  link: string
}

interface TransparentTopBarSectionProps {
  id: string
  content: {
    logo: string
    logoPosition: 'left' | 'center'
    menuItems: MenuItem[]
    textColor: string
  }
  onUpdate: (id: string, content: any) => void
  isEditing?: boolean
  setIsEditing?: (isEditing: boolean) => void
  isPreview?: boolean
  previewDevice?: 'mobile' | 'tablet' | 'desktop'
}

export default function TransparentTopBarSection({
  id,
  content,
  onUpdate,
  isEditing = false,
  setIsEditing = () => {},
  isPreview = false,
  previewDevice = 'desktop'
}: TransparentTopBarSectionProps) {
  const [editedContent, setEditedContent] = useState(content)
  const [newMenuItem, setNewMenuItem] = useState({ label: '', link: '' })
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  // Determine if we should show mobile/tablet view based on preview mode
  const showMobileView = isPreview 
    ? previewDevice === 'mobile' || previewDevice === 'tablet'
    : false // Let CSS handle the responsive behavior

  // Close mobile menu when switching to desktop view or when preview device changes
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
            <label className="block text-sm font-medium mb-1">Logo Position</label>
            <select
              value={editedContent.logoPosition}
              onChange={(e) => setEditedContent({
                ...editedContent,
                logoPosition: e.target.value as 'left' | 'center'
              })}
              className="w-full border rounded px-2 py-1"
            >
              <option value="left">Left</option>
              <option value="center">Center</option>
            </select>
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
      <nav className="absolute top-0 left-0 right-0 z-40 bg-transparent backdrop-blur-sm">
        <div className="container mx-auto px-4 py-4">
          <div className={`flex items-center ${
            content.logoPosition === 'center' 
              ? 'flex-col space-y-4 md:space-y-0 md:flex-row md:justify-between'
              : 'justify-between'
          }`}>
            {/* Logo */}
            <div className={`flex items-center ${
              content.logoPosition === 'center' ? 'md:absolute md:left-1/2 md:-translate-x-1/2' : ''
            }`}>
              {content.logo && content.logo !== '/example-logo-white.png' ? (
                <Image
                  src={content.logo}
                  alt="Logo"
                  width={120}
                  height={40}
                  className="object-contain"
                />
              ) : (
                <svg
                  width="120"
                  height="40"
                  viewBox="0 0 120 40"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="object-contain"
                >
                  <path
                    d="M15 20c0-8.284 6.716-15 15-15 8.284 0 15 6.716 15 15 0 8.284-6.716 15-15 15"
                    stroke={content.textColor}
                    strokeWidth="2"
                    strokeLinecap="round"
                  />
                  <path
                    d="M30 35c-5.523 0-10-4.477-10-10s4.477-10 10-10 10 4.477 10 10"
                    stroke={content.textColor}
                    strokeWidth="2"
                    strokeLinecap="round"
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
              } inline-flex items-center p-2 rounded-md hover:opacity-80`}
              style={{ color: content.textColor }}
            >
              <svg
                className="h-6 w-6"
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
            <div className={`${
              showMobileView ? 'block' : 'lg:hidden block'
            } absolute top-full left-0 right-0 z-50 shadow-lg backdrop-blur-sm bg-white/80`}>
              <div className={`px-4 py-3 space-y-3 ${
                previewDevice === 'tablet' ? 'max-w-2xl mx-auto' : ''
              }`}>
                {content.menuItems.map((item) => (
                  <a
                    key={item.id}
                    href={item.link}
                    className="block text-sm font-medium hover:opacity-80 transition-opacity"
                    style={{ color: content.textColor }}
                  >
                    {item.label}
                  </a>
                ))}
              </div>
            </div>
          )}
        </div>
      </nav>
    </div>
  )
} 