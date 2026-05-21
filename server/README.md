# Amazon Clone API

Express + MySQL backend for the Amazon clone Angular app.

## Setup

1. Install and start **MySQL** (local).
2. Set credentials in `server/.env` (`DB_USER`, `DB_PASSWORD`). Default is `root` with an empty password. If `npm run db:init` fails with *Access denied*, set the password you use in MySQL Workbench / XAMPP.
3. Copy environment file if needed:

   ```bash
   cp .env.example .env
   ```

4. Install dependencies:

   ```bash
   npm install
   ```

5. Create database and tables:

   ```bash
   npm run db:init
   ```

6. Start the API:

   ```bash
   npm start
   ```

Server runs at `http://localhost:5000`.

## Auth endpoints

| Method | Path | Description |
|--------|------|-------------|
| POST | `/api/auth/register` | Register user |
| POST | `/api/auth/login` | Login, returns JWT |
| GET | `/api/auth/me` | Current user (Bearer token) |
| POST | `/register` | Legacy alias (Angular) |
| POST | `/login` | Legacy alias (Angular) |
| POST | `/profile` | Legacy profile (Bearer token) |

### Example: register

```json
POST /api/auth/register
{
  "userName": "Sayan",
  "email": "test@example.com",
  "password": "secret12"
}
```

### Example: login

```json
POST /api/auth/login
{
  "email": "test@example.com",
  "password": "secret12"
}
```

Use header `Authorization: Bearer <token>` for `/api/auth/me`.
