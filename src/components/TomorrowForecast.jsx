import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "../assets/css/all.css";

const TomorrowForecast = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const weather = location.state?.weather;

  if (!weather) {
    return (
      <div className="error-container">
        <p>No forecast data available. Please return to the main page.</p>
        <button className="btn btn-primary" onClick={() => navigate("/")}>
          Go Back
        </button>
      </div>
    );
  }

  return (
    <div className="weather-container row row-cols-2">
      <div className="left-section">
      <img
          style={{ padding: "20px" }}
          width={"120px"}
          height={"120px"}
          src={weather.icon}
          alt={weather.text}
        />        <p className="font sizebig">{weather.temp_c}°C</p>
        <p>{weather.text}</p>
        <p className="weather-details">
          {weather.date} 
          {weather.name}, {weather.country}
        </p>
        <button className="see-tmrw sizebig" onClick={() => navigate("/")}>
        Go Back
      </button>
      </div>
      <div className="right-section">
        <div className="info-box">
          <h4>Wind</h4>
          <p>{weather.wind_kph} km/h <br />{weather.wind_dir}</p>
        </div>
        <div className="info-box">
          <h4>Humidity</h4>
          <p>{weather.humidity}%</p>
        </div>
        <div className="info-box">
          <h4>Chance of Rain</h4>
          <p>{weather.daily_chance_of_rain}%</p>
        </div>
        <div className="info-box">
          <h4>Chance of Snow</h4>
          <p>{weather.daily_chance_of_snow}%</p>
        </div>
        <div className="info-box">
          <h4>UV Index</h4>
          <p>{weather.uv}</p>
        </div>
      </div>
    </div>
  );
};

export default TomorrowForecast;
