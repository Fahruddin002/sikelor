"use client"

import { useState } from "react"
import { Search } from "./icons"

export default function ArticleSearch({ onSearch, onSort, onCategoryChange, categories }) {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategories, setSelectedCategories] = useState([])

  const handleSearch = (e) => {
    const value = e.target.value
    setSearchTerm(value)
    onSearch(value)
  }

  const handleSort = (e) => {
    onSort(e.target.value)
  }

  const handleCategoryToggle = (category) => {
    const updatedCategories = selectedCategories.includes(category)
      ? selectedCategories.filter((c) => c !== category)
      : [...selectedCategories, category]

    setSelectedCategories(updatedCategories)
    onCategoryChange(updatedCategories)
  }

  return (
    <div className="mb-12">
      {/* Search Bar */}
      <div className="relative mb-6">
        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
          <Search className="w-5 h-5 text-gray-400" />
        </div>
        <input
          type="text"
          className="w-full p-3 pl-10 text-sm bg-transparent text-gray-900 border rounded-lg focus:outline-none focus:border-green-800 focus:ring-1 focus:ring-green-800
  focus:bg-green-150"
          placeholder="Search articles..."
          value={searchTerm}
          onChange={handleSearch}
        />
      </div>

      {/* Filters Row */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        {/* Categories */}
        <div className="flex flex-wrap gap-2">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => handleCategoryToggle(category)}
              className={`px-3 py-1 text-sm rounded-full transition-colors ${
                selectedCategories.includes(category)
                  ? "bg-green-600 text-white"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Sort Dropdown */}
        <div className="flex items-center">
          <label htmlFor="sort" className="mr-2 text-sm text-gray-600">
            Sort by:
          </label>
          <select
            id="sort"
            className="text-sm bg-transparent text-black border border-gray-300 rounded-md p-2"
            onChange={handleSort}
            defaultValue="newest"
          >
            <option value="newest">Newest First</option>
            <option value="oldest">Oldest First</option>
            <option value="a-z">A-Z</option>
            <option value="z-a">Z-A</option>
          </select>
        </div>
      </div>
    </div>
  )
}
