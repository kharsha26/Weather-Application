import React from 'react';
import { motion } from 'framer-motion';
import '../styles/Weather.css';

const getAqiLevel = (aqi) => {
  if (aqi <= 50) return { level: 'Good', color: 'green', description: 'Air quality is satisfactory.' };
  if (aqi <= 100) return { level: 'Moderate', color: 'yellow', description: 'Acceptable quality.' };
  if (aqi <= 150) return { level: 'Unhealthy for Sensitive Groups', color: 'orange', description: 'Possible health effects.' };
  if (aqi <= 200) return { level: 'Unhealthy', color: 'red', description: 'Health effects possible.' };
  if (aqi <= 300) return { level: 'Very Unhealthy', color: 'purple', description: 'Health alert.' };
  return { level: 'Hazardous', color: 'maroon', description: 'Emergency conditions.' };
};

const AirQuality = ({ data }) => {
  if (!data || !data.list || data.list.length === 0) return null;

  const aqi = data.list[0].main.aqi;
  const { level, color, description } = getAqiLevel(aqi);

  return (
    <motion.div 
      className="air-quality"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.3 }}
    >
      <h3>Air Quality Index</h3>
      <div className="aqi-value" style={{ backgroundColor: color }}>
        {aqi}
      </div>
      <p className="aqi-level">{level}</p>
      <p className="aqi-description">{description}</p>
      <div className="aqi-details">
        <p>PM2.5: {data.list[0].components.pm2_5} µg/m³</p>
        <p>PM10: {data.list[0].components.pm10} µg/m³</p>
        <p>NO₂: {data.list[0].components.no2} µg/m³</p>
      </div>
    </motion.div>
  );
};

export default AirQuality;