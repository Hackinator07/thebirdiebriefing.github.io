declare module '@analytics/google-analytics' {
  interface GoogleAnalyticsConfig {
    measurementIds: string[];
  }

  interface AnalyticsPluginBase {
    name: string;
    [key: string]: unknown;
  }

  const googleAnalytics: (config: GoogleAnalyticsConfig) => AnalyticsPluginBase;
  export default googleAnalytics;
}

declare module 'analytics' {
  interface AnalyticsPluginBase {
    name: string;
    [key: string]: unknown;
  }

  interface AnalyticsConfig {
    app: string;
    plugins?: AnalyticsPluginBase[];
  }

  interface AnalyticsInstance {
    page: (properties?: Record<string, unknown>) => void;
    track: (eventName: string, properties?: Record<string, unknown>) => void;
    identify: (userId: string, properties?: Record<string, unknown>) => void;
  }

  function Analytics(config: AnalyticsConfig): AnalyticsInstance;

  export default Analytics;
}
