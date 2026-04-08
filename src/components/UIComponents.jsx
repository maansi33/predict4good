import React from 'react';

export function Slider({ icon, label, value, min, max, unit, onChange, colorFn }) {
  const pct = ((value - min) / (max - min)) * 100;
  const col = colorFn(value);
  const fills = { green: "#22c55e", red: "#FF5733", yellow: "#FFB830", neutral: "#ccc" };

  return (
    <div className="field">
      <div className="field-top">
        <div className="field-label">{icon} {label}</div>
        <div className={`field-badge ${col}`}>{value}{unit}</div>
      </div>
      <div className="slider-outer">
        <div className="slider-track-bg">
          <div className="slider-track-fill" style={{ width: `${pct}%`, background: fills[col] }} />
        </div>
        <input type="range" min={min} max={max} value={value}
          onChange={e => onChange(+e.target.value)} />
      </div>
    </div>
  );
}

export function DimBar({ label, value }) {
  const pct = Math.max(0, Math.min(100, ((value + 2) / 4) * 100));
  const col = value >= 1 ? "#22c55e" : value <= -1 ? "#FF5733" : "#FFB830";
  return (
    <div className="dim-row">
      <div className="dim-name">{label}</div>
      <div className="dim-track">
        <div className="dim-bar" style={{ width: `${pct}%`, background: col }} />
      </div>
      <div className="dim-pct" style={{ color: col }}>{Math.round(pct)}%</div>
    </div>
  );
}

export function Squiggle({ style }) {
  return (
    <svg width="60" height="20" viewBox="0 0 60 20" style={{ position: "absolute", ...style }} fill="none">
      <path d="M0 10 Q7.5 0 15 10 Q22.5 20 30 10 Q37.5 0 45 10 Q52.5 20 60 10"
        stroke="#1A1614" strokeWidth="2.5" strokeLinecap="round" />
    </svg>
  );
}

export function Star({ style, color="#1A1614", size=20 }) {
  const pts = Array.from({ length: 8 }, (_, i) => {
    const a = (i * Math.PI) / 4;
    const r = i % 2 === 0 ? size / 2 : size / 4;
    return `${size / 2 + r * Math.cos(a)},${size / 2 + r * Math.sin(a)}`;
  }).join(" ");
  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}
      style={{ position: "absolute", ...style }}>
      <polygon points={pts} fill={color} />
    </svg>
  );
}