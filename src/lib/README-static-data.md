# Automated Static Tournament Data System

This system automatically captures and maintains static tournament data that perfectly matches the live API response, ensuring zero visual differences between static and live content.

## 🚀 How It Works

1. **Automatic Capture**: When the component loads, it captures the current API response
2. **Perfect Matching**: Static data is identical to live data - no visual changes
3. **Background Refresh**: Service automatically refreshes data every 30 minutes
4. **Persistent Cache**: Data is cached in localStorage for instant loading
5. **Progressive Enhancement**: Shows static content immediately, enhances with live data

## 📁 Files

- `staticTournamentData.ts` - Core data capture and caching logic
- `useStaticTournamentData.ts` - React hook for components
- `staticDataService.ts` - Background refresh service
- `staticDataUtils.ts` - Development utilities

## 🛠️ Usage

### In Components
```typescript
import { useStaticTournamentData } from '@/hooks/useStaticTournamentData';

function TournamentComponent({ eventId }) {
  const { tournamentData, weather, loading, error } = useStaticTournamentData(eventId);
  
  // Data is immediately available (static) and updates seamlessly (live)
  return <div>{tournamentData?.name}</div>;
}
```

### Development Utilities
```javascript
// In browser console (development only)
staticDataUtils.captureAndPreview("401734780");  // Capture fresh data
staticDataUtils.compare("401734780");            // Compare static vs live
staticDataUtils.refreshAll();                    // Force refresh all
staticDataUtils.getStatus();                     // Get cache status
staticDataUtils.reset();                         // Reset system
```

## ⚙️ Configuration

### Service Configuration
```typescript
import staticDataService from '@/lib/staticDataService';

staticDataService.updateConfig({
  refreshInterval: 30 * 60 * 1000, // 30 minutes
  enabled: true,
  eventIds: ['401734780', 'other-event-id']
});
```

### Cache Management
```typescript
import { clearStaticTournamentDataCache } from '@/lib/staticTournamentData';

// Clear all cached data
clearStaticTournamentDataCache();
```

## 🎯 Benefits

1. **Instant Loading**: Static content appears immediately
2. **Perfect Consistency**: No visual differences between static and live
3. **Automatic Updates**: Background service keeps data fresh
4. **Offline Support**: Cached data works without network
5. **Performance**: Reduces API calls and improves perceived speed

## 🔄 Data Flow

```
Page Load → Static Data (instant) → Background API Call → Live Data (seamless update)
```

## 🐛 Debugging

### Check Cache Status
```javascript
staticDataUtils.getStatus();
```

### Compare Data
```javascript
staticDataUtils.compare("401734780");
```

### Force Refresh
```javascript
staticDataUtils.refreshAll();
```

## 📊 Monitoring

The system logs all operations:
- ✅ Successful data capture
- 🔄 Background refreshes
- ❌ API failures
- 🧹 Cache operations

## 🔧 Customization

### Custom Refresh Interval
```typescript
staticDataService.updateConfig({
  refreshInterval: 15 * 60 * 1000 // 15 minutes
});
```

### Multiple Events
```typescript
staticDataService.updateConfig({
  eventIds: ['401734780', '401734781', '401734782']
});
```

### Disable Service
```typescript
staticDataService.updateConfig({
  enabled: false
});
```

## 🚨 Troubleshooting

### Data Not Updating
1. Check service status: `staticDataUtils.getStatus()`
2. Force refresh: `staticDataUtils.refreshAll()`
3. Check network connectivity
4. Verify API key is valid

### Cache Issues
1. Clear cache: `staticDataUtils.reset()`
2. Check localStorage quota
3. Verify event ID is correct

### Performance Issues
1. Reduce refresh interval
2. Limit number of tracked events
3. Check for memory leaks in console
