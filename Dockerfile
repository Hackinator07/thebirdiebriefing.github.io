# Production Dockerfile for Birdie Briefing LPGA API
FROM python:3.11-slim

# Set environment variables
ENV FLASK_ENV=production
ENV FLASK_DEBUG=false
ENV PYTHONUNBUFFERED=1
ENV PYTHONDONTWRITEBYTECODE=1

# Set work directory
WORKDIR /app

# Install system dependencies
RUN apt-get update && apt-get install -y \
    gcc \
    && rm -rf /var/lib/apt/lists/*

# Copy requirements and install Python dependencies
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Copy application code
COPY . .

# Create logs directory
RUN mkdir -p logs

# Create non-root user
RUN adduser --disabled-password --gecos '' appuser
RUN chown -R appuser:appuser /app
USER appuser

# Expose port
EXPOSE 8585

# Health check
HEALTHCHECK --interval=30s --timeout=30s --start-period=5s --retries=3 \
    CMD curl -f http://localhost:8585/ || exit 1

# Start the application
CMD ["gunicorn", "--bind", "0.0.0.0:8585", "--workers", "4", "--worker-class", "gthread", "--threads", "2", "--worker-connections", "1000", "--max-requests", "1000", "--max-requests-jitter", "100", "--timeout", "30", "--keep-alive", "2", "--log-level", "info", "--access-logfile", "logs/access.log", "--error-logfile", "logs/error.log", "wsgi:app"]
