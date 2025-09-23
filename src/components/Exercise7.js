import React, { useState } from "react";

const MOCK_WEATHER = [
  {
    name: "Chennai",
    sys: { country: "IN" },
    main: { temp: 33, humidity: 70 },
    weather: [{ main: "Clouds", description: "scattered clouds" }],
    wind: { speed: 4.2 },
  },
  {
    name: "Coimbatore",
    sys: { country: "IN" },
    main: { temp: 29, humidity: 65 },
    weather: [{ main: "Clear", description: "clear sky" }],
    wind: { speed: 3.1 },
  },
  {
    name: "Madurai",
    sys: { country: "IN" },
    main: { temp: 31, humidity: 60 },
    weather: [{ main: "Rain", description: "light rain" }],
    wind: { speed: 5.0 },
  },
  {
    name: "Salem",
    sys: { country: "IN" },
    main: { temp: 30, humidity: 68 },
    weather: [{ main: "Clouds", description: "broken clouds" }],
    wind: { speed: 2.8 },
  },
  {
    name: "Tirunelveli",
    sys: { country: "IN" },
    main: { temp: 32, humidity: 72 },
    weather: [{ main: "Clear", description: "sunny" }],
    wind: { speed: 3.5 },
  },
  {
    name: "Trichy",
    sys: { country: "IN" },
    main: { temp: 34, humidity: 66 },
    weather: [{ main: "Clouds", description: "few clouds" }],
    wind: { speed: 3.0 },
  },
  {
    name: "Vellore",
    sys: { country: "IN" },
    main: { temp: 28, humidity: 69 },
    weather: [{ main: "Rain", description: "moderate rain" }],
    wind: { speed: 2.5 },
  },
  {
    name: "Erode",
    sys: { country: "IN" },
    main: { temp: 27, humidity: 63 },
    weather: [{ main: "Clear", description: "clear sky" }],
    wind: { speed: 2.2 },
  },
  {
    name: "Thanjavur",
    sys: { country: "IN" },
    main: { temp: 30, humidity: 67 },
    weather: [{ main: "Clouds", description: "overcast clouds" }],
    wind: { speed: 2.9 },
  },
  {
    name: "Dindigul",
    sys: { country: "IN" },
    main: { temp: 29, humidity: 71 },
    weather: [{ main: "Rain", description: "light rain" }],
    wind: { speed: 3.3 },
  },
];

function Exercise7() {
  const [selected, setSelected] = useState(MOCK_WEATHER[0].name);

  const weather = MOCK_WEATHER.find((d) => d.name === selected);

  return (
    <div className="container" style={{ maxWidth: 400, margin: "40px auto" }}>
      <h2 style={{ textAlign: "center" }}>Weather in Tamil Nadu Districts</h2>
      <div style={{ margin: "20px 0", textAlign: "center" }}>
        <label htmlFor="district" style={{ marginRight: 8, fontWeight: "bold" }}>
          Select District:
        </label>
        <select
          id="district"
          value={selected}
          onChange={(e) => setSelected(e.target.value)}
          style={{ padding: 6, fontSize: 16 }}
        >
          {MOCK_WEATHER.map((d) => (
            <option key={d.name} value={d.name}>
              {d.name}
            </option>
          ))}
        </select>
      </div>
      {weather && (
        <div className="card" style={{ textAlign: "center", padding: 20 }}>
          <h3>
            {weather.name}, {weather.sys.country}
          </h3>
          <div style={{ fontSize: 32 }}>{Math.round(weather.main.temp)}°C</div>
          <div>{weather.weather[0].main}</div>
          <div style={{ fontSize: 12, color: "#666" }}>{weather.weather[0].description}</div>
          <div>Humidity: {weather.main.humidity}%</div>
          <div>Wind: {weather.wind.speed} m/s</div>
        </div>
      )}
    </div>
  );
}

export default Exercise7;