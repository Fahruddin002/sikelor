"use client"

import { formatArticleDate, truncateText } from "../data/articles"

export default function ArticleCard({ image, title, description, category, date, url, onReadMore }) {
  const handleReadMore = () => {
    if (onReadMore && url) {
      onReadMore(url)
    }
  }

  return (
    <div className="flex flex-col md:flex-row items-start md:items-center gap-4 md:gap-8 py-6 md:py-8">
      {/* Image Section */}
      <div className="flex-shrink-0 w-full md:w-auto">
        <img
          src={image || "/placeholder.svg?height=128&width=192"}
          alt={title}
          className="w-full md:w-48 h-32 object-cover rounded-lg cursor-pointer hover:opacity-80 transition-opacity"
          onClick={handleReadMore}
          onError={(e) => {
            e.target.src = "/placeholder.svg?height=128&width=192"
          }}
        />
      </div>

      {/* Content Section */}
      <div className="flex-1">
        {/* Category Badge */}
        {category && (
          <div className="mb-2">
            <span className="bg-[#475F45] text-white text-xs px-2 py-1 rounded-full">{category}</span>
          </div>
        )}

        <h3
          className="text-lg md:text-xl font-semibold text-gray-800 mb-2 cursor-pointer hover:text-green-600 transition-colors line-clamp-2"
          onClick={handleReadMore}
        >
          {title}
        </h3>

        <p className="text-gray-600 mb-4 leading-relaxed text-sm md:text-base line-clamp-3">
          {truncateText(description, 200)}
        </p>

        <div className="flex justify-between items-center">
          <span className="text-xs text-gray-500">{formatArticleDate(date)}</span>

          <button
            onClick={handleReadMore}
            className="bg-transparent text-black/60 hover:text-green-600 p-0 transition-colors font-medium text-sm md:text-base"
          >
            Read More
          </button>
        </div>
      </div>
    </div>
  )
}
