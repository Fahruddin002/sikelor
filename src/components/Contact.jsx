"use client"

import { useState, useEffect, useRef } from "react"

const Contact = () => {
  const sectionRef = useRef(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => setVisible(entry.isIntersecting),
      { threshold: 0.2 }
    )
    if (sectionRef.current) observer.observe(sectionRef.current)
    return () => observer.disconnect()
  }, [])

  return (
    <section
      ref={sectionRef}
      className={`relative overflow-hidden bg-transparent backdrop-blur-sm py-24 px-5 sm:px-12 md:px-24 transition-all duration-700 ease-in-out transform ${
        visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
      }`}
    >
      {/* Background Logo Image */}
      <div className="absolute inset-0 -z-10 flex items-center justify-center">
        <img
          src="src\assets\logo-home.png" // Ubah sesuai nama file logomu di public/
          alt="Museum Logo"
          className="w-[90%] opacity-15 object-contain"
        />
        {/* Untuk efek lebih kentara, naikkan opacity misal: opacity-15 */}
      </div>

      <div className="max-w-5xl mx-auto relative z-10">
        <div className="text-center mb-12">
          <h2 className="text-white text-3xl font-bold mb-3 drop-shadow-lg">
            Connect with Us
          </h2>
          <p className="text-white/90 text-base leading-relaxed max-w-xl mx-auto drop-shadow">
            Hubungi kami untuk informasi lebih lanjut tentang museum, koleksi, atau kunjungan Anda.
          </p>
        </div>

        {/* Contact Info Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
          {[
            {
              title: "Address",
              text: "Jl. Kemiri No. 23, Palu Barat, Kota Palu",
              icon: (
                <path
                  fillRule="evenodd"
                  d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z"
                  clipRule="evenodd"
                />
              )
            },
            {
              title: "Phone",
              text: "+62 451 421234",
              icon: (
                <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
              )
            },
            {
              title: "Email",
              text: "info@museumsulteng.go.id",
              icon: (
                <>
                  <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                  <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                </>
              )
            },
            {
              title: "Opening Hours",
              text: "Selasa - Minggu: 08:00 - 16:00 WITA",
              icon: (
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z"
                  clipRule="evenodd"
                />
              )
            }
          ].map(({ title, text, icon }, i) => (
            <div
              key={i}
              className="flex items-start gap-4 p-5 rounded-xl bg-black/30 border border-white/10 backdrop-blur-lg hover:shadow-md transition-shadow"
            >
              <div className="w-10 h-10 bg-[#4A6249] rounded-full flex items-center justify-center flex-shrink-0">
                <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                  {icon}
                </svg>
              </div>
              <div>
                <h4 className="text-white font-semibold text-sm mb-1">{title}</h4>
                <p className="text-white/80 text-sm">{text}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Social Media */}
        <div className="text-center">
          <h4 className="text-white font-semibold text-sm mb-4">Follow Us</h4>
          <div className="flex justify-center gap-4">
            {["facebook", "instagram", "twitter", "youtube"].map((platform, i) => (
              <a
                key={i}
                href="#"
                className="w-10 h-10 rounded-full bg-[#4A6249] flex items-center justify-center hover:bg-[#3d543c] transition-colors"
              >
                <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <circle cx="12" cy="12" r="10" />
                </svg>
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export default Contact
