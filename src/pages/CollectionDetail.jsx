"use client"

import { useState } from "react"
import Navbar from "../components/Navbar"

export default function CollectionDetail({ onNavigate, collectionId }) {
  // Mock collection data - in real app, this would be fetched based on collectionId
  const [collection] = useState({
    id: 1,
    title: "Keris Tradisional Sulawesi Tengah",
    category: "Senjata Tradisional",
    period: "Abad 15-17 M",
    origin: "Kerajaan Kaili",
    material: "Besi, Kayu, Emas",
    dimensions: "Panjang: 45 cm, Lebar: 3 cm",
    condition: "Baik",
    acquisitionDate: "1985",
    description:
      "Keris tradisional yang berasal dari Kerajaan Kaili, Sulawesi Tengah. Keris ini memiliki nilai sejarah yang tinggi dan merupakan salah satu koleksi unggulan museum.",
    fullDescription: `Keris Tradisional Sulawesi Tengah ini merupakan salah satu artefak paling berharga dalam koleksi Museum Sulawesi Tengah. Keris ini diperkirakan berasal dari abad ke-15 hingga ke-17 Masehi, pada masa kejayaan Kerajaan Kaili.

## Sejarah dan Asal Usul

Keris ini ditemukan di wilayah bekas Kerajaan Kaili dan diperkirakan merupakan pusaka kerajaan yang digunakan dalam upacara adat dan sebagai simbol kekuasaan. Bentuk dan motif ukiran pada keris menunjukkan pengaruh budaya Jawa yang berpadu dengan karakteristik lokal Sulawesi Tengah.

## Karakteristik Fisik

Keris ini memiliki bilah (wilah) yang terbuat dari besi berkualitas tinggi dengan pola pamor yang indah. Gagang (hulu) terbuat dari kayu pilihan yang diukir dengan motif tradisional Kaili. Bagian sarung (warangka) dihiasi dengan ukiran geometris yang khas.

### Detail Teknis:
- **Bilah**: Terbuat dari besi dengan teknik tempa tradisional
- **Pamor**: Pola pamor beras wutah yang melambangkan kemakmuran
- **Hulu**: Kayu eboni dengan ukiran motif burung maleo
- **Warangka**: Kayu jati dengan hiasan logam emas

## Makna dan Simbolisme

Dalam budaya Sulawesi Tengah, keris bukan hanya senjata tetapi juga memiliki makna spiritual dan sosial yang mendalam:

1. **Simbol Kekuasaan**: Keris merupakan lambang otoritas dan kepemimpinan
2. **Pelindung Spiritual**: Dipercaya memiliki kekuatan magis untuk melindungi pemiliknya
3. **Warisan Leluhur**: Diwariskan turun-temurun sebagai pusaka keluarga
4. **Identitas Budaya**: Mencerminkan keahlian dan estetika masyarakat Kaili

## Proses Pembuatan

Pembuatan keris tradisional Sulawesi Tengah melibatkan ritual dan proses yang sangat kompleks:

- Pemilihan bahan baku dilakukan pada waktu tertentu
- Proses tempa dilakukan oleh empu (pandai besi) berpengalaman
- Setiap tahap pembuatan disertai dengan doa dan ritual
- Waktu pembuatan bisa mencapai berbulan-bulan

## Konservasi dan Perawatan

Museum Sulawesi Tengah melakukan perawatan khusus untuk menjaga kondisi keris ini:

- Pembersihan berkala dengan teknik konservasi modern
- Penyimpanan dalam kondisi suhu dan kelembaban terkontrol
- Dokumentasi digital untuk penelitian dan edukasi
- Pemeriksaan rutin oleh ahli konservasi`,
    images: [
      "/placeholder.svg?height=600&width=800",
      "/placeholder.svg?height=400&width=600",
      "/placeholder.svg?height=400&width=600",
      "/placeholder.svg?height=400&width=600",
      "/placeholder.svg?height=400&width=600",
    ],
    relatedCollections: [
      {
        id: 2,
        title: "Topeng Kaili",
        image: "/placeholder.svg?height=200&width=200",
        category: "Seni Tradisional",
      },
      {
        id: 3,
        title: "Kain Tenun Donggala",
        image: "/placeholder.svg?height=200&width=200",
        category: "Tekstil",
      },
      {
        id: 4,
        title: "Perhiasan Emas Antik",
        image: "/placeholder.svg?height=200&width=200",
        category: "Perhiasan",
      },
    ],
  })

  const [selectedImageIndex, setSelectedImageIndex] = useState(0)

  return (
    <div className="flex flex-col min-h-screen bg-white">
      <div className="relative">
        <Navbar onNavigate={onNavigate} currentPage="collections" />
      </div>

      <main className="flex-1 pt-20 md:pt-24">
        <div className="max-w-6xl mx-auto px-4 md:px-8 py-8 md:py-12">
          {/* Back Button */}
          <button
            onClick={() => onNavigate("collections")}
            className="flex items-center gap-2 text-gray-600 bg-transparent hover:text-gray-800 mb-6 transition-colors"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Kembali ke Collections
          </button>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
            {/* Image Gallery */}
            <div>
              {/* Main Image */}
              <div className="mb-4">
                <img
                  src={collection.images[selectedImageIndex] || "/placeholder.svg"}
                  alt={collection.title}
                  className="w-full h-96 object-cover rounded-lg shadow-lg"
                />
              </div>

              {/* Thumbnail Gallery */}
              <div className="grid grid-cols-5 gap-2">
                {collection.images.map((image, index) => (
                  <img
                    key={index}
                    src={image || "/placeholder.svg"}
                    alt={`${collection.title} ${index + 1}`}
                    className={`w-full h-16 object-cover rounded cursor-pointer transition-all ${
                      selectedImageIndex === index ? "ring-2 ring-[#475F45]" : "hover:opacity-80"
                    }`}
                    onClick={() => setSelectedImageIndex(index)}
                  />
                ))}
              </div>
            </div>

            {/* Collection Info */}
            <div>
              <div className="mb-4">
                <span className="bg-[#475F45] text-white text-sm px-3 py-1 rounded-full">{collection.category}</span>
              </div>

              <h1 className="text-3xl font-bold text-gray-800 mb-4">{collection.title}</h1>
              <p className="text-gray-600 mb-6">{collection.description}</p>

              {/* Specifications */}
              <div className="bg-gray-50 p-6 rounded-lg">
                <h3 className="text-lg font-bold text-gray-800 mb-4">Spesifikasi</h3>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Periode:</span>
                    <span className="text-gray-800 font-medium">{collection.period}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Asal:</span>
                    <span className="text-gray-800 font-medium">{collection.origin}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Material:</span>
                    <span className="text-gray-800 font-medium">{collection.material}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Dimensi:</span>
                    <span className="text-gray-800 font-medium">{collection.dimensions}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Kondisi:</span>
                    <span className="text-gray-800 font-medium">{collection.condition}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Tahun Akuisisi:</span>
                    <span className="text-gray-800 font-medium">{collection.acquisitionDate}</span>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="mt-6 space-y-3">
                <button className="w-full bg-[#475F45] hover:bg-[#3a4e39] text-white font-semibold py-3 px-6 rounded-lg transition-colors">
                  Scan dengan AR
                </button>
                <button className="w-full border border-[#475F45] text-[#475F45] hover:bg-[#475F45] hover:text-white font-semibold py-3 px-6 rounded-lg transition-colors">
                  Download Info
                </button>
              </div>
            </div>
          </div>

          {/* Detailed Description */}
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Deskripsi Lengkap</h2>
            <div className="prose prose-lg max-w-none">
              {collection.fullDescription.split("\n\n").map((paragraph, index) => {
                if (paragraph.startsWith("## ")) {
                  return (
                    <h3 key={index} className="text-xl font-bold text-gray-800 mt-6 mb-3">
                      {paragraph.replace("## ", "")}
                    </h3>
                  )
                } else if (paragraph.startsWith("### ")) {
                  return (
                    <h4 key={index} className="text-lg font-semibold text-gray-800 mt-4 mb-2">
                      {paragraph.replace("### ", "")}
                    </h4>
                  )
                } else if (paragraph.includes("1. **") || paragraph.includes("- **")) {
                  const items = paragraph.split("\n").filter((item) => item.trim())
                  return (
                    <ul key={index} className="list-disc list-inside space-y-1 mb-4">
                      {items.map((item, itemIndex) => {
                        const cleanItem = item.replace(/^[-\d+.]\s*\*\*(.*?)\*\*:\s*/, "")
                        const title = item.match(/\*\*(.*?)\*\*/)?.[1] || ""
                        return (
                          <li key={itemIndex} className="text-gray-700">
                            <strong>{title}</strong>: {cleanItem}
                          </li>
                        )
                      })}
                    </ul>
                  )
                } else {
                  return (
                    <p key={index} className="text-gray-700 mb-4 leading-relaxed">
                      {paragraph}
                    </p>
                  )
                }
              })}
            </div>
          </div>

          {/* Related Collections */}
          <div>
            <h3 className="text-2xl font-bold text-gray-800 mb-6">Koleksi Terkait</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {collection.relatedCollections.map((related) => (
                <div
                  key={related.id}
                  className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow cursor-pointer"
                  onClick={() => onNavigate("collection-detail", related.id)}
                >
                  <img
                    src={related.image || "/placeholder.svg"}
                    alt={related.title}
                    className="w-full h-48 object-cover"
                  />
                  <div className="p-4">
                    <span className="bg-[#475F45] text-white text-xs px-2 py-1 rounded-full">{related.category}</span>
                    <h4 className="text-gray-800 font-semibold mt-2">{related.title}</h4>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-[#394a37] text-white text-center py-4 mt-auto">
        <p className="text-xs lg:text-sm">© 2025 Sikelor. All rights reserved.</p>
      </footer>
    </div>
  )
}
