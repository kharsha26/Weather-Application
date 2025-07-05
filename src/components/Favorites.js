import React from 'react';
import { motion } from 'framer-motion';
import { WiDaySunny, WiRain, WiSnow, WiCloudy } from 'react-icons/wi';
import '../styles/Weather.css';

const getWeatherIcon = (condition) => {
  if (condition.includes('clear')) return <WiDaySunny size={24} />;
  if (condition.includes('rain')) return <WiRain size={24} />;
  if (condition.includes('snow')) return <WiSnow size={24} />;
  return <WiCloudy size={24} />;
};

const Favorites = ({ favorites, onSelectFavorite, currentLocationId, unit }) => {
  if (favorites.length === 0) return null;

  return (
    <div className="favorites">
      <h3>Favorite Locations</h3>
      <div className="favorites-list">
        {favorites.map((fav, index) => {
          const isCurrent = fav.id === currentLocationId;
          const condition = fav.weather ? fav.weather[0].description.toLowerCase() : 'clear';
          const icon = getWeatherIcon(condition);
          const temp = fav.main ? Math.round(fav.main.temp) : '--';

          return (
            <motion.div
              key={fav.id}
              className={`favorite-item ${isCurrent ? 'current' : ''}`}
              onClick={() => !isCurrent && onSelectFavorite(fav)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <div className="fav-icon">{icon}</div>
              <div className="fav-info">
                <p className="fav-name">{fav.name}, {fav.country}</p>
                <p className="fav-temp">{temp}°{unit === 'metric' ? 'C' : 'F'}</p>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};

export default Favorites;