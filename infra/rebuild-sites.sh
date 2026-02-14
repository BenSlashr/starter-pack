#!/usr/bin/env bash
set -euo pipefail

# /usr/local/bin/rebuild-sites.sh
# Called by systemd timer to rebuild the static site
#
# Install:
#   sudo cp rebuild-sites.sh /usr/local/bin/
#   sudo chmod +x /usr/local/bin/rebuild-sites.sh

LOG_TAG="rebuild-sites"

# TODO: Adjust paths for your project
PROJECT_DIR="/home/ubuntu/projects/my-site"
SITE_DIR="$PROJECT_DIR/site"

logger -t "$LOG_TAG" "Starting rebuild..."

cd "$SITE_DIR"

# Pull latest changes (if using git)
git pull origin main 2>/dev/null || true

# Install deps if needed
npm ci --production=false 2>/dev/null || npm install

# Build
if npm run build 2>&1 | logger -t "$LOG_TAG"; then
    logger -t "$LOG_TAG" "Build successful"
else
    logger -t "$LOG_TAG" "Build FAILED"
    exit 1
fi

logger -t "$LOG_TAG" "Rebuild complete"
