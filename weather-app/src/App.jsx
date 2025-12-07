import "./App.css";
import { useState } from "react";
import { useWeather } from "./hooks/useWeather";
import { CountrySelect } from "./components/CountrySelect";
import { DetailsGrid } from "./components/DetailsGrid";
import { HistoryList } from "./components/HistoryList";

function App() {
  const [city, setCity] = useState("");
  const [country, setCountry] = useState("TR");

  const { weather, loading, error, history, fetchByCity, fetchByCoords } =
    useWeather("İstanbul", "TR");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!city.trim()) return;
    fetchByCity(city.trim(), country);
  };

  const handleUseMyLocation = () => {
    if (!navigator.geolocation) {
      alert("Tarayıcın konum bilgisini desteklemiyor.");
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const { latitude, longitude } = pos.coords;
        fetchByCoords(latitude, longitude);
      },
      () => {
        alert("Konum izni verilmedi veya alınamadı.");
      }
    );
  };

  const getAppClass = () => {
    if (!weather) return "app app-default";

    const temp = weather.main.temp;
    let tempClass = "app-hot";
    if (temp <= 5) tempClass = "app-cold";
    else if (temp <= 20) tempClass = "app-mild";

    const now = Date.now() / 1000;
    const night =
      now < weather.sys.sunrise || now > weather.sys.sunset;

    return night ? `app ${tempClass} app-night` : `app ${tempClass}`;
  };

  return (
    <div className={getAppClass()}>
      <div className="card">
        <h1 className="title">Weatherify 🌤️</h1>
        <p className="subtitle">
          Şehir ve ülke seç ya da konumunu kullan.
        </p>

        <form onSubmit={handleSubmit} className="form">
          <input
            type="text"
            placeholder="Şehir adı (örn: İstanbul)"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            className="input"
          />

          <CountrySelect value={country} onChange={setCountry} />

          <button type="submit" className="button">
            Ara
          </button>

          <button
            type="button"
            className="button secondary-button"
            onClick={handleUseMyLocation}
          >
            Yakınımı Göster
          </button>
        </form>

        {loading && <p className="info">Yükleniyor...</p>}
        {error && <p className="error">{error}</p>}

        {weather && (
          <div className="weather">
            <h2 className="city-name">
              {weather.name}, {weather.sys?.country}
            </h2>

            <div className="weather-main">
              <div className="temp">
                {Math.round(weather.main.temp)}°C
              </div>

              <div className="icon-desc">
                {weather.weather[0].icon && (
                  <img
                    src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
                    alt={weather.weather[0].description}
                  />
                )}
                <p className="description">
                  {weather.weather[0].description}
                </p>
              </div>
            </div>

            <DetailsGrid weather={weather} />
          </div>
        )}

        <HistoryList history={history} />

        {!loading && !weather && !error && (
          <p className="info">
            Başlamak için bir şehir yaz ve <b>Ara</b> butonuna tıkla. 🌈
          </p>
        )}
      </div>
    </div>
  );
}

export default App;
