# API Test Results

Run against the local server (`npm run dev`) connected to Neon PostgreSQL on 2026-10-29 07:48 UTC.

## Tasks CRUD

### Create a task

```bash
curl -X POST http://localhost:3000/api/tasks -H 'Content-Type: application/json' -d '{"title":"API test task","description":"Created from curl"}'
```

Status: `201`

```json
{"id":10,"title":"API test task","description":"Created from curl","completed":false,"created_at":"2026-10-29T07:49:39.941Z","updated_at":"2026-10-29T07:49:39.941Z"}
```

### Get all tasks

```bash
curl http://localhost:3000/api/tasks
```

Status: `200`

```json
[{"id":10,"title":"API test task","description":"Created from curl","completed":false,"created_at":"2026-10-29T07:49:39.941Z","updated_at":"2026-10-29T07:49:39.941Z"},{"id":9,"title":"Deploy to Vercel","description":"Add DATABASE_URL in project settings","completed":false,"created_at":"2026-10-29T07:42:22.518Z","updated_at":"2026-10-29T07:42:22.518Z"},{"id":8,"title":"Integrate Open-Meteo weather API","description":"Show current weather by city","completed":false,"created_at":"2026-10-29T07:42:22.330Z","updated_at":"2026-10-29T07:42:22.330Z"},{"id":7,"title":"Build REST API for tasks","description":"GET, POST, PUT, DELETE endpoints","completed":true,"created_at":"2026-10-29T07:42:22.145Z","updated_at":"2026-10-29T07:42:22.878Z"},{"id":6,"title":"Set up Neon PostgreSQL database","description":"Create project and tasks table","completed":true,"created_at":"2026-10-29T07:42:21.934Z","updated_at":"2026-10-29T07:42:22.704Z"},{"id":5,"title":"testt1","description":"testt1","completed":false,"created_at":"2026-10-29T07:39:42.142Z","updated_at":"2026-10-29T07:39:42.142Z"}]
```

### Edit a task

```bash
curl -X PUT http://localhost:3000/api/tasks/10 -H 'Content-Type: application/json' -d '{"title":"API test task (edited)"}'
```

Status: `200`

```json
{"id":10,"title":"API test task (edited)","description":"Created from curl","completed":false,"created_at":"2026-10-29T07:49:39.941Z","updated_at":"2026-10-29T07:49:40.851Z"}
```

### Mark a task as completed

```bash
curl -X PATCH http://localhost:3000/api/tasks/10 -H 'Content-Type: application/json' -d '{"completed":true}'
```

Status: `200`

```json
{"id":10,"title":"API test task (edited)","description":"Created from curl","completed":true,"created_at":"2026-10-29T07:49:39.941Z","updated_at":"2026-10-29T07:49:41.274Z"}
```

### Delete a task

```bash
curl -X DELETE http://localhost:3000/api/tasks/10
```

Status: `200`

```json
{"message":"Task deleted"}
```

### Delete a missing task

```bash
curl -X DELETE http://localhost:3000/api/tasks/10
```

Status: `404`

```json
{"error":"Task not found"}
```

## Validation

### Missing title

```bash
curl -X POST http://localhost:3000/api/tasks -H 'Content-Type: application/json' -d '{}'
```

Status: `400`

```json
{"error":"Title is required"}
```

### Invalid id

```bash
curl -X PUT http://localhost:3000/api/tasks/abc -H 'Content-Type: application/json' -d '{"completed":true}'
```

Status: `400`

```json
{"error":"Invalid id"}
```

### Invalid completed value

```bash
curl -X PUT http://localhost:3000/api/tasks/1 -H 'Content-Type: application/json' -d '{"completed":"yes"}'
```

Status: `400`

```json
{"error":"Completed must be a boolean"}
```

## Third Party API (Open-Meteo)

### Weather by city

```bash
curl 'http://localhost:3000/api/weather?city=Tokyo'
```

Status: `200`

```json
{"city":"Tokyo","country":"Japan","temperature":16.3,"windspeed":2.6,"description":"Drizzle"}
```

### Unknown city

```bash
curl 'http://localhost:3000/api/weather?city=zzqqxxnotacity'
```

Status: `404`

```json
{"error":"City not found"}
```

### Missing city

```bash
curl http://localhost:3000/api/weather
```

Status: `400`

```json
{"error":"City is required"}
```

