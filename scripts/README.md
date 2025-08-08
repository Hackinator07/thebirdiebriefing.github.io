# LPGA Rankings Automation

This directory contains scripts for automatically fetching and updating LPGA Rolex World Rankings data.

## Files

- `fetch-rankings.js` - Node.js script that fetches rankings from the Rolex Rankings API
- `README.md` - This documentation file

## How it works

The system fetches data from the [Rolex Rankings API](https://www.rolexrankings.com/core/rankings/list) and saves it to `src/data/rankings.json`.

### Manual Update

To manually update the rankings:

```bash
node scripts/fetch-rankings.js
```

### Automated Updates

The rankings are automatically updated nightly via GitHub Actions (`.github/workflows/update-rankings.yml`).

**Schedule:** Every day at 2:00 AM UTC

**What it does:**
1. Fetches latest rankings from Rolex Rankings API
2. Saves data to `src/data/rankings.json`
3. Commits and pushes changes to the repository

## Data Structure

The rankings data includes:

- **lastUpdated**: ISO timestamp of when data was fetched
- **week**: Information about the current ranking week
- **players**: Array of player objects with:
  - `id`: Player ID
  - `rank`: Current ranking position
  - `rankDelta`: Change from previous week (+/-)
  - `nameFirst`/`nameLast`: Player name
  - `fullName`: Combined first and last name
  - `countryCode`: 3-letter country code
  - `pointsAverage`: Average points per tournament
  - `pointsTotal`: Total points
  - `tournamentCount`: Number of tournaments played

## API Source

Data is sourced from the official Rolex Women's World Golf Rankings API:
- **URL**: https://www.rolexrankings.com/core/rankings/list
- **Format**: JSON
- **Update Frequency**: Weekly (typically Mondays)

## Error Handling

The script includes comprehensive error handling:
- Network request failures
- Invalid JSON responses
- File system errors
- Detailed logging for debugging

## Dependencies

- `axios` - HTTP client for API requests
- `fs` - File system operations (Node.js built-in)
- `path` - Path utilities (Node.js built-in)
