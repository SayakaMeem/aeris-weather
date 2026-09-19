<div align="center">

![AERIS Banner](https://capsule-render.vercel.app/api?type=waving&color=0:0a0a0a,100:6b21a8&height=220&section=header&text=AERIS&fontSize=72&fontColor=ffffff&desc=Multipage%20Weather%20OS%20•%20Free%20JSON%20API%20•%20Live%20Forecast&descAlignY=55&animation=fadeIn)

# AERIS — Multipage Weather Intelligence OS

**A beautiful, fast, and privacy-first weather platform with 3 pages, free Open-Meteo JSON API, local DB, search history, and 14-day future prediction.**

[![Live Demo](https://img.shields.io/badge/Live-Demo-000000?style=for-the-badge&logo=vercel&logoColor=white)](https://aeris-weather.vercel.app)
[![React](https://img.shields.io/badge/React-18-61DAFB?style=for-the-badge&logo=react&logoColor=black)](https://react.dev)
[![Vite](https://img.shields.io/badge/Vite-5-646CFF?style=for-the-badge&logo=vite&logoColor=white)](https://vitejs.dev)
[![Tailwind](https://img.shields.io/badge/Tailwind-3.4-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white)](https://tailwindcss.com)
[![License](https://img.shields.io/badge/License-MIT-green?style=for-the-badge)](LICENSE)

[Live Website](https://aeris-weather.vercel.app) • [Report Bug](https://github.com/SayakaMeem/aeris-weather/issues) • [Request Feature](https://github.com/SayakaMeem/aeris-weather/issues)

</div>

---

## 🌦️ Live Preview

> **🔴 LIVE LINK:** [https://aeris-weather.vercel.app](https://aeris-weather.vercel.app)

---

## ✨ Features

### 🌍 3 Professional Pages (React Router)
| Page | Route | What it does |
|------|-------|--------------|
| **Today** | `/` | Live current weather + feels like + humidity + wind + UV now/max + 24h hourly + geolocation |
| **Future** | `/future` | 14-day forecast + sunrise/sunset + rain % + UV max |
| **History** | `/history` | LocalStorage JSON DB + most frequent city + delete single + clear all + click to load |

### ⚡ Core Qualities
- ✅ **FREE JSON API** - `geocoding-api.open-meteo.com` + `api.open-meteo.com` — No API key needed
- ✅ **Place-wise Search** - Search any city worldwide: `Tokyo`, `Dhaka`, `New York`
- ✅ **Local Database** - `localStorage` JSON tracking up to 30 cities with search count and timestamps
- ✅ **Most Frequently Searched** - Track frequency counts per city
- ✅ **Delete History** - Individual `✕` delete option + Clear All functionality
- ✅ **UV Index Intelligence** - Shows `0 / max` at night, updates dynamically hourly with color indicators
- ✅ **Dynamic Units** - Toggle seamlessly between Celsius (°C) and Fahrenheit (°F)
- ✅ **Auto Location** - One-click `navigator.geolocation` support with reverse geocoding

---

## 🛠️ Tech Stack

- **Frontend:** React 18, React Router DOM 6, Vite 5
- **Styling:** Tailwind CSS 3.4, Inter Font, Glassmorphism UI
- **API:** Open-Meteo Geocoding & Forecast APIs (Free, No Key)
- **Database:** Browser localStorage JSON (No backend required)
- **Deployment:** Vercel

---

## 📁 Folder Structure

```text
aeris-weather/
├── public/
├── screenshots/
│   ├── home.png
│   ├── future.png
│   └── history.png
├── src/
│   ├── pages/
│   │   ├── Home.jsx → Today page
│   │   ├── Future.jsx → 14-day future outlook
│   │   └── History.jsx → History + DB manager
│   ├── App.jsx → Router + Global State + Search
│   ├── db.js → localStorage handlers & helpers
│   ├── main.jsx → BrowserRouter entry
│   └── index.css → Tailwind styles
├── index.html
├── tailwind.config.js
├── vite.config.js
└── package.json
```

---

## 🚀 Quick Start

```bash
# 1. Clone the repository
git clone https://github.com/SayakaMeem/aeris-weather.git
cd aeris-weather

# 2. Install dependencies
npm install

# 3. Run development server
npm run dev
# → Open http://localhost:3000 in your browser

# 4. Build for production
npm run build
```

---

## 🔌 API Used (Free, No Key Required)

```http
# Search City
GET https://geocoding-api.open-meteo.com/v1/search?name=Chittagong&count=6&language=en

# Weather Forecast (Current + Hourly + 14-Day + UV)
GET https://api.open-meteo.com/v1/forecast?latitude=22.3569&longitude=91.7832&current=temperature_2m,relative_humidity_2m,apparent_temperature,weather_code,wind_speed_10m,uv_index&hourly=temperature_2m,weather_code,uv_index&daily=weather_code,temperature_2m_max,temperature_2m_min,sunrise,sunset,precipitation_probability_max,uv_index_max&timezone=auto&forecast_days=14
```

---

## 💾 Database Schema (`localStorage: aeris_history`)

```json
[
  {
    "id": 171234567890,
    "name": "Tokyo",
    "country": "Japan",
    "lat": 35.6897,
    "lon": 139.6922,
    "count": 5,
    "lastSearched": "2026-09-20T06:36:00.000Z"
  }
]
```

---

## 📸 Screenshots

<div align="center">

### Today Page
<img src="./screenshots/home.png" width="700" alt="Today Weather Page" />

### Future 14-Day Forecast
<img src="./screenshots/future.png" width="700" alt="Future Forecast Page" />

### History Database
<img src="./screenshots/history.png" width="700" alt="History Database Page" />

</div>

---

## 🌙 Why does UV show 0 at night?
At night, solar radiation drops to zero, meaning the UV index is genuinely 0. AERIS displays current UV alongside daily max (e.g., `0 / 9.2 max`) with intuitive color bars. During peak daylight hours, it updates dynamically per hour.

---

## 🚀 Deploy to Vercel

1. Push your repository to GitHub.
2. Go to [Vercel New Project](https://vercel.com/new) and import `aeris-weather`.
3. Keep default settings:
   - **Framework Preset:** Vite
   - **Build Command:** `npm run build`
   - **Output Directory:** `dist`
4. Click **Deploy** and enjoy your live weather platform!

---

<div align="center">

Built with ❤️ by [SayakaMeem](https://github.com/SayakaMeem) • AERIS Weather OS

</div>