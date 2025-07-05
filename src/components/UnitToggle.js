import React from 'react';
import { motion } from 'framer-motion';
import '../styles/Weather.css';

const UnitToggle = ({ unit, toggleUnit }) => {
  return (
    <div className="unit-toggle">
      <button onClick={toggleUnit}>
        {unit === 'metric' ? 'Switch to °F' : 'Switch to °C'}
      </button>
    </div>
  );
};

export default UnitToggle;