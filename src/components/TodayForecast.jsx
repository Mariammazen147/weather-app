import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../assets/css/all.css";
import SearchBar from "./SearchBar";
import { fetchWeather } from "../services/weatherService";
import { useCity } from "../contexts/CityContext";

const TodayForecast = () => {
  const { city, setCity } = useCity();
  const [weatherData, setWeatherData] = useState(null);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const defaultCity = "Cairo";
    if (!city) {
      setCity(defaultCity);
    }

    const fetchWeatherData = async () => {
      if (!city) return;

      try {
        const data = await fetchWeather(city);
        if (data && data.error) {
          setWeatherData(null);
          setError(`City not found: ${city}`);
        } else {
          setWeatherData(data);
          setError(null);
        }
      } catch (error) {
        setWeatherData(null);
        setError("Failed to fetch weather data. Please try again.");
      }
    };

    fetchWeatherData();
  }, [city, setCity]);

  const handleSearch = async (city) => {
    try {
      const data = await fetchWeather(city);
      if (data && data.error) {
        setWeatherData(null);
        setError(`City not found: ${city}`);
      } else {
        setCity(city);
        setWeatherData(data);
        setError(null);
      }
    } catch (error) {
      setWeatherData(null);
      setError("Failed to fetch weather data. Please try again.");
    }
  };

  if (error) {
    return (
      <div className="error-container">
        <div className="error-message">{error}</div>
        <SearchBar onSearch={handleSearch} />
      </div>
    );
  }

  if (!weatherData) {
    return (
      <div className="no-data-container">
        <p>No data available. Please enter a city name.</p>
        <SearchBar onSearch={handleSearch} />
      </div>
    );
  }

  const {
    location: { name, country, localtime },
    current: {
      temp_c,
      humidity,
      wind_kph,
      pressure_mb,
      is_day,
      wind_dir,
      feelslike_c,
      uv,
      condition = {},
    } = {},
    forecast = {},
  } = weatherData;

  const { forecastday = [] } = forecast;

  const todayWeather = {
    temp_c,
    humidity,
    wind_kph,
    pressure_mb,
    icon: condition.icon || "default-icon.png",
    text: condition.text || "No condition available",
    name,
    country,
    formattedDate: new Date(localtime).toLocaleDateString(),
    formattedTime: new Date(localtime).toLocaleTimeString(),
    wind_dir,
    feelslike_c,
    uv,
    sunrise: forecastday[0]?.astro?.sunrise || "N/A",
    sunset: forecastday[0]?.astro?.sunset || "N/A",
    moonrise: forecastday[0]?.astro?.moonrise || "N/A",
    moonset: forecastday[0]?.astro?.moonset || "N/A",
  };

  const part_of_day = is_day === 1 ? "Day" : "Night";

  const handleNavigateToTomorrow = () => {
    if (forecastday.length < 2) {
      setError("No forecast data available for tomorrow.");
      return;
    }

    const tomorrowWeather = {
      temp_c: forecastday[1].day.avgtemp_c,
      humidity: forecastday[1].day.avghumidity,
      wind_kph: forecastday[1].day.maxwind_kph,
      icon: forecastday[1].day.condition.icon,
      text: forecastday[1].day.condition.text,
      daily_chance_of_rain: forecastday[1].day.daily_chance_of_rain,
      daily_chance_of_snow: forecastday[1].day.daily_chance_of_snow,
      uv: forecastday[1].day.uv,
      formattedDate: new Date(forecastday[1].date).toLocaleDateString(),
      name,
      country,
    };

    navigate("/tomorrow", { state: { weather: tomorrowWeather } });
  };

  const weatherDetailsElements = [
    {
      elm: (
        <>
          Humidity:
          <br />
          {todayWeather.humidity}%
        </>
      ),
    },
    {
      elm: (
        <>
          Wind: <br />
          {todayWeather.wind_kph} km/h
        </>
      ),
    },
    {
      elm: (
        <>
          Pressure: <br />
          {todayWeather.pressure_mb} mb
        </>
      ),
    },
    {
      elm: (
        <>
          Feels Like: <br />
          {todayWeather.feelslike_c}°C
        </>
      ),
    },
    {
      elm: (
        <>
          UV Index: <br />
          {todayWeather.uv}
        </>
      ),
    },
    {
      elm: (
        <>
          {" "}
          Sun <br />
          Rise: {todayWeather.sunrise}
          <br />
          Set: {todayWeather.sunset}
        </>
      ),
    },
    {
      elm: (
        <>
          {" "}
          Moon <br />
          Rise: {todayWeather.moonrise}
          <br />
          Set: {todayWeather.moonset}
        </>
      ),
    },
  ];
  return (
    <div className="weather-container row row-cols-2">
      <div className="left-section">
        <SearchBar onSearch={handleSearch} />
        <img
          style={{ padding: "20px" }}
          width={"120px"}
          height={"120px"}
          src={todayWeather.icon}
          alt={todayWeather.text}
        />
        <h1 className="font sizebig">{todayWeather.temp_c}°C</h1>
        <div className="weather-details">
          <h3>{todayWeather.text}</h3>
          <p>
            {todayWeather.name}, {todayWeather.country}
          </p>
          <p>{todayWeather.formattedDate}</p>
          <p>{todayWeather.formattedTime}</p>
          <p>{part_of_day}</p>
        </div>
        <button className="see-tmrw sizebig" onClick={handleNavigateToTomorrow}>
          See Tomorrow's Forecast
        </button>
      </div>
      <div className="right-section">
        {weatherDetailsElements.map((elm) => (
          <div className="info-box">{elm.elm}</div>
        ))}
      </div>
    </div>
  );
};

export default TodayForecast;
