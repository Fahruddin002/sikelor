// Data koleksi SIKELOR dari JSON
const collectionsData = [
  {
    id: "islam-001",
    nama: "Al-Qur'an Tulis Tangan",
    kategori: "Peninggalan Budaya Islam",
    deskripsi:
      "Merupakan bukti peninggalan pengaruh budaya Islam di Sulawesi Tengah, khususnya di Lembah Palu. Keberadaannya menandakan bahwa ajaran Islam telah masuk ke wilayah ini sejak awal abad ke-17 dan masih dilestarikan hingga kini.",
    gambar: "https://i.imgur.com/tZ7yyQT.jpeg",
    spesifikasi: {
      asal: "Lembah Palu, Sulawesi Tengah",
      material: "Kertas, tinta tradisional",
      kondisi: "Cukup Baik",
      dimensi: {
        panjang_cm: 30,
        lebar_cm: 20,
      },
      tahun_akuisisi: 1970,
    },
    makna_dan_signifikasi:
      "Merefleksikan masuknya dan berkembangnya ajaran Islam serta tradisi keilmuan Islam di wilayah Sulawesi Tengah sejak abad ke-17.",
  },
  {
    id: "etno-006",
    nama: "Dulang",
    kategori: "Etnografika",
    deskripsi:
      "Wadah tradisional yang digunakan dalam tradisi makan bersama atau memamah sirih pinang. Umum dipakai oleh seluruh lapisan masyarakat pada upacara adat di wilayah Asia Tenggara dan Pasifik, termasuk Sulawesi Tengah.",
    gambar: "https://i.imgur.com/1GuvJ3w.jpeg",
    spesifikasi: {
      asal: "Sulawesi Tengah",
      material: "Kayu/Logam",
      kondisi: "Baik",
      dimensi: {
        diameter_cm: 50,
        tinggi_cm: 15,
      },
      tahun_akuisisi: 2005,
    },
    makna_dan_signifikasi:
      "Peralatan penting dalam ritual sosial, jamuan makan, dan kebiasaan memamah sirih pinang yang mencerminkan kebersamaan masyarakat.",
  },
  {
    id: "arkeo-012",
    nama: "Wadah Kubur",
    kategori: "Arkeologi",
    deskripsi:
      "Gerabah yang digunakan sebagai tempat penguburan kedua (second burial) oleh masyarakat Suku Pamona pada zaman prasejarah. Umumnya digunakan setelah tulang jenazah dikumpulkan kembali untuk disimpan secara kolektif.",
    gambar: "https://i.imgur.com/MnL6P2r.jpeg",
    spesifikasi: {
      asal: "Wilayah Suku Pamona, Sulawesi Tengah",
      material: "Gerabah (tanah liat)",
      kondisi: "Fragmentasi/Rusak",
      dimensi: {
        diameter_cm: 40,
        tinggi_cm: 30,
      },
      tahun_akuisisi: 1980,
    },
    makna_dan_signifikasi:
      "Memberikan informasi berharga tentang praktik penguburan, kepercayaan terhadap kematian, dan siklus hidup masyarakat prasejarah Suku Pamona.",
  },
  {
    id: "arkeo-013",
    nama: "Tempayan Kubur",
    kategori: "Arkeologi",
    deskripsi:
      "Bejana besar dari tanah liat atau keramik yang digunakan sebagai tempat penguburan oleh masyarakat kuno. Tempayan ini menjadi bukti praktik pemakaman kuno yang berkembang di beberapa daerah di Sulawesi Tengah.",
    gambar: "https://i.imgur.com/uoGb52c.jpeg",
    spesifikasi: {
      asal: "Sulawesi Tengah",
      material: "Tanah liat/Keramik",
      kondisi: "Cukup Baik",
      dimensi: {
        diameter_cm: 70,
        tinggi_cm: 60,
      },
      tahun_akuisisi: 1985,
    },
    makna_dan_signifikasi:
      "Bukti arkeologis penting yang menunjukkan tradisi penguburan tempayan, mencerminkan kompleksitas ritual pemakaman masa lalu.",
  },
  {
    id: "etno-016",
    nama: "Miniatur Rumah Kataba",
    kategori: "Etnografika",
    deskripsi:
      "Replika rumah tradisional Kataba, yang dulunya dibangun dan digunakan oleh masyarakat biasa dari suku Kaili yang tinggal di wilayah pesisir. Miniatur ini digunakan sebagai media edukasi budaya.",
    gambar: "https://i.imgur.com/6GCMHsU.jpeg",
    spesifikasi: {
      asal: "Pesisir Sulawesi Tengah (Suku Kaili)",
      material: "Kayu",
      kondisi: "Sangat Baik",
      dimensi: {
        panjang_cm: 30,
        lebar_cm: 20,
        tinggi_cm: 25,
      },
      tahun_akuisisi: 2010,
    },
    makna_dan_signifikasi:
      "Sarana edukasi tentang arsitektur vernakular dan gaya hidup masyarakat Kaili pesisir, melestarikan bentuk rumah adat.",
  },
  {
    id: "etno-017",
    nama: "Miniatur Rumah Palava",
    kategori: "Etnografika",
    deskripsi:
      "Replika rumah tradisional Palava yang digunakan oleh masyarakat biasa dalam suku Kaili. Model rumah ini mencerminkan struktur bangunan adat masyarakat pedalaman Sulawesi Tengah.",
    gambar: "https://i.imgur.com/gc8kGdH.jpeg",
    spesifikasi: {
      asal: "Pedalaman Sulawesi Tengah (Suku Kaili)",
      material: "Kayu, bambu",
      kondisi: "Sangat Baik",
      dimensi: {
        panjang_cm: 35,
        lebar_cm: 25,
        tinggi_cm: 30,
      },
      tahun_akuisisi: 2012,
    },
    makna_dan_signifikasi:
      "Menggambarkan arsitektur rumah adat suku Kaili yang beradaptasi dengan lingkungan pedalaman, sebagai bagian dari warisan budaya.",
  },
  {
    id: "etno-018",
    nama: "Miniatur Rumah Tambi",
    kategori: "Etnografika",
    deskripsi:
      "Tambi adalah rumah tradisional suku Lore yang tinggal di Lembah Bada, Behoa, dan Pekurehua (Napu). Miniatur ini berfungsi sebagai sarana pelestarian budaya dan edukasi arsitektur tradisional.",
    gambar: "https://i.imgur.com/QkOATRZ.jpeg",
    spesifikasi: {
      asal: "Lembah Bada, Behoa, Pekurehua (Suku Lore)",
      material: "Kayu, ijuk",
      kondisi: "Sangat Baik",
      dimensi: {
        panjang_cm: 40,
        lebar_cm: 30,
        tinggi_cm: 35,
      },
      tahun_akuisisi: 2014,
    },
    makna_dan_signifikasi:
      "Sarana edukasi penting untuk memahami ciri khas arsitektur dan gaya hidup masyarakat suku Lore di dataran tinggi Sulawesi Tengah.",
  },
  {
    id: "etno-019",
    nama: "Miniatur Gampiri",
    kategori: "Etnografika",
    deskripsi:
      "Gampiri adalah bangunan tradisional suku Kaili yang digunakan untuk menyimpan padi hasil panen. Miniatur ini merepresentasikan kearifan lokal dalam penyimpanan hasil pertanian.",
    gambar: "https://i.imgur.com/YeYdwHS.jpeg",
    spesifikasi: {
      asal: "Sulawesi Tengah (Suku Kaili)",
      material: "Kayu",
      kondisi: "Sangat Baik",
      dimensi: {
        panjang_cm: 25,
        lebar_cm: 15,
        tinggi_cm: 20,
      },
      tahun_akuisisi: 2016,
    },
    makna_dan_signifikasi:
      "Menunjukkan kearifan lokal masyarakat Kaili dalam manajemen pangan dan sistem pertanian tradisional.",
  },
  {
    id: "etno-020",
    nama: "Miniatur Buho'",
    kategori: "Etnografika",
    deskripsi:
      "Buho' adalah lumbung padi tradisional yang dibangun terpisah dari rumah Tambi. Memiliki struktur lebih terbuka dan berfungsi sebagai tempat penyimpanan padi masyarakat suku Lore dan Kaili.",
    gambar: "https://i.imgur.com/mipKZwZ.jpeg",
    spesifikasi: {
      asal: "Sulawesi Tengah (Suku Lore dan Kaili)",
      material: "Kayu, bambu",
      kondisi: "Sangat Baik",
      dimensi: {
        panjang_cm: 20,
        lebar_cm: 15,
        tinggi_cm: 18,
      },
      tahun_akuisisi: 2018,
    },
    makna_dan_signifikasi:
      "Cerminan penting dari sistem pertanian dan penyimpanan hasil panen komunal, menunjukkan adaptasi dengan iklim tropis.",
  },
]

