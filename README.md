
# 📚 Institutional Space & Resource Management Platform

This is a full-stack application built with:
- **Frontend:** React.js (in `frontend/Faculty dashboard/`)
- **Backend:** Spring Boot (in `backend/capstone_backend_java/`)

The system helps manage room bookings, faculty schedules, crowd tracking, and administrative resources at an institutional level.

📍 **GitHub Repo:** [Vraj-x2/institutional-space-management](https://github.com/Vraj-x2/institutional-space-management)

---

## 🚀 Features

- 🔐 User Authentication (Login / Register)
- 🏫 Faculty Room Posting & Requests
- 📅 Booking System with Schedule Viewer
- 📊 Crowd Monitoring Dashboard
- 🛠️ Admin Resource Management
- 📩 Feedback Submission
- 💬 Chat Interface UI (backend integration pending)

---

## 📁 Project Structure

```
institutional-space-management/
├── frontend/
│   └── Faculty dashboard/
│       ├── src/
│       ├── public/
│       └── package.json, etc.
├── backend/
│   └── capstone_backend_java/
│       ├── src/
│       ├── pom.xml
│       └── application.properties, etc.
├── README.md
└── .gitignore
```

---

## 🛠️ Getting Started

### Prerequisites

- Node.js (v18+)
- npm or yarn
- Java 17+ (or higher)
- Maven

### 1. Backend Setup

```bash
cd backend/capstone_backend_java
./mvnw spring-boot:run
# or if Maven is installed
mvn spring-boot:run
```

Backend runs on: `http://localhost:8080`

### 2. Frontend Setup

```bash
cd frontend/"Faculty dashboard"
npm install
npm run dev
```

Frontend runs on: `http://localhost:5713`

---

## 🔗 Connecting Frontend to Backend

- Backend exposes REST APIs.
- Frontend uses `axios` via `api.ts` to interact with the backend.
- CORS is configured in `CorsConfig.java`.

Make sure backend is running before using the frontend features.

---

## 🧪 Project Technologies

| Layer     | Technology        |
|-----------|-------------------|
| Frontend  | React, TypeScript |
| Backend   | Spring Boot (Java), Spring Security |
| Database  | H2 / MySQL (configurable) |
| API       | REST (JSON)       |
| Styling   | CSS               |

---

## 📃 License

This project is licensed under the MIT License.

---

## ✍️ Maintainer

Created by [Vraj Contractor](https://github.com/Vraj-x2) and team for academic demonstration and portfolio.
