# Setup and Run Script for Vue/Nuxt Learning Platform

Write-Host "Starting Environment Setup..." -ForegroundColor Cyan

# 1. Install dependencies
Write-Host "1/4 Installing dependencies..." -ForegroundColor Yellow
npm install

# 2. Cleanup and Delete existing database
Write-Host "2/4 Cleaning up build folders and database..." -ForegroundColor Yellow

$foldersToClean = @(".nuxt", ".output")
foreach ($folder in $foldersToClean) {
    if (Test-Path $folder) {
        Remove-Item $folder -Recurse -Force
        Write-Host "$folder deleted." -ForegroundColor Green
    }
}

if (Test-Path "data.db") {
    Remove-Item "data.db" -Force
    Write-Host "data.db deleted." -ForegroundColor Green
} else {
    Write-Host "No data.db found, skipping deletion." -ForegroundColor Gray
}

# 3. Push schema
Write-Host "3/4 Pushing database schema..." -ForegroundColor Yellow
npx drizzle-kit push:sqlite

# 4. Seed data
Write-Host "4/4 Seeding database..." -ForegroundColor Yellow
npm run db:seed

Write-Host "Setup Complete! Starting development server..." -ForegroundColor Green
Write-Host "----------------------------------------------------" -ForegroundColor Gray
npm run dev
