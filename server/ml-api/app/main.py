from fastapi import FastAPI, UploadFile, File, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
from app.services.classify import classify_image
from app.services.detect import detect_objects
import uvicorn
import os

app = FastAPI(title="SIKELOR ML API", version="1.0.0")

# Enhanced CORS configuration
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",      # Local Vite dev server
        "http://localhost:3000",      # Local Next.js dev server
        "https://sikelor.vercel.app", # Add your Vercel deployment URL here
        "*",                          # Allow all origins during development (remove in production)
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Rest of your FastAPI code remains unchanged
@app.get("/")
async def root():
    """Health check endpoint"""
    return {
        "message": "SIKELOR ML API is running",
        "status": "healthy",
        "version": "1.0.0",
        "tensorflow_classes": [
            "Al-Qur'an Tulis Tangan",
            "Dulang", 
            "Miniatur Buho'",
            "Miniatur Gampiri",
            "Miniatur Rumah Kataba",
            "Miniatur Rumah Palava", 
            "Miniatur Rumah Tambi",
            "Tempayan Kubur",
            "Wadah Kubur"
        ],
        "yolo_classes": [
            "Al-Qur'an Tulis Tangan",
            "Dulang", 
            "Lampu Minyak",
            "Miniatur Buho'",
            "Miniatur Gampiri",
            "Miniatur Rumah Kataba",
            "Miniatur Rumah Palava", 
            "Miniatur Rumah Tambi",
            "Setrika",
            "Tempayan Kubur",
            "Wadah Kubur"
        ]
    }

@app.get("/health")
async def health_check():
    """Detailed health check"""
    return {
        "status": "healthy",
        "api": "running",
        "ml_models": "loaded",
        "tensorflow_classes": 9,
        "yolo_classes": 11
    }

@app.post("/classify")
async def classify_endpoint(file: UploadFile = File(...)):
    """
    Endpoint untuk klasifikasi gambar artefak museum menggunakan TensorFlow
    Mengenali 9 objek yang dilatih dalam model
    """
    try:
        # Validasi file
        if not file.content_type.startswith('image/'):
            raise HTTPException(status_code=400, detail="File harus berupa gambar")
        
        # Baca file gambar
        image_bytes = await file.read()
        
        # Klasifikasi menggunakan TensorFlow model
        result = await classify_image(image_bytes)
        
        return JSONResponse(content={
            "success": True,
            "class_id": result["class_id"],
            "class_name": result["nama"],
            "confidence": result["confidence"],
            "description": result["deskripsi"],
            "metadata": {
                "model_type": "tensorflow",
                "total_classes": 9,
                "threshold": 0.5,
                "input_size": "640x640"
            }
        })
        
    except Exception as e:
        print(f"Classification error: {e}")
        raise HTTPException(status_code=500, detail=f"Error dalam klasifikasi: {str(e)}")

@app.post("/detect")
async def detect_endpoint(file: UploadFile = File(...)):
    """
    Endpoint untuk deteksi objek artefak museum menggunakan YOLO
    Mendeteksi 11 objek yang dilatih dalam model
    """
    try:
        print(f"📥 Received detection request for file: {file.filename}")
        
        # Validasi file
        if not file.content_type.startswith('image/'):
            raise HTTPException(status_code=400, detail="File harus berupa gambar")
        
        # Baca file gambar
        image_bytes = await file.read()
        print(f"📊 Image size: {len(image_bytes)} bytes")
        
        # Deteksi menggunakan YOLO model
        result = await detect_objects(image_bytes)
        
        print(f"✅ Detection completed: {len(result['detections'])} objects found")
        
        return JSONResponse(content={
            "success": True,
            "objects": result["detections"],
            "count": len(result["detections"]),
            "metadata": {
                "model_type": "yolo",
                "confidence_threshold": 0.5,
                "total_classes": 11,
                "input_size": "640x640",
                "image_size": len(image_bytes)
            }
        })
        
    except Exception as e:
        print(f"❌ Detection error: {e}")
        raise HTTPException(status_code=500, detail=f"Error dalam deteksi: {e}")

if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=8000, reload=True)
