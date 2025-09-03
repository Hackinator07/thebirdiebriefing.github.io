#!/bin/bash

# Production Deployment Script for Birdie Briefing LPGA API
# This script sets up the production environment and starts the application

echo "🚀 Starting production deployment for Birdie Briefing LPGA API..."

# Set production environment
export FLASK_ENV=production
export FLASK_DEBUG=false
export PORT=${PORT:-8585}
export HOST=${HOST:-0.0.0.0}

# Create logs directory if it doesn't exist
mkdir -p logs

# Install production dependencies
echo "📦 Installing production dependencies..."
pip install -r requirements.txt

# Check if database exists, create if not
if [ ! -f "instance/espn_API.db" ]; then
    echo "🗄️ Initializing database..."
    python -c "from app import create_app; from db import db; app = create_app(); app.app_context().push(); db.create_all()"
fi

# Start the application with Gunicorn
echo "🌐 Starting production server on port $PORT..."
gunicorn --bind $HOST:$PORT --workers 4 --worker-class gthread --threads 2 --worker-connections 1000 --max-requests 1000 --max-requests-jitter 100 --timeout 30 --keep-alive 2 --log-level info --access-logfile logs/access.log --error-logfile logs/error.log wsgi:app
