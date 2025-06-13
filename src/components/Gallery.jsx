"use client"

import { useEffect, useRef, useState } from "react"
import GalleryCard from "./GalleryCard"
import CollectionDetailModal from "./CollectionDetailModal"
import { collectionsData } from "../data/collections"

const Gallery = ({ onNavigate }) => {
  const titleRef = useRef(null)
  const buttonRef = useRef(null)
  const [titleVisible, setTitleVisible] = useState(false)
  const [buttonVisible, setButtonVisible] = useState(false)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [selectedCollectionId, setSelectedCollectionId] = useState(null)

  // Ambil 6 koleksi pertama untuk gallery
  const galleryCollections = collectionsData.slice(0, 6)

  useEffect(() => {
    const observerTitle = new IntersectionObserver(([entry]) => setTitleVisible(entry.isIntersecting), {
      threshold: 0.1,
    })
    const observerButton = new IntersectionObserver(([entry]) => setButtonVisible(entry.isIntersecting), {
      threshold: 0.1,
    })

    if (titleRef.current) observerTitle.observe(titleRef.current)
    if (buttonRef.current) observerButton.observe(buttonRef.current)

    return () => {
      observerTitle.disconnect()
      observerButton.disconnect()
    }
  }, [])

  const handleViewAllCollections = () => {
    if (onNavigate) {
      onNavigate("collections")
    }
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
      <section className="bg-gradient-to-t from-[#5f8861] via-[#476649] to-[#263628] text-center py-16 px-4">
        {/* Title Section */}
        <div
          ref={titleRef}
          className={`transition-all duration-700 ease-in-out transform ${
            titleVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <p className="text-white text-sm uppercase tracking-wide mb-2">Our Collection</p>
          <h2 className="text-white text-2xl sm:text-3xl font-bold mb-10">
            A Visual Journey Through <br />
            Central Sulawesi's Culture
          </h2>
        </div>

        {/* Gallery Grid */}
        <div className="flex flex-wrap justify-center gap-6 mb-10">
          {galleryCollections.map((item) => (
            <GalleryCard
              key={item.id}
              image={item.gambar}
              title={item.nama}
              description={item.deskripsi}
              onNavigate={onNavigate}
              itemId={item.id}
              onShowDetail={handleShowDetail}
            />
          ))}
        </div>

        {/* View All Button */}
        <div
          ref={buttonRef}
          className={`transition-all duration-700 ease-in-out transform ${
            buttonVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <button
            onClick={handleViewAllCollections}
            className="bg-white text-[#476649] font-semibold px-12 py-3 rounded-full hover:bg-gray-100 transition"
          >
            View Full Collection
          </button>
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

export default Gallery
