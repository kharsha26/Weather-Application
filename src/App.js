import React, { useState, useEffect } from 'react';
import { getCurrentWeather, getForecast, getAirQuality, getWeatherByCity } from './utils/api';
import { getFavorites, addFavorite, removeFavorite, isFavorite } from './utils/storage';
import { useGeolocated } from 'react-geolocated';
import CurrentWeather from './components/CurrentWeather';
import Forecast from './components/Forecast';
import Map from './components/Map';
import AirQuality from './components/AirQuality';
import Favorites from './components/Favorites';
import UnitToggle from './components/UnitToggle';
import BackgroundAnimation from './components/BackgroundAnimation';
import './styles/App.css';
import './styles/Weather.css';

const App = () => {
  const { coords, isGeolocationAvailable, isGeolocationEnabled } = useGeolocated({
    positionOptions: {
      enableHighAccuracy: false,
    },
    userDecisionTimeout: 5000,
  });

  const [weather, setWeather] = useState(null);
  const [forecast, setForecast] = useState(null);
  const [airQuality, setAirQuality] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [unit, setUnit] = useState('metric');
  const [favorites, setFavorites] = useState(getFavorites());
  const [selectedLocation, setSelectedLocation] = useState(null);

  useEffect(() => {
    if (coords) {
      fetchWeatherData(coords.latitude, coords.longitude);
    } else if (isGeolocationAvailable && !isGeolocationEnabled) {
      // Default to a popular location if geolocation is not enabled
      fetchWeatherData(40.7128, -74.0060); // New York
    }
  }, [coords, isGeolocationAvailable, isGeolocationEnabled, unit]);

  const fetchWeatherData = async (lat, lon) => {
    try {
      setLoading(true);
      const [current, forecastData, aqi] = await Promise.all([
        getCurrentWeather(lat, lon, unit),
        getForecast(lat, lon, unit),
        getAirQuality(lat, lon),
      ]);
      setWeather(current);
      setForecast(forecastData);
      setAirQuality(aqi);
      setSelectedLocation({
        id: current.id,
        name: current.name,
        country: current.sys.country,
        coord: current.coord,
      });
      setError(null);
    } catch (err) {
      setError('Failed to fetch weather data. Please try again.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = async (city) => {
    try {
      const data = await getWeatherByCity(city, unit);
      fetchWeatherData(data.coord.lat, data.coord.lon);
    } catch (err) {
      setError('City not found. Please try another location.');
    }
  };

  const toggleFavorite = () => {
    if (!selectedLocation) return;
    
    if (isFavorite(selectedLocation.id)) {
      removeFavorite(selectedLocation.id);
    } else {
      addFavorite(selectedLocation);
    }
    setFavorites(getFavorites());
  };

  const loadFavorite = (fav) => {
    fetchWeatherData(fav.coord.lat, fav.coord.lon);
  };

  const toggleUnit = () => {
    setUnit(unit === 'metric' ? 'imperial' : 'metric');
  };

  const isFavoriteLocation = selectedLocation ? isFavorite(selectedLocation.id) : false;

  return (
    <div className="app">
      <BackgroundAnimation weather={weather} />
      
      <div className="content">
        <header className="header">
          <h1>Global Weather</h1>
          <UnitToggle unit={unit} toggleUnit={toggleUnit} />
        </header>

        <div className="search-container">
          <input
            type="text"
            placeholder="Search for a city..."
            onKeyPress={(e) => {
              if (e.key === 'Enter') handleSearch(e.target.value);
            }}
          />
        </div>

        {error && <div className="error">{error}</div>}

        {loading ? (
          <div className="loading">Loading weather data...</div>
        ) : (
          <>
            {weather && (
              <>
                <CurrentWeather 
                  weather={weather} 
                  unit={unit} 
                  isFavorite={isFavoriteLocation}
                  onToggleFavorite={toggleFavorite}
                />
                <Forecast forecast={forecast} unit={unit} />
                <div className="additional-data">
                  <Map lat={weather.coord.lat} lon={weather.coord.lon} />
                  <AirQuality data={airQuality} />
                </div>
              </>
            )}
          </>
        )}

        <Favorites 
          favorites={favorites} 
          onSelectFavorite={loadFavorite}
          currentLocationId={selectedLocation?.id}
          unit={unit}
        />
      </div>
    </div>
  );
};

export default App;