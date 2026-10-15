<div align="center">

# 🎯 Quiz Management System

**A cloud-native, full-stack web platform for creating, managing, and taking online quizzes and exams — built with the modern MERN stack.**

[![Live Demo](https://img.shields.io/badge/🚀%20Live%20Demo-Visit%20App-orange?style=for-the-badge)](https://quiz-management-system-2875.vercel.app)
[![Backend API](https://img.shields.io/badge/⚡%20Backend-Render-46E3B7?style=for-the-badge)](https://quiz-management-system-ugcn.onrender.com)
[![API Docs](https://img.shields.io/badge/📡%20API%20Docs-Swagger-85EA2D?style=for-the-badge)](https://quiz-management-system-ugcn.onrender.com/api-docs)
[![License](https://img.shields.io/badge/License-ISC-blue?style=for-the-badge)](#-license)
[![Node](https://img.shields.io/badge/Node.js-22.x-339933?style=for-the-badge&logo=node.js)](https://nodejs.org)
[![React](https://img.shields.io/badge/React-19.x-61DAFB?style=for-the-badge&logo=react)](https://react.dev)
[![MongoDB](https://img.shields.io/badge/MongoDB-Atlas-47A248?style=for-the-badge&logo=mongodb)](https://mongodb.com/atlas)

</div>

---

## 📋 Table of Contents

- [Overview](#-overview)
- [Features](#-features)
- [Tech Stack](#-tech-stack)
- [Architecture](#-architecture)
- [Getting Started](#-getting-started)
- [Environment Variables](#-environment-variables)
- [API Documentation](#-api-documentation)
- [Role System](#-role-system)
- [CSV Upload Format](#-csv-upload-format)
- [Deployment](#-deployment)
- [Contributing](#-contributing)
- [License](#-license)

---

## 🌟 Overview

**Quiz Management System** is a production-ready, cloud-deployed MERN stack application built for institutions and individuals who need a scalable platform to create, manage, and participate in online assessments.

It ships with:
- ⚡ **Role-Based Access Control (RBAC)** across 4 distinct user types
- ⏱️ **Real-time exam timers** with auto-submit on expiry
- 📊 **Automatic scoring & leaderboard rankings**
- 🌙 **Dark / Light mode** with localStorage persistence
- 📡 **Swagger-powered REST API** with full documentation
- ☁️ **Deployed on Vercel + Render + MongoDB Atlas** — zero infrastructure management

---

## ✨ Features

### 🔐 Authentication & Security
- Stateless **JWT authentication** with 7-day token lifecycle
- Client-side token expiry validation — no wasted API calls
- Auto-logout with intercepted `401` responses
- **bcryptjs** password hashing — no plain-text secrets stored
- Protected routes with role-aware middleware

### 👑 Super Admin
- System-wide dashboard with live platform statistics
- Full user lifecycle management — create, promote roles, delete
- Quiz bank oversight with **CSV bulk upload** support
- Global visibility into all exams and attempt records

### 🛡️ Admin
- Full **CRUD** on the quiz bank
- Bulk-import questions via downloadable CSV template
- Advanced filtering by subject, topic, and difficulty level
- Paginated search across the entire question pool

### 📝 Setter (Exam Creator)
- Create exams with **Manual** or **Dynamic** question selection
- Dynamic mode: multi-subject picker, topic filter, difficulty level, and live match count preview
- Future-only exam scheduling with datetime validation
- Manage participants through a searchable checkbox dropdown
- Real-time **ranked results leaderboard**
- Edit upcoming exams — completed exams are immutably locked

### 🎓 Participant
- Browse and attempt live exams with a **live countdown timer**
- Auto-submit triggered on time expiry — no data loss
- Visual **progress bar** tracking answered vs. remaining questions
- Create **self-practice sessions** (Basic level, dynamic selection)
- Invite peers to self-exams via the participant picker
- Attempt history with detailed score breakdowns
- Result screen with **percentage score**, color-coded performance feedback, and animated score bar

### 🎨 UI/UX
- 🌙 **Dark / Light mode** toggle — state persisted in `localStorage`
- 📱 Fully **responsive layout** — mobile, tablet, and desktop
- 🔔 **Toast notification system** — auto-dismiss + manual close
- ⏳ Smooth loading spinners and graceful empty states
- 🚫 Custom **404 Not Found** page

---

## 🛠 Tech Stack

### Frontend
| Technology | Version | Purpose |
|---|---|---|
| **React** | 19.x | UI component framework |
| **React Router DOM** | 7.x | Client-side SPA routing |
| **CSS Custom Properties** | — | Themeable design system (dark/light) |
| **Fetch API** | — | Native HTTP client — no extra dependencies |

### Backend
| Technology | Version | Purpose |
|---|---|---|
| **Node.js** | 22.x | Server-side JavaScript runtime |
| **Express** | 5.x | Minimal, fast REST API framework |
| **MongoDB** | — | NoSQL document database |
| **Mongoose** | 9.x | Schema-based MongoDB ODM |
| **JSON Web Token (JWT)** | 9.x | Stateless authentication |
| **bcryptjs** | 3.x | Secure password hashing |
| **csv-parse** | 6.x | CSV bulk import engine |
| **helmet** | 8.x | HTTP security headers middleware |
| **morgan** | 1.x | HTTP request logging |
| **swagger-ui-express** | 5.x | Auto-generated interactive API docs |

### Infrastructure & DevOps
| Service | Purpose |
|---|---|
| **MongoDB Atlas** | Managed cloud database (M0 free tier) |
| **Render** | Backend container hosting with auto-deploy |
| **Vercel** | Frontend CDN hosting with edge deployment |
| **GitHub** | Source control + CI/CD pipeline trigger |

---

## 🏗 Architecture

```
Quiz-Management-System/
├── frontend/                  # React 19 SPA
│   ├── public/
│   └── src/
│       ├── api/               # Centralized API layer (single source of truth)
│       │   └── index.js
│       ├── components/        # Reusable UI components
│       │   └── index.js       # Navbar, Modal, Spinner, ParticipantPicker...
│       ├── context/           # React Context providers (global state)
│       │   ├── AuthContext.jsx
│       │   ├── ThemeContext.jsx
│       │   └── ToastContext.jsx
│       ├── hooks/
│       │   └── useFetch.js    # Custom data-fetching hook
│       ├── pages/
│       │   ├── admin/         # Dashboard, Overview, Users, Quizzes
│       │   ├── setter/        # Exams, CreateExam, ExamResults
│       │   ├── participant/   # AvailableExams, TakeExam, SelfExam...
│       │   ├── Login.jsx
│       │   └── Register.jsx
│       └── styles/
│           └── global.css     # Design tokens + dark/light theme system
│
└── backend/                   # Express 5 REST API
    ├── src/
    │   ├── config/            # DB connection, Swagger config
    │   ├── controllers/       # Request handlers (thin layer)
    │   │   ├── adminController.js
    │   │   ├── authController.js
    │   │   ├── examController.js
    │   │   ├── quizController.js
    │   │   └── attemptController.js
    │   ├── middleware/        # Auth guard, role guard, global error handler
    │   ├── models/            # Mongoose schemas & models
    │   │   ├── User.js
    │   │   ├── Exam.js
    │   │   ├── Quiz.js
    │   │   └── Attempt.js
    │   ├── routes/            # Express routers
    │   ├── services/          # Business logic layer (separated from controllers)
    │   ├── utils/             # JWT helpers, password utils, random selector
    │   └── seed.js            # Database seeder with demo data
    ├── swagger.yaml
    └── package.json
```

---

## 🚀 Getting Started

### Prerequisites
- **Node.js** `v18+` — [Download](https://nodejs.org)
- **MongoDB** (local instance or [Atlas](https://mongodb.com/atlas) cloud)
- **Git**

### 1. Clone the Repository

```bash
git clone https://github.com/amittanwar5911/Quiz-Management-System.git
cd Quiz-Management-System
```

### 2. Setup Backend

```bash
cd backend
npm install
```

Create a `.env` file in the `backend/` directory:

```env
PORT=5000
MONGO_URI=mongodb://127.0.0.1:27017/quizMsDb
JWT_SECRET=your_super_secret_jwt_key_change_in_production
JWT_EXPIRES_IN=7d
```

Seed the database with demo users and quiz data:

```bash
npm run seed
```

Start the development server:

```bash
npm run dev
```

| Service | URL |
|---|---|
| Backend API | `http://localhost:5000` |
| Swagger Docs | `http://localhost:5000/api-docs` |

### 3. Setup Frontend

```bash
cd ../frontend
npm install
```

Create a `.env` file in the `frontend/` directory:

```env
REACT_APP_API_URL=http://localhost:5000/api
```

Start the dev server:

```bash
npm start
```

App runs at: `http://localhost:3000`

---

## 🔑 Environment Variables

### Backend (`backend/.env`)

| Variable | Description | Example |
|---|---|---|
| `PORT` | Server port | `5000` |
| `MONGO_URI` | MongoDB connection string | `mongodb://localhost/quizMsDb` |
| `JWT_SECRET` | Secret key for signing JWTs | `your_secret_key` |
| `JWT_EXPIRES_IN` | Token expiry duration | `7d` |

### Frontend (`frontend/.env`)

| Variable | Description | Example |
|---|---|---|
| `REACT_APP_API_URL` | Backend API base URL | `http://localhost:5000/api` |

---

## 📡 API Documentation

Interactive Swagger documentation is available at `/api-docs` when running the backend locally, or at the [live API docs](https://quiz-management-system-ugcn.onrender.com/api-docs).

### Key Endpoints

| Method | Endpoint | Access | Description |
|---|---|---|---|
| `POST` | `/auth/register` | Public | Register a new user |
| `POST` | `/auth/login` | Public | Authenticate and receive JWT |
| `GET` | `/admin/stats` | Admin+ | Platform-wide statistics |
| `GET` | `/admin/users` | Admin+ | Paginated user list |
| `POST` | `/admin/users` | Admin+ | Create user manually |
| `PUT` | `/admin/users/:id/role` | Admin+ | Promote / demote user role |
| `DELETE` | `/admin/users/:id` | Superadmin | Permanently delete user |
| `POST` | `/admin/quizzes/upload` | Admin+ | Bulk CSV question import |
| `GET` | `/quizzes` | Admin+/Setter | Filtered, paginated quiz list |
| `POST` | `/quizzes` | Admin+ | Create a new quiz question |
| `GET` | `/exams/mine` | Setter | Setter's own exams |
| `POST` | `/exams` | Setter | Create a new exam |
| `PUT` | `/exams/:id` | Setter | Edit an upcoming exam |
| `GET` | `/exams/available` | Participant | Active exams available to take |
| `GET` | `/exams/upcoming` | Participant | Scheduled upcoming exams |
| `GET` | `/exams/:id/questions` | Participant | Fetch exam questions |
| `POST` | `/attempts/submit` | Participant | Submit exam answers |
| `GET` | `/attempts/my` | Participant | Personal attempt history |

---

## 👤 Role System

```
superadmin  ──▶  Full platform control — users, quizzes, exams, system stats
    │
admin       ──▶  Quiz bank management + user management (cannot create admins)
    │
setter      ──▶  Exam creation, scheduling & participant management
    │
participant ──▶  Take assigned exams + create self-practice sessions
```

### Demo Credentials (Seeded)

| Role | Email | Password |
|---|---|---|
| Superadmin | superadmin@quiz.io | super123 |
| Admin | admin@quiz.io | admin123 |
| Setter | setter@quiz.io | setter123 |
| Participant | alice@quiz.io | alice123 |
| Participant | bob@quiz.io | bob123 |

> ⚠️ **Security Notice:** Rotate all default credentials before deploying to production!

---

## 📄 CSV Upload Format

Admins can bulk-import quiz questions using a structured CSV file. Download the template directly from the **Quiz Bank** tab in the admin dashboard.

### Column Schema

```csv
subject,topic,question,option1,option2,option3,option4,correct,label
Math,Algebra,What is 2+2?,1,2,3,4,4,basic
Science,Physics,What is the unit of force?,Joule,Newton,Watt,Pascal,Newton,intermediate
```

### Validation Rules
- `label` must be one of: `basic` · `intermediate` · `advanced`
- `correct` must exactly match one of the four option values
- `option1` and `option2` are required; `option3` and `option4` are optional
- All other columns are required — rows with missing fields are rejected

---

## 🌐 Deployment

### Backend → Render

1. Push your code to GitHub
2. Create a new **Web Service** on [render.com](https://render.com)
3. Set **Root Directory** to `backend`
4. Set **Build Command** to `npm install`
5. Set **Start Command** to `node server.js`
6. Add all environment variables in the Render dashboard
7. Render auto-deploys on every push to `main` ✅

### Frontend → Vercel

1. Import your GitHub repo at [vercel.com](https://vercel.com)
2. Set **Root Directory** to `frontend`
3. Add environment variable: `REACT_APP_API_URL` → your Render backend URL
4. Click **Deploy** — Vercel handles the rest with global edge CDN ✅

### Database → MongoDB Atlas

1. Create a free **M0 Flex** cluster at [mongodb.com/atlas](https://mongodb.com/atlas)
2. Whitelist `0.0.0.0/0` under **Network Access** (or use Render's static IPs)
3. Create a database user and copy the connection string to `MONGO_URI`

---

## 🤝 Contributing

Contributions are welcome! Here's how to get started:

1. **Fork** the repository
2. **Create** a feature branch: `git checkout -b feature/your-feature-name`
3. **Commit** your changes with a descriptive message: `git commit -m 'feat: add your feature'`
4. **Push** to your branch: `git push origin feature/your-feature-name`
5. **Open a Pull Request** — describe what you changed and why

### Code Guidelines
- Keep functions small, single-responsibility, and well-named
- Use meaningful variable and function names — code should read like prose
- Add inline comments for non-obvious logic
- Follow the existing folder structure and naming conventions
- Write commit messages using [Conventional Commits](https://www.conventionalcommits.org/) format (`feat:`, `fix:`, `chore:`, etc.)

---

## 📝 License

This project is licensed under the **ISC License** — free to use, modify, and distribute.

---

<div align="center">

Built with ❤️ by [Amit Tanwar](https://github.com/amittanwar5911)

⭐ **Star this repo** if you found it helpful — it really means a lot!

</div>
