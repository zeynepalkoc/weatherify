import { useState, useEffect } from "react";

const API_KEY = import.meta.env.VITE_OPENWEATHER_API_KEY;

export function useWeather(defaultCity = "İstanbul", defaultCountry = "TR") {
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [history, setHistory] = useState([]);

  const updateHistory = (data) => {
    const entry = `${data.name}, ${data.sys?.country}`;
    setHistory((prev) => {
      if (prev.includes(entry)) return prev;
      const updated = [entry, ...prev];
      return updated.slice(0, 5);
    });
  };

  const fetchByCity = async (city, country) => {
    try {
      if (!API_KEY) throw new Error("API anahtarı bulunamadı.");

      setLoading(true);
      setError("");
      setWeather(null);

      const query = country ? `${city},${country}` : city;

      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${query}&units=metric&lang=tr&appid=${API_KEY}`
      );

      if (!response.ok) {
        if (response.status === 404) {
          throw new Error("Şehir bulunamadı. Lütfen kontrol et.");
        }
        throw new Error("Bir şeyler ters gitti. Tekrar dene.");
      }

      const data = await response.json();
      setWeather(data);
      updateHistory(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const fetchByCoords = async (lat, lon) => {
    try {
      if (!API_KEY) throw new Error("API anahtarı bulunamadı.");

      setLoading(true);
      setError("");
      setWeather(null);

      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&lang=tr&appid=${API_KEY}`
      );

      if (!response.ok) {
        throw new Error("Konuma göre hava durumu alınamadı.");
      }

      const data = await response.json();
      setWeather(data);
      updateHistory(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (defaultCity) {
      fetchByCity(defaultCity, defaultCountry);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return { weather, loading, error, history, fetchByCity, fetchByCoords };
}
