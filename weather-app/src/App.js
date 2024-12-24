import React, { useState } from "react";
import Weather from "./Components/weather";
import "./App.css";

function App() {
  const [city, setCity] = useState("");
  const [weatherData, setWeatherData] = useState(null);

  const fetchWeather = async () => {
    if (!city) return alert("Please enter a city!");
    const apiKey = "705059d95e199810f6b24d8b8a8a7a82";
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`;
    try {
      const response = await fetch(url);
      const data = await response.json();
      
      console.log(response);
      console.log(data);
      
      if (data.cod === 200) {
        setWeatherData(data);
      } else {
        alert("City not found!");
      }
    } catch (error) {
      alert("Failed to fetch weather data!");
    }
  };

  return (
    <div className="app">
      <h1>Weather App</h1>
      <div className="search">
        <input
          type="text"
          placeholder="Enter city name"
          value={city}
          onChange={(e) => setCity(e.target.value)}
        />
        <button onClick={fetchWeather}>Get Weather</button>
      </div>
      {weatherData && <Weather data={weatherData} />}
    </div>
  );
}

export default App;
