# Production Deployment Guide - Birdie Briefing LPGA API

This guide covers the production deployment of the Birdie Briefing LPGA API and frontend.

## 🚀 Quick Start

### 1. Backend Deployment (Flask API)

#### Option A: Direct Deployment
```bash
# Set production environment
export FLASK_ENV=production
export FLASK_DEBUG=false
export PORT=8585

# Install dependencies
pip install -r requirements.txt

# Run with Gunicorn
gunicorn --bind 0.0.0.0:8585 --workers 4 --worker-class gthread --threads 2 wsgi:app
```

#### Option B: Docker Deployment
```bash
# Build and run with Docker Compose
docker-compose up -d

# Or build and run individually
docker build -t birdie-briefing-lpga-api .
docker run -d -p 8585:8585 --name lpga-api birdie-briefing-lpga-api
```

#### Option C: Production Script
```bash
# Make executable and run
chmod +x deploy.sh
./deploy.sh
```

### 2. Frontend Deployment (Next.js)

#### Build for Production
```bash
# Install dependencies
npm install

# Build for production
npm run build:prod

# Start production server
npm run start:prod
```

#### Deploy to Vercel/Netlify
```bash
# The project is already configured for Vercel deployment
# Push to main branch to trigger automatic deployment
git push origin main
```

## 🔧 Configuration

### Environment Variables

#### Backend (.env or environment)
```bash
FLASK_ENV=production
FLASK_DEBUG=false
PORT=8585
HOST=0.0.0.0
DATABASE_URL=sqlite:///espn_API.db?check_same_thread=False
LOG_LEVEL=INFO
MAX_CONCURRENT_REQUESTS=10
REQUEST_TIMEOUT=30
```

#### Frontend (production.env)
```bash
NODE_ENV=production
NEXT_PUBLIC_API_BASE=https://your-api-domain.com
NEXT_PUBLIC_TRANSLATION_WIDGET_KEY=your_production_key
```

### Database Configuration

The application uses SQLite by default. For production, consider:
- PostgreSQL for better concurrency
- MySQL for enterprise environments
- Managed database services (AWS RDS, Google Cloud SQL)

Update `DATABASE_URL` in your environment variables.

## 🛡️ Security Considerations

### 1. CORS Configuration
- Production CORS is restricted to specific domains
- Update `ALLOWED_ORIGINS` in `production.config.py`

### 2. Rate Limiting
- Nginx configuration includes rate limiting
- API endpoints: 10 requests/second
- General endpoints: 30 requests/second

### 3. Security Headers
- X-Frame-Options: DENY
- X-Content-Type-Options: nosniff
- X-XSS-Protection: 1; mode=block
- Strict-Transport-Security: enabled

### 4. SSL/TLS
- Configure SSL certificates in Nginx
- Update paths in `nginx.conf`
- Enable HTTP/2 for better performance

## 📊 Monitoring & Logging

### Log Files
- Application logs: `logs/app.log`
- Access logs: `logs/access.log`
- Error logs: `logs/error.log`

### Health Checks
- Endpoint: `/health`
- Docker health checks enabled
- Nginx health monitoring

### Performance Monitoring
- Gunicorn worker metrics
- Database connection pooling
- Request/response timing

## 🔄 Updates & Maintenance

### Database Migrations
```bash
# Backup current database
cp instance/espn_API.db instance/espn_API_backup_$(date +%Y%m%d_%H%M%S).db

# Run migrations (if any)
python -c "from app import create_app; from db import db; app = create_app(); app.app_context().push(); db.create_all()"
```

### Application Updates
```bash
# Pull latest code
git pull origin main

# Restart services
docker-compose restart
# or
sudo systemctl restart your-service-name
```

### Data Refresh
```bash
# Refresh all tournaments
curl -X POST https://your-api-domain.com/refresh_all_tournaments

# Refresh specific tournament
curl -X POST https://your-api-domain.com/tournament/{espn_id}/refresh
```

## 🚨 Troubleshooting

### Common Issues

#### 1. Database Locked
```bash
# Check for running processes
ps aux | grep python

# Kill Flask processes if needed
pkill -f "python.*app.py"
```

#### 2. Port Already in Use
```bash
# Check port usage
netstat -tulpn | grep :8585

# Kill process using port
sudo kill -9 <PID>
```

#### 3. CORS Issues
- Verify `ALLOWED_ORIGINS` configuration
- Check frontend `NEXT_PUBLIC_API_BASE` setting
- Ensure HTTPS/HTTP protocol matches

#### 4. Memory Issues
- Reduce `MAX_THREADS` and `THREADS_PER_WORKER`
- Monitor database connection pool size
- Check for memory leaks in long-running processes

### Log Analysis
```bash
# View real-time logs
tail -f logs/app.log

# Search for errors
grep "ERROR" logs/app.log

# Monitor API requests
grep "INFO" logs/app.log | grep "Processing"
```

## 📈 Performance Optimization

### 1. Database
- Enable database indexing
- Optimize queries
- Consider connection pooling

### 2. Caching
- Implement Redis for session storage
- Cache ESPN API responses
- Use CDN for static assets

### 3. Load Balancing
- Multiple Gunicorn workers
- Nginx upstream configuration
- Health checks and failover

## 🔐 SSL Certificate Setup

### Let's Encrypt (Free)
```bash
# Install certbot
sudo apt-get install certbot

# Generate certificate
sudo certbot certonly --standalone -d your-domain.com

# Update Nginx configuration with certificate paths
```

### Self-Signed (Development)
```bash
# Generate self-signed certificate
openssl req -x509 -nodes -days 365 -newkey rsa:2048 \
  -keyout ssl/key.pem -out ssl/cert.pem
```

## 📋 Deployment Checklist

- [ ] Environment variables configured
- [ ] Database initialized and backed up
- [ ] SSL certificates installed
- [ ] Firewall rules configured
- [ ] Monitoring and logging enabled
- [ ] Health checks passing
- [ ] CORS origins updated
- [ ] Rate limiting configured
- [ ] Security headers enabled
- [ ] Backup procedures tested
- [ ] Rollback plan prepared

## 🆘 Support

For production issues:
1. Check application logs
2. Verify environment configuration
3. Test API endpoints
4. Monitor system resources
5. Review recent changes

## 📚 Additional Resources

- [Flask Production Deployment](https://flask.palletsprojects.com/en/2.3.x/deploying/)
- [Gunicorn Configuration](https://docs.gunicorn.org/en/stable/configure.html)
- [Nginx Best Practices](https://nginx.org/en/docs/)
- [Docker Production Guidelines](https://docs.docker.com/config/containers/multi-service_container/)
