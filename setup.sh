#!/bin/bash

# Setup and Run Script for Vue/Nuxt Learning Platform

echo -e "\033[0;36mStarting Environment Setup...\033[0m"

# 1. Install dependencies
echo -e "\033[0;33m1/4 Installing dependencies...\033[0m"
npm install

# 2. Environment Variables
if [ ! -f .env ]; then
    echo -e "\033[0;33mCreating .env file...\033[0m"
    echo "JWT_SECRET=supersecretkey" > .env
    echo -e "\033[0;32m.env created.\033[0m"
else
    echo -e "\033[0;37m.env already exists, skipping creation.\033[0m"
fi

# 3. Cleanup and Delete existing database
echo -e "\033[0;33m2/4 Cleaning up build folders and database...\033[0m"

folders=(".nuxt" ".output")
for folder in "${folders[@]}"; do
    if [ -d "$folder" ]; then
        rm -rf "$folder"
        echo -e "\033[0;32m$folder deleted.\033[0m"
    fi
done

if [ -f "data.db" ]; then
    rm -f "data.db"
    echo -e "\033[0;32mdata.db deleted.\033[0m"
else
    echo -e "\033[0;37mNo data.db found, skipping deletion.\033[0m"
fi

# 4. Push schema
echo -e "\033[0;33m3/4 Pushing database schema...\033[0m"
npm run db:push

# 5. Seed data
echo -e "\033[0;33m4/4 Seeding database...\033[0m"
npm run db:seed

echo -e "\033[0;32mSetup Complete! Starting development server...\033[0m"
echo -e "\033[0;37m----------------------------------------------------\033[0m"
npm run dev
