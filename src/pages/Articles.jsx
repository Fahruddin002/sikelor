"use client"

import { useState, useEffect } from "react"
import ArticleNavbar from "../components/ArticleNavbar"
import ArticleCard from "../components/ArticleCard"
import ArticleSearch from "../components/ArticleSearch"
import {
  articlesData,
  getUniqueCategories,
  searchArticles,
  filterArticlesByCategory,
  sortArticles,
} from "../data/articles"

export default function Articles({ onNavigate }) {
  const categories = getUniqueCategories()

  const [articles, setArticles] = useState(articlesData)
  const [searchTerm, setSearchTerm] = useState("")
  const [sortOption, setSortOption] = useState("newest")
  const [activeCategories, setActiveCategories] = useState([])

  useEffect(() => {
    let filteredArticles = [...articlesData]

    // Apply search filter
    if (searchTerm) {
      filteredArticles = searchArticles(filteredArticles, searchTerm)
    }

    // Apply category filter
    if (activeCategories.length > 0) {
      filteredArticles = filterArticlesByCategory(filteredArticles, activeCategories)
    }

    // Apply sorting
    filteredArticles = sortArticles(filteredArticles, sortOption)

    setArticles(filteredArticles)
  }, [searchTerm, sortOption, activeCategories])

  const handleSearch = (term) => {
    setSearchTerm(term)
  }

  const handleSort = (option) => {
    setSortOption(option)
  }

  const handleCategoryChange = (categories) => {
    setActiveCategories(categories)
  }

  const handleReadMore = (url) => {
    window.open(url, "_blank", "noopener,noreferrer")
  }

  return (
    <div className="flex flex-col min-h-screen bg-white">
      <ArticleNavbar onNavigate={onNavigate} />

      {/* Main Content - Flex grow to push footer down */}
      <main className="flex-1">
        {/* Add padding-top to account for fixed navbar */}
        <div className="pt-20 md:pt-24">
          <div className="max-w-4xl mx-auto px-4 md:px-8 py-8 md:py-12">
            {/* Header Section */}
            <div className="text-center mb-8 md:mb-12">
              <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4 md:mb-6">Articles</h1>
              <p className="text-gray-600 max-w-2xl mx-auto leading-relaxed text-sm md:text-base">
                Jelajahi artikel menarik tentang kekayaan budaya dan sejarah Sulawesi Tengah. Temukan cerita di balik
                artefak, tradisi, dan warisan budaya yang dipamerkan di museum kami.
              </p>
            </div>

            {/* Search and Filter Section */}
            <ArticleSearch
              onSearch={handleSearch}
              onSort={handleSort}
              onCategoryChange={handleCategoryChange}
              categories={categories}
            />

            {/* Articles List */}
            {articles.length > 0 ? (
              <div className="space-y-0">
                {articles.map((article, index) => (
                  <div key={article.id}>
                    <ArticleCard
                      image={article.gambar}
                      title={article.title}
                      description={article.deskripsi}
                      category={article.kategori}
                      date={article.date}
                      url={article.url}
                      onReadMore={handleReadMore}
                    />
                    {index < articles.length - 1 && <hr className="border-gray-300" />}
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <p className="text-gray-500 text-base md:text-lg">
                  Tidak ada artikel yang sesuai dengan kriteria pencarian Anda.
                </p>
                <button
                  onClick={() => {
                    setSearchTerm("")
                    setSortOption("newest")
                    setActiveCategories([])
                  }}
                  className="mt-4 text-green-600 hover:text-green-800 font-medium text-sm md:text-base"
                >
                  Reset filter
                </button>
              </div>
            )}
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-[#ffffff] text-black text-center py-4 mt-auto">
        <p className="text-xs lg:text-sm">© 2025 Sikelor. All rights reserved.</p>
      </footer>
    </div>
  )
}
