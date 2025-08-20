#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

/**
 * Deployment-time maintenance system
 * This script runs after the Next.js build and conditionally replaces
 * the built site with a maintenance page based on environment variables
 * or the presence of a maintenance flag file.
 */

const OUT_DIR = path.join(process.cwd(), 'out');
const MAINTENANCE_HTML = path.join(process.cwd(), 'maintenance.html');
const MAINTENANCE_FLAG = path.join(process.cwd(), '.maintenance-deploy');

function log(message) {
    console.log(`[Deployment Maintenance] ${message}`);
}

function createMaintenanceIndex() {
    const maintenanceContent = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>The Birdie Briefing - Maintenance</title>
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;700;900&family=Poppins:wght@300;400;500;600;700&display=swap" rel="stylesheet">
    
    <style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }

        body {
            font-family: 'Poppins', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
            background: #8B5A8C;
            min-height: 100vh;
            margin: 0;
            padding: 0;
        }

        .hero-section {
            position: relative;
            overflow: hidden;
            min-height: 100vh;
            display: flex;
            align-items: center;
            justify-content: center;
            color: white;
        }

        .video-background {
            position: absolute;
            inset: 0;
            z-index: 0;
        }

        .video-background video {
            width: 100%;
            height: 100%;
            object-fit: cover;
        }

        .video-overlay {
            position: absolute;
            inset: 0;
            background: rgba(0, 0, 0, 0.5);
        }

        .content-overlay {
            position: relative;
            z-index: 10;
            max-width: 1200px;
            margin: 0 auto;
            padding: 2rem 1.5rem;
        }

        .maintenance-container {
            text-align: center;
            max-width: 600px;
            padding: 2rem;
            background: white;
            border-radius: 20px;
            border: 1px solid rgba(255, 255, 255, 0.2);
            margin: 0 auto;
            box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
        }

        .logo {
            display: flex;
            align-items: baseline;
            justify-content: center;
            gap: 0.5rem;
            margin-bottom: 2rem;
        }

        .logo h1 {
            font-family: 'Playfair Display', serif;
            font-size: 3rem;
            font-weight: 700;
            margin: 0;
        }

        .logo h1 .birdie {
            color: #8B5A8C;
        }

        .logo h1 .briefing {
            color: #5F6242;
        }

        .status {
            font-size: 1.5rem;
            margin-bottom: 1.5rem;
            color: #8B5A8C;
        }

        .message {
            font-size: 1.1rem;
            line-height: 1.6;
            margin-bottom: 2rem;
            color: #374151;
        }

        .golf-animation {
            width: 100%;
            height: 40px;
            position: relative;
            margin: 2rem 0;
            background: linear-gradient(to bottom, #166534 0%, #14532d 50%, #052e16 100%);
            border-radius: 8px;
            overflow: hidden;
            box-shadow: inset 0 2px 4px rgba(0, 0, 0, 0.2);
        }

        .golf-course {
            position: absolute;
            bottom: 0;
            width: 100%;
            height: 100%;
            background: repeating-linear-gradient(
                90deg,
                #166534 0px,
                #14532d 1px,
                #166534 2px
            );
        }

        .golf-hole {
            position: absolute;
            right: 10px;
            bottom: 8px;
            width: 24px;
            height: 24px;
            background: radial-gradient(ellipse 100% 60%, #000 0%, #333 50%, #000 100%);
            border-radius: 50%;
            border: 2px solid #052e16;
            box-shadow: inset 0 2px 4px rgba(0, 0, 0, 0.7);
            transform: perspective(100px) rotateX(60deg);
        }

        .golf-flag {
            position: absolute;
            right: 12px;
            bottom: 26px;
            width: 2px;
            height: 14px;
            background: #fbbf24;
            box-shadow: 1px 0 2px rgba(0, 0, 0, 0.3);
        }

        .golf-flag::before {
            content: '';
            position: absolute;
            top: 0;
            right: 0;
            width: 8px;
            height: 6px;
            background: #ef4444;
            border: 1px solid #dc2626;
            box-shadow: 1px 1px 2px rgba(0, 0, 0, 0.3);
        }

        .golf-ball {
            position: absolute;
            bottom: 10px;
            width: 18px;
            height: 18px;
            background: radial-gradient(circle at 30% 30%, #ffffff, #f3f4f6, #e5e7eb);
            border-radius: 50%;
            box-shadow: 2px 2px 6px rgba(0, 0, 0, 0.4);
            animation: golfBallRoll 3s ease-in-out infinite;
        }

        .golf-ball::before {
            content: '';
            position: absolute;
            top: 2px;
            left: 2px;
            right: 2px;
            bottom: 2px;
            background: 
                radial-gradient(circle at 25% 25%, transparent 1px, #e5e7eb 1px, transparent 2px),
                radial-gradient(circle at 75% 25%, transparent 1px, #e5e7eb 1px, transparent 2px),
                radial-gradient(circle at 25% 75%, transparent 1px, #e5e7eb 1px, transparent 2px),
                radial-gradient(circle at 75% 75%, transparent 1px, #e5e7eb 1px, transparent 2px),
                radial-gradient(circle at 50% 50%, transparent 1px, #e5e7eb 1px, transparent 2px);
            background-size: 8px 8px;
            border-radius: 50%;
        }

        @keyframes golfBallRoll {
            0% {
                left: -25px;
                transform: rotate(0deg);
            }
            70% {
                left: calc(100% - 55px);
                transform: rotate(1080deg);
            }
            85% {
                left: calc(100% - 42px);
                transform: rotate(1200deg);
            }
            100% {
                left: calc(100% - 38px);
                transform: rotate(1260deg);
                opacity: 0.3;
            }
        }

        .social-links {
            display: flex;
            justify-content: center;
            gap: 1rem;
            margin-top: 2rem;
            flex-wrap: wrap;
        }

        .social-link {
            display: inline-flex;
            align-items: center;
            gap: 0.5rem;
            background: #8B5A8C;
            border: 1px solid #8B5A8C;
            border-radius: 8px;
            padding: 0.75rem 1rem;
            color: white;
            text-decoration: none;
            font-weight: 500;
            font-size: 0.9rem;
            transition: all 0.3s ease;
        }

        .social-link:hover {
            background: #7a4f7b;
            border-color: #7a4f7b;
            transform: translateY(-2px);
            box-shadow: 0 4px 12px rgba(139, 90, 140, 0.3);
        }

        .refresh-notice {
            font-size: 0.9rem;
            color: #6b7280;
            margin-top: 2rem;
        }

        @media (max-width: 768px) {
            .logo h1 {
                font-size: 2.5rem;
            }

            .social-links {
                flex-direction: column;
                align-items: center;
            }

            .social-link {
                width: 100%;
                max-width: 250px;
                justify-content: center;
            }
        }
    </style>
</head>
<body>
    <section class="hero-section">
        <!-- Video Background -->
        <div class="video-background">
            <video autoplay muted loop playsinline>
                <source src="./videos/golf-background.mp4" type="video/mp4">
            </video>
            <div class="video-overlay"></div>
        </div>

        <!-- Content Overlay -->
        <div class="content-overlay">
            <div class="maintenance-container">
                <div class="logo">
                    <h1><span class="birdie">The Birdie</span> <span class="briefing">Briefing</span></h1>
                </div>

                <div class="status">
                    🔧 Site Deployment in Progress
                </div>

                <div class="message">
                    We're currently deploying updates to improve your experience.
                    The site will be back online shortly with the latest content and features.
                </div>

                <div class="golf-animation">
                    <div class="golf-course"></div>
                    <div class="golf-hole"></div>
                    <div class="golf-flag"></div>
                    <div class="golf-ball"></div>
                </div>

                <div class="message">
                    Follow us on social media for the latest LPGA news and updates while we finish deploying.
                </div>

                <div class="social-links">
                    <a href="https://www.instagram.com/birdiebriefing/" class="social-link" target="_blank" rel="noopener">
                        📸 Instagram
                    </a>
                    <a href="https://bsky.app/profile/birdiebriefing.bsky.social" class="social-link" target="_blank" rel="noopener">
                        🔵 Bluesky
                    </a>
                    <a href="https://www.youtube.com/channel/UCW2vyHWE3bMfum9FPq-8xGw" class="social-link" target="_blank" rel="noopener">
                        📺 YouTube
                    </a>
                    <a href="https://open.spotify.com/show/3ZwjiD6IZeHqCNrCwBdrP2" class="social-link" target="_blank" rel="noopener">
                        🎵 Podcast
                    </a>
                </div>

                <div class="refresh-notice">
                    This page will automatically refresh every 15 seconds to check if deployment is complete.
                </div>
            </div>
        </div>
    </section>

    <script>
        // Auto-refresh every 15 seconds during deployment
        setTimeout(() => {
            window.location.reload();
        }, 15000);

        // Handle video loading errors
        document.addEventListener('DOMContentLoaded', function() {
            const video = document.querySelector('video');
            if (video) {
                video.addEventListener('error', function() {
                    video.style.display = 'none';
                });
            }
        });
    </script>
</body>
</html>`;

    return maintenanceContent;
}

function shouldShowMaintenance() {
    // Check for auto-deployment maintenance mode
    if (process.env.AUTO_DEPLOY_MAINTENANCE === 'true' || process.env.AUTO_DEPLOY_MAINTENANCE === '1') {
        log('Auto deployment maintenance is enabled - showing maintenance for all deployments');
        return true;
    }

    // Check for deployment maintenance flag
    if (fs.existsSync(MAINTENANCE_FLAG)) {
        log('Deployment maintenance flag found');
        return true;
    }

    // Check environment variable
    if (process.env.MAINTENANCE_MODE === 'true' || process.env.MAINTENANCE_MODE === '1') {
        log('MAINTENANCE_MODE environment variable is set');
        return true;
    }

    // Check for specific commit message patterns
    const commitMessage = process.env.GITHUB_EVENT_HEAD_COMMIT_MESSAGE || '';
    if (commitMessage.includes('[maintenance]') || commitMessage.includes('[deploy-maintenance]')) {
        log('Maintenance mode triggered by commit message');
        return true;
    }

    // Check for skip maintenance patterns
    if (commitMessage.includes('[skip-maintenance]') || commitMessage.includes('[no-maintenance]')) {
        log('Maintenance mode skipped by commit message');
        return false;
    }

    return false;
}

function replaceWithMaintenance() {
    try {
        if (!fs.existsSync(OUT_DIR)) {
            log('ERROR: Output directory does not exist. Run build first.');
            process.exit(1);
        }

        const indexPath = path.join(OUT_DIR, 'index.html');
        const maintenanceContent = createMaintenanceIndex();

        // Backup original index.html
        const backupPath = path.join(OUT_DIR, 'index.html.backup');
        if (fs.existsSync(indexPath)) {
            fs.copyFileSync(indexPath, backupPath);
            log('Backed up original index.html');
        }

        // Replace with maintenance page
        fs.writeFileSync(indexPath, maintenanceContent, 'utf8');
        log('✅ Replaced index.html with maintenance page');

        // Create a marker file
        const markerPath = path.join(OUT_DIR, '.maintenance-active');
        fs.writeFileSync(markerPath, new Date().toISOString(), 'utf8');
        log('Created maintenance marker file');

        return true;
    } catch (error) {
        log(`ERROR: Failed to replace with maintenance page: ${error.message}`);
        return false;
    }
}

function restoreFromMaintenance() {
    try {
        const indexPath = path.join(OUT_DIR, 'index.html');
        const backupPath = path.join(OUT_DIR, 'index.html.backup');
        const markerPath = path.join(OUT_DIR, '.maintenance-active');

        if (fs.existsSync(backupPath)) {
            fs.copyFileSync(backupPath, indexPath);
            fs.unlinkSync(backupPath);
            log('✅ Restored original index.html from backup');
        }

        if (fs.existsSync(markerPath)) {
            fs.unlinkSync(markerPath);
            log('Removed maintenance marker file');
        }

        // Remove deployment flag if it exists
        if (fs.existsSync(MAINTENANCE_FLAG)) {
            fs.unlinkSync(MAINTENANCE_FLAG);
            log('Removed deployment maintenance flag');
        }

        return true;
    } catch (error) {
        log(`ERROR: Failed to restore from maintenance: ${error.message}`);
        return false;
    }
}

function main() {
    const command = process.argv[2];

    switch (command) {
        case 'check':
            if (shouldShowMaintenance()) {
                log('✅ Maintenance mode should be active');
                process.exit(0);
            } else {
                log('❌ Normal mode should be active');
                process.exit(1);
            }
            break;

        case 'enable':
            log('Enabling deployment maintenance mode...');
            fs.writeFileSync(MAINTENANCE_FLAG, new Date().toISOString(), 'utf8');
            if (replaceWithMaintenance()) {
                log('✅ Deployment maintenance mode enabled');
                process.exit(0);
            } else {
                process.exit(1);
            }
            break;

        case 'disable':
            log('Disabling deployment maintenance mode...');
            if (restoreFromMaintenance()) {
                log('✅ Deployment maintenance mode disabled');
                process.exit(0);
            } else {
                process.exit(1);
            }
            break;

        case 'apply':
            if (shouldShowMaintenance()) {
                log('Applying maintenance mode to deployment...');
                if (replaceWithMaintenance()) {
                    log('✅ Maintenance page will be deployed');
                    process.exit(0);
                } else {
                    process.exit(1);
                }
            } else {
                log('Normal deployment - no maintenance mode needed');
                process.exit(0);
            }
            break;

        default:
            console.log(`
Usage: node scripts/deployment-maintenance.js <command>

Commands:
  check     - Check if maintenance mode should be active
  enable    - Enable deployment maintenance mode
  disable   - Disable deployment maintenance mode  
  apply     - Apply maintenance mode if conditions are met (for CI/CD)

Environment Variables:
  AUTO_DEPLOY_MAINTENANCE=true  - Show maintenance for ALL deployments (GitHub repo settings)
  MAINTENANCE_MODE=true         - Force maintenance mode for specific deployment
  
Commit Message Triggers:
  [maintenance]           - Enable maintenance mode for this deployment
  [deploy-maintenance]    - Enable maintenance mode for this deployment
  [skip-maintenance]      - Skip maintenance even if auto-mode is enabled
  [no-maintenance]        - Skip maintenance even if auto-mode is enabled

Files:
  .maintenance-deploy     - Presence of this file enables maintenance mode

Auto-Deployment Maintenance:
  To show maintenance during ALL deployments:
  1. Go to GitHub repo → Settings → Environments → github-pages → Add variable
  2. Name: AUTO_DEPLOY_MAINTENANCE, Value: true
  3. All future deployments will show maintenance page during build/deploy

NPM Scripts:
  npm run maintenance:auto:enable    - Instructions to enable auto-maintenance
  npm run maintenance:auto:disable   - Instructions to disable auto-maintenance
            `);
            process.exit(0);
    }
}

if (require.main === module) {
    main();
}

module.exports = {
    shouldShowMaintenance,
    replaceWithMaintenance,
    restoreFromMaintenance
};
