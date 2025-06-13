"use client"

import { useState, useEffect } from "react"
import { startViewTransition } from "../utils/transitions"

export default function Navbar({ onNavigate, currentPage = "home" }) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)

  const handleNavigation = (page) => {
    startViewTransition(() => {
      onNavigate(page)
    })
    setIsMobileMenuOpen(false)
  }

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen)
  }

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY
      setIsScrolled(scrollTop > 20)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <>
      <nav
        className={`fixed w-full z-20 flex items-center justify-between sm:px-10 py-4 h-[90px] transition-all duration-300 ${
          isScrolled ? "bg-black/40 backdrop-blur-sm" : "bg-transparent"
        }`}
      >
        <img src="/src/assets/logo-home.png" alt="SIKELOR Logo" className="h-[80px] md:h-[105px] object-contain" />

        {/* Desktop Navigation */}
        <ul className="hidden md:flex space-x-8 font-semibold text-white gap-3">
          <li>
            <a
              href="#"
              onClick={(e) => {
                e.preventDefault()
                handleNavigation("home")
              }}
              className="transition-all duration-200 relative after:absolute after:left-0 after:bottom-0 after:w-0 after:h-[2px] after:bg-white after:transition-all after:duration-300 hover:after:w-full"
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
              className="transition-all duration-200 relative after:absolute after:left-0 after:bottom-0 after:w-0 after:h-[2px] after:bg-white after:transition-all after:duration-300 hover:after:w-full"
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
              className="transition-all duration-200 relative after:absolute after:left-0 after:bottom-0 after:w-0 after:h-[2px] after:bg-white after:transition-all after:duration-300 hover:after:w-full"
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
              className="transition-all duration-200 relative after:absolute after:left-0 after:bottom-0 after:w-0 after:h-[2px] after:bg-white after:transition-all after:duration-300 hover:after:w-full"
            >
              Collections
            </a>
          </li>
        </ul>

        {/* Mobile Menu Button */}
        <button
          onClick={toggleMobileMenu}
          className="md:hidden bg-transparent"
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
        className={`fixed top-0 left-0 h-full w-64 bg-[#475F45] z-50 transform transition-transform duration-300 md:hidden ${
          isMobileMenuOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="p-6">
          <div className="flex items-center justify-between mb-8">
            <img src="/src/assets/logo-away.png" alt="SIKELOR Logo" className="h-10 object-contain" />
            <button
              onClick={() => setIsMobileMenuOpen(false)}
              className="text-white p-2 rounded-lg hover:bg-white/10 transition-colors"
            >
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
                className="block text-white text-lg font-medium py-3 px-4 rounded-lg hover:bg-white/10 transition-colors"
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
                className="block text-white text-lg font-medium py-3 px-4 rounded-lg hover:bg-white/10 transition-colors"
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
                className="block text-white text-lg font-medium py-3 px-4 rounded-lg hover:bg-white/10 transition-colors"
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
                className="block text-white text-lg font-medium py-3 px-4 rounded-lg hover:bg-white/10 transition-colors"
              >
                Collections
              </a>
            </li>
          </ul>
        </div>
      </div>
    </>
  )
}
