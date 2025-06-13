"use client"

import { useState, useEffect } from "react"
import { MLApiService } from "../services/api"

export default function ApiStatusIndicator() {
  const [apiStatus, setApiStatus] = useState({
    isChecking: true,
    isConnected: false,
    lastChecked: null,
  })

  useEffect(() => {
    const checkApiConnection = async () => {
      setApiStatus((prev) => ({ ...prev, isChecking: true }))

      try {
        const isConnected = await MLApiService.testConnection()
        setApiStatus({
          isChecking: false,
          isConnected,
          lastChecked: new Date(),
        })
      } catch (error) {
        console.error("API connection check failed:", error)
        setApiStatus({
          isChecking: false,
          isConnected: false,
          lastChecked: new Date(),
          error: error.message,
        })
      }
    }

    // Check on component mount
    checkApiConnection()

    // Check every 30 seconds
    const interval = setInterval(checkApiConnection, 30000)

    return () => clearInterval(interval)
  }, [])

  return (
    <div className="fixed bottom-4 right-4 z-50">
      <div
        className={`flex items-center gap-2 px-3 py-2 rounded-lg shadow-md text-sm ${
          apiStatus.isChecking
            ? "bg-yellow-100 text-yellow-800"
            : apiStatus.isConnected
              ? "bg-green-100 text-green-800"
              : "bg-red-100 text-red-800"
        }`}
      >
        <div
          className={`w-2 h-2 rounded-full ${
            apiStatus.isChecking ? "bg-yellow-500 animate-pulse" : apiStatus.isConnected ? "bg-green-500" : "bg-red-500"
          }`}
        ></div>
        <span>
          {apiStatus.isChecking ? "Memeriksa API..." : apiStatus.isConnected ? "API Terhubung" : "API Tidak Terhubung"}
        </span>
      </div>
    </div>
  )
}
