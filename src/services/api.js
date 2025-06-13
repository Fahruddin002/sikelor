// Base URL for FastAPI ML API - environment-aware configuration
const ML_API_BASE_URL = import.meta.env.VITE_ML_API_URL || "http://localhost:8000"
const EXPRESS_API_BASE_URL = import.meta.env.VITE_EXPRESS_API_URL || "http://localhost:3001"

// Service for communicating with FastAPI ML API
export class MLApiService {
  // Test connection to ML API
  static async testConnection() {
    try {
      // Try Express API first (proxy)
      try {
        const response = await fetch(`${EXPRESS_API_BASE_URL}/api/health`, {
          method: "GET",
          headers: { "Content-Type": "application/json" },
        })

        if (response.ok) {
          const data = await response.json()
          console.log("✅ Express API Connection successful:", data)
          return true
        }
      } catch (expressError) {
        console.warn("Express API not available, trying direct ML API connection")
      }

      // Try direct ML API connection
      const response = await fetch(`${ML_API_BASE_URL}/health`)
      if (response.ok) {
        const data = await response.json()
        console.log("✅ ML API Connection successful:", data)
        return true
      }
      return false
    } catch (error) {
      console.error("❌ ML API connection failed:", error)
      return false
    }
  }

  // Classify image (for upload and photo)
  static async classifyImage(imageFile) {
    try {
      console.log("🔄 Starting image classification...")

      const formData = new FormData()
      formData.append("file", imageFile)

      // Try Express API first (proxy)
      try {
        const response = await fetch(`${EXPRESS_API_BASE_URL}/api/classify`, {
          method: "POST",
          body: formData,
        })

        if (response.ok) {
          const result = await response.json()
          console.log("✅ Classification result (via Express):", result)
          return result
        }
      } catch (expressError) {
        console.warn("Express API not available for classification, trying direct ML API")
      }

      // Try direct ML API connection
      const response = await fetch(`${ML_API_BASE_URL}/classify`, {
        method: "POST",
        body: formData,
      })

      if (!response.ok) {
        const errorText = await response.text()
        throw new Error(`HTTP ${response.status}: ${errorText}`)
      }

      const result = await response.json()
      console.log("✅ Classification result (direct):", result)
      return result
    } catch (error) {
      console.error("❌ Classification error:", error)
      throw new Error(`Gagal melakukan klasifikasi: ${error.message}`)
    }
  }

  // Detect objects (for live camera)
  static async detectObjects(imageFile) {
    try {
      console.log("🔄 Starting object detection...", {
        fileName: imageFile.name,
        fileSize: imageFile.size,
        fileType: imageFile.type,
      })

      const formData = new FormData()
      formData.append("file", imageFile)

      // Try Express API first (proxy)
      try {
        const response = await fetch(`${EXPRESS_API_BASE_URL}/api/detect`, {
          method: "POST",
          body: formData,
          signal: AbortSignal.timeout(10000), // 10 second timeout
        })

        if (response.ok) {
          const result = await response.json()
          console.log("✅ Detection result (via Express):", result)
          return {
            success: result.success || true,
            objects: result.objects || [],
            count: result.count || result.objects?.length || 0,
            metadata: result.metadata || {},
          }
        }
      } catch (expressError) {
        console.warn("Express API not available for detection, trying direct ML API")
      }

      // Try direct ML API connection
      const response = await fetch(`${ML_API_BASE_URL}/detect`, {
        method: "POST",
        body: formData,
        signal: AbortSignal.timeout(10000), // 10 second timeout
      })

      if (!response.ok) {
        const errorText = await response.text()
        console.error("❌ Detection API error:", response.status, errorText)
        throw new Error(`HTTP ${response.status}: ${errorText}`)
      }

      const result = await response.json()
      console.log("✅ Detection result (direct):", {
        success: result.success,
        objectCount: result.objects?.length || 0,
        metadata: result.metadata,
      })

      // Ensure consistent response format
      return {
        success: result.success || true,
        objects: result.objects || [],
        count: result.count || result.objects?.length || 0,
        metadata: result.metadata || {},
      }
    } catch (error) {
      console.error("❌ Detection error:", error)

      // Handle different types of errors
      if (error.name === "AbortError") {
        throw new Error("Request timeout - server terlalu lama merespons")
      } else if (error.message.includes("Failed to fetch")) {
        throw new Error("Tidak dapat terhubung ke API server. Pastikan server berjalan dan dapat diakses.")
      } else {
        throw new Error(`Gagal melakukan deteksi objek: ${error.message}`)
      }
    }
  }

  // Helper methods remain unchanged
  static dataURLtoFile(dataurl, filename) {
    try {
      const arr = dataurl.split(",")
      const mime = arr[0].match(/:(.*?);/)[1]
      const bstr = atob(arr[1])
      let n = bstr.length
      const u8arr = new Uint8Array(n)

      while (n--) {
        u8arr[n] = bstr.charCodeAt(n)
      }

      return new File([u8arr], filename, { type: mime })
    } catch (error) {
      console.error("❌ Error converting data URL to file:", error)
      throw new Error("Gagal mengkonversi gambar")
    }
  }

  static async canvasToFile(canvas, filename = "capture.jpg") {
    return new Promise((resolve, reject) => {
      try {
        canvas.toBlob(
          (blob) => {
            if (blob) {
              const file = new File([blob], filename, { type: "image/jpeg" })
              resolve(file)
            } else {
              reject(new Error("Gagal mengkonversi canvas ke file"))
            }
          },
          "image/jpeg",
          0.8,
        )
      } catch (error) {
        reject(error)
      }
    })
  }

  static async imageElementToFile(imgElement, filename = "image.jpg") {
    try {
      const canvas = document.createElement("canvas")
      const ctx = canvas.getContext("2d")

      canvas.width = imgElement.naturalWidth
      canvas.height = imgElement.naturalHeight

      ctx.drawImage(imgElement, 0, 0)

      return await this.canvasToFile(canvas, filename)
    } catch (error) {
      console.error("❌ Error converting image element to file:", error)
      throw new Error("Gagal mengkonversi gambar")
    }
  }
}

// Export default for backward compatibility
export default MLApiService
