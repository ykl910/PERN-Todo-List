# PERN Todo List

> A small full-stack Todo List built with PostgreSQL, Express (Node), React — a PERN stack example.

This repository contains three parts:

- `client/` — React front-end app (development server with hot reload, production build in `client/build`).
- `server/` — Node/Express API server that talks to the Postgres database.
- `server/database.sql` — schema and example SQL you can run against your Postgres instance.

## Quick start (development)

Prerequisites:
- Node.js (16+ recommended)
- npm or yarn
- PostgreSQL (local installation or a managed service)

1) Start Postgres or ensure a Postgres instance is available

If you have Postgres installed locally, create the development database (example):

```bash
# create database named `perntodo` using the default postgres user
psql -h localhost -U postgres -c "CREATE DATABASE perntodo;"
```

If you're using a managed Postgres instance, make sure to set the server's `DATABASE_URL` or update the connection in `server` accordingly.

2) Run the backend

```bash
cd server
npm install
# start dev server (check package.json scripts — might be `dev` or `start`)
npm run dev
```

By default the server in this project listens on port 5001 and exposes endpoints like `PUT /todos/:id`.

3) Run the frontend

```bash
cd client
npm install
npm start
```

This starts the React dev server (usually `http://localhost:3000`). The client will make API calls to the server. If you encounter CORS issues, either set a `proxy` in `client/package.json` or configure CORS in the backend.

## Database

The SQL schema is in `server/database.sql`. You can load it into your local Postgres with psql:

```bash
psql -h localhost -U postgres -d perntodo -f server/database.sql
```

Replace credentials as needed.

## Production build

1. Build the client:

```bash
cd client
npm run build
```

2. Serve `client/build` with your server or a static host/CDN. The Node server can be configured to serve static assets from that folder.

## Notes

- `node_modules/` are ignored via `.gitignore` and should not be pushed.
- During this project setup, `client/` was converted to a normal folder in the main repo (not a submodule). If you previously used a separate git repo for `client`, be aware that its `.git` metadata was removed from this repository.
- If you want to keep `client` as an independent repo, move it to its own GitHub repo and add it back as a submodule.

## Suggested improvements

- Add a `.env.example` and document all environment variables the server requires (DB connection string, PORT, etc.).
- Add a simple CI workflow (GitHub Actions) to lint/tests on push.
- Add a LICENSE and a short README inside `client/` and `server/` with module-specific instructions.

## Contact / Troubleshooting

If you see errors when starting services, check:
- That Postgres is running and reachable on the configured host/port.
- That the server environment variables are set (DB user/password/name).
- `npm install` has been run in both `client` and `server`.

Enjoy!
