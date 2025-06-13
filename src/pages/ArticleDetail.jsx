"use client"

import { useState } from "react"
import ArticleNavbar from "../components/ArticleNavbar"

export default function ArticleDetail({ onNavigate, articleId }) {
  // Mock article data - in real app, this would be fetched based on articleId
  const [article] = useState({
    id: 1,
    image: "/placeholder.svg?height=400&width=800",
    title: "Tarian Tradisional Sulawesi Tengah",
    description: "Mengenal lebih dekat tarian-tarian tradisional dari Sulawesi Tengah yang penuh makna dan filosofi.",
    category: "Etnografi",
    publishedAt: "2025-05-10",
    author: "Dr. Siti Nurhaliza",
    readTime: "8 menit",
    content: `Sulawesi Tengah memiliki kekayaan budaya yang luar biasa, salah satunya adalah tarian tradisional yang telah diwariskan turun-temurun. Setiap gerakan dalam tarian tradisional Sulawesi Tengah memiliki makna dan filosofi yang mendalam, mencerminkan kehidupan masyarakat setempat.

## Tari Dero

Tari Dero merupakan salah satu tarian tradisional yang paling terkenal dari Sulawesi Tengah. Tarian ini berasal dari suku Kaili dan biasanya dipentaskan dalam upacara adat penting seperti pernikahan, panen, atau penyambutan tamu kehormatan.

Gerakan dalam Tari Dero sangat dinamis dan energik, mencerminkan semangat dan kegembiraan masyarakat Kaili. Para penari mengenakan kostum tradisional yang indah dengan warna-warna cerah yang melambangkan kebahagiaan dan kemakmuran.

## Tari Lumense

Tari Lumense adalah tarian sakral yang berasal dari daerah Donggala. Tarian ini memiliki makna spiritual yang dalam dan biasanya dipentaskan dalam upacara keagamaan atau ritual adat tertentu.

Gerakan dalam Tari Lumense lebih lambat dan penuh penghayatan, setiap gerakan memiliki makna simbolis yang berkaitan dengan hubungan manusia dengan alam dan sang pencipta.

## Tari Pobalia

Tari Pobalia merupakan tarian perang tradisional yang menggambarkan keberanian dan ketangguhan prajurit Sulawesi Tengah di masa lampau. Tarian ini biasanya dipentaskan oleh penari laki-laki dengan menggunakan senjata tradisional seperti keris dan perisai.

## Filosofi dan Makna

Setiap tarian tradisional Sulawesi Tengah tidak hanya sekedar pertunjukan seni, tetapi juga merupakan media untuk:

1. **Melestarikan Nilai-nilai Budaya**: Tarian menjadi sarana untuk meneruskan nilai-nilai luhur kepada generasi muda
2. **Komunikasi dengan Alam**: Banyak gerakan tarian yang terinspirasi dari alam sekitar
3. **Penguatan Identitas**: Tarian menjadi identitas dan kebanggaan masyarakat setempat
4. **Media Spiritual**: Beberapa tarian memiliki fungsi ritual dan spiritual

## Pelestarian dan Pengembangan

Museum Sulawesi Tengah berkomitmen untuk melestarikan dan mengembangkan tarian tradisional melalui berbagai program seperti:

- Workshop tari tradisional untuk anak-anak dan remaja
- Dokumentasi video dan audio tarian tradisional
- Penelitian mendalam tentang sejarah dan makna setiap tarian
- Pertunjukan rutin di museum untuk memperkenalkan kepada wisatawan

Melalui upaya pelestarian ini, diharapkan tarian tradisional Sulawesi Tengah dapat terus hidup dan berkembang di era modern ini, sambil tetap mempertahankan nilai-nilai autentik dan makna filosofisnya.`,
    tags: ["Tarian", "Budaya", "Sulawesi Tengah", "Tradisional", "Seni"],
    relatedArticles: [
      {
        id: 2,
        title: "Alat Musik Tradisional Kaili",
        image: "/placeholder.svg?height=150&width=200",
        category: "Seni Tradisional",
      },
      {
        id: 3,
        title: "Kain Tenun Donggala",
        image: "/placeholder.svg?height=150&width=200",
        category: "Tekstil",
      },
      {
        id: 4,
        title: "Kuliner Khas Sulawesi Tengah",
        image: "/placeholder.svg?height=150&width=200",
        category: "Kuliner",
      },
    ],
  })

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("id-ID", {
      year: "numeric",
      month: "long",
      day: "numeric",
    })
  }

  return (
    <div className="flex flex-col min-h-screen bg-white">
      <ArticleNavbar onNavigate={onNavigate} />

      <main className="flex-1 pt-20 md:pt-24">
        <div className="max-w-4xl mx-auto px-4 md:px-8 py-8 md:py-12">
          {/* Back Button */}
          <button
            onClick={() => onNavigate("articles")}
            className="flex items-center gap-2 bg-transparent text-gray-600 hover:text-gray-800 mb-6 transition-colors"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Kembali ke Articles
          </button>

          {/* Article Header */}
          <div className="mb-8">
            <div className="flex items-center gap-2 mb-4">
              <span className="bg-[#475F45] text-white text-xs px-2 py-1 rounded-full">{article.category}</span>
              <span className="text-gray-500 text-sm">{formatDate(article.publishedAt)}</span>
              <span className="text-gray-500 text-sm">•</span>
              <span className="text-gray-500 text-sm">{article.readTime} baca</span>
            </div>

            <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">{article.title}</h1>
            <p className="text-lg text-gray-600 mb-4">{article.description}</p>

            <div className="flex items-center gap-4 text-sm text-gray-600">
              <span>Oleh: {article.author}</span>
            </div>
          </div>

          {/* Featured Image */}
          <div className="mb-8">
            <img
              src={article.image || "/placeholder.svg"}
              alt={article.title}
              className="w-full h-64 md:h-96 object-cover rounded-lg shadow-lg"
            />
          </div>

          {/* Article Content */}
          <div className="prose prose-lg max-w-none mb-8">
            {article.content.split("\n\n").map((paragraph, index) => {
              if (paragraph.startsWith("## ")) {
                return (
                  <h2 key={index} className="text-2xl font-bold text-gray-800 mt-8 mb-4">
                    {paragraph.replace("## ", "")}
                  </h2>
                )
              } else if (paragraph.includes("1. **") || paragraph.includes("2. **")) {
                const items = paragraph.split("\n").filter((item) => item.trim())
                return (
                  <ol key={index} className="list-decimal list-inside space-y-2 mb-6">
                    {items.map((item, itemIndex) => {
                      const cleanItem = item.replace(/^\d+\.\s*\*\*(.*?)\*\*:\s*/, "")
                      const title = item.match(/\*\*(.*?)\*\*/)?.[1] || ""
                      return (
                        <li key={itemIndex} className="text-gray-700">
                          <strong>{title}</strong>: {cleanItem}
                        </li>
                      )
                    })}
                  </ol>
                )
              } else {
                return (
                  <p key={index} className="text-gray-700 mb-6 leading-relaxed">
                    {paragraph}
                  </p>
                )
              }
            })}
          </div>

          {/* Tags */}
          <div className="mb-8">
            <h3 className="text-lg font-bold text-gray-800 mb-3">Tags</h3>
            <div className="flex flex-wrap gap-2">
              {article.tags.map((tag, index) => (
                <span
                  key={index}
                  className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm hover:bg-gray-200 transition-colors cursor-pointer"
                >
                  #{tag}
                </span>
              ))}
            </div>
          </div>

          {/* Share */}
          <div className="mb-8 p-6 bg-gray-50 rounded-lg">
            <h3 className="text-lg font-bold text-gray-800 mb-4">Bagikan Artikel</h3>
            <div className="flex gap-3">
              <button className="bg-blue-600 text-white py-2 px-4 rounded-lg text-sm hover:bg-blue-700 transition-colors">
                Facebook
              </button>
              <button className="bg-blue-400 text-white py-2 px-4 rounded-lg text-sm hover:bg-blue-500 transition-colors">
                Twitter
              </button>
              <button className="bg-green-600 text-white py-2 px-4 rounded-lg text-sm hover:bg-green-700 transition-colors">
                WhatsApp
              </button>
              <button className="bg-gray-600 text-white py-2 px-4 rounded-lg text-sm hover:bg-gray-700 transition-colors">
                Copy Link
              </button>
            </div>
          </div>

          {/* Related Articles */}
          <div>
            <h3 className="text-2xl font-bold text-gray-800 mb-6">Artikel Terkait</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {article.relatedArticles.map((related) => (
                <div
                  key={related.id}
                  className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow cursor-pointer"
                  onClick={() => onNavigate("article-detail", related.id)}
                >
                  <img
                    src={related.image || "/placeholder.svg"}
                    alt={related.title}
                    className="w-full h-32 object-cover"
                  />
                  <div className="p-4">
                    <span className="bg-[#475F45] text-white text-xs px-2 py-1 rounded-full">{related.category}</span>
                    <h4 className="text-gray-800 font-semibold mt-2 line-clamp-2">{related.title}</h4>
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
