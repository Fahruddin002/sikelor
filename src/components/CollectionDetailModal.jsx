"use client"

import { useEffect } from "react"
import { X } from "./icons"
import { collectionsData, formatDimensions } from "../data/collections"

export default function CollectionDetailModal({ isOpen, onClose, collectionId, onNavigate }) {
  // Find the collection by ID
  const collection = collectionsData.find((item) => item.id === collectionId) || null

  // Handle escape key press
  useEffect(() => {
    const handleEscape = (event) => {
      if (event.key === "Escape") {
        onClose()
      }
    }

    if (isOpen) {
      document.addEventListener("keydown", handleEscape)
      document.body.style.overflow = "hidden"
    }

    return () => {
      document.removeEventListener("keydown", handleEscape)
      document.body.style.overflow = "unset"
    }
  }, [isOpen, onClose])

  // Handle scan button click
  const handleScanClick = () => {
    if (onNavigate) {
      onNavigate("scan")
    }
    onClose()
  }

  // Handle backdrop click
  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose()
    }
  }

  if (!isOpen || !collection) {
    return null
  }

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-60 z-50 flex items-center justify-center p-4"
      onClick={handleBackdropClick}
    >
      <div className="w-full max-w-4xl max-h-[90vh] overflow-y-auto transform rounded-2xl bg-white shadow-xl transition-all">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <h2 className="text-xl font-bold text-gray-800">Detail Koleksi</h2>
          <button onClick={onClose} className="rounded-full p-1 hover:bg-gray-100 transition-colors">
            <X className="h-5 w-5 text-gray-500" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6">
          <div className="flex flex-col lg:flex-row gap-6">
            {/* Image */}
            <div className="lg:w-1/2">
              <div className="aspect-square rounded-lg overflow-hidden bg-gray-100">
                <img
                  src={collection.gambar || "/placeholder.svg"}
                  alt={collection.nama}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    e.target.src = "/placeholder.svg?height=400&width=400"
                  }}
                />
              </div>
            </div>

            {/* Details */}
            <div className="lg:w-1/2">
              {/* Category and Title */}
              <div className="mb-4">
                <div className="flex items-center gap-2 mb-2">
                  <span className="inline-block bg-[#475F45] text-white text-xs px-2 py-1 rounded-full">
                    {collection.kategori}
                  </span>
                  <span className="text-sm text-gray-500">ID: {collection.id}</span>
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-2">{collection.nama}</h3>
              </div>

              {/* Description */}
              <div className="mb-6">
                <p className="text-gray-600 leading-relaxed">{collection.deskripsi}</p>
              </div>

              {/* Specifications */}
              <div className="mb-6">
                <h4 className="text-lg font-semibold text-gray-800 mb-3">Spesifikasi</h4>
                <div className="grid grid-cols-1 gap-3">
                  <div className="flex justify-between py-2 border-b border-gray-100">
                    <span className="font-medium text-gray-700">Asal:</span>
                    <span className="text-gray-600">{collection.spesifikasi.asal}</span>
                  </div>
                  <div className="flex justify-between py-2 border-b border-gray-100">
                    <span className="font-medium text-gray-700">Material:</span>
                    <span className="text-gray-600">{collection.spesifikasi.material}</span>
                  </div>
                  <div className="flex justify-between py-2 border-b border-gray-100">
                    <span className="font-medium text-gray-700">Kondisi:</span>
                    <span className="text-gray-600">{collection.spesifikasi.kondisi}</span>
                  </div>
                  <div className="flex justify-between py-2 border-b border-gray-100">
                    <span className="font-medium text-gray-700">Dimensi:</span>
                    <span className="text-gray-600">{formatDimensions(collection.spesifikasi.dimensi)}</span>
                  </div>
                  <div className="flex justify-between py-2 border-b border-gray-100">
                    <span className="font-medium text-gray-700">Tahun Akuisisi:</span>
                    <span className="text-gray-600">{collection.spesifikasi.tahun_akuisisi}</span>
                  </div>
                </div>
              </div>

              {/* Cultural Significance */}
              {collection.makna_dan_signifikasi && (
                <div className="mb-6">
                  <h4 className="text-lg font-semibold text-gray-800 mb-3">Makna & Signifikansi</h4>
                  <p className="text-gray-600 leading-relaxed">{collection.makna_dan_signifikasi}</p>
                </div>
              )}

              {/* Action Buttons */}
              <div className="flex flex-wrap gap-3">
                <button
                  onClick={handleScanClick}
                  className="bg-[#475F45] hover:bg-[#3a4e39] text-white px-6 py-2 rounded-lg font-medium transition-colors"
                >
                  Scan dengan AR
                </button>
                <button
                  onClick={onClose}
                  className="border border-gray-300 hover:bg-gray-50 text-gray-700 px-6 py-2 rounded-lg font-medium transition-colors"
                >
                  Tutup
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
