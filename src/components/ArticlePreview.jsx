"use client"

import { useState, useEffect, useRef } from "react"
import { articlesData, formatArticleDate } from "../data/articles"

export default function ArticlePreview({ onViewAllArticles }) {
  // Get the 3 most recent articles
  const [articles] = useState(articlesData.sort((a, b) => new Date(b.date) - new Date(a.date)).slice(0, 3))

  const sectionRef = useRef(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => setVisible(entry.isIntersecting), { threshold: 0.1 })

    if (sectionRef.current) observer.observe(sectionRef.current)

    return () => observer.disconnect()
  }, [])

  const handleReadMore = (url) => {
    window.open(url, "_blank", "noopener,noreferrer")
  }

  return (
    <section ref={sectionRef} className="bg-gradient-to-t from-[#ffffffd7] to-[#ffffff] py-16 px-6 transition-all">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-gray-800 text-3xl font-bold mb-4">Latest Articles</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Explore our collection of articles about the rich cultural heritage of Central Sulawesi.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {articles.map((article) => (
            <div
              key={article.id}
              className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300 cursor-pointer flex flex-col min-h-[370px]"
              onClick={() => handleReadMore(article.url)}
            >
              <div className="relative">
                <img
                  src={article.gambar || "/placeholder.svg?height=200&width=350"}
                  alt={article.title}
                  className="w-full h-48 object-cover"
                  onError={(e) => {
                    e.target.src = "/placeholder.svg?height=200&width=350"
                  }}
                />
                <div className="absolute top-4 left-4">
                  <span className="bg-[#475F45] text-white text-xs px-2 py-1 rounded-full">{article.kategori}</span>
                </div>
              </div>
              <div className="p-5 flex flex-col justify-between flex-grow">
                <div>
                  <h3 className="text-gray-800 text-lg font-semibold mb-2 line-clamp-2">{article.title}</h3>
                  <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                    {article.deskripsi.length > 120 ? article.deskripsi.substring(0, 120) + "..." : article.deskripsi}
                  </p>
                </div>
                <div className="flex justify-between items-center mt-auto pt-4">
                  <span className="text-xs text-gray-500">{formatArticleDate(article.date)}</span>
                  <button
                    onClick={(e) => {
                      e.stopPropagation()
                      handleReadMore(article.url)
                    }}
                    className="bg-transparent text-[#475F45] hover:text-[#3a4e39] text-sm font-medium"
                  >
                    Read More
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-10">
          <button
            onClick={() => onViewAllArticles("articles")}
            className="bg-[#475F45] hover:bg-[#3a4e39] text-white font-semibold px-8 py-3 rounded-full transition-colors duration-300"
          >
            View All Articles
          </button>
        </div>
      </div>
    </section>
  )
}
