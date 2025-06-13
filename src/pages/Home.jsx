"use client"

import { useEffect, useState } from "react"
import { startViewTransition } from "../utils/transitions"
import Hero from "../components/Hero"
import AboutSection from "../components/AboutSection"
import Gallery from "../components/Gallery"
import EventPreview from "../components/EventPreview"
import ArticlePreview from "../components/ArticlePreview"

// Import assets
import bgHero from "../assets/bg-hero.png"
import logoAway from "../assets/logo-away.png"

function Home({ onNavigate }) {
  const [visible, setVisible] = useState(false)
  const [assetsLoaded, setAssetsLoaded] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => setVisible(true), 300)
    return () => clearTimeout(timer)
  }, [])

  useEffect(() => {
    // Preload critical assets
    const preloadAssets = async () => {
      try {
        const promises = [
          new Promise((resolve) => {
            const img = new Image()
            img.onload = resolve
            img.onerror = resolve // Continue even if image fails to load
            img.src = bgHero
          }),
          new Promise((resolve) => {
            const img = new Image()
            img.onload = resolve
            img.onerror = resolve
            img.src = logoAway
          }),
        ]

        await Promise.all(promises)
        setAssetsLoaded(true)
      } catch (error) {
        console.warn("Some assets failed to load:", error)
        setAssetsLoaded(true) // Continue anyway
      }
    }

    preloadAssets()
  }, [])

  const handleNavigate = (page, id = null) => {
    if (typeof startViewTransition === "function") {
      startViewTransition(() => {
        onNavigate(page, id)
      })
    } else {
      onNavigate(page, id)
    }
  }

  if (!assetsLoaded) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="animate-pulse">
            <div className="w-16 h-16 bg-gray-300 rounded-full mx-auto mb-4"></div>
            <div className="h-4 bg-gray-300 rounded w-32 mx-auto"></div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <div
        className="relative min-h-screen"
        style={{
          backgroundImage: `url(${bgHero})`,
          backgroundAttachment: "fixed",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      >
        <div className="absolute inset-0 bg-black/20 z-0" />
        <div className="relative z-10">
          <Hero onNavigate={onNavigate} />
        </div>
      </div>

      {/* Gallery Section */}
      <Gallery onNavigate={handleNavigate} />

      {/* About Section */}
      <AboutSection onNavigate={onNavigate} />

      {/* Event Preview Section */}
      <EventPreview onViewAllEvents={handleNavigate} />

      {/* Article Preview Section */}
      <ArticlePreview onViewAllArticles={handleNavigate} />

      {/* Footer Section */}
      <div className="bg-gradient-to-t from-[#bdbbbbd5] to-[#ffffffd7] text-black px-6 pt-24 pb-4 mt-0">
        <div className="max-w-6xl mx-auto transition-all duration-700 ease-out transform">
          <div className="grid grid-cols-1 pl-4 sm:pl-[77px] sm:grid-cols-2 md:grid-cols-4 gap-12 text-sm shadow-xl p-8 sm:p-14">
            <div>
              {/* Logo */}
              <img
                src={logoAway || "/placeholder.svg"}
                alt="SIKELOR Logo"
                className="h-12 mb-3"
                onError={(e) => {
                  e.target.style.display = "none"
                  console.warn("Logo failed to load")
                }}
              />
              <p className="text-black/80">
                Sistem Informasi Kebudayaan dan Edukasi Rakyat. Menyediakan eksplorasi budaya Sulawesi Tengah secara
                digital dan interaktif.
              </p>
            </div>

            <div>
              <h4 className="font-semibold text-base mb-3">Navigasi</h4>
              <ul className="space-y-2 text-black/80">
                <li>
                  <button onClick={() => handleNavigate("home")} className="bg-transparent p-0 hover:text-gray-600 transition-colors">
                    Beranda
                  </button>
                </li>
                <li>
                  <button onClick={() => handleNavigate("event")} className="bg-transparent p-0 hover:text-gray-600 transition-colors">
                    Event
                  </button>
                </li>
                <li>
                  <button onClick={() => handleNavigate("articles")} className="bg-transparent p-0 hover:text-gray-600 transition-colors">
                    Artikel
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => handleNavigate("collections")}
                    className="bg-transparent p-0 hover:text-gray-600 transition-colors"
                  >
                    Koleksi
                  </button>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold text-base mb-3">Kontak</h4>
              <ul className="space-y-2 text-black/80">
                <li>
                  Email:{" "}
                  <a href="mailto:infosikelor@gmail.com" className="hover:text-gray-600 transition-colors">
                    infosikelor@gmail.com
                  </a>
                </li>
                <li>Telp: +62 812-3456-7890</li>
                <li>Alamat: Palu, Sulawesi Tengah</li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold text-base mb-3">Ikuti Kami</h4>
              <div className="flex space-x-4 mt-2 text-lg">
                <a href="#" className="hover:text-gray-600 transition-colors" aria-label="Website">
                  <img src="src\assets\whatsapp.png" alt="Whatsapp" class="h-6 w-6" />
                </a>
                <a href="#" className="hover:text-gray-600 transition-colors" aria-label="Twitter">
                  <img src="src\assets\twitter.png" alt="Twitter" class="h-6 w-6" />
                </a>
                <a href="#" className="hover:text-gray-600 transition-colors" aria-label="Instagram">
                  <img src="src\assets\instagram.png" alt="Instagram" class="h-6 w-6" />
                </a>
              </div>
            </div>
          </div>

          <hr className="border-black/40" />

          <p className="text-center text-black/60 text-sm mt-4 mb-0">
            © {new Date().getFullYear()} SIKELOR. Hak Cipta Dilindungi.
          </p>
        </div>
      </div>
    </div>
  )
}

export default Home
