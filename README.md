# Origenix Connect AI
**AI-Powered Investor & Startup Intelligence Platform**

Origenix Connect AI is a comprehensive platform designed to bridge the gap between investors and startups using advanced artificial intelligence. It provides deep insights, matchmaking, and intelligence to streamline the funding ecosystem.

## Tech Stack
- **Frontend**: Next.js 16
- **Backend API**: FastAPI
- **Databases**: 
  - PostgreSQL 16 (Relational)
  - Redis 7 (Caching & Pub/Sub)
  - MongoDB 8 (Document store)
  - Qdrant (Vector database)
- **ORM**: Prisma

## Quick Start

1. Install dependencies:
   ```bash
   pnpm install
   ```

2. Start the infrastructure (databases):
   ```bash
   docker compose up -d
   ```

3. Start the development servers:
   ```bash
   pnpm dev
   ```

## Project Structure
```
origenix-connectai/
├── apps/               # Next.js frontend and FastAPI backend applications
├── packages/           # Shared libraries and packages
├── docker-compose.yml  # Local infrastructure definitions
├── turbo.json          # Turborepo configuration
└── package.json        # Root package configuration
```

## License
MIT
