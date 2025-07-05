import React from 'react';
import { motion } from 'framer-motion';
import { WiDaySunny, WiRain, WiSnow, WiCloudy, WiThunderstorm, WiFog } from 'react-icons/wi';
import '../styles/Weather.css';

const BackgroundAnimation = ({ weather }) => {
  if (!weather) return null;

  const condition = weather.weather[0].main.toLowerCase();
  
  const getAnimationElements = () => {
    switch (condition) {
      case 'clear':
        return (
          <>
            <motion.div
              className="sun"
              animate={{
                rotate: 360,
              }}
              transition={{
                duration: 20,
                repeat: Infinity,
                ease: "linear"
              }}
            >
              <WiDaySunny size={120} />
            </motion.div>
            {[...Array(3)].map((_, i) => (
              <motion.div
                key={i}
                className="cloud"
                initial={{ x: Math.random() * 100 - 50, y: Math.random() * 100 - 50 }}
                animate={{
                  x: [0, 50, 0, -50, 0],
                  y: [0, 20, 0, -20, 0],
                }}
                transition={{
                  duration: 20 + Math.random() * 10,
                  repeat: Infinity,
                  repeatType: "reverse"
                }}
              >
                <WiCloudy size={60 + Math.random() * 40} />
              </motion.div>
            ))}
          </>
        );
      case 'rain':
        return (
          <>
            <div className="clouds">
              <WiCloudy size={150} />
              <WiCloudy size={120} style={{ marginLeft: '-40px' }} />
            </div>
            {[...Array(20)].map((_, i) => (
              <motion.div
                key={i}
                className="raindrop"
                initial={{ y: -10, x: Math.random() * 100 }}
                animate={{
                  y: [0, 100],
                  opacity: [1, 0],
                }}
                transition={{
                  duration: 1 + Math.random(),
                  repeat: Infinity,
                  delay: Math.random()
                }}
              />
            ))}
          </>
        );
      case 'snow':
        return (
          <>
            <div className="clouds">
              <WiCloudy size={150} />
              <WiCloudy size={120} style={{ marginLeft: '-40px' }} />
            </div>
            {[...Array(30)].map((_, i) => (
              <motion.div
                key={i}
                className="snowflake"
                initial={{ y: -10, x: Math.random() * 100, rotate: Math.random() * 360 }}
                animate={{
                  y: [0, 100],
                  rotate: 360,
                  opacity: [1, 0],
                }}
                transition={{
                  duration: 3 + Math.random() * 2,
                  repeat: Infinity,
                  delay: Math.random()
                }}
              >
                ❄
              </motion.div>
            ))}
          </>
        );
      case 'clouds':
        return (
          <>
            {[...Array(5)].map((_, i) => (
              <motion.div
                key={i}
                className="cloud"
                initial={{ x: Math.random() * 200 - 100, y: Math.random() * 100 - 50 }}
                animate={{
                  x: [0, 50, 0, -50, 0],
                }}
                transition={{
                  duration: 30 + Math.random() * 20,
                  repeat: Infinity,
                  repeatType: "reverse"
                }}
              >
                <WiCloudy size={80 + Math.random() * 40} />
              </motion.div>
            ))}
          </>
        );
      case 'thunderstorm':
        return (
          <>
            <div className="clouds">
              <WiCloudy size={150} />
              <WiCloudy size={120} style={{ marginLeft: '-40px' }} />
            </div>
            {[...Array(20)].map((_, i) => (
              <motion.div
                key={i}
                className="raindrop"
                initial={{ y: -10, x: Math.random() * 100 }}
                animate={{
                  y: [0, 100],
                  opacity: [1, 0],
                }}
                transition={{
                  duration: 0.5 + Math.random() * 0.5,
                  repeat: Infinity,
                  delay: Math.random()
                }}
              />
            ))}
            <motion.div
              className="lightning"
              initial={{ opacity: 0 }}
              animate={{ opacity: [0, 1, 0] }}
              transition={{
                duration: 0.2,
                repeat: Infinity,
                repeatDelay: 3 + Math.random() * 5
              }}
            >
              <WiThunderstorm size={100} />
            </motion.div>
          </>
        );
      default:
        return (
          <motion.div
            className="fog"
            animate={{ opacity: [0.3, 0.7, 0.3] }}
            transition={{ duration: 10, repeat: Infinity, repeatType: "reverse" }}
          >
            <WiFog size={200} />
          </motion.div>
        );
    }
  };

  return (
    <div className={`weather-background ${condition}`}>
      {getAnimationElements()}
    </div>
  );
};

export default BackgroundAnimation;