"use client"

import { Calendar, Clock } from "../components/icons"

export default function EventCard({
  date,
  month,
  image,
  title,
  description,
  eventDate,
  eventTime,
  eventId,
  onNavigate,
}) {
  const handleViewDetail = () => {
    if (onNavigate && eventId) {
      onNavigate("event-detail", eventId)
    }
  }

  return (
    <div
      className="flex flex-col md:flex-row items-start md:items-center gap-4 md:gap-8 py-6 md:py-8 cursor-pointer hover:bg-gray-50 transition-colors rounded-lg p-4"
      onClick={handleViewDetail}
    >
      {/* Date Section */}
      <div className="flex flex-row md:flex-col items-center md:items-center text-center min-w-[80px] gap-2 md:gap-0">
        <div className="text-2xl md:text-4xl font-bold text-gray-800">{date}</div>
        <div className="text-xs md:text-sm font-medium text-gray-600 uppercase tracking-wider">{month}</div>
      </div>

      {/* Image Section */}
      <div className="flex-shrink-0 w-full md:w-auto">
        <img
          src={image ? image : "/image/event-1.jpg"}
          alt={title}
          className="w-full md:w-48 h-32 object-cover rounded-lg"
        />
      </div>

      {/* Content Section */}
      <div className="flex-1">
        <h3 className="text-lg md:text-xl font-semibold text-gray-800 mb-2 hover:text-green-600 transition-colors">
          {title}
        </h3>
        <p className="text-gray-600 mb-4 leading-relaxed text-sm md:text-base">{description}</p>

        <div className="mb-4">
          <h4 className="text-gray-400 font-medium mb-2 text-sm md:text-base">Event Detail</h4>
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2 sm:gap-4 text-sm text-gray-600">
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4" />
              <span>{eventDate}</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4" />
              <span>{eventTime}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
