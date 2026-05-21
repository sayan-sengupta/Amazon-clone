# Amazon Clone

E-commerce UI built with **Angular 16** (migrated from Angular 9). Runs on **Node.js 18+** (tested with Node 18.10.0).

## Prerequisites

- Node.js 18 or 20
- npm 8+
- MySQL 8 (local)

## Install (frontend)

```bash
npm install
```

## Backend API (`server/`)

```bash
cd server
npm install
```

Edit `server/.env` if your MySQL user/password differ (default: `root`, empty password, database `amazon_clone`).

```bash
npm run db:init
npm start
```

API: `http://localhost:5000` — see [server/README.md](server/README.md) for auth endpoints.

## Development server (frontend)

```bash
npm start
```

Open [http://localhost:4200/](http://localhost:4200/).

Use the project CLI (`npm start` / `npx ng serve`), not a globally installed Angular 9 CLI.

## Production build (for hosting)

```bash
npm run build
```

Output is in `dist/amazon-clone/`. Deploy that folder to static hosting (Netlify, Vercel, Azure Static Web Apps, S3, etc.).

## Tests

```bash
npm test
```
