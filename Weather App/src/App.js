import React, { useState } from "react";
import "./App.css";

const api = {
  key: "c8f91f80aca7466e25f6e965296a3d93",
  base: "https://api.openweathermap.org/data/2.5/",
};

function App() {
  const [search, setSearch] = useState("");
  const [weather, setWeather] = useState({});

  const searchPressed = () => {
    fetch(`${api.base}weather?q=${search}&units=metric&APPID=${api.key}`)
      .then((res) => res.json())
      .then((result) => {
        setWeather(result);
      });
  };

  const getBackgroundClass = () => {
    if (!weather.weather) return "default";
    const mainWeather = weather.weather[0].main.toLowerCase();
    switch (mainWeather) {
      case "clouds":
        return "cloudy";
      case "rain":
        return "rainy";
      case "snow":
        return "snowy";
      case "clear":
        return "clear";
      case "thunderstorm":
        return "stormy";
      default:
        return "default";
    }
  };

  return (
    <div className={`App ${getBackgroundClass()}`}>
      <header className="App-header">
        <h1>Weather App</h1>
        <div className="search-box">
          <input
            type="text"
            placeholder="Enter your city/Town"
            onChange={(e) => setSearch(e.target.value)}
          />
          <button onClick={searchPressed}>Search</button>
        </div>
        {typeof weather.main !== "undefined" ? (
          <div className="weather-info">
            <p>
              <strong>Location:</strong> {weather.name}
            </p>
            <p>
              <strong>Temperature:</strong> {weather.main.temp}°C
            </p>
            <p>
              <strong>Condition:</strong> {weather.weather[0].main}
            </p>
            <p>
              <strong>Description:</strong> {weather.weather[0].description}
            </p>
          </div>
        ) : (
          ""
        )}
      </header>
    </div>
  );
}

export default App;
