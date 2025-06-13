"use client"

import { useState, useEffect } from "react"
import EventNavbar from "../components/EventNavbar"
import EventCard from "../components/EventCard"
import EventSearch from "../components/EventSearch"
import {
  eventsData,
  formatEventDate,
  formatEventDateDisplay,
  getEventStatus,
  searchEvents,
  filterEventsByStatus,
  sortEvents,
} from "../data/events"

export default function Events({ onNavigate }) {
  const [allEvents] = useState(() => {
    // Transform events data for display
    return eventsData.events.map((event) => {
      const dateInfo = formatEventDate(event.date)
      const status = getEventStatus(event.date, event.end_date)

      return {
        id: event.id,
        date: dateInfo.date,
        month: dateInfo.month,
        image: event.image_url,
        title: event.title,
        description: event.short_description,
        eventDate: formatEventDateDisplay(event.date),
        eventTime: event.time,
        fullDate: event.date,
        status: status,
      }
    })
  })

  const [events, setEvents] = useState(allEvents)
  const [searchTerm, setSearchTerm] = useState("")
  const [sortOption, setSortOption] = useState("date-asc")
  const [activeStatuses, setActiveStatuses] = useState([])

  useEffect(() => {
    let filteredEvents = [...allEvents]

    // Apply search filter
    if (searchTerm) {
      filteredEvents = searchEvents(filteredEvents, searchTerm)
    }

    // Apply status filter
    if (activeStatuses.length > 0) {
      filteredEvents = filterEventsByStatus(filteredEvents, activeStatuses)
    }

    // Apply sorting
    filteredEvents = sortEvents(filteredEvents, sortOption)

    setEvents(filteredEvents)
  }, [searchTerm, sortOption, activeStatuses, allEvents])

  const handleSearch = (term) => {
    setSearchTerm(term)
  }

  const handleSort = (option) => {
    setSortOption(option)
  }

  const handleStatusChange = (statuses) => {
    setActiveStatuses(statuses)
  }

  return (
    <div className="flex flex-col min-h-screen bg-white">
      <EventNavbar onNavigate={onNavigate} />

      {/* Main Content - Flex grow to push footer down */}
      <main className="flex-1">
        {/* Add padding-top to account for fixed navbar */}
        <div className="pt-20 md:pt-24">
          <div className="max-w-4xl mx-auto px-4 md:px-8 py-8 md:py-12">
            {/* Header Section */}
            <div className="text-center mb-8 md:mb-12">
              <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4 md:mb-6">Events</h1>
              <p className="text-gray-600 max-w-2xl mx-auto leading-relaxed text-sm md:text-base">
                Temukan berbagai acara menarik yang diselenggarakan di museum. Bergabunglah dengan pameran, workshop,
                seminar, dan acara budaya yang selalu memberikan pengalaman baru untuk dijelajahi!
              </p>
            </div>

            {/* Search and Filter Section */}
            <EventSearch onSearch={handleSearch} onSort={handleSort} onStatusChange={handleStatusChange} />

            {/* Events List */}
            {events.length > 0 ? (
              <div className="space-y-0">
                {events.map((event, index) => (
                  <div key={event.id}>
                    <EventCard
                      date={event.date}
                      month={event.month}
                      image={event.image}
                      title={event.title}
                      description={event.description}
                      eventDate={event.eventDate}
                      eventTime={event.eventTime}
                      eventId={event.id}
                      onNavigate={onNavigate}
                    />
                    {index < events.length - 1 && <hr className="border-gray-300" />}
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <p className="text-gray-500 text-base md:text-lg">
                  Tidak ada event yang sesuai dengan kriteria pencarian Anda.
                </p>
                <button
                  onClick={() => {
                    setSearchTerm("")
                    setSortOption("date-asc")
                    setActiveStatuses([])
                  }}
                  className="mt-4 text-green-600 hover:text-green-800 font-medium text-sm md:text-base"
                >
                  Reset filter
                </button>
              </div>
            )}
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
