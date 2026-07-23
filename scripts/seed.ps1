$ErrorActionPreference = "Stop"

Write-Host "Starting database seeding..." -ForegroundColor Cyan

pnpm --filter @origenix/database seed

Write-Host "Database seeded successfully!" -ForegroundColor Green
