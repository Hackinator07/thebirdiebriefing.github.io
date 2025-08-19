#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

// Cache configuration
const cacheConfig = {
  // Static assets - 1 year cache
  staticAssets: {
    patterns: ['.js', '.css', '.png', '.jpg', '.jpeg', '.gif', '.svg', '.ico', '.webp', '.woff', '.woff2', '.ttf', '.eot'],
    maxAge: 31536000,
    immutable: true
  },
  // Videos - 1 year cache
  videos: {
    patterns: ['.mp4', '.webm', '.ogg'],
    maxAge: 31536000,
    immutable: true
  },
  // HTML pages - 1 hour cache
  html: {
    patterns: ['.html'],
    maxAge: 3600,
    mustRevalidate: true
  },
  // JSON data - 30 minutes cache
  json: {
    patterns: ['.json'],
    maxAge: 1800,
    mustRevalidate: true
  },
  // Default - 24 hours cache
  default: {
    maxAge: 86400,
    mustRevalidate: true
  }
};

// Security headers
const securityHeaders = {
  'X-Content-Type-Options': 'nosniff',
  'X-Frame-Options': 'DENY',
  'X-XSS-Protection': '1; mode=block',
  'Referrer-Policy': 'strict-origin-when-cross-origin'
};

function generateHeadersFile(outDir = 'out') {
  const headers = [];
  
  // Add cache headers for different file types
  Object.entries(cacheConfig).forEach(([type, config]) => {
    if (config.patterns) {
      config.patterns.forEach(pattern => {
        headers.push(`/*${pattern}`);
        const cacheValue = `public, max-age=${config.maxAge}${config.immutable ? ', immutable' : ''}${config.mustRevalidate ? ', must-revalidate' : ''}`;
        headers.push(`  Cache-Control: ${cacheValue}`);
        headers.push('');
      });
    }
  });

  // Add directory-specific cache rules
  headers.push('# Cache optimized images (1 year)');
  headers.push('/optimized/*');
  headers.push('  Cache-Control: public, max-age=31536000, immutable');
  headers.push('');

  headers.push('# Cache images directory (1 year)');
  headers.push('/images/*');
  headers.push('  Cache-Control: public, max-age=31536000, immutable');
  headers.push('');

  headers.push('# Cache videos directory (1 year)');
  headers.push('/videos/*');
  headers.push('  Cache-Control: public, max-age=31536000, immutable');
  headers.push('');

  // Add security headers
  headers.push('# Security headers');
  headers.push('/*');
  Object.entries(securityHeaders).forEach(([key, value]) => {
    headers.push(`  ${key}: ${value}`);
  });

  // Write headers file
  const headersPath = path.join(outDir, '_headers');
  fs.writeFileSync(headersPath, headers.join('\n'));
  
  console.log(`✅ Cache headers written to ${headersPath}`);
}

// Run if called directly
if (require.main === module) {
  const outDir = process.argv[2] || 'out';
  generateHeadersFile(outDir);
}

module.exports = { generateHeadersFile };
