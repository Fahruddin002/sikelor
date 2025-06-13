"use client"
import AboutNavbar from "../components/AboutNavbar"


export default function About({ onNavigate }) {
  const museumInfo = {
    title: "Museum Sulawesi Tengah",
    subtitle: "Melestarikan Warisan Budaya untuk Generasi Mendatang",
    description: `Museum Sulawesi Tengah digagas oleh budayawan Sulawesi Tengah yaitu Masyhuddin Masyuda BA, dalam tulisannya yang berjudul "Perspektif Pembangunan Museum Negeri Provinsi Sulawesi Tengah" yang mempresentasikan pada penataran di Museum Nasional tahun 1975.

    Museum ini didirikan dengan tujuan untuk melestarikan, mengumpulkan, dan memamerkan kekayaan budaya Sulawesi Tengah. Koleksi museum mencakup berbagai artefak bersejarah, benda-benda etnografi, seni tradisional, dan dokumentasi budaya yang mencerminkan keragaman suku dan tradisi di Sulawesi Tengah.

    Sebagai pusat edukasi dan penelitian, Museum Sulawesi Tengah berperan penting dalam memperkenalkan warisan budaya kepada masyarakat luas, khususnya generasi muda, agar nilai-nilai luhur budaya tetap terjaga dan dilestarikan.`,
    vision: "Menjadi pusat pelestarian dan pengembangan budaya Sulawesi Tengah yang terdepan di Indonesia.",
    mission: [
      "Mengumpulkan, melestarikan, dan memamerkan warisan budaya Sulawesi Tengah",
      "Menyelenggarakan kegiatan edukasi dan penelitian budaya",
      "Mengembangkan teknologi digital untuk pelestarian budaya",
      "Memfasilitasi dialog antarbudaya dan pertukaran pengetahuan",
      "Meningkatkan kesadaran masyarakat terhadap pentingnya pelestarian budaya",
    ],
    stats: [
      { number: "1,500+", label: "Koleksi Artefak" },
      { number: "50+", label: "Tahun Beroperasi" },
      { number: "100,000+", label: "Pengunjung per Tahun" },
      { number: "25+", label: "Program Edukasi" },
    ],
  }

  const teamMembers = [
    {
      id: "MC323D5Y0866",
      name: "Fahruddin A. Lebe",
      role: "Machine Learning",
      position: "Project Lead",
      image: "/src/assets/dev/udin.jpg?height=300&width=300",
      bio: "Memimpin pengembangan aplikasi SIKELOR dengan fokus pada arsitektur sistem dan integrasi teknologi.",
      social: {
        github: "https://github.com/Fahruddin002 ",
        linkedin: "http://www.linkedin.com/in/fahruddin-a-lebe",
        instagram: "https://www.instagram.com/faruk.l_?igsh=cndldWlrOHNmeDBi",
      },
      skills: ["React", "Node.js", "MongoDB", "System Architecture"],
    },
    {
      id: "MC323D5Y0848",
      name: "Ahmad Afil",
      role: "Machine Learning",
      position: "Data Model Specialist",
      image: "/src/assets/dev/afil.jpg?height=300&width=300",
      bio: "Mengembangkan sistem backend yang robust dan API yang efisien untuk mendukung aplikasi SIKELOR.",
      social: {
        github: "https://github.com/sitinurhaliza",
        linkedin: "https://linkedin.com/in/sitinurhaliza",
        instagram: "https://instagram.com/sitinurhaliza",
      },
      skills: ["React", "Tailwind CSS", "Figma", "User Experience"],
    },
    {
      id: "FC323D5Y0559",
      name: "Aril.S",
      role: "Fullstack Engineer",
      position: "UI/UX Designer",
      image: "/src/assets/dev/Aril.JPG?height=300&width=300",
      bio: "Bertanggung jawab atas desain antarmuka pengguna dan pengalaman pengguna yang intuitif dan menarik.",
      social: {
        github: "https://github.com/aaril011",
        linkedin: "www.linkedin.com/in/aril-s-74b719312",
        instagram: "https://www.instagram.com/arils.011?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw==",
      },
      skills: ["Node.js", "Express", "PostgreSQL", "REST API"],
    },
    {
      id: "MC323D5Y0438",
      name: "Hidayatul Fatwa",
      role: "Machine Learning",
      position: "AI Specialist",
      image: "/src/assets/dev/wawa.jpg?height=300&width=300",
      bio: "Mengembangkan model machine learning untuk fitur pengenalan objek dan klasifikasi artefak budaya.",
      social: {
        github: "https://github.com/dewikartika",
        linkedin: "https://linkedin.com/in/dewikartika",
        instagram: "https://instagram.com/dewikartika",
      },
      skills: ["Python", "TensorFlow", "Computer Vision", "Deep Learning"],
    },
    {
      id: "FC323D5Y0486",
      name: "Pradigta",
      role: "Fullstack Developer",
      position: "Backend Specialist",
      image: "/src/assets/dev/dita.jpg?height=300&width=300",
      bio: "Mengembangkan aplikasi mobile SIKELOR untuk platform Android dan iOS dengan teknologi React Native.",
      social: {
        github: "https://github.com/bayusetiawan",
        linkedin: "https://linkedin.com/in/bayusetiawan",
        instagram: "https://instagram.com/bayusetiawan",
      },
      skills: ["React Native", "Flutter", "Firebase", "Mobile UI"],
    },
    {
      id: "FC323D5Y1747",
      name: "Andi Albukhari Fachrurrozi",
      role: "Fullstack Developer",
      position: "Frontend Engineer",
      image: "src/assets/dev/IMG_0995.JPG",
      bio: "Mengelola infrastruktur cloud, deployment, dan monitoring sistem untuk memastikan aplikasi berjalan optimal.",
      social: {
        github: "https://github.com/chocomintt0",
        linkedin: "https://linkedin.com/in/rinamaharani",
        instagram: "https://instagram.com/andi_albukhari_f",
      },
      skills: ["AWS", "Docker", "Kubernetes", "CI/CD"],
    },
  ]

  return (
    <div className="flex flex-col min-h-screen bg-white">
      <AboutNavbar onNavigate={onNavigate} />

      {/* Main Content */}
      <main className="flex-1 pt-20 md:pt-24">
        {/* Museum Section */}
        <section className="py-16">
          <div className="max-w-6xl mx-auto px-4 md:px-8">
            {/* Hero Section */}
            <div className="text-center mb-16">
              <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-6">{museumInfo.title}</h1>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">{museumInfo.subtitle}</p>
            </div>

            {/* Museum Image */}
            <div className="mb-16">
              <img
                src="/src/assets/museum.png"
                alt="Museum Sulawesi Tengah"
                className="w-full h-[450px] object-cover rounded-lg shadow-lg"
              />
            </div>

            {/* Description */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
              <div>
                <h2 className="text-2xl font-bold text-gray-800 mb-6">Sejarah Museum</h2>
                <div className="prose prose-gray max-w-none">
                  {museumInfo.description.split("\n\n").map((paragraph, index) => (
                    <p key={index} className="text-gray-600 mb-4 leading-relaxed">
                      {paragraph.trim()}
                    </p>
                  ))}
                </div>
              </div>

              <div>
                <div className="mb-8">
                  <h3 className="text-xl font-bold text-gray-800 mb-4">Visi</h3>
                  <p className="text-gray-600 leading-relaxed">{museumInfo.vision}</p>
                </div>

                <div>
                  <h3 className="text-xl font-bold text-gray-800 mb-4">Misi</h3>
                  <ul className="space-y-2">
                    {museumInfo.mission.map((item, index) => (
                      <li key={index} className="flex items-start gap-3">
                        <div className="w-2 h-2 bg-[#475F45] rounded-full mt-2 flex-shrink-0"></div>
                        <span className="text-gray-600">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Team Section */}
        <section className="py-16 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 md:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-6">Tim Developer SIKELOR</h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Bertemu dengan tim developer yang berdedikasi dalam mengembangkan aplikasi SIKELOR untuk melestarikan
                budaya Sulawesi Tengah melalui teknologi digital.
              </p>
            </div>

            {/* Single Row Grid - All 6 cards in one row */}
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-3 md:gap-4">
              {teamMembers.map((member) => (
                <div
                  key={member.id}
                  className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300"
                >
                  {/* Profile Image - Very small */}
                  <div className="aspect-square overflow-hidden">
                    <img
                      src={member.image || "/placeholder.svg"}
                      alt={member.name}
                      className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                    />
                  </div>

                  {/* Content - Minimal */}
                  <div className="p-2">
                    <div className="text-center mb-2">
                      <h3 className="text-xs font-bold text-gray-800 mb-1 leading-tight">{member.name}</h3>
                      <p className="text-[#475F45] font-semibold text-xs mb-1">{member.role}</p>
                      <p className="text-gray-500 text-xs">{member.id}</p>
                    </div>

                    {/* Position Badge */}
                    <div className="text-center mb-2">
                      <span className="inline-block bg-[#475F45] text-white text-xs py-1 px-2 rounded-full leading-tight">
                        {member.position}
                      </span>
                    </div>

                    {/* Social Media - Compact */}
                    <div className="flex justify-center gap-1">
                      <a
                        href={member.social.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-5 h-5 bg-gray-800 text-white rounded-full flex items-center justify-center hover:bg-gray-700 transition-colors"
                      >
                        <svg className="w-2.5 h-2.5" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                        </svg>
                      </a>
                      <a
                        href={member.social.linkedin}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-5 h-5 bg-blue-600 text-white rounded-full flex items-center justify-center hover:bg-blue-700 transition-colors"
                      >
                        <svg className="w-2.5 h-2.5" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                        </svg>
                      </a>
                      <a
                        href={member.social.instagram}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-5 h-5 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-full flex items-center justify-center hover:from-purple-600 hover:to-pink-600 transition-colors"
                      >
                        <svg className="w-2.5 h-2.5" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                        </svg>
                      </a>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Project Info */}
            <div className="mt-16 text-center">
              <div className="bg-white rounded-lg p-8 shadow-md">
                <h3 className="text-2xl font-bold text-gray-800 mb-4">Tentang Proyek SIKELOR</h3>
                <p className="text-gray-600 max-w-3xl mx-auto leading-relaxed">
                  SIKELOR (Sistem Kelola Objek Budaya) adalah aplikasi inovatif yang menggabungkan teknologi modern
                  dengan pelestarian budaya. Dikembangkan oleh tim yang berpengalaman, aplikasi ini menggunakan
                  teknologi AI, machine learning, dan augmented reality untuk memberikan pengalaman interaktif dalam
                  menjelajahi warisan budaya Sulawesi Tengah.
                </p>
                <div className="mt-6 flex flex-wrap justify-center gap-4">
                  <span className="bg-[#475F45] text-white px-4 py-2 rounded-full text-sm">React</span>
                  <span className="bg-[#475F45] text-white px-4 py-2 rounded-full text-sm">Node.js</span>
                  <span className="bg-[#475F45] text-white px-4 py-2 rounded-full text-sm">Machine Learning</span>
                  <span className="bg-[#475F45] text-white px-4 py-2 rounded-full text-sm">Augmented Reality</span>
                  <span className="bg-[#475F45] text-white px-4 py-2 rounded-full text-sm">Cloud Computing</span>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-[#ffffff] text-black text-center py-4 mt-auto">
        <p className="text-xs lg:text-sm">© 2025 Sikelor. All rights reserved.</p>
      </footer>
    </div>
  )
}
