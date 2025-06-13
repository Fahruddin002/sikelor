"use client"

import { useState } from "react"
import { Search } from "./icons"

export default function EventSearch({ onSearch, onSort, onStatusChange }) {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedStatuses, setSelectedStatuses] = useState([])

  const statuses = [
    { value: "upcoming", label: "Akan Datang", color: "bg-blue-600" },
    { value: "ongoing", label: "Sedang Berlangsung", color: "bg-green-600" },
    { value: "completed", label: "Selesai", color: "bg-gray-600" },
  ]

  const handleSearch = (e) => {
    const value = e.target.value
    setSearchTerm(value)
    onSearch(value)
  }

  const handleSort = (e) => {
    onSort(e.target.value)
  }

  const handleStatusToggle = (status) => {
    const updatedStatuses = selectedStatuses.includes(status)
      ? selectedStatuses.filter((s) => s !== status)
      : [...selectedStatuses, status]

    setSelectedStatuses(updatedStatuses)
    onStatusChange(updatedStatuses)
  }

  return (
    <div className="mb-12">
      {/* Search Bar */}
      <div className="relative mb-6">
        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
          <Search className="w-5 h-5 text-gray-400" />
        </div>
        <input
          type="text"
          className="w-full p-3 pl-10 text-sm bg-transparent text-gray-900 border border-gray-300 rounded-lg focus:ring-green-500 focus:border-green-500"
          placeholder="Cari events berdasarkan nama, deskripsi, lokasi, atau penyelenggara..."
          value={searchTerm}
          onChange={handleSearch}
        />
      </div>

      {/* Filters Row */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        {/* Status Filter */}
        <div className="flex items-center gap-3">
          <span className="text-sm font-medium text-gray-700">Status Event:</span>
          <div className="flex flex-wrap gap-2">
            {statuses.map((status) => (
              <button
                key={status.value}
                onClick={() => handleStatusToggle(status.value)}
                className={`px-3 py-1 text-sm rounded-full transition-colors ${selectedStatuses.includes(status.value)
                    ? `${status.color} text-white`
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                  }`}
              >
                {status.label}
              </button>
            ))}
          </div>
        </div>

        {/* Sort Dropdown */}
        <div className="flex items-center">
          <label htmlFor="sort" className="mr-2 text-sm text-gray-600">
            Urutkan:
          </label>
          <select
            id="sort"
            className="text-sm border bg-transparent text-black border-gray-300 rounded-md p-2 focus:ring-green-500 focus:border-green-500"
            onChange={handleSort}
            defaultValue="date-asc"
          >
            <option value="date-asc">Tanggal Terdekat</option>
            <option value="date-desc">Tanggal Terjauh</option>
            <option value="a-z">A-Z</option>
            <option value="z-a">Z-A</option>
            <option value="status">Status</option>
          </select>
        </div>
      </div>
    </div>
  )
}
