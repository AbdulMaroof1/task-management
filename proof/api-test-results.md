# API Test Results

Run against the live deployment at https://task-management-seven-blue.vercel.app (Vercel + Neon PostgreSQL) on 2026-10-29 07:57 UTC.

## Tasks CRUD

### Create a task

```bash
curl -X POST https://task-management-seven-blue.vercel.app/api/tasks -H 'Content-Type: application/json' -d '{"title":"API test task","description":"Created from curl"}'
```

Status: `201`

```json
{"id":14,"title":"API test task","description":"Created from curl","completed":false,"created_at":"2026-10-29T07:58:41.889Z","updated_at":"2026-10-29T07:58:41.889Z"}
```

### Get all tasks

```bash
curl https://task-management-seven-blue.vercel.app/api/tasks
```

Status: `200`

```json
[{"id":14,"title":"API test task","description":"Created from curl","completed":false,"created_at":"2026-10-29T07:58:41.889Z","updated_at":"2026-10-29T07:58:41.889Z"},{"id":9,"title":"Deploy to Vercel","description":"Add DATABASE_URL in project settings","completed":false,"created_at":"2026-10-29T07:42:22.518Z","updated_at":"2026-10-29T07:42:22.518Z"},{"id":8,"title":"Integrate Open-Meteo weather API","description":"Show current weather by city","completed":false,"created_at":"2026-10-29T07:42:22.330Z","updated_at":"2026-10-29T07:42:22.330Z"},{"id":7,"title":"Build REST API for tasks","description":"GET, POST, PUT, DELETE endpoints","completed":true,"created_at":"2026-10-29T07:42:22.145Z","updated_at":"2026-10-29T07:42:22.878Z"},{"id":6,"title":"Set up Neon PostgreSQL database","description":"Create project and tasks table","completed":true,"created_at":"2026-10-29T07:42:21.934Z","updated_at":"2026-10-29T07:42:22.704Z"},{"id":5,"title":"testt1","description":"testt1","completed":false,"created_at":"2026-10-29T07:39:42.142Z","updated_at":"2026-10-29T07:39:42.142Z"}]
```

### Edit a task

```bash
curl -X PUT https://task-management-seven-blue.vercel.app/api/tasks/14 -H 'Content-Type: application/json' -d '{"title":"API test task (edited)"}'
```

Status: `200`

```json
{"id":14,"title":"API test task (edited)","description":"Created from curl","completed":false,"created_at":"2026-10-29T07:58:41.889Z","updated_at":"2026-10-29T07:58:43.493Z"}
```

### Mark a task as completed

```bash
curl -X PATCH https://task-management-seven-blue.vercel.app/api/tasks/14 -H 'Content-Type: application/json' -d '{"completed":true}'
```

Status: `200`

```json
{"id":14,"title":"API test task (edited)","description":"Created from curl","completed":true,"created_at":"2026-10-29T07:58:41.889Z","updated_at":"2026-10-29T07:58:44.301Z"}
```

### Delete a task

```bash
curl -X DELETE https://task-management-seven-blue.vercel.app/api/tasks/14
```

Status: `200`

```json
{"message":"Task deleted"}
```

### Delete a missing task

```bash
curl -X DELETE https://task-management-seven-blue.vercel.app/api/tasks/14
```

Status: `404`

```json
{"error":"Task not found"}
```

## Validation

### Missing title

```bash
curl -X POST https://task-management-seven-blue.vercel.app/api/tasks -H 'Content-Type: application/json' -d '{}'
```

Status: `400`

```json
{"error":"Title is required"}
```

### Invalid id

```bash
curl -X PUT https://task-management-seven-blue.vercel.app/api/tasks/abc -H 'Content-Type: application/json' -d '{"completed":true}'
```

Status: `400`

```json
{"error":"Invalid id"}
```

### Invalid completed value

```bash
curl -X PUT https://task-management-seven-blue.vercel.app/api/tasks/1 -H 'Content-Type: application/json' -d '{"completed":"yes"}'
```

Status: `400`

```json
{"error":"Completed must be a boolean"}
```

## Third Party API (Open-Meteo)

### Weather by city

```bash
curl 'https://task-management-seven-blue.vercel.app/api/weather?city=Tokyo'
```

Status: `200`

```json
{"city":"Tokyo","country":"Japan","temperature":16.3,"windspeed":2.6,"description":"Drizzle"}
```

### Unknown city

```bash
curl 'https://task-management-seven-blue.vercel.app/api/weather?city=zzqqxxnotacity'
```

Status: `404`

```json
{"error":"City not found"}
```

### Missing city

```bash
curl https://task-management-seven-blue.vercel.app/api/weather
```

Status: `400`

```json
{"error":"City is required"}
```

