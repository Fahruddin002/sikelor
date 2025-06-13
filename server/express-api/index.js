const express = require("express")
const cors = require("cors")
const multer = require("multer")
const axios = require("axios")
const FormData = require("form-data")

const app = express()
const upload = multer()

// Enhanced CORS configuration to allow requests from your deployed frontend
app.use(
  cors({
    origin: (origin, callback) => {
      // Allow requests with no origin (like mobile apps, curl requests)
      if (!origin) return callback(null, true)

      // List of allowed origins
      const allowedOrigins = [
        "http://localhost:5173", // Local Vite dev server
        "http://localhost:3000", // Local Next.js dev server
        "https://sikelor.vercel.app", // Add your Vercel deployment URL here
        /\.vercel\.app$/, // Allow all Vercel preview deployments
      ]

      // Check if the origin is allowed
      const isAllowed = allowedOrigins.some((allowedOrigin) => {
        if (typeof allowedOrigin === "string") {
          return origin === allowedOrigin
        } else if (allowedOrigin instanceof RegExp) {
          return allowedOrigin.test(origin)
        }
        return false
      })

      if (isAllowed) {
        callback(null, true)
      } else {
        callback(new Error("CORS not allowed for this origin"))
      }
    },
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
  }),
)
app.use(cors({ origin: true }))
app.use(express.json({ limit: "10mb" }))

// URL FastAPI backend
const FASTAPI_BASE = process.env.FASTAPI_URL || "http://127.0.0.1:8000"

// Health check endpoint
app.get("/api/health", async (req, res) => {
  try {
    const response = await axios.get(`${FASTAPI_BASE}/health`)
    res.json({
      status: "healthy",
      express: "running",
      fastapi: response.data,
    })
  } catch (err) {
    console.error("Error di /api/health:", err.message)
    res.status(500).json({
      status: "unhealthy",
      express: "running",
      fastapi: "unreachable",
      error: err.message,
    })
  }
})

// Proxy endpoint untuk klasifikasi
app.post("/api/classify", upload.single("file"), async (req, res) => {
  try {
    const file = req.file
    if (!file) return res.status(400).json({ error: "No file uploaded" })

    const formData = new FormData()
    formData.append("file", file.buffer, file.originalname)

    const response = await axios.post(`${FASTAPI_BASE}/classify`, formData, {
      headers: formData.getHeaders(),
    })

    res.json(response.data)
  } catch (err) {
    console.error("Error di /api/classify:", err.message)
    res.status(500).json({ error: "Gagal memproses klasifikasi" })
  }
})

// Proxy endpoint untuk deteksi objek
app.post("/api/detect", async (req, res) => {
  try {
    const response = await axios.post(`${FASTAPI_BASE}/detect`, req.body, {
      headers: {
        "Content-Type": req.headers["content-type"],
      },
    })
    res.json(response.data)
  } catch (err) {
    console.error("Error di /api/detect:", err.message)
    res.status(500).json({ error: "Gagal memproses deteksi objek" })
  }
})

// Jalankan server proxy di port yang ditentukan oleh environment variable atau default ke 3001
const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Express proxy server aktif di http://localhost:${PORT}`)
  console.log(`Terhubung ke FastAPI di ${FASTAPI_BASE}`)
})
