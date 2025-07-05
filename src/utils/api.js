import axios from 'axios';

const API_KEY = 'cc4d35c4cd83bb979bd2d96f1eb4f387'; 
const BASE_URL = 'https://api.openweathermap.org/data/2.5';

export const getCurrentWeather = async (lat, lon, units = 'metric') => {
  try {
    const response = await axios.get(`${BASE_URL}/weather`, {
      params: {
        lat,
        lon,
        units,
        appid: API_KEY,
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching current weather:', error);
    throw error;
  }
};

export const getForecast = async (lat, lon, units = 'metric') => {
  try {
    const response = await axios.get(`${BASE_URL}/forecast`, {
      params: {
        lat,
        lon,
        units,
        appid: API_KEY,
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching forecast:', error);
    throw error;
  }
};

export const getAirQuality = async (lat, lon) => {
  try {
    const response = await axios.get(`${BASE_URL}/air_pollution`, {
      params: {
        lat,
        lon,
        appid: API_KEY,
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching air quality:', error);
    throw error;
  }
};

export const getWeatherByCity = async (city, units = 'metric') => {
  try {
    const response = await axios.get(`${BASE_URL}/weather`, {
      params: {
        q: city,
        units,
        appid: API_KEY,
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching weather by city:', error);
    throw error;
  }
};