"use client"

import { useState, useEffect } from "react"
import EventNavbar from "../components/EventNavbar"
import { Clock, MapPin } from "../components/icons"
import { getEventById, formatEventDate, formatEventDateDisplay, getEventStatus } from "../data/events"

export default function EventDetail({ onNavigate, eventId }) {
  const [event, setEvent] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (eventId) {
      const eventData = getEventById(eventId)
      if (eventData) {
        const dateInfo = formatEventDate(eventData.date)
        const status = getEventStatus(eventData.date, eventData.end_date)

        setEvent({
          ...eventData,
          dateInfo,
          status,
          eventDateDisplay: formatEventDateDisplay(eventData.date),
        })
      }
      setLoading(false)
    }
  }, [eventId])

  const getStatusLabel = (status) => {
    switch (status) {
      case "upcoming":
        return "Akan Datang"
      case "ongoing":
        return "Sedang Berlangsung"
      case "completed":
        return "Selesai"
      default:
        return "Akan Datang"
    }
  }

  const getStatusColor = (status) => {
    switch (status) {
      case "upcoming":
        return "bg-blue-100 text-blue-800"
      case "ongoing":
        return "bg-green-100 text-green-800"
      case "completed":
        return "bg-gray-100 text-gray-800"
      default:
        return "bg-blue-100 text-blue-800"
    }
  }

  if (loading) {
    return (
      <div className="flex flex-col min-h-screen bg-white">
        <EventNavbar onNavigate={onNavigate} />
        <main className="flex-1 pt-20 md:pt-24 flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
            <p className="text-gray-600">Memuat detail event...</p>
          </div>
        </main>
      </div>
    )
  }

  if (!event) {
    return (
      <div className="flex flex-col min-h-screen bg-white">
        <EventNavbar onNavigate={onNavigate} />
        <main className="flex-1 pt-20 md:pt-24 flex items-center justify-center">
          <div className="text-center">
            <h2 className="text-xl font-bold text-red-600 mb-2">Event Tidak Ditemukan</h2>
            <p className="text-gray-600 mb-4">Event yang Anda cari tidak tersedia.</p>
            <button
              onClick={() => onNavigate("event")}
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
            >
              Kembali ke Events
            </button>
          </div>
        </main>
      </div>
    )
  }

  return (
    <div className="flex flex-col min-h-screen bg-white">
      <EventNavbar onNavigate={onNavigate} />

      <main className="flex-1 pt-20 md:pt-24">
        <div className="max-w-6xl mx-auto px-4 md:px-8 py-8 md:py-12">
          {/* Back Button */}
          <button
            onClick={() => onNavigate("event")}
            className="flex items-center gap-2 bg-transparent pl-0 text-gray-600 hover:text-gray-800 mb-6 transition-colors"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Kembali ke Events
          </button>

          {/* Event Header */}
          <div className="mb-8">
            <div className="flex flex-col md:flex-row gap-6">
              {/* Date Card */}
              <div className="flex-shrink-0">
                <div className="bg-[#475F45] text-white p-4 rounded-lg text-center min-w-[100px]">
                  <div className="text-2xl font-bold">{event.dateInfo.date}</div>
                  <div className="text-sm">{event.dateInfo.month}</div>
                  <div className="text-xs opacity-80">{event.dateInfo.year}</div>
                </div>
              </div>

              {/* Event Info */}
              <div className="flex-1">
                <h1 className="text-2xl md:text-3xl font-bold text-gray-800 mb-4">{event.title}</h1>
                <p className="text-gray-600 mb-4">{event.short_description}</p>

                {/* Quick Info */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="flex items-center gap-2 text-gray-600">
                    <Clock className="w-5 h-5" />
                    <span>{event.time}</span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-600">
                    <MapPin className="w-5 h-5" />
                    <span>{event.location}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Event Image */}
          <div className="mb-8">
            <img
              src={event.image_url || "/placeholder.svg"}
              alt={event.title}
              className="w-full h-64 md:h-[450px] md:w-[710px] object-fill rounded-lg shadow-lg"
              onError={(e) => {
                e.target.src = "/placeholder.svg"
              }}
            />
          </div>

          {/* Content Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-8">
              {/* Description */}
              <div>
                <h2 className="text-xl font-bold text-gray-800 mb-4">Tentang Event</h2>
                <div className="prose prose-gray max-w-none">
                  {event.full_description.map((paragraph, index) => (
                    <p key={index} className="text-gray-600 mb-4 leading-relaxed">
                      {paragraph}
                    </p>
                  ))}
                </div>
              </div>

              {/* Schedule */}
              {event.schedule && event.schedule.length > 0 && (
                <div>
                  <h2 className="text-xl font-bold text-gray-800 mb-4">Jadwal Acara</h2>
                  <div className="space-y-3">
                    {event.schedule.map((item, index) => (
                      <div key={index} className="flex gap-4 p-4 bg-gray-50 rounded-lg">
                        <div className="text-[#475F45] font-semibold min-w-[120px]">{item.time}</div>
                        <div className="text-gray-700">{item.activity}</div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Event Details */}
              <div className="bg-gray-50 p-6 rounded-lg">
                <h3 className="text-lg font-bold text-gray-800 mb-4">Detail Event</h3>
                <div className="space-y-3">
                  <div>
                    <div className="text-sm font-medium text-gray-500">Harga</div>
                    <div className="text-gray-800">{event.details.price}</div>
                  </div>
                  <div>
                    <div className="text-sm font-medium text-gray-500">Kapasitas</div>
                    <div className="text-gray-800">{event.capacity}</div>
                  </div>
                  <div>
                    <div className="text-sm font-medium text-gray-500">Penyelenggara</div>
                    <div className="text-gray-800">{event.details.organizer}</div>
                  </div>
                  <div>
                    <div className="text-sm font-medium text-gray-500">Kontak</div>
                    <div className="text-gray-800">{event.details.contact}</div>
                  </div>
                  <div>
                    <div className="text-sm font-medium text-gray-500">Status</div>
                    <span
                      className={`inline-block px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(event.status)}`}
                    >
                      {getStatusLabel(event.status)}
                    </span>
                  </div>
                </div>
              </div>

              {/* Register Button */}
              {event.status !== "completed" && (
                <button className="w-full bg-[#475F45] hover:bg-[#3a4e39] text-white font-semibold py-3 px-6 rounded-lg transition-colors">
                  {event.status === "ongoing" ? "Bergabung Sekarang" : "Daftar Sekarang"}
                </button>
              )}

              {/* Share */}
              <div className="bg-gray-50 p-6 rounded-lg">
                <h3 className="text-lg font-bold text-gray-800 mb-4">Bagikan Event</h3>
                <div className="flex gap-3">
                  <button className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-lg text-sm hover:bg-blue-700 transition-colors">
                    Facebook
                  </button>
                  <button className="flex-1 bg-blue-400 text-white py-2 px-4 rounded-lg text-sm hover:bg-blue-500 transition-colors">
                    Twitter
                  </button>
                  <button className="flex-1 bg-green-600 text-white py-2 px-4 rounded-lg text-sm hover:bg-green-700 transition-colors">
                    WhatsApp
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-[#ffffff] text-black text-center py-4 mt-auto">
        <p className="text-xs lg:text-sm">© 2025 Sikelor. All rights reserved.</p>
      </footer>
    </div>
  )
}
