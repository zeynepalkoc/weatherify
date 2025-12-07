export function HistoryList({ history }) {
  if (!history || history.length === 0) return null;

  return (
    <div className="history">
      <h3 className="history-title">Son Aramalar</h3>
      <ul className="history-list">
        {history.map((item, index) => (
          <li key={index} className="history-item">
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
}
