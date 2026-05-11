# PawMatch — Tinder-style Pet Adoption App

## Project Info
- **Type:** Full-stack web app (demo/portfolio)
- **Frontend:** https://pruebatupagina-free.github.io/pawmatch/
- **Backend:** Railway (Node.js + Express + MongoDB)

## Tech Stack
- Frontend: React + Vite + TailwindCSS v3
- Backend: Node.js + Express + Mongoose + Socket.io
- DB: MongoDB Atlas
- Deploy: GitHub Pages (frontend) + Railway (backend)

## Structure
```
pawmatch/
├── frontend/   ← React app
├── backend/    ← Node/Express API
└── docs/       ← Built frontend for GitHub Pages
```

## Commands
```bash
# Frontend dev
cd frontend && npm run dev

# Frontend build
cd frontend && npm run build

# Backend dev
cd backend && npm run dev

# Seed database
cd backend && node seed/animals.js

# Deploy frontend (after build)
xcopy frontend\dist docs\ /E /I /Y
git add docs && git commit -m "Deploy" && git push
```

## Environment Variables (backend)
```
PORT=3001
MONGODB_URI=mongodb+srv://...
```

## GitHub Repo
https://github.com/pruebatupagina-free/pawmatch
