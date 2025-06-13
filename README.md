# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.

# SIKELOR - Sistem Informasi Kebudayaan dan Edukasi Rakyat

SIKELOR adalah aplikasi museum digital yang menggunakan teknologi AI untuk mengenali dan mengklasifikasi artefak budaya Sulawesi Tengah. Aplikasi ini terdiri dari frontend React dan backend FastAPI dengan model machine learning untuk klasifikasi dan deteksi objek.

## 🏗️ Arsitektur Sistem

- **Frontend**: React + Vite + Tailwind CSS
- **Backend**: FastAPI + Python
- **Machine Learning**: 
  - TensorFlow untuk klasifikasi (9 kelas)
  - YOLO untuk deteksi objek (11 kelas)

## 📋 Prerequisites

Pastikan Anda telah menginstall:

- **Node.js** (v16 atau lebih baru)
- **Python** (v3.8 - v3.10)
- **Git**

## 🚀 Cara Menjalankan Proyek

### 1. Clone Repository

```bash
git clone <repository-url>
cd nama-proyek
```

### 2. Setup Frontend (React)

```bash
# Install dependencies
npm install

# Atau jika menggunakan yarn
yarn install
```

### 3. Setup Backend (FastAPI)

```bash
# Masuk ke direktori ML API
cd server/ml-api

# Buat virtual environment
python -m venv venv

# Aktifkan virtual environment
# Untuk Windows (Command Prompt):
venv\Scripts\activate

# untuk windows (bash)
source venv/Scripts/activate

# Untuk Windows (PowerShell):
venv\Scripts\Activate.ps1

# Untuk Linux/Mac:
source venv/bin/activate

# upgrade pip
python.exe -m pip install --upgrade pip

# Install dependencies Python
pip install -r requirements.txt
```

### 4. Menjalankan Aplikasi

Anda perlu menjalankan 2 terminal secara bersamaan:

#### Terminal 1: FastAPI Backend

```bash
# Pastikan Anda di direktori server/ml-api dan virtual environment aktif
cd server/ml-api
source venv/Scripts/activate  # Windows (bash)
# source venv/bin/activate    # Linux/Mac

# Jalankan FastAPI server
uvicorn app.main:app --reload --port 8000
```

Server akan berjalan di: `http://localhost:8000`

#### Terminal 2: React Frontend

```bash
# Pastikan Anda di root directory proyek
npm run dev
```

Frontend akan berjalan di: `http://localhost:5173`

## 🔧 Verifikasi Setup

### 1. Cek Backend API

Buka browser dan akses:
- Health check: `http://localhost:8000/health`
- API docs: `http://localhost:8000/docs`

Response yang benar:
```json
{
  "status": "healthy",
  "api": "running",
  "ml_models": "loaded",
  "tensorflow_classes": 9,
  "yolo_classes": 11
}
```

### 2. Cek Frontend

Buka browser dan akses: `http://localhost:5173`

Anda akan melihat halaman utama SIKELOR dengan menu navigasi.

### 3. Test Fitur AI

1. **Klik menu "Scan"**
2. **Test Live Camera**: Klik "Live Camera" untuk deteksi real-time
3. **Test Upload**: Upload gambar artefak untuk klasifikasi
4. **Test Capture**: Ambil foto menggunakan kamera

## 📁 Struktur Proyek

```
sikelor-new/
├── src/                          # Frontend React
│   ├── components/              # Komponen React
│   ├── pages/                   # Halaman aplikasi
│   ├── services/               # API services
│   └── assets/                 # Asset gambar, font, dll
├── server/
│   └── ml-api/                 # Backend FastAPI
│       ├── app/
│       │   ├── services/       # ML services
│       │   ├── main.py         # FastAPI main app
│       │   ├── deskripsi_objek_yolo.json
│       │   └── deskripsi_objek_tensorflow.json
│       ├── model/              # Model ML (download terpisah)
│       │   ├── best.pt         # YOLO model
│       │   └── model_sikelor.h5 # TensorFlow model
│       └── requirements.txt
├── public/                     # Static files
├── package.json               # Dependencies Node.js
└── README.md
```

