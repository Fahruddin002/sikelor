"use client"

import { useState } from "react"

export default function ScanNavbar({ onNavigate }) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  const handleNavigation = (page) => {
    onNavigate(page)
    setIsMobileMenuOpen(false)
  }

  return (
    <>
      <nav className="fixed w-full z-50 flex items-center justify-between px-4 md:px-8 py-4 md:py-6 bg-white shadow-sm">
        <div className="flex items-center">
          <img src="/src/assets/logo-away.png" alt="SIKELOR Logo" className="h-8 md:h-12 object-contain" />
        </div>

        {/* Desktop Navigation */}
        <ul className="hidden md:flex space-x-8 font-medium text-gray-700">
          <li>
            <a
              href="#"
              onClick={(e) => {
                e.preventDefault()
                handleNavigation("home")
              }}
              className="hover:text-green-600 transition-colors"
            >
              Home
            </a>
          </li>
          <li>
            <a
              href="#"
              onClick={(e) => {
                e.preventDefault()
                handleNavigation("event")
              }}
              className="hover:text-green-600 transition-colors"
            >
              Event
            </a>
          </li>
          <li>
            <a
              href="#"
              onClick={(e) => {
                e.preventDefault()
                handleNavigation("articles")
              }}
              className="hover:text-green-600 transition-colors"
            >
              Artikel
            </a>
          </li>
          <li>
            <a
              href="#"
              onClick={(e) => {
                e.preventDefault()
                handleNavigation("collections")
              }}
              className="hover:text-green-600 transition-colors duration-200"
            >
              Collections
            </a>
          </li>
          <li>
            <a
              href="#"
              onClick={(e) => {
                e.preventDefault()
                handleNavigation("about")
              }}
              className="hover:text-green-600 transition-colors"
            >
              About
            </a>
          </li>
        </ul>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="md:hidden text-gray-700"
          aria-label="Toggle mobile menu"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            {isMobileMenuOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>
      </nav>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 bg-black/50 z-40 md:hidden" onClick={() => setIsMobileMenuOpen(false)} />
      )}

      {/* Mobile Menu */}
      <div
        className={`fixed top-0 right-0 h-full w-64 bg-white z-50 transform transition-transform duration-300 md:hidden shadow-xl ${
          isMobileMenuOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="p-6">
          <div className="flex items-center justify-between mb-8">
            <img src="/src/assets/logo-away.png" alt="SIKELOR Logo" className="h-8 object-contain" />
            <button onClick={() => setIsMobileMenuOpen(false)} className="text-gray-700">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          <ul className="space-y-4">
            <li>
              <a
                href="#"
                onClick={(e) => {
                  e.preventDefault()
                  handleNavigation("home")
                }}
                className="block text-gray-700 text-lg font-medium py-3 px-4 rounded-lg hover:bg-gray-100 transition-colors"
              >
                Home
              </a>
            </li>
            <li>
              <a
                href="#"
                onClick={(e) => {
                  e.preventDefault()
                  handleNavigation("event")
                }}
                className="block text-gray-700 text-lg font-medium py-3 px-4 rounded-lg hover:bg-gray-100 transition-colors"
              >
                Event
              </a>
            </li>
            <li>
              <a
                href="#"
                onClick={(e) => {
                  e.preventDefault()
                  handleNavigation("articles")
                }}
                className="block text-gray-700 text-lg font-medium py-3 px-4 rounded-lg hover:bg-gray-100 transition-colors"
              >
                Artikel
              </a>
            </li>
             <li>
              <a
                href="#"
                onClick={(e) => {
                  e.preventDefault()
                  handleNavigation("collections")
                }}
                className="block text-gray-700 text-lg font-medium py-3 px-4 rounded-lg hover:bg-gray-100 transition-colors"
              >
                Collections
              </a>
            </li>
            <li>
              <a
                href="#"
                onClick={(e) => {
                  e.preventDefault()
                  handleNavigation("about")
                }}
                className="block text-gray-700 text-lg font-medium py-3 px-4 rounded-lg hover:bg-gray-100 transition-colors"
              >

                
                About
              </a>
            </li>
          </ul>
        </div>
      </div>
    </>
  )
}
