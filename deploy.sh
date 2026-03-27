#!/bin/bash

# HTI Artwork Generator - Deployment Script
# Run this on the Proxmox LXC container to update the application

set -e

echo "======================================"
echo "HTI Artwork Generator - Deploy Script"
echo "======================================"
echo ""

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Configuration
APP_DIR="/opt/ArtGen"
REPO_URL="https://github.com/Kuechenfenster/ArtGen.git"

echo -e "${YELLOW}Step 1: Checking Docker installation...${NC}"
if ! command -v docker &> /dev/null; then
    echo -e "${RED}Error: Docker is not installed${NC}"
    exit 1
fi

if ! command -v docker compose &> /dev/null && ! command -v docker-compose &> /dev/null; then
    echo -e "${RED}Error: Docker Compose is not installed${NC}"
    exit 1
fi

echo -e "${GREEN}✓ Docker is installed${NC}"
echo ""

echo -e "${YELLOW}Step 2: Setting up application directory...${NC}"
mkdir -p $APP_DIR
cd $APP_DIR

if [ -d ".git" ]; then
    echo "Git repository exists, pulling latest changes..."
    git fetch origin main
    git reset --hard origin/main
    echo -e "${GREEN}✓ Updated to latest version${NC}"
else
    echo "Cloning repository..."
    git clone $REPO_URL .
    echo -e "${GREEN}✓ Repository cloned${NC}"
fi
echo ""

echo -e "${YELLOW}Step 3: Stopping existing containers...${NC}"
docker compose down
echo -e "${GREEN}✓ Containers stopped${NC}"
echo ""

echo -e "${YELLOW}Step 4: Building new images (this may take a few minutes)...${NC}"
docker compose build --no-cache
echo -e "${GREEN}✓ Build complete${NC}"
echo ""

echo -e "${YELLOW}Step 5: Starting services...${NC}"
docker compose up -d
echo -e "${GREEN}✓ Services started${NC}"
echo ""

echo -e "${YELLOW}Step 6: Checking service status...${NC}"
sleep 5
docker compose ps
echo ""

echo "======================================"
echo -e "${GREEN}Deployment Complete!${NC}"
echo "======================================"
echo ""
echo "Access the application:"
echo "  Frontend: http://localhost:3000"
echo "  API:      http://localhost:8080"
echo ""
echo "Useful commands:"
echo "  docker compose logs -f     # View logs"
echo "  docker compose ps          # Check status"
echo "  docker compose down        # Stop services"
echo ""