// Helper function to format dimensions
const formatDimensions = (dimensi) => {
  if (!dimensi) return "Tidak tersedia"

  if (dimensi.diameter_cm) {
    return `Diameter: ${dimensi.diameter_cm} cm${dimensi.tinggi_cm ? `, Tinggi: ${dimensi.tinggi_cm} cm` : ""}`
  }

  const result = []
  if (dimensi.panjang_cm) result.push(`Panjang: ${dimensi.panjang_cm} cm`)
  if (dimensi.lebar_cm) result.push(`Lebar: ${dimensi.lebar_cm} cm`)
  if (dimensi.tinggi_cm) result.push(`Tinggi: ${dimensi.tinggi_cm} cm`)

  return result.join(", ")
}

// Get unique categories from collections
const getUniqueCategories = () => {
  const categories = new Set()
  collectionsData.forEach((item) => {
    if (item.kategori) categories.add(item.kategori)
  })
  return Array.from(categories)
}

// Search collections by term
const searchCollections = (term) => {
  const searchTerm = term.toLowerCase()
  return collectionsData.filter(
    (item) =>
      item.nama.toLowerCase().includes(searchTerm) ||
      item.deskripsi.toLowerCase().includes(searchTerm) ||
      item.kategori.toLowerCase().includes(searchTerm) ||
      (item.spesifikasi && item.spesifikasi.asal && item.spesifikasi.asal.toLowerCase().includes(searchTerm)),
  )
}

export { collectionsData, formatDimensions, getUniqueCategories, searchCollections }