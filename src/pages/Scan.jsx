"use client"

import { useState, useRef, useEffect } from "react"
import { startViewTransition } from "../utils/transitions"
import ScanNavbar from "../components/ScanNavbar"
import { MLApiService } from "../services/api"
import {
  Cube,
  Camera,
  Upload,
  Image,
  X,
  Target,
  CameraFlash,
  VideoCamera,
  AlertCircle,
  CheckCircle,
} from "../components/icons"

export default function Scan({ onNavigate }) {
  const [selectedImage, setSelectedImage] = useState(null)
  const [scanMode, setScanMode] = useState(null)
  const [isScanning, setIsScanning] = useState(false)
  const [isCameraOpen, setIsCameraOpen] = useState(false)
  const [isDirectScanActive, setIsDirectScanActive] = useState(false)
  const [stream, setStream] = useState(null)
  const [detectedObjects, setDetectedObjects] = useState([])
  const [classificationResult, setClassificationResult] = useState(null)
  const [cameraError, setCameraError] = useState(null)
  const [apiError, setApiError] = useState(null)
  const [isVideoReady, setIsVideoReady] = useState(false)
  const [isDirectVideoReady, setIsDirectVideoReady] = useState(false)
  const [lastScanTime, setLastScanTime] = useState(0)
  const fileInputRef = useRef(null)
  const videoRef = useRef(null)
  const directScanVideoRef = useRef(null)
  const canvasRef = useRef(null)
  const directScanStreamRef = useRef(null)
  const detectionIntervalRef = useRef(null)

  const handleDirectScan = async () => {
    setCameraError(null)
    setApiError(null)
    setIsDirectVideoReady(false)
    setDetectedObjects([])
    setClassificationResult(null)

    startViewTransition(() => {
      setScanMode("direct")
      setIsDirectScanActive(true)
    })

    try {
      console.log("Starting direct scan...")

      const mediaStream = await navigator.mediaDevices.getUserMedia({
        video: {
          facingMode: "environment",
          width: { ideal: 1280, min: 640 },
          height: { ideal: 720, min: 480 },
        },
      })

      console.log("Media stream obtained:", mediaStream)
      directScanStreamRef.current = mediaStream

      if (directScanVideoRef.current) {
        directScanVideoRef.current.srcObject = mediaStream

        // Event handlers untuk video
        directScanVideoRef.current.onloadedmetadata = () => {
          console.log("Video metadata loaded")
          setIsDirectVideoReady(true)
        }

        directScanVideoRef.current.oncanplay = () => {
          console.log("Video can play")
          directScanVideoRef.current.play().catch(console.error)
        }

        directScanVideoRef.current.onplaying = () => {
          console.log("Video is playing, starting detection...")
          startRealTimeDetection()
        }

        directScanVideoRef.current.onerror = (e) => {
          console.error("Video error:", e)
          setCameraError("Error saat memuat video")
        }

        // Force play video
        setTimeout(() => {
          if (directScanVideoRef.current) {
            directScanVideoRef.current.play().catch((error) => {
              console.error("Error playing video:", error)
              setCameraError("Tidak dapat memutar video kamera")
            })
          }
        }, 500)
      }
    } catch (error) {
      console.error("Error accessing camera for direct scan:", error)
      setCameraError("Tidak dapat mengakses kamera. Pastikan Anda memberikan izin akses kamera.")
      startViewTransition(() => {
        setIsDirectScanActive(false)
        setScanMode(null)
      })
    }
  }

  const stopDirectScan = () => {
    startViewTransition(() => {
      if (directScanStreamRef.current) {
        directScanStreamRef.current.getTracks().forEach((track) => track.stop())
        directScanStreamRef.current = null
      }
      if (detectionIntervalRef.current) {
        clearInterval(detectionIntervalRef.current)
        detectionIntervalRef.current = null
      }
      setIsDirectScanActive(false)
      setScanMode(null)
      setDetectedObjects([])
      setClassificationResult(null)
      setCameraError(null)
      setApiError(null)
      setIsDirectVideoReady(false)
    })
  }

  const startRealTimeDetection = () => {
    if (detectionIntervalRef.current) {
      clearInterval(detectionIntervalRef.current)
    }

    // Tunggu video siap sebelum memulai deteksi
    const startDetection = () => {
      console.log("🎯 Starting real-time detection...")

      detectionIntervalRef.current = setInterval(async () => {
        if (!isDirectScanActive || !directScanVideoRef.current || !canvasRef.current) {
          console.log("❌ Detection stopped - missing refs or inactive")
          return
        }

        const video = directScanVideoRef.current
        const canvas = canvasRef.current

        // Pastikan video sudah ready dan memiliki dimensi
        if (!video.videoWidth || !video.videoHeight || video.readyState < 2) {
          console.log(
            "⏳ Video not ready yet, dimensions:",
            video.videoWidth,
            "x",
            video.videoHeight,
            "readyState:",
            video.readyState,
          )
          return
        }

        // Throttle detection to avoid too many API calls
        const now = Date.now()
        if (now - lastScanTime < 3000) {
          // Increased to 3 seconds
          return
        }

        try {
          console.log("📸 Capturing frame for detection...")

          // Set canvas dimensions to match video
          canvas.width = video.videoWidth
          canvas.height = video.videoHeight
          const ctx = canvas.getContext("2d")

          // Clear canvas first
          ctx.clearRect(0, 0, canvas.width, canvas.height)

          // Draw video frame to canvas (no mirroring for detection)
          ctx.drawImage(video, 0, 0, canvas.width, canvas.height)

          // Convert canvas to blob then to file
          canvas.toBlob(
            async (blob) => {
              if (!blob) {
                console.error("❌ Failed to create blob from canvas")
                return
              }

              try {
                const imageFile = new File([blob], "frame.jpg", { type: "image/jpeg" })
                console.log("🔄 Sending image for YOLO detection, size:", imageFile.size, "bytes")

                // Detect objects using YOLO
                const result = await MLApiService.detectObjects(imageFile)

                console.log("✅ YOLO detection result:", result)

                if (result && result.objects) {
                  setDetectedObjects(result.objects)
                  console.log("📊 Found", result.objects.length, "objects")
                } else {
                  setDetectedObjects([])
                  console.log("📊 No objects detected")
                }

                setLastScanTime(now)
                setApiError(null)
              } catch (error) {
                console.error("❌ YOLO detection error:", error)
                setApiError(`Detection error: ${error.message}`)
              }
            },
            "image/jpeg",
            0.8,
          )
        } catch (error) {
          console.error("❌ Frame capture error:", error)
          setApiError(`Frame capture error: ${error.message}`)
        }
      }, 3000) // Check every 3 seconds
    }

    // Mulai deteksi setelah delay untuk memastikan video ready
    setTimeout(startDetection, 2000)
  }

  const handleTakePicture = async () => {
    setCameraError(null)
    setApiError(null)
    setIsVideoReady(false)
    setClassificationResult(null)
    setDetectedObjects([])

    startViewTransition(() => {
      setScanMode("camera")
      setIsCameraOpen(true)
    })

    try {
      const mediaStream = await navigator.mediaDevices.getUserMedia({
        video: {
          facingMode: "environment",
          width: { ideal: 1280, min: 640 },
          height: { ideal: 720, min: 480 },
        },
      })
      setStream(mediaStream)

      if (videoRef.current) {
        videoRef.current.srcObject = mediaStream

        videoRef.current.onloadedmetadata = () => {
          setIsVideoReady(true)
        }

        videoRef.current.oncanplay = () => {
          videoRef.current.play().catch(console.error)
        }

        setTimeout(() => {
          if (videoRef.current) {
            videoRef.current.play().catch(console.error)
          }
        }, 100)
      }
    } catch (error) {
      console.error("Error accessing camera:", error)
      setCameraError("Tidak dapat mengakses kamera. Pastikan Anda memberikan izin akses kamera.")
      startViewTransition(() => {
        setIsCameraOpen(false)
      })
    }
  }

  const capturePhoto = () => {
    if (videoRef.current && canvasRef.current) {
      const video = videoRef.current
      const canvas = canvasRef.current
      const context = canvas.getContext("2d")

      canvas.width = video.videoWidth
      canvas.height = video.videoHeight
      context.drawImage(video, 0, 0, canvas.width, canvas.height)

      const imageDataUrl = canvas.toDataURL("image/jpeg", 0.8)

      startViewTransition(() => {
        setSelectedImage(imageDataUrl)
        closeCamera()
      })
    }
  }

  const closeCamera = () => {
    startViewTransition(() => {
      if (stream) {
        stream.getTracks().forEach((track) => track.stop())
        setStream(null)
      }
      setIsCameraOpen(false)
      setCameraError(null)
      setApiError(null)
      setIsVideoReady(false)
    })
  }

  const handleUploadImage = () => {
    setClassificationResult(null)
    setDetectedObjects([])
    fileInputRef.current?.click()
  }

  const handleFileChange = (event) => {
    const file = event.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (e) => {
        startViewTransition(() => {
          setSelectedImage(e.target?.result)
          setScanMode("upload")
        })
      }
      reader.readAsDataURL(file)
    }
  }

  const handleAnalyze = async () => {
    if (!selectedImage) return

    setIsScanning(true)
    setApiError(null)
    setClassificationResult(null)

    try {
      // Convert data URL to File object
      const imageFile = MLApiService.dataURLtoFile(selectedImage, "image.jpg")

      // Use classification for uploaded images and captured photos
      const result = await MLApiService.classifyImage(imageFile)

      setClassificationResult(result)
      setApiError(null)
    } catch (error) {
      console.error("Analysis error:", error)
      setApiError(error.message)
    } finally {
      setIsScanning(false)
    }
  }

  useEffect(() => {
    const cameraArea = document.querySelector("[data-camera-area]")
    if (cameraArea) {
      cameraArea.style.viewTransitionName = isCameraOpen || isDirectScanActive ? "camera-modal" : ""
    }
  }, [isCameraOpen, isDirectScanActive])

  useEffect(() => {
    return () => {
      if (stream) {
        stream.getTracks().forEach((track) => track.stop())
      }
      if (directScanStreamRef.current) {
        directScanStreamRef.current.getTracks().forEach((track) => track.stop())
      }
      if (detectionIntervalRef.current) {
        clearInterval(detectionIntervalRef.current)
      }
    }
  }, [stream])

  const renderClassificationResults = () => {
    if (!classificationResult) return null

    return (
      <div className="absolute top-4 right-4 md:left-[470px] bg-white bg-opacity-90 rounded-lg p-4 max-w-sm shadow-lg">
        <h3 className="font-semibold text-gray-800 mb-3 flex items-center gap-2">
          <CheckCircle className="w-4 h-4 text-green-600" />
          Hasil Klasifikasi
        </h3>

        <div className="space-y-3">
          <div>
            <h4 className="text-sm font-medium text-gray-700 mb-1">Nama Objek:</h4>
            <div className="text-sm font-semibold text-gray-800 bg-gray-100 rounded px-3 py-2">
              {classificationResult.class_name || classificationResult.nama || "Tidak diketahui"}
            </div>
          </div>

          <div>
            <h4 className="text-sm font-medium text-gray-700 mb-1">Deskripsi:</h4>
            <div className="text-xs text-gray-600 bg-gray-50 rounded px-3 py-2 leading-relaxed">
              {classificationResult.description || classificationResult.deskripsi || "Deskripsi tidak tersedia"}
            </div>
          </div>

          {classificationResult.confidence && (
            <div className="text-xs text-gray-500 text-center pt-2 border-t">
              Confidence: {(classificationResult.confidence * 100).toFixed(1)}%
            </div>
          )}
        </div>
      </div>
    )
  }

  const renderDetectionOverlay = () => {
    if (!isDirectVideoReady || !detectedObjects.length || !directScanVideoRef.current) {
      return null
    }

    const videoElement = directScanVideoRef.current
    const videoRect = videoElement.getBoundingClientRect()

    // Get actual video dimensions vs display dimensions
    const videoWidth = videoElement.videoWidth
    const videoHeight = videoElement.videoHeight
    const displayWidth = videoRect.width
    const displayHeight = videoRect.height

    if (!videoWidth || !videoHeight) {
      return null
    }

    // Calculate scale factors
    const scaleX = displayWidth / videoWidth
    const scaleY = displayHeight / videoHeight

    return (
      <div className="absolute inset-0 pointer-events-none">
        {detectedObjects.map((obj, index) => {
          // Get bounding box coordinates
          const x = (obj.x || obj.bbox?.[0] || 0) * scaleX
          const y = (obj.y || obj.bbox?.[1] || 0) * scaleY
          const width = (obj.width || obj.bbox?.[2] || 100) * scaleX
          const height = (obj.height || obj.bbox?.[3] || 100) * scaleY

          // Ensure coordinates are within bounds
          const boundedX = Math.max(0, Math.min(x, displayWidth - width))
          const boundedY = Math.max(0, Math.min(y, displayHeight - height))
          const boundedWidth = Math.min(width, displayWidth - boundedX)
          const boundedHeight = Math.min(height, displayHeight - boundedY)

          return (
            <div
              key={`detection-${index}`}
              className="absolute border-2 border-green-400 bg-green-400 bg-opacity-20 rounded"
              style={{
                left: `${boundedX}px`,
                top: `${boundedY}px`,
                width: `${boundedWidth}px`,
                height: `${boundedHeight}px`,
              }}
            >
              <div className="absolute -top-8 left-0 bg-green-400 text-white px-2 py-1 rounded text-xs font-semibold whitespace-nowrap shadow-lg max-w-xs truncate">
                {obj.name || obj.class || "Unknown"} ({((obj.confidence || obj.score || 0) * 100).toFixed(1)}%)
              </div>
            </div>
          )
        })}
      </div>
    )
  }

  const renderCameraContent = () => {
    if (isDirectScanActive) {
      return (
        <div className="w-full h-full relative">
          {/* Loading state for direct scan */}
          {!isDirectVideoReady && (
            <div className="absolute inset-0 bg-[#475F45] flex items-center justify-center z-10">
              <div className="text-center text-white">
                <div className="animate-spin rounded-full h-8 w-8 md:h-12 md:w-12 border-b-2 border-white mx-auto mb-4"></div>
                <p className="text-sm md:text-lg font-semibold">Memuat kamera...</p>
                <p className="text-xs md:text-sm text-[#d9e5d8] mt-2">Menyiapkan deteksi real-time</p>
              </div>
            </div>
          )}

          <video
            ref={directScanVideoRef}
            autoPlay
            playsInline
            muted
            webkit-playsinline="true"
            className={`w-full h-full object-cover ${!isDirectVideoReady ? "opacity-0" : "opacity-100"}`}
            style={{
              transform: "scaleX(-1)", // Mirror for user experience
            }}
            onLoadedMetadata={() => {
              console.log("📹 Video metadata loaded")
              setIsDirectVideoReady(true)
            }}
            onCanPlay={() => {
              console.log("📹 Video can play")
              if (directScanVideoRef.current) {
                directScanVideoRef.current.play().catch(console.error)
              }
            }}
            onPlaying={() => {
              console.log("📹 Video is playing, starting detection...")
              startRealTimeDetection()
            }}
            onError={(e) => {
              console.error("📹 Video error:", e)
              setCameraError("Error saat memuat video")
            }}
          />

          {/* YOLO Detection Overlay */}
          {renderDetectionOverlay()}

          {/* Status Indicator */}
          {isDirectVideoReady && (
            <div className="absolute top-2 left-2 md:top-4 md:left-4 bg-black bg-opacity-70 text-white px-2 py-1 md:px-3 md:py-2 rounded-lg flex items-center gap-2">
              <Target className="w-3 h-3 md:w-4 md:h-4 text-green-400" />
              <span className="text-xs md:text-sm font-medium">Live Detection</span>
              {detectedObjects.length > 0 && (
                <span className="bg-green-400 text-black px-2 py-0.5 rounded-full text-xs font-bold">
                  {detectedObjects.length}
                </span>
              )}
            </div>
          )}

          {/* Scanning Grid */}
          {isDirectVideoReady && (
            <div className="absolute inset-0 pointer-events-none flex items-center justify-center">
              <div className="w-32 h-32 md:w-48 md:h-48 border-2 border-green-400 border-dashed rounded-lg opacity-30 animate-pulse"></div>
            </div>
          )}

          {/* Debug Info (dapat dihapus di production) */}
          {isDirectVideoReady && (
            <div className="absolute bottom-2 left-2 bg-black bg-opacity-70 text-white px-2 py-1 rounded text-xs">
              Video: {directScanVideoRef.current?.videoWidth}x{directScanVideoRef.current?.videoHeight} | Objects:{" "}
              {detectedObjects.length} | Last scan: {new Date(lastScanTime).toLocaleTimeString()}
            </div>
          )}

          <canvas ref={canvasRef} className="hidden" />
        </div>
      )
    }

    if (isCameraOpen) {
      return (
        <div className="w-full h-full relative">
          {/* Loading state for camera */}
          {!isVideoReady && (
            <div className="absolute inset-0 bg-[#475F45] flex items-center justify-center z-10">
              <div className="text-center text-white">
                <div className="animate-spin rounded-full h-8 w-8 md:h-12 md:w-12 border-b-2 border-white mx-auto mb-4"></div>
                <p className="text-sm md:text-lg font-semibold">Memuat kamera...</p>
              </div>
            </div>
          )}

          <video
            ref={videoRef}
            autoPlay
            playsInline
            muted
            webkit-playsinline="true"
            className={`w-full h-full object-cover ${!isVideoReady ? "opacity-0" : "opacity-100"}`}
            style={{
              transform: "scaleX(-1)",
            }}
          />

          {isVideoReady && (
            <div className="absolute top-2 left-2 md:top-4 md:left-4 bg-black bg-opacity-70 text-white px-2 py-1 md:px-3 md:py-2 rounded-lg flex items-center gap-2">
              <VideoCamera className="w-3 h-3 md:w-4 md:h-4 text-blue-400" />
              <span className="text-xs md:text-sm font-medium">Kamera Aktif</span>
            </div>
          )}
          <canvas ref={canvasRef} className="hidden" />
        </div>
      )
    }

    if (selectedImage) {
      return (
        <div className="w-full md:h-full max-w-[800px] max-h-[90vh] md:max-h-[94vh] flex items-center justify-center p-6 relative mx-auto">
          <div className="w-full h-full flex items-center justify-center overflow-hidden">
            <img
              src={selectedImage || "/placeholder.svg"}
              alt="Selected for scanning"
              className="object-contain max-w-full max-h-full rounded-2xl"
            />
          </div>
          {renderClassificationResults()}
        </div>
      );
    }
     

    if (isScanning) {
      return (
        <div className="text-center text-white">
          <div className="animate-spin rounded-full h-8 w-8 md:h-12 md:w-12 border-b-2 border-white mx-auto mb-4"></div>
          <p className="text-sm md:text-lg font-semibold">Mengklasifikasi gambar...</p>
          <p className="text-xs md:text-sm text-[#d9e5d8] mt-2">Menganalisis objek artefak museum</p>
        </div>
      )
    }

    return (
      <div className="text-center text-white px-4">
        <div className="bg-[#556b53] rounded-3xl p-6 md:p-8 inline-block mb-4">
          <Image className="w-12 h-12 md:w-16 md:h-16 mx-auto" stroke="currentColor" strokeWidth={1.5} />
        </div>
        <p className="text-base md:text-lg font-semibold mb-2">Pilih metode scan</p>
        <p className="text-[#d9e5d8] text-sm">Gunakan salah satu opsi di atas untuk memulai proses scanning</p>
      </div>
    )
  }

  return (
    <div className="flex flex-col min-h-screen bg-gray-100" data-page-content>
      <ScanNavbar onNavigate={onNavigate} />

      {/* Main Content - Unified Layout */}
      <main className="flex-1 pt-20 pb-8">
        <div className="flex flex-col xl:flex-row min-h-[calc(100vh-160px)]">
          {/* Control Panel - Top on mobile, Left on desktop */}
          <div className="w-full xl:w-80 bg-white p-4 md:p-6 xl:p-8 flex flex-col gap-4 md:gap-6">
            <h2 className="text-xl md:text-2xl font-bold text-gray-800 mb-2 md:mb-4">Pilih Metode Scan</h2>

            {/* Action Buttons */}
            <div className="grid grid-cols-1 sm:grid-cols-3 xl:grid-cols-1 gap-3 md:gap-4">
              {/* Live Camera Scan Button - YOLO Detection */}
              <button
                onClick={isDirectScanActive ? stopDirectScan : handleDirectScan}
                disabled={isScanning || isCameraOpen}
                className={`flex items-center justify-center xl:justify-start gap-3 md:gap-4 w-full p-3 md:p-4 rounded-2xl text-white font-semibold transition-all duration-200 ${isDirectScanActive
                    ? "bg-red-600 hover:bg-red-700"
                    : scanMode === "direct"
                      ? "bg-[#3a4e39]"
                      : "bg-[#475F45] hover:bg-[#3a4e39]"
                  } ${isScanning || isCameraOpen ? "opacity-50 cursor-not-allowed" : ""}`}
              >
                {isDirectScanActive ? (
                  <X className="w-5 h-5 md:w-6 md:h-6" />
                ) : (
                  <Cube className="w-5 h-5 md:w-6 md:h-6" />
                )}
                <span className="text-sm md:text-base">{isDirectScanActive ? "Stop Live Scan" : "Live Camera"}</span>
              </button>

              {/* Take Picture Button - Classification */}
              <button
                onClick={handleTakePicture}
                disabled={isScanning || isCameraOpen || isDirectScanActive}
                className={`flex items-center justify-center xl:justify-start gap-3 md:gap-4 w-full p-3 md:p-4 rounded-2xl text-white font-semibold transition-all duration-200 ${scanMode === "camera" || isCameraOpen ? "bg-[#3a4e39]" : "bg-[#475F45] hover:bg-[#3a4e39]"
                  } ${isScanning || isCameraOpen || isDirectScanActive ? "opacity-50 cursor-not-allowed" : ""}`}
              >
                <Camera className="w-5 h-5 md:w-6 md:h-6" />
                <span className="text-sm md:text-base">{isCameraOpen ? "Kamera Aktif" : "Ambil Foto"}</span>
              </button>

              {/* Upload Image Button - Classification */}
              <button
                onClick={handleUploadImage}
                disabled={isScanning || isCameraOpen || isDirectScanActive}
                className={`flex items-center justify-center xl:justify-start gap-3 md:gap-4 w-full p-3 md:p-4 rounded-2xl text-white font-semibold transition-all duration-200 ${scanMode === "upload" ? "bg-[#3a4e39]" : "bg-[#475F45] hover:bg-[#3a4e39]"
                  } ${isScanning || isCameraOpen || isDirectScanActive ? "opacity-50 cursor-not-allowed" : ""}`}
              >
                <Upload className="w-5 h-5 md:w-6 md:h-6" />
                <span className="text-sm md:text-base">Unggah Gambar</span>
              </button>
            </div>

            {/* Hidden file input */}
            <input ref={fileInputRef} type="file" accept="image/*" onChange={handleFileChange} className="hidden" />

            {/* Camera Controls */}
            {isCameraOpen && (
              <div className="flex gap-3">
                <button
                  onClick={capturePhoto}
                  disabled={!isVideoReady}
                  className={`flex-1 p-3 md:p-4 rounded-2xl font-semibold transition-all duration-200 ${isVideoReady
                      ? "bg-blue-600 text-white hover:bg-blue-700"
                      : "bg-gray-400 text-gray-600 cursor-not-allowed"
                    }`}
                >
                  <div className="flex items-center justify-center gap-2">
                    <CameraFlash className="w-4 h-4 md:w-5 md:h-5" />
                    <span className="text-sm md:text-base">{isVideoReady ? "Ambil Foto" : "Memuat..."}</span>
                  </div>
                </button>
                <button
                  onClick={closeCamera}
                  className="p-3 md:p-4 rounded-2xl bg-red-600 text-white font-semibold hover:bg-red-700 transition-all duration-200"
                >
                  <X className="w-5 h-5 md:w-6 md:h-6" />
                </button>
              </div>
            )}

            {/* Live Detection Info */}
            {isDirectScanActive && (
              <div className="bg-gray-50 p-3 md:p-4 rounded-lg">
                <div className="flex items-center gap-2 font-semibold text-gray-800 mb-2">
                  <Target className="w-4 h-4 md:w-5 md:h-5 text-green-600" />
                  <h3 className="text-sm md:text-base">Live Detection (YOLO)</h3>
                </div>
                <p className="text-xs md:text-sm text-gray-600 mb-3">
                  Arahkan kamera ke artefak untuk deteksi real-time
                </p>

                {/* Debug Info */}
                <div className="text-xs text-gray-500 mb-2 space-y-1">
                  <div>Status: {isDirectVideoReady ? "✅ Video Ready" : "⏳ Loading..."}</div>
                  <div>Stream: {directScanStreamRef.current ? "✅ Active" : "❌ None"}</div>
                  <div>Detection: {detectionIntervalRef.current ? "✅ Running" : "❌ Stopped"}</div>
                </div>

                {detectedObjects.length > 0 ? (
                  <div className="space-y-2">
                    {detectedObjects.slice(0, 3).map((obj, index) => (
                      <div key={index} className="bg-white p-2 rounded border">
                        <div className="font-medium text-xs md:text-sm text-gray-800">{obj.name || obj.class}</div>
                        <div className="text-xs text-gray-500">
                          Akurasi: {((obj.confidence || obj.score) * 100).toFixed(1)}%
                        </div>
                      </div>
                    ))}
                    {detectedObjects.length > 3 && (
                      <div className="text-xs text-gray-500">+{detectedObjects.length - 3} objek lainnya</div>
                    )}
                  </div>
                ) : (
                  <div className="text-xs md:text-sm text-gray-500">
                    {isDirectVideoReady ? "Mencari objek..." : "Memuat kamera..."}
                  </div>
                )}
              </div>
            )}

            {/* Classification Analyze Button */}
            {selectedImage && !isCameraOpen && !isDirectScanActive && (
              <button
                onClick={handleAnalyze}
                disabled={isScanning}
                className={`w-full p-3 md:p-4 rounded-2xl font-semibold transition-all duration-200 ${isScanning
                    ? "bg-gray-400 text-gray-600 cursor-not-allowed"
                    : "bg-blue-600 text-white hover:bg-blue-700"
                  }`}
              >
                <span className="text-sm md:text-base">{isScanning ? "Mengklasifikasi..." : "Klasifikasi Gambar"}</span>
              </button>
            )}

            {/* Error Messages */}
            {(cameraError || apiError) && (
              <div className="bg-red-50 border border-red-200 rounded-lg p-3 md:p-4">
                <div className="flex items-start gap-2">
                  <AlertCircle className="w-4 h-4 text-red-600 mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="text-red-600 text-xs md:text-sm font-medium mb-1">
                      {cameraError ? "Error Kamera" : "Error API"}
                    </p>
                    <p className="text-red-600 text-xs md:text-sm">{cameraError || apiError}</p>
                  </div>
                </div>
              </div>
            )}

            {/* Method Info */}
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 md:p-4">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                <span className="text-blue-800 text-xs md:text-sm font-medium">Info Metode</span>
              </div>
              <div className="text-xs space-y-1">
                <p className="text-blue-700">
                  • <strong>Live Camera:</strong> YOLO detection dengan bounding box
                </p>
                <p className="text-blue-700">
                  • <strong>Foto & Upload:</strong> Klasifikasi dengan nama & deskripsi
                </p>
              </div>
            </div>
          </div>

          {/* Content Area - Bottom on mobile, Right on desktop */}
          <div className="flex-1 p-8 mx-16 md:p-6 xl:p-8 flex justify-center">
            <div
              className="bg-[#475F45] rounded-3xl h-[75%] w-[75%] flex items-center justify-center relative overflow-hidden transition-all duration-300"
              style={{ minHeight: "400px", minWidth: "310px"}}
              data-camera-area
            >
              {renderCameraContent()}

              {/* Loading overlay for image analysis */}
              {isScanning && selectedImage && (
                <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                  <div className="text-center text-white">
                    <div className="animate-spin rounded-full h-8 w-8 md:h-12 md:w-12 border-b-2 border-white mx-auto mb-4"></div>
                    <p className="text-sm md:text-lg font-semibold">Mengklasifikasi gambar...</p>
                    <p className="text-xs md:text-sm text-[#d9e5d8] mt-2">Menganalisis objek artefak museum</p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-[#394a37] text-white text-center py-4 mt-auto">
        <p className="text-xs lg:text-sm">© 2025 Sikelor. All rights reserved.</p>
      </footer>
    </div>
  )
}
