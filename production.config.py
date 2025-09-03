"""
Production Configuration for Birdie Briefing LPGA API
"""
import os

class ProductionConfig:
    """Production configuration settings"""
    
    # Flask Configuration
    FLASK_ENV = 'production'
    DEBUG = False
    TESTING = False
    
    # Server Configuration
    HOST = os.environ.get('HOST', '0.0.0.0')
    PORT = int(os.environ.get('PORT', 8585))
    
    # Database Configuration
    SQLALCHEMY_DATABASE_URI = os.environ.get('DATABASE_URL', "sqlite:///espn_API.db?check_same_thread=False")
    SQLALCHEMY_TRACK_MODIFICATIONS = False
    SQLALCHEMY_POOL_SIZE = 50
    SQLALCHEMY_POOL_RECYCLE = 280
    SQLALCHEMY_POOL_TIMEOUT = 100
    
    # Performance Configuration
    MAX_THREADS = 20
    THREADS_PER_WORKER = 5
    
    # CORS Configuration
    ALLOWED_ORIGINS = [
        "https://thebirdiebriefing.github.io",
        "https://birdiebriefing.com", 
        "https://www.birdiebriefing.com"
    ]
    
    # Logging Configuration
    LOG_LEVEL = os.environ.get('LOG_LEVEL', 'INFO')
    LOG_FILE = os.environ.get('LOG_FILE', 'logs/app.log')
    
    # API Configuration
    ESPN_API_BASE_URL = "http://site.api.espn.com/apis/site/v2/sports/golf/lpga"
    MAX_CONCURRENT_REQUESTS = int(os.environ.get('MAX_CONCURRENT_REQUESTS', 10))
    REQUEST_TIMEOUT = int(os.environ.get('REQUEST_TIMEOUT', 30))

class DevelopmentConfig:
    """Development configuration settings"""
    
    # Flask Configuration
    FLASK_ENV = 'production'
    DEBUG = False
    TESTING = False
    
    # Server Configuration
    HOST = '0.0.0.0'
    PORT = 8585
    
    # Database Configuration
    SQLALCHEMY_DATABASE_URI = "sqlite:///espn_API.db?check_same_thread=False"
    SQLALCHEMY_TRACK_MODIFICATIONS = False
    SQLALCHEMY_POOL_SIZE = 250
    SQLALCHEMY_POOL_RECYCLE = 280
    SQLALCHEMY_POOL_TIMEOUT = 100
    
    # Performance Configuration
    MAX_THREADS = 50
    THREADS_PER_WORKER = 10
    
    # CORS Configuration
    ALLOWED_ORIGINS = [
        "http://localhost:3000",
        "http://127.0.0.1:3000",
        "http://localhost:3001",
        "http://10.0.1.104:3000",
        "http://10.0.1.104:3001",
        "http://10.0.1.104:3002"
    ]
    
    # Logging Configuration
    LOG_LEVEL = 'DEBUG'
    LOG_FILE = None
    
    # API Configuration
    ESPN_API_BASE_URL = "http://site.api.espn.com/apis/site/v2/sports/golf/lpga"
    MAX_CONCURRENT_REQUESTS = 50
    REQUEST_TIMEOUT = 30

# Configuration mapping
config = {
    'development': DevelopmentConfig,
    'production': ProductionConfig,
    'default': ProductionConfig
}
