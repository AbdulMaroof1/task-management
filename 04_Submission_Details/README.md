# Submission Details

## Repository

- GitHub: https://github.com/AbdulMaroof1/task-management
- Branches: `main` (initial release), `dev` (latest work)

## Live Demo

https://task-management-seven-blue.vercel.app

| Endpoint | URL |
| --- | --- |
| Get all tasks | https://task-management-seven-blue.vercel.app/api/tasks |
| Weather by city | https://task-management-seven-blue.vercel.app/api/weather?city=London |

## Tech Stack

| Layer | Technology |
| --- | --- |
| Frontend | Next.js 16, React 19, Tailwind CSS 4, Axios |
| Backend | Next.js Route Handlers (REST), Zod validation |
| Database | Neon (PostgreSQL) |
| Hosting | Vercel |

## Setup Instructions

### Requirements

- Node.js 20 or later
- A Neon PostgreSQL database (free tier works)

### Steps

1. Clone the repository and install dependencies

   ```bash
   git clone https://github.com/AbdulMaroof1/task-management.git
   cd task-management
   npm install
   ```

2. Create a `.env` file in the project root

   ```env
   DATABASE_URL="postgresql://<user>:<password>@<host>.neon.tech/<database>?sslmode=require"
   WEATHER_API_URL="https://api.open-meteo.com/v1/forecast"
   GEOCODING_API_URL="https://geocoding-api.open-meteo.com/v1/search"
   ```

   | Variable | Required | Description |
   | --- | --- | --- |
   | `DATABASE_URL` | Yes | Neon connection string from Neon Console > Connect |
   | `WEATHER_API_URL` | No | Open-Meteo forecast endpoint, defaults to the public URL |
   | `GEOCODING_API_URL` | No | Open-Meteo geocoding endpoint, defaults to the public URL |

3. Create the database table

   ```bash
   npm run db:setup
   ```

   Alternatively, run [db/schema.sql](../db/schema.sql) in the Neon SQL Editor.

4. Start the development server

   ```bash
   npm run dev
   ```

   Open http://localhost:3000

### Deploy to Vercel

1. Import the GitHub repository in Vercel.
2. Add `DATABASE_URL` under Project Settings > Environment Variables.
3. Deploy.

## Database Schema

Database: Neon PostgreSQL. Table: `tasks`.

```sql
CREATE TABLE IF NOT EXISTS tasks (
  id          SERIAL PRIMARY KEY,
  title       VARCHAR(255) NOT NULL,
  description TEXT NOT NULL DEFAULT '',
  completed   BOOLEAN NOT NULL DEFAULT FALSE,
  created_at  TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at  TIMESTAMPTZ NOT NULL DEFAULT NOW()
);
```

| Column | Type | Constraints | Description |
| --- | --- | --- | --- |
| `id` | SERIAL | Primary key | Auto-incrementing task id |
| `title` | VARCHAR(255) | Not null | Task title |
| `description` | TEXT | Not null, default `''` | Optional task details |
| `completed` | BOOLEAN | Not null, default `false` | Completion status |
| `created_at` | TIMESTAMPTZ | Not null, default `NOW()` | Creation time |
| `updated_at` | TIMESTAMPTZ | Not null, default `NOW()` | Last update time |

## Related

- Screenshots and API test results: [proof](../proof/README.md)
- Postman collection: [task-management.postman_collection.json](../proof/task-management.postman_collection.json)
