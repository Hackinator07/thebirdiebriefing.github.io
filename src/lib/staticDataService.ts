/**
 * Static Data Service
 * 
 * Background service that automatically refreshes static tournament data
 * to keep it synchronized with the live API
 */

import { refreshStaticTournamentData, getStaticDataCacheInfo } from './staticTournamentData';

interface StaticDataServiceConfig {
  refreshInterval: number; // in milliseconds
  enabled: boolean;
  eventIds: string[];
}

const DEFAULT_CONFIG: StaticDataServiceConfig = {
  refreshInterval: 30 * 60 * 1000, // 30 minutes
  enabled: true,
  eventIds: ['401734786'] // Default event IDs to refresh
};

class StaticDataService {
  private config: StaticDataServiceConfig;
  private refreshTimer: NodeJS.Timeout | null = null;
  private isRunning = false;

  constructor(config: Partial<StaticDataServiceConfig> = {}) {
    this.config = { ...DEFAULT_CONFIG, ...config };
  }

  /**
   * Start the background refresh service
   */
  start(): void {
    if (this.isRunning || !this.config.enabled) {
      return;
    }

    console.log(`🚀 Starting static data service (refresh every ${this.config.refreshInterval / 60000} minutes)`);
    
    this.isRunning = true;
    this.scheduleNextRefresh();
  }

  /**
   * Stop the background refresh service
   */
  stop(): void {
    if (this.refreshTimer) {
      clearTimeout(this.refreshTimer);
      this.refreshTimer = null;
    }
    this.isRunning = false;
    console.log('🛑 Static data service stopped');
  }

  /**
   * Manually refresh all event data
   */
  async refreshAll(): Promise<void> {
    console.log('🔄 Manually refreshing all static tournament data...');
    
    const promises = this.config.eventIds.map(async (eventId) => {
      try {
        await refreshStaticTournamentData(eventId);
        console.log(`✅ Refreshed data for event ${eventId}`);
      } catch (error) {
        console.error(`❌ Failed to refresh data for event ${eventId}:`, error);
      }
    });

    await Promise.allSettled(promises);
  }

  /**
   * Update configuration
   */
  updateConfig(newConfig: Partial<StaticDataServiceConfig>): void {
    this.config = { ...this.config, ...newConfig };
    
    if (this.isRunning) {
      this.stop();
      this.start();
    }
  }

  /**
   * Get service status
   */
  getStatus() {
    return {
      isRunning: this.isRunning,
      config: this.config,
      cacheInfo: getStaticDataCacheInfo()
    };
  }

  private scheduleNextRefresh(): void {
    if (!this.isRunning) {
      return;
    }

    this.refreshTimer = setTimeout(async () => {
      try {
        await this.refreshAll();
      } catch (error) {
        console.error('Error during scheduled refresh:', error);
      } finally {
        this.scheduleNextRefresh();
      }
    }, this.config.refreshInterval);
  }
}

// Global service instance
const staticDataService = new StaticDataService();

// Auto-start service in browser environment
if (typeof window !== 'undefined') {
  // Start service after a delay to not interfere with initial page load
  setTimeout(() => {
    staticDataService.start();
  }, 10000); // 10 seconds delay
}

export default staticDataService;

// Export for manual control
export { StaticDataService };
export type { StaticDataServiceConfig };
