# 🎯 InterviewPrep AI

An AI-powered interview preparation app. Enter your **target role**, **tech stack** and **years of experience**, and get custom, AI-generated technical interview questions with comprehensive answers.

📝 [Read the project write-up on LinkedIn](https://www.linkedin.com/posts/activity-7470399164560908288-NqjD)

<!-- TODO: if the app is deployed, add the live link here, for example:
🌐 **Live demo:** https://your-app-link -->

---

## 📸 Screenshots

| Landing page | Create an account |
|---|---|
| ![Landing page](docs/screenshots/landing.png) | ![Sign up](docs/screenshots/signup.png) |

| My Sessions | New prep session |
|---|---|
| ![My Sessions](docs/screenshots/dashboard.png) | ![New prep session](docs/screenshots/new-session.png) |

| Generated interview Q&A |
|---|
| ![Interview Q&A](docs/screenshots/questions.png) |

---

## ✨ Features

- **Account system:** sign up with a profile photo (JPG, PNG or WebP), log in and log out.
- **Custom interview prep:** describe your target role, years of experience, skills/topics to focus on, and any additional context.
- **AI-generated Q&A:** get role-specific technical questions with detailed answers.
- **My Sessions dashboard:** every prep session is saved with its role, skills, experience level, number of questions and last-prep date. Sessions can be deleted.
- **Session page:** view the session details and browse the interview questions as expandable cards, with a **Learn More** option on each question.
- **Modern dark UI:** responsive React interface built with Tailwind CSS.

---

## 🧰 Tech Stack

| Layer | Technology |
|---|---|
| Frontend | React 19, Vite 7, Tailwind CSS 4, React Icons |
| Backend | Node.js |
| Image upload | Multer (JPG / PNG / WebP, max 5 MB) |
| Configuration | dotenv |
<!-- TODO: add the rest of the backend stack here (framework, database, authentication method, AI provider), for example:
| Framework | Express |
| Database | MongoDB |
| AI | Gemini / OpenAI |
-->

---

## 🗂️ Project Structure

```
interview-prep-ai/
├── backend/
│   ├── middlewares/     # Upload middleware (Multer)
│   ├── models/          # Data models
│   ├── routes/          # API routes
│   ├── utils/           # Helper functions
│   ├── uploads/         # Uploaded profile images (created automatically, not committed)
│   └── server.js        # Server entry point
├── frontend/
│   └── interview-prep-ai/
│       ├── public/
│       ├── src/         # React components and pages
│       ├── index.html
│       └── vite.config.js
└── .gitignore
```

---

## 🚀 Getting Started

### Prerequisites

- Node.js 20.19 or newer (required by Vite 7)
- npm

### 1. Clone the repository

```bash
git clone https://github.com/kawshaninperera1112-source/interview-prep-ai.git
cd interview-prep-ai
```

### 2. Set up the backend

```bash
cd backend
npm install
```

Create a `.env` file inside `backend/` (see [Environment Variables](#-environment-variables)), then start the server:

```bash
node server.js
```

### 3. Set up the frontend

Open a **second terminal**:

```bash
cd frontend/interview-prep-ai
npm install
npm run dev
```

Open the address shown in the terminal (by default <http://localhost:5173>).

> ⚠️ The frontend lives in `frontend/interview-prep-ai`, not in `frontend`. Run `npm` commands from that folder.

---

## 🔐 Environment Variables

The backend reads its settings from a `backend/.env` file. This file contains secrets, so it is **not** committed to the repository (it is listed in `.gitignore`). Copy `backend/.env.example` to `backend/.env` and fill in your own values.

<!-- TODO: create backend/.env.example that lists only the variable NAMES (no values), then list them here. -->

---

## 📤 Image Uploads

Profile photos are uploaded with Multer and saved to `backend/uploads/`. The upload middleware:

- accepts only `.jpeg`, `.jpg`, `.png` and `.webp` images,
- limits files to 5 MB,
- cleans the original file name before saving it.

---

## 👤 Author

**Kawshani Perera**  
GitHub: [@kawshaninperera1112-source](https://github.com/kawshaninperera1112-source)  
LinkedIn: [Kawshani Perera](https://www.linkedin.com/in/kawshani-perera-916b5a279/)
