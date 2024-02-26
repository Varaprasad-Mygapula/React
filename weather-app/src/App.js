import logo from "./logo.svg";
import "./App.css";
import { useState } from "react";

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

  return (
    <div className="App">
      <header className="App-header">
        {/* header */}
        <h1>Weather App</h1>

        {/* Search Box */}
        <div>
          <input
            type="text"
            placeholder="Enter your city/Town"
            onChange={(e) => setSearch(e.target.value)}
          />
          <button onClick={searchPressed}>Search</button>
        </div>

        {typeof weather.main !== "undefined" ? (
          <div>
            {/* Location */}
            <p>{weather.name}</p>

            {/* Temperature */}
            <p>{weather.main.temp}</p>

            {/* Condition */}
            <p>{weather.weather[0].main}</p>
            <p>{weather.weather[0].description}</p>
          </div>
        ) : (
          ""
        )}
      </header>
    </div>
  );
}

export default App;
