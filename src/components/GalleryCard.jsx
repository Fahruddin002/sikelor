"use client"

const GalleryCard = ({ image, title, description, onNavigate, itemId, onShowDetail }) => {
  const handleLearnMore = () => {
    if (onShowDetail && itemId) {
      onShowDetail(itemId)
    }
  }

  // Fungsi untuk memotong teks dan menambahkan "..."
  const truncateText = (text, maxLength = 67) => {
    if (text.length <= maxLength) return text
    return text.substring(0, maxLength).trim() + ". . ."
  }

  return (
    <div className="relative py-1 px-1">
      <div className="relative w-[290px] h-[340px] overflow-hidden rounded-md transition-all duration-500 hover:-translate-y-2 hover:shadow-xl">
        {/* Gambar latar */}
        <img
          src={image || "/placeholder.svg"}
          alt={title}
          className="w-full h-full object-cover p-6 bg-[#50684E] transition-transform duration-500 ease-in-out hover:scale-105"
        />

        {/* Overlay konten hanya setengah kiri */}
        <div className="absolute bottom-0 left-0 w-[75%] h-[165px] bg-[#476649] text-white p-4 text-left rounded flex flex-col">
          <h3 className="text-sm font-bold mb-2 leading-tight">{title}</h3>
          <p className="text-xs text-white/90 mb-3 flex-1 leading-relaxed overflow-hidden">
            {truncateText(description)}
          </p>
          <div className="mt-auto">
            <button
              onClick={handleLearnMore}
              className="text-white/65 text-xs font-bold no-underline block relative w-[70%] after:absolute after:left-0 after:bottom-0 after:w-0 after:h-[2px] after:bg-white after:transition-all after:duration-300 hover:after:w-full bg-transparent border-none cursor-pointer"
            >
              Learn More
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default GalleryCard
