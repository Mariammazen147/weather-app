import React, { useState } from "react";
import TodayForecast from "../components/TodayForecast";
import { fetchWeather } from "../services/weatherService";

const Home = () => {
  const [weatherData, setWeatherData] = useState(null);

  const handleSearch = async (city) => {
    if (!city) {
      return;
    }

    try {
      const data = await fetchWeather(city);
      if (data && data.error) {
        setWeatherData(null);
      } else {
        setWeatherData(data);
      }
    } catch (error) {
      setWeatherData(null);
      console.error("Weather fetch error:", error);
    }
  };

  return (
    <div className="App">
      <TodayForecast weatherData={weatherData} onSearch={handleSearch} />
    </div>
  );
};

export default Home;
