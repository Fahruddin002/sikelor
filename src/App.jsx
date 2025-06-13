"use client"

import React from "react"

import { useState, useEffect } from "react"
import { startViewTransition } from "./utils/transitions"
import Navbar from "./components/Navbar"
import Articles from "./pages/Articles"
import Events from "./pages/Events"
import Scan from "./pages/Scan"
import Home from "./pages/Home"
import EventDetail from "./pages/EventDetail"
import ArticleDetail from "./pages/ArticleDetail"
import Collections from "./pages/Collections"
import About from "./pages/About"
import ApiStatusIndicator from "./components/ApiStatusIndicator"

// Error Boundary Component
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props)
    this.state = { hasError: false, error: null }
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error }
  }

  componentDidCatch(error, errorInfo) {
    console.error("App Error:", error, errorInfo)
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
          <div className="text-center p-8">
            <h1 className="text-2xl font-bold text-red-600 mb-4">Terjadi Kesalahan</h1>
            <p className="text-gray-600 mb-4">Aplikasi mengalami error. Silakan refresh halaman.</p>
            <button
              onClick={() => window.location.reload()}
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
            >
              Refresh Halaman
            </button>
          </div>
        </div>
      )
    }

    return this.props.children
  }
}

function App() {
  const [currentPage, setCurrentPage] = useState("home")
  const [currentId, setCurrentId] = useState(null)
  const [isTransitioning, setIsTransitioning] = useState(false)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Simulate app initialization
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 1000)

    return () => clearTimeout(timer)
  }, [])

  const handleNavigate = (page, id = null) => {
    if (isTransitioning || (page === currentPage && id === currentId)) return

    console.log("Navigating to:", page, id ? `with ID: ${id}` : "")
    setIsTransitioning(true)

    // Use View Transition API for smooth page transitions
    if (typeof startViewTransition === "function") {
      startViewTransition(() => {
        setCurrentPage(page)
        setCurrentId(id)
      })
    } else {
      setCurrentPage(page)
      setCurrentId(id)
    }

    // Reset transition state after animation completes
    setTimeout(() => {
      setIsTransitioning(false)
    }, 300)
  }

  // Add view transition names to page content
  useEffect(() => {
    const pageContent = document.querySelector("[data-page-content]")
    if (pageContent) {
      pageContent.style.viewTransitionName = "page-content"
    }
  }, [currentPage])

  const renderPage = () => {
    try {
      switch (currentPage) {
        case "articles":
          return <Articles onNavigate={handleNavigate} />
        case "article-detail":
          return <ArticleDetail onNavigate={handleNavigate} articleId={currentId} />
        case "event":
          return <Events onNavigate={handleNavigate} />
        case "event-detail":
          return <EventDetail onNavigate={handleNavigate} eventId={currentId} />
        case "collections":
          return <Collections onNavigate={handleNavigate} />
        case "about":
          return <About onNavigate={handleNavigate} />
        case "scan":
          return <Scan onNavigate={handleNavigate} />
        default:
          return (
            <div className="relative" data-page-content>
              <Navbar onNavigate={handleNavigate} />
              <Home onNavigate={handleNavigate} />
            </div>
          )
      }
    } catch (error) {
      console.error("Error rendering page:", error)
      return (
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center">
            <h2 className="text-xl font-bold text-red-600 mb-2">Error Loading Page</h2>
            <p className="text-gray-600">Halaman tidak dapat dimuat. Silakan coba lagi.</p>
            <button
              onClick={() => handleNavigate("home")}
              className="mt-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
            >
              Kembali ke Beranda
            </button>
          </div>
        </div>
      )
    }
  }

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <h2 className="text-xl font-semibold text-gray-700">Memuat SIKELOR...</h2>
          <p className="text-gray-500 mt-2">Museum Digital Sulawesi Tengah</p>
        </div>
      </div>
    )
  }

  return (
    <ErrorBoundary>
      <div className="relative">
        <div data-page-content>{renderPage()}</div>
        <ApiStatusIndicator />
      </div>
    </ErrorBoundary>
  )
}

export default App
