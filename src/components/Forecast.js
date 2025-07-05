import React from 'react';
import { WiDaySunny, WiRain, WiSnow, WiCloudy, WiThunderstorm, WiFog } from 'react-icons/wi';
import { motion } from 'framer-motion';
import '../styles/Weather.css';

const getWeatherIcon = (condition) => {
  if (condition.includes('clear')) return <WiDaySunny size={32} />;
  if (condition.includes('rain')) return <WiRain size={32} />;
  if (condition.includes('snow')) return <WiSnow size={32} />;
  if (condition.includes('cloud')) return <WiCloudy size={32} />;
  if (condition.includes('thunder')) return <WiThunderstorm size={32} />;
  if (condition.includes('fog') || condition.includes('mist')) return <WiFog size={32} />;
  return <WiDaySunny size={32} />;
};

const Forecast = ({ forecast, unit }) => {
  if (!forecast) return null;

  // Group forecasts by day
  const dailyForecasts = {};
  forecast.list.forEach(item => {
    const date = new Date(item.dt * 1000).toLocaleDateString();
    if (!dailyForecasts[date]) {
      dailyForecasts[date] = [];
    }
    dailyForecasts[date].push(item);
  });

  // Get one forecast per day (midday if available)
  const dailyData = Object.keys(dailyForecasts).map(date => {
    const dayForecasts = dailyForecasts[date];
    const middayForecast = dayForecasts.find(f => {
      const hours = new Date(f.dt * 1000).getHours();
      return hours >= 11 && hours <= 14;
    }) || dayForecasts[Math.floor(dayForecasts.length / 2)];
    
    return {
      date,
      forecast: middayForecast,
    };
  });

  return (
    <div className="forecast">
      <h3>5-Day Forecast</h3>
      <div className="forecast-items">
        {dailyData.slice(0, 5).map((day, index) => {
          const date = new Date(day.forecast.dt * 1000);
          const dayName = date.toLocaleDateString('en-US', { weekday: 'short' });
          const temp = Math.round(day.forecast.main.temp);
          const condition = day.forecast.weather[0].description.toLowerCase();
          const icon = getWeatherIcon(condition);

          return (
            <motion.div 
              key={index}
              className="forecast-item"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <p className="day">{dayName}</p>
              <div className="icon">{icon}</div>
              <p className="temp">{temp}°{unit === 'metric' ? 'C' : 'F'}</p>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};

export default Forecast;