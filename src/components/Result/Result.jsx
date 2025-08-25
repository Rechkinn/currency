import "./Result.scss";

export default function Result({ resultValue }) {
  return (
    <div className="result">
      <div className="result__inner">
        <span className="result__value">{resultValue}</span>
      </div>
    </div>
  );
}
