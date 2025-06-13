"use client"

import { useState } from "react"
import CollectionDetailModal from "./CollectionDetailModal"
import { collectionsData } from "../data/collections"

export default function Collection({ onNavigate }) {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [selectedCollectionId, setSelectedCollectionId] = useState(null)

  // Ambil 5 koleksi pertama untuk preview
  const previewCollections = collectionsData.slice(0, 5)

  const handleLearnMore = (item) => {
    setSelectedCollectionId(item.id)
    setIsModalOpen(true)
  }

  const handleCloseModal = () => {
    setIsModalOpen(false)
    setSelectedCollectionId(null)
  }

  const handleViewAllCollections = () => {
    if (onNavigate) {
      onNavigate("collections")
    }
  }

  return (
    <>
      <section className="w-full py-16 md:py-24 bg-[#475F45]">
        <div className="max-w-6xl mx-auto px-4 md:px-8">
          {/* Header */}
          <div className="text-center mb-12 md:mb-16">
            <div className="inline-block">
              <div className="h-0.5 bg-white/30 w-20 md:w-32 mx-auto mb-4"></div>
              <h3 className="text-white/80 text-sm md:text-base font-medium mb-2 tracking-wider uppercase">
                Our Collection
              </h3>
              <h2 className="text-white text-2xl md:text-4xl font-bold leading-tight">
                A Visual Journey Through
                <br />
                Central Sulawesi's Culture
              </h2>
              <div className="h-0.5 bg-white/30 w-20 md:w-32 mx-auto mt-4"></div>
            </div>
          </div>

          {/* Collection Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 mb-12">
            {previewCollections.map((item, index) => (
              <div key={item.id} className="lg:col-span-1">
                <CollectionCard item={item} onLearnMore={handleLearnMore} />
              </div>
            ))}
          </div>

          {/* View All Button */}
          <div className="text-center">
            <button
              onClick={handleViewAllCollections}
              className="bg-white/20 hover:bg-white/30 text-white px-8 md:px-12 py-3 md:py-4 rounded-full font-semibold transition-all duration-300 backdrop-blur-sm border border-white/20 hover:border-white/40"
            >
              View All Collections
            </button>
          </div>
        </div>
      </section>

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

function CollectionCard({ item, onLearnMore }) {
  return (
    <div className="group cursor-pointer" onClick={() => onLearnMore(item)}>
      <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-4 md:p-6 hover:bg-white/20 transition-all duration-300 border border-white/20 hover:border-white/40">
        {/* Image */}
        <div className="aspect-[4/3] mb-4 overflow-hidden rounded-xl bg-gradient-to-br from-yellow-600 to-yellow-800">
          <img
            src={item.gambar || "/placeholder.svg"}
            alt={item.nama}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            onError={(e) => {
              e.target.src = "/placeholder.svg?height=300&width=400"
            }}
          />
        </div>

        {/* Content */}
        <div className="text-white">
          <div className="flex items-center gap-2 mb-2">
            <span className="bg-white/20 text-white text-xs px-2 py-1 rounded-full">{item.kategori}</span>
          </div>
          <h4 className="font-bold text-lg md:text-xl mb-1">{item.nama}</h4>
          <p className="text-white/70 text-sm md:text-base mb-4 line-clamp-2">{item.deskripsi}</p>

          <button
            onClick={(e) => {
              e.stopPropagation()
              onLearnMore(item)
            }}
            className="text-white/80 hover:text-white text-sm md:text-base font-medium underline underline-offset-2 hover:underline-offset-4 transition-all duration-200"
          >
            Learn More
          </button>
        </div>
      </div>
    </div>
  )
}
