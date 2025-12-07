export function DetailsGrid({ weather }) {
  if (!weather) return null;

  const main = weather.main;
  const wind = weather.wind;

  return (
    <div className="details">
      <div className="detail-item">
        <span>Hissedilen</span>
        <strong>{Math.round(main.feels_like)}°C</strong>
      </div>

      <div className="detail-item">
        <span>En Düşük</span>
        <strong>{Math.round(main.temp_min)}°C</strong>
      </div>

      <div className="detail-item">
        <span>En Yüksek</span>
        <strong>{Math.round(main.temp_max)}°C</strong>
      </div>

      <div className="detail-item">
        <span>Nem</span>
        <strong>%{main.humidity}</strong>
      </div>

      <div className="detail-item">
        <span>Basınç</span>
        <strong>{main.pressure} hPa</strong>
      </div>

      <div className="detail-item">
        <span>Rüzgar</span>
        <strong>{Math.round(wind.speed)} m/s</strong>
      </div>
    </div>
  );
}
