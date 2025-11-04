# Frontend (Vite + React) for facebookapi

Overview
- This frontend talks to the Spring Boot REST API at `/api/posts`.
- During development we run the Vite dev server (http://localhost:5173) and proxy `/api` to Spring Boot (http://localhost:8080).
- For production we build the frontend into Spring Boot's `src/main/resources/static` so Spring Boot serves the built app.

1) Create the frontend folder and scaffold Vite (if you haven't already)
```bash
# from the backend project root
npm create vite@latest frontend -- --template react
cd frontend
```

2) Install dependencies
```bash
cd frontend
npm install
# We intentionally use fetch in this example (no axios required).
```

3) Replace/add the files in `frontend/` with the files provided in this guide:
- vite.config.js (sets dev proxy; builds into backend static for production)
- index.html, src/main.jsx, src/App.jsx, src/api/posts.js, src/components/*, src/main.css
(You can copy them from this repo section.)

4) Run dev
- Start Spring Boot app (default port 8080)
  ```bash
  # from backend root
  ./mvnw spring-boot:run  # or use your IDE/run configuration
  ```
- Start Vite dev server
  ```bash
  cd frontend
  npm run dev
  ```
Open http://localhost:5173. API requests to `/api/*` are proxied to Spring Boot.

If you get CORS errors (for example you host backend elsewhere), add a CORS config to the backend (example WebConfig.java is provided).

5) Build for production (so Spring Boot serves the UI)
```bash
# from frontend
npm run build
# This writes the built `index.html` + assets into:
# ../src/main/resources/static  (relative to frontend folder) by default
```
Then run your Spring Boot app normally; it will serve the static files.

Notes
- If your backend runs on a different host/port in dev, update `vite.config.js` proxy target.
- If you keep the frontend separate in production, serve the built files using a CDN or a static server instead of embedding into Spring Boot.
