# NemoFlix

A modern, premium-quality Movie & Anime discovery platform built with the MERN stack + Vite + Tailwind CSS. 
This project strictly relies on official public APIs (TMDB & Jikan) and Youtube trailers, adhering to all legal requirements.

## Features
- Glassmorphism dark-theme UI with red accents
- Responsive design for Mobile, Tablet, and Desktop
- Movies & Anime discovery (Trending, Top Rated, Popular)
- Detailed information for Movies (Cast, Trailers, Recommendations) and Anime (Synopsis, Characters)
- Reusable AdSense placeholders

## Tech Stack
- Frontend: React, Vite, Tailwind CSS, React Router, Framer Motion, Axios
- Backend: Node.js, Express.js, MongoDB

## Installation

### Prerequisites
- Node.js (v16+)
- MongoDB (optional, for contact messages)
- TMDB API Key

### Environment Setup
1. Duplicate `.env.example` in `client` directory to `.env` and add your TMDB API key.
2. Duplicate `.env.example` in `server` directory to `.env` and set your MongoDB URI if using a database.

### Running the Project

#### 1. Start the Server (Backend)
```bash
cd server
npm install
npm run dev
```

#### 2. Start the Client (Frontend)
```bash
cd client
npm install
npm run dev
```

## Deployment
- **Frontend**: Connect your GitHub repository to Vercel, set the root directory to `client`, add the `VITE_TMDB_API_KEY` to Vercel's environment variables, and deploy.
- **Backend**: Connect your GitHub repository to Render, select Node, set the root directory to `server`, add `MONGO_URI` to the environment, and deploy.