## 🎯 Fitur Utama

### 1. **Live Camera Detection (YOLO)**
- Deteksi real-time menggunakan kamera
- Mendeteksi 11 jenis artefak
- Menampilkan bounding box dan confidence score

### 2. **Image Classification (TensorFlow)**
- Klasifikasi gambar yang diupload atau difoto
- Mengenali 9 jenis artefak
- Memberikan nama dan deskripsi objek

### 3. **Museum Digital**
- Galeri koleksi artefak
- Artikel tentang budaya Sulawesi Tengah
- Event dan pameran museum
- Informasi detail setiap artefak

## 🔍 Troubleshooting

### Model Tidak Ditemukan
```
⚠️ YOLO model tidak ditemukan, menggunakan simulasi
⚠️ Model klasifikasi tidak ditemukan, menggunakan simulasi
```

**Solusi**: Pastikan file model sudah didownload dan ditempatkan di folder yang benar:
- `server/ml-api/model/best.pt`
- `server/ml-api/model/model_sikelor.h5`

### Error CORS
```
Access to fetch at 'http://localhost:8000' from origin 'http://localhost:5173' has been blocked by CORS policy
```

**Solusi**: Pastikan FastAPI server berjalan di port 8000

### Error Camera Access
```
Tidak dapat mengakses kamera
```

**Solusi**: 
- Berikan izin akses kamera di browser
- Pastikan menggunakan HTTPS atau localhost
- Coba browser yang berbeda

### Error Python Dependencies
```
ModuleNotFoundError: No module named 'ultralytics'
```

**Solusi**:
```bash
# Aktifkan virtual environment terlebih dahulu
source venv/Scripts/activate  # Windows
pip install -r requirements.txt
```

### Port Sudah Digunakan
```
Error: Port 8000 is already in use
```

**Solusi**:
```bash
# Gunakan port yang berbeda
uvicorn app.main:app --reload --port 8001

# Atau hentikan proses yang menggunakan port 8000
# Windows:
netstat -ano | findstr :8000
taskkill /PID <PID> /F

# Linux/Mac:
lsof -ti:8000 | xargs kill -9
```

## 📊 Model Information

### TensorFlow Model (Klasifikasi)
- **Input**: 640x640 RGB image
- **Output**: 9 classes
- **Classes**: Al-Qur'an, Dulang, Miniatur Buho', Miniatur Gampiri, Miniatur Kataba, Miniatur Palava, Miniatur Tambi, Tempayan Kubur, Wadah Kubur

### YOLO Model (Deteksi)
- **Input**: 640x640 RGB image  
- **Output**: 11 classes with bounding boxes
- **Classes**: Al-Qur'an, Dulang, Lampu Minyak, Miniatur Buho', Miniatur Gampiri, Miniatur Kataba, Miniatur Palava, Miniatur Tambi, Setrika, Tempayan Kubur, Wadah Kubur

## 🤝 Tim Developer

- **MC323D5Y0866** - Fahruddin A. Lebe (Machine Learning)
- **MC323D5Y0848** - Ahmad Afil (Machine Learning)  
- **FC323D5Y0559** - Aril.S (Fullstack Engineer)
- **MC323D5Y0438** - Hidayatul Fatwa (Machine Learning)
- **FC323D5Y0486** - Pradigta (Fullstack Developer)
- **FC323D5Y1747** - Andi Albukhari Fachrurrozi (Fullstack Developer)

## 📝 Lisensi

© 2025 SIKELOR. All rights reserved.

## 📞 Support

Jika mengalami masalah dalam setup atau menjalankan aplikasi, silakan hubungi tim developer atau buat issue di repository ini.

---

**Selamat menggunakan SIKELOR! 🏛️✨**