import React from "react";
import { useLocation } from "react-router-dom";
import TomorrowForecast from "../components/TomorrowForecast";

const TomorrowPage = () => {
  const location = useLocation();
  const { weather } = location.state || {};

  if (!weather) {
    return <div>No forecast available</div>;
  }

  return <TomorrowForecast weather={weather} />;
};

export default TomorrowPage;
