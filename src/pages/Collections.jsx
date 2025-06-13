"use client"

import { useState, useEffect } from "react"
import CollectionNavbar from "../components/CollectionNavbar"
import CollectionDetailModal from "../components/CollectionDetailModal"
import { Search } from "../components/icons"
import { collectionsData, getUniqueCategories, searchCollections, formatDimensions } from "../data/collections"

export default function Collections({ onNavigate }) {
  const categories = getUniqueCategories()

  const [collections, setCollections] = useState(collectionsData)
  const [searchTerm, setSearchTerm] = useState("")
  const [sortOption, setSortOption] = useState("name-asc")
  const [activeCategories, setActiveCategories] = useState([])
  const [viewMode, setViewMode] = useState("grid") // grid or list
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [selectedCollectionId, setSelectedCollectionId] = useState(null)

  useEffect(() => {
    let filteredCollections = [...collectionsData]

    // Search filter
    if (searchTerm) {
      filteredCollections = searchCollections(searchTerm)
    }

    // Category filter
    if (activeCategories.length > 0) {
      filteredCollections = filteredCollections.filter((collection) => activeCategories.includes(collection.kategori))
    }

    // Sort
    switch (sortOption) {
      case "name-asc":
        filteredCollections.sort((a, b) => a.nama.localeCompare(b.nama))
        break
      case "name-desc":
        filteredCollections.sort((a, b) => b.nama.localeCompare(a.nama))
        break
      case "category":
        filteredCollections.sort((a, b) => a.kategori.localeCompare(b.kategori))
        break
      case "year":
        filteredCollections.sort((a, b) => b.spesifikasi.tahun_akuisisi - a.spesifikasi.tahun_akuisisi)
        break
      default:
        break
    }

    setCollections(filteredCollections)
  }, [searchTerm, sortOption, activeCategories])

  const handleSearch = (e) => {
    setSearchTerm(e.target.value)
  }

  const handleSort = (e) => {
    setSortOption(e.target.value)
  }

  const handleCategoryToggle = (category) => {
    const updatedCategories = activeCategories.includes(category)
      ? activeCategories.filter((c) => c !== category)
      : [...activeCategories, category]
    setActiveCategories(updatedCategories)
  }

  const clearFilters = () => {
    setSearchTerm("")
    setSortOption("name-asc")
    setActiveCategories([])
  }

  const handleShowDetail = (collectionId) => {
    setSelectedCollectionId(collectionId)
    setIsModalOpen(true)
  }

  const handleCloseModal = () => {
    setIsModalOpen(false)
    setSelectedCollectionId(null)
  }

  return (
    <>
      <div className="flex flex-col min-h-screen bg-white">
        <CollectionNavbar onNavigate={onNavigate} />

        {/* Main Content - Flex grow to push footer down */}
        <main className="flex-1">
          {/* Add padding-top to account for fixed navbar */}
          <div className="pt-20 md:pt-24">
            <div className="max-w-6xl mx-auto px-4 md:px-8 py-8 md:py-12">
              {/* Header */}
              <div className="text-center mb-8 md:mb-12">
                <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4 md:mb-6">Collections</h1>
                <p className="text-gray-600 max-w-2xl mx-auto leading-relaxed text-sm md:text-base">
                  Jelajahi koleksi lengkap artefak dan benda bersejarah Museum Sulawesi Tengah. Temukan kekayaan budaya
                  dan sejarah yang tersimpan dalam setiap koleksi.
                </p>
              </div>

              {/* Search and Filters */}
              <div className="mb-8">
                {/* Search Bar */}
                <div className="relative mb-6">
                  <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                    <Search className="w-5 h-5 text-gray-400" />
                  </div>
                  <input
                    type="text"
                    className="w-full p-3 pl-10 text-sm bg-transparent text-gray-900 border border-gray-300 rounded-lg focus:ring-green-500 focus:border-green-500"
                    placeholder="Cari koleksi..."
                    value={searchTerm}
                    onChange={handleSearch}
                  />
                </div>

                {/* Filter Controls */}
                <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
                  {/* View Mode Toggle */}
                  <div className="flex items-center gap-3">
                    <span className="text-sm text-gray-600">Tampilan:</span>
                    <div className="flex border border-gray-300 rounded-lg overflow-hidden">
                      <button
                        onClick={() => setViewMode("grid")}
                        className={`px-4 py-2 text-sm ${viewMode === "grid" ? "bg-[#475F45] text-white" : "bg-white text-gray-700 hover:bg-gray-50"}`}
                      >
                        Grid
                      </button>
                      <button
                        onClick={() => setViewMode("list")}
                        className={`px-4 py-2 text-sm ${viewMode === "list" ? "bg-[#475F45] text-white" : "bg-white text-gray-700 hover:bg-gray-50"}`}
                      >
                        List
                      </button>
                    </div>
                  </div>

                  {/* Sort Dropdown */}
                  <div className="flex items-center gap-2">
                    <label htmlFor="sort" className="text-sm text-gray-600">
                      Urutkan:
                    </label>
                    <select
                      id="sort"
                      className="text-sm border bg-transparent text-black border-gray-300 rounded-md p-2 focus:ring-green-500 focus:border-green-500"
                      onChange={handleSort}
                      value={sortOption}
                    >
                      <option value="name-asc">Nama A-Z</option>
                      <option value="name-desc">Nama Z-A</option>
                      <option value="category">Kategori</option>
                      <option value="year">Tahun Akuisisi</option>
                    </select>
                  </div>
                </div>

                {/* Categories Filter */}
                <div className="mb-4">
                  <h3 className="text-sm font-medium text-gray-700 mb-3">Filter Kategori:</h3>
                  <div className="flex flex-wrap gap-2">
                    {categories.map((category) => (
                      <button
                        key={category}
                        onClick={() => handleCategoryToggle(category)}
                        className={`px-3 py-1 text-sm rounded-full transition-colors ${activeCategories.includes(category)
                            ? "bg-[#475F45] text-white"
                            : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                          }`}
                      >
                        {category}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Active Filters & Clear */}
                {(searchTerm || activeCategories.length > 0) && (
                  <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <span>Filter aktif:</span>
                      {searchTerm && <span className="bg-white px-2 py-1 rounded">"{searchTerm}"</span>}
                      {activeCategories.map((cat) => (
                        <span key={cat} className="bg-white px-2 py-1 rounded">
                          {cat}
                        </span>
                      ))}
                    </div>
                    <button onClick={clearFilters} className="text-sm text-[#475F45] hover:text-[#3a4e39] font-medium">
                      Hapus Filter
                    </button>
                  </div>
                )}
              </div>

              {/* Results Count */}
              <div className="mb-6">
                <p className="text-gray-600 text-sm">
                  Menampilkan {collections.length} dari {collectionsData.length} koleksi
                </p>
              </div>

              {/* Collections Grid/List */}
              {collections.length > 0 ? (
                <div
                  className={viewMode === "grid" ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" : "space-y-4"}
                >
                  {collections.map((collection) => (
                    <div
                      key={collection.id}
                      className={`bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-all cursor-pointer ${viewMode === "list" ? "flex gap-4 p-4" : ""
                        }`}
                      onClick={() => handleShowDetail(collection.id)}
                    >
                      <img
                        src={collection.gambar || "/placeholder.svg"}
                        alt={collection.nama}
                        className={
                          viewMode === "list"
                            ? "w-32 h-24 object-cover rounded flex-shrink-0"
                            : "w-full h-48 object-cover"
                        }
                        onError={(e) => {
                          e.target.src = "/placeholder.svg?height=300&width=400"
                        }}
                      />
                      <div className={viewMode === "list" ? "flex-1" : "p-4"}>
                        <div className="flex items-center gap-2 mb-2">
                          <span className="bg-[#475F45] text-white text-xs px-2 py-1 rounded-full">
                            {collection.kategori}
                          </span>
                          <span className="text-xs text-gray-500">{collection.spesifikasi.tahun_akuisisi}</span>
                        </div>
                        <h3 className="text-gray-800 text-lg font-semibold mb-2">{collection.nama}</h3>
                        <p className={`text-gray-600 text-sm ${viewMode === "list" ? "" : "line-clamp-3"}`}>
                          {collection.deskripsi}
                        </p>
                        {viewMode === "list" && (
                          <div className="mt-2 text-xs text-gray-500">
                            <p>
                              <strong>Asal:</strong> {collection.spesifikasi.asal}
                            </p>
                            <p>
                              <strong>Material:</strong> {collection.spesifikasi.material}
                            </p>
                            <p>
                              <strong>Dimensi:</strong> {formatDimensions(collection.spesifikasi.dimensi)}
                            </p>
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-12">
                  <p className="text-gray-500 text-lg mb-4">
                    Tidak ada koleksi yang sesuai dengan kriteria pencarian Anda.
                  </p>
                  <button onClick={clearFilters} className="text-[#475F45] hover:text-[#3a4e39] font-medium">
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

      {/* Collection Detail Modal */}
      <CollectionDetailModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        collectionId={selectedCollectionId}
        onNavigate={onNavigate}
      />
    </>
  )
}
