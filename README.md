# Full-Stack Application with Docker

This project contains a full-stack application with Next.js frontend, FastAPI backend, and PostgreSQL database.

## Quick Start with Docker

### Prerequisites
- Docker
- Docker Compose

### Production Mode

1. **Create environment file**
   ```bash
   cp .env.example .env
   # Edit .env and update the SECRET_KEY and NEXTAUTH_SECRET
   ```

2. **Build and start all services**
   ```bash
   docker compose up --build
   ```

3. **Access the application**
   - Frontend: http://localhost:3000
   - Backend API: http://localhost:8000
   - API Docs: http://localhost:8000/docs

### Development Mode (with hot reload)

1. **Start development environment**
   ```bash
   docker-compose -f docker-compose.dev.yml up --build
   ```

2. **Features in development mode**
   - Hot reload for frontend (Next.js)
   - Hot reload for backend (FastAPI)
   - Source code mounted as volumes
   - Faster rebuild times

### Docker Commands

#### Production Mode

```bash
# Start services
docker-compose up

# Start in detached mode
docker-compose up -d

# Stop services
docker-compose down

# View logs
docker-compose logs -f

# View specific service logs
docker-compose logs -f frontend
docker-compose logs -f backend

# Rebuild containers
docker-compose up --build

# Remove volumes (careful: deletes database data)
docker-compose down -v
```

#### Development Mode

```bash
# Start development environment
docker-compose -f docker-compose.dev.yml up

# Rebuild development containers
docker-compose -f docker-compose.dev.yml up --build

# Stop development environment
docker-compose -f docker-compose.dev.yml down
```

#### Useful Commands

```bash
# Execute commands in running containers
docker-compose exec backend bash
docker-compose exec frontend sh

# Check container status
docker-compose ps

# Restart a specific service
docker-compose restart backend

# Remove all containers, networks, and volumes
docker-compose down -v --remove-orphans
```

## Development without Docker

### Backend (FastAPI)

```bash
cd backend
poetry install
poetry run uvicorn main:app --app-dir src --reload
```

### Frontend (Next.js)

```bash
cd frontend
npm install
npm run dev
```

### Database
Run PostgreSQL locally on port 5432 with credentials in `.env`

## Project Structure

```
.
├── backend/              # FastAPI backend
│   ├── src/
│   │   ├── main.py
│   │   ├── routes/
│   │   ├── model/
│   │   ├── dependency/
│   │   └── infra/
│   ├── Dockerfile
│   └── pyproject.toml
├── frontend/            # Next.js frontend
│   ├── src/
│   │   ├── app/
│   │   ├── components/
│   │   ├── actions/
│   │   └── types/
│   ├── Dockerfile
│   └── package.json
└── docker-compose.yml   # Docker orchestration
```

## Environment Variables

### Backend
- `DATABASE_URL`: PostgreSQL connection string
- `SECRET_KEY`: Secret key for JWT tokens

### Frontend
- `NEXTAUTH_SECRET`: NextAuth.js secret
- `NEXTAUTH_URL`: Application URL
- `BACKEND_API_URL`: Backend API URL

## Features

- ✅ User authentication (login/logout)
- ✅ JWT token management
- ✅ Session handling
- ✅ Route protection
- ✅ Password hashing
- ✅ PostgreSQL database
- ✅ Docker containerization

## Notes

- The frontend Dockerfile uses multi-stage build for optimized production image
- Database data is persisted in a Docker volume
- Health checks ensure services start in the correct order
- Hot reload is enabled for development
