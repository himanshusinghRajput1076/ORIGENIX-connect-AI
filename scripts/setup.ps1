$ErrorActionPreference = "Stop"

Write-Host "Starting Origenix Connect AI Setup..." -ForegroundColor Cyan

# Check Node.js version
$nodeVersion = node -v
if (-not $nodeVersion) {
    Write-Error "Node.js is not installed."
}
$nodeMajorVersion = [int]($nodeVersion -replace 'v', '').Split('.')[0]
if ($nodeMajorVersion -lt 22) {
    Write-Error "Node.js version must be 22 or higher. Current version: $nodeVersion"
}
Write-Host "Node.js version $nodeVersion detected." -ForegroundColor Green

# Check pnpm
$pnpmVersion = pnpm -v
if (-not $pnpmVersion) {
    Write-Error "pnpm is not installed. Please install pnpm."
}
Write-Host "pnpm version $pnpmVersion detected." -ForegroundColor Green

# Copy .env
if (-not (Test-Path ".env")) {
    if (Test-Path ".env.example") {
        Copy-Item ".env.example" ".env"
        Write-Host "Copied .env.example to .env" -ForegroundColor Green
    } else {
        Write-Host "Warning: .env.example not found." -ForegroundColor Yellow
    }
} else {
    Write-Host ".env file already exists." -ForegroundColor Gray
}

# Install dependencies
Write-Host "Installing dependencies..." -ForegroundColor Cyan
pnpm install

# Start docker services
Write-Host "Starting Docker services..." -ForegroundColor Cyan
docker compose up -d

Write-Host "Waiting for services to be healthy (15s)..." -ForegroundColor Cyan
Start-Sleep -Seconds 15

# Database generation and migration
Write-Host "Running database generate and migrate..." -ForegroundColor Cyan
pnpm db:generate
pnpm db:migrate

Write-Host "Setup completed successfully!" -ForegroundColor Green
