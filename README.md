# Global Weather App - Real-Time Weather Tracking

## Overview
This is a fully-featured weather application built with React that provides real-time weather data for locations worldwide. The app automatically detects the user's current location and displays detailed weather information, including temperature, humidity, wind speed, and atmospheric conditions. It offers a comprehensive solution for weather tracking with several advanced features.

## Key Features
- **Real-Time Weather Data**: Fetches current weather conditions and forecasts from the OpenWeatherMap API
- **Automatic Location Detection**: Uses browser geolocation to show weather for the user's current position
- **Temperature Unit Conversion**: Toggle between Celsius and Fahrenheit with one click
- **Favorite Locations**: Save frequently accessed locations using local storage
- **Interactive Weather Maps**: Visualize locations with React-Leaflet integration
- **Air Quality Index**: Displays detailed pollution data including PM2.5 and NO₂ levels
- **Offline Support**: Progressive Web App functionality caches data for offline use
- **Dynamic Animations**: Weather-appropriate background animations enhance user experience

## Technical Implementation

### Core Technologies
- **React**: JavaScript library for building user interfaces
- **Axios**: HTTP client for API requests
- **React-Geolocated**: Handles location detection
- **React-Leaflet**: Provides interactive map functionality
- **Framer Motion**: Powers smooth animations
- **Local Storage**: Stores favorite locations persistently

### API Integration
The app uses the OpenWeatherMap API to fetch:
- Current weather data (/weather endpoint)
- 5-day weather forecast (/forecast endpoint)
- Air quality information (/air_pollution endpoint)

### Key Functionality
1. **Location Handling**
   - Automatically detects user location via browser geolocation
   - Falls back to default location (New York) if geolocation is denied
   - Allows manual city searches

2. **Data Management**
   - Fetches and displays current weather conditions
   - Shows 5-day forecast with temperature trends
   - Presents detailed air quality metrics

3. **User Preferences**
   - Toggle between temperature units (Celsius/Fahrenheit)
   - Save and manage favorite locations
   - Persistent settings using local storage

4. **Progressive Web App Features**
   - Service worker caches API responses
   - manifest.json enables installable app functionality
   - Works offline after initial load

## Project Structure
```
/src
  /components
    CurrentWeather.js
    Forecast.js
    Map.js
    AirQuality.js
    Favorites.js
    UnitToggle.js
    BackgroundAnimation.js
  /styles
    App.css
    Weather.css
  /utils
    api.js
    storage.js
  App.js
  serviceWorker.js
  index.js
```

## Setup Instructions
1. Clone the repository
2. Install dependencies: `npm install`
3. Create a `.env` file with your OpenWeatherMap API key:
   ```
   REACT_APP_OPENWEATHER_API_KEY=your_api_key_here
   ```
4. Run the development server: `npm start`

## Future Enhancements
- Dark mode toggle for better night viewing
- Weather alert notifications
- Historical weather data comparison
- User account system for syncing favorites across devices

## Why This Project Matters
This application demonstrates:
- Modern React development practices
- API integration and data handling
- State management with hooks
- Progressive Web App implementation
- Responsive UI design principles

It serves as an excellent portfolio piece showcasing full-stack capabilities with a focus on front-end development.