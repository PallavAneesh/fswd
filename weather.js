import React, { useState } from "react";

function App() {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const API_KEY = "abcd1234yourrealkeyhere"; // 🔑 Replace this

  const fetchWeather = async () => {
    if (!city) return;

    setLoading(true);
    setError("");
    setWeather(null);

    try {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${API_KEY}`
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message);
      }

      const data = await response.json();
      setWeather(data);
    } catch (err) {
      setError(err.message);
    }

    setLoading(false);
  };

  return (
    <div style={styles.container}>
      <h1>🌤 Weather Dashboard</h1>

      <div style={styles.searchBox}>
        <input
          type="text"
          placeholder="Enter city name"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          style={styles.input}
        />
        <button onClick={fetchWeather} style={styles.button}>
          Search
        </button>
      </div>

      {loading && <p>Loading weather data...</p>}

      {error && <p style={{ color: "red" }}>{error}</p>}

      {weather && (
        <div style={styles.card}>
          <h2>{weather.name}</h2>
          <p>🌡 Temperature: {weather.main.temp} °C</p>
          <p>☁ Condition: {weather.weather[0].description}</p>
          <p>💧 Humidity: {weather.main.humidity}%</p>
          <p>🌬 Wind Speed: {weather.wind.speed} m/s</p>
        </div>
      )}
    </div>
  );
}

const styles = {
  container: {
    textAlign: "center",
    marginTop: "50px",
    fontFamily: "Arial"
  },
  searchBox: {
    marginBottom: "20px"
  },
  input: {
    padding: "10px",
    fontSize: "16px",
    width: "200px"
  },
  button: {
    padding: "10px 15px",
    fontSize: "16px",
    marginLeft: "10px",
    cursor: "pointer"
  },
  card: {
    marginTop: "20px",
    padding: "20px",
    border: "1px solid #ccc",
    borderRadius: "10px",
    display: "inline-block",
    backgroundColor: "#f4f4f4"
  }
};

export default App;
