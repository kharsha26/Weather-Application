import React from 'react';
import { WiDaySunny, WiRain, WiSnow, WiCloudy, WiThunderstorm, WiFog } from 'react-icons/wi';
import { motion } from 'framer-motion';
import { FaHeart, FaRegHeart } from 'react-icons/fa';
import '../styles/Weather.css';

const getWeatherIcon = (condition) => {
  if (condition.includes('clear')) return <WiDaySunny size={64} />;
  if (condition.includes('rain')) return <WiRain size={64} />;
  if (condition.includes('snow')) return <WiSnow size={64} />;
  if (condition.includes('cloud')) return <WiCloudy size={64} />;
  if (condition.includes('thunder')) return <WiThunderstorm size={64} />;
  if (condition.includes('fog') || condition.includes('mist')) return <WiFog size={64} />;
  return <WiDaySunny size={64} />;
};

const CurrentWeather = ({ weather, unit, isFavorite, onToggleFavorite }) => {
  if (!weather) return null;

  const temp = Math.round(weather.main.temp);
  const feelsLike = Math.round(weather.main.feels_like);
  const condition = weather.weather[0].description.toLowerCase();
  const icon = getWeatherIcon(condition);

  return (
    <motion.div 
      className="current-weather"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="weather-header">
        <h2>
          {weather.name}, {weather.sys.country}
          <button onClick={onToggleFavorite} className="favorite-btn">
            {isFavorite ? <FaHeart color="red" /> : <FaRegHeart />}
          </button>
        </h2>
        <p className="condition">{weather.weather[0].main}</p>
      </div>

      <div className="weather-main">
        <div className="temperature">
          {icon}
          <span className="temp-value">{temp}°{unit === 'metric' ? 'C' : 'F'}</span>
        </div>
        <div className="weather-details">
          <p>Feels like: {feelsLike}°{unit === 'metric' ? 'C' : 'F'}</p>
          <p>Humidity: {weather.main.humidity}%</p>
          <p>Wind: {Math.round(weather.wind.speed)} {unit === 'metric' ? 'm/s' : 'mph'}</p>
          <p>Pressure: {weather.main.pressure} hPa</p>
        </div>
      </div>
    </motion.div>
  );
};

export default CurrentWeather;