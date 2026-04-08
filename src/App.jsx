import { useState, useEffect, useRef } from "react";
import './styles.css';

import { score, getSmallStep, OUTCOMES } from "./utils/engine";
import { Slider, DimBar, Squiggle, Star } from "./components/UIComponents";
import { BreathingExercise, Journal, SmallStep, ButterflyEffect } from "./components/Interventions";

export default function App() {
  const [sleep, setSleep] = useState(7);
  const [screen, setScreen] = useState(4);
  const [study, setStudy] = useState(3);
  const [exercise, setExercise] = useState(null);
  const [mood, setMood] = useState(null);
  
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [revealed, setRevealed] = useState(false);
  
  const [prevScore, setPrevScore] = useState(null);
  const rightRef = useRef(null);

  useEffect(() => {
    const savedScore = localStorage.getItem("futureYou_prevScore");
    if (savedScore !== null) {
      setPrevScore(parseInt(savedScore));
    }
  }, []);

  const { s, energy, focus, discipline, mental } = score({
    sleep, screenTime: screen, studyHours: study,
    exercise: exercise === "yes", mood: mood || "okay",
  });
  
  const outcomeKey = s >= 3 ? "positive" : s <= -3 ? "negative" : "neutral";
  const scorePct = Math.max(0, Math.min(100, ((s + 7) / 14) * 100));
  const scoreColors = { positive: "#BFFF00", neutral: "#FFB830", negative: "#FF5733" };

  function generate() {
    if (!exercise || !mood) { alert("Please pick your exercise status and mood!"); return; }
    setLoading(true); setRevealed(false); setResult(null);
    
    localStorage.setItem("futureYou_prevScore", s.toString());
    const smallStepText = getSmallStep({ sleep, screenTime: screen, studyHours: study, exercise, mood });

    setTimeout(() => {
      setResult({ 
        s, energy, focus, discipline, mental, 
        outcome: OUTCOMES[outcomeKey],
        step: smallStepText 
      });
      setPrevScore(s); 
      setLoading(false);
      setTimeout(() => { setRevealed(true); rightRef.current?.scrollIntoView({ behavior: "smooth" }); }, 100);
    }, 1800);
  }

  const panelClass = `panel-right ${result ? `is-${result.outcome.type}` : ""}`;

  return (
    <>
      <div className="marquee-wrap">
        <div className="marquee-inner">
          {[...Array(8)].map((_, i) => (
            <span key={i}>{"✦ YOUR HABITS → YOUR FUTURE ✦ 30-DAY FORECAST ✦ FUTURE YOU ✦ WHO WILL YOU BE?"}</span>
          ))}
        </div>
      </div>

      <div className="hero">
        <div className="hero-text">
          {prevScore !== null && (
            <div className="history-badge">
              Last Score: {prevScore > 0 ? "+" : ""}{prevScore}
            </div>
          )}
          
          <div className="hero-eyebrow">Habit Forecaster</div>
          <h1 className="hero-h1">
            Future<br />
            <span className="line2">You</span>
            <span className="line3">.</span>
          </h1>
          <p className="hero-sub">
            Your daily habits are silently shaping who you'll be.<br />
            Let's find out where you're headed in 30 days.
          </p>
        </div>

        <div className="hero-art">
          <svg width="320" height="290" viewBox="0 0 320 290" fill="none" xmlns="http://www.w3.org/2000/svg">
            <ellipse cx="160" cy="200" rx="130" ry="80" fill="#BFFF00" stroke="#1A1614" strokeWidth="3"/>
            <circle cx="160" cy="140" r="70" fill="#7B61FF" stroke="#1A1614" strokeWidth="3"/>
            <circle cx="143" cy="130" r="7" fill="white" stroke="#1A1614" strokeWidth="2"/>
            <circle cx="177" cy="130" r="7" fill="white" stroke="#1A1614" strokeWidth="2"/>
            <circle cx="145" cy="132" r="3" fill="#1A1614"/>
            <circle cx="179" cy="132" r="3" fill="#1A1614"/>
            <path d="M148 152 Q160 163 172 152" stroke="#1A1614" strokeWidth="2.5" strokeLinecap="round" fill="none"/>
            <path d="M92 130 Q70 110 60 95" stroke="#7B61FF" strokeWidth="14" strokeLinecap="round"/>
            <path d="M228 130 Q250 110 260 95" stroke="#7B61FF" strokeWidth="14" strokeLinecap="round"/>
            <circle cx="60" cy="92" r="14" fill="#FFB830" stroke="#1A1614" strokeWidth="2.5"/>
            <circle cx="260" cy="92" r="14" fill="#FFB830" stroke="#1A1614" strokeWidth="2.5"/>
            <circle cx="50" cy="55" r="6" fill="#FF6B9D" stroke="#1A1614" strokeWidth="2"/>
            <circle cx="270" cy="60" r="8" fill="#6EC6FF" stroke="#1A1614" strokeWidth="2"/>
            <circle cx="100" cy="28" r="5" fill="#BFFF00" stroke="#1A1614" strokeWidth="2"/>
            <circle cx="220" cy="22" r="7" fill="#FF5733" stroke="#1A1614" strokeWidth="2"/>
            <polygon points="280,30 283,22 286,30 294,30 288,35 291,43 283,38 275,43 278,35 272,30" fill="#FFB830" stroke="#1A1614" strokeWidth="1.5"/>
            <polygon points="40,40 43,32 46,40 54,40 48,45 51,53 43,48 35,53 38,45 32,40" fill="#7B61FF" stroke="#1A1614" strokeWidth="1.5"/>
            <rect x="133" y="205" width="22" height="55" rx="11" fill="#FF5733" stroke="#1A1614" strokeWidth="2.5"/>
            <rect x="165" y="205" width="22" height="55" rx="11" fill="#FF5733" stroke="#1A1614" strokeWidth="2.5"/>
            <ellipse cx="144" cy="262" rx="22" ry="10" fill="#1A1614"/>
            <ellipse cx="176" cy="262" rx="22" ry="10" fill="#1A1614"/>
            <rect x="132" y="150" width="56" height="22" rx="6" fill="#BFFF00" stroke="#1A1614" strokeWidth="2"/>
            <text x="160" y="166" textAnchor="middle" fontFamily="'Unbounded',sans-serif" fontWeight="900" fontSize="9" fill="#1A1614">30 DAYS</text>
          </svg>
          <Star style={{ top: 10, left: 10 }} color="#FF6B9D" size={16} />
          <Star style={{ bottom: 40, right: 20 }} color="#6EC6FF" size={14} />
        </div>
      </div>

      <div className="app-grid">
        <div className="panel-left">
          <div className="panel-title"><span className="num">01</span> Present You — Input Habits</div>

          <Slider icon="🌙" label="Sleep" value={sleep} min={0} max={10} unit="h"
            onChange={setSleep} colorFn={v => v < 6 ? "red" : v >= 7 ? "green" : "yellow"} />

          <Slider icon="📱" label="Screen Time" value={screen} min={0} max={12} unit="h"
            onChange={setScreen} colorFn={v => v > 6 ? "red" : v <= 3 ? "green" : "yellow"} />

          <Slider icon="📚" label="Study / Work" value={study} min={0} max={12} unit="h"
            onChange={setStudy} colorFn={v => v >= 4 ? "green" : v >= 2 ? "yellow" : "neutral"} />

          <div className="field">
            <div className="field-top">
              <div className="field-label">🏃 Exercise Today?</div>
            </div>
            <div className="toggle-pair">
              <button className={`tog ${exercise === "yes" ? "yes-on" : ""}`}
                onClick={() => setExercise("yes")}><span>✓ Yes</span></button>
              <button className={`tog ${exercise === "no" ? "no-on" : ""}`}
                onClick={() => setExercise("no")}><span>✗ No</span></button>
            </div>
          </div>

          <div className="field">
            <div className="field-top"><div className="field-label">🧠 Current Mood</div></div>
            <div className="mood-grid">
              {[["😞","bad","Low"],["😐","okay","Okay"],["😊","good","Good"]].map(([em, val, lbl]) => (
                <button key={val} className={`mood-tile ${mood === val ? `sel-${val}` : ""}`}
                  onClick={() => setMood(val)}>
                  <span className="emoji">{em}</span>{lbl}
                </button>
              ))}
            </div>
          </div>

          <div className="score-bar-wrap">
            <div className="score-track">
              <div className="score-fill-bar"
                style={{ width: `${scorePct}%`, background: scoreColors[outcomeKey] }} />
            </div>
            <div className="score-labels">
              <span>Struggling</span><span>Thriving</span>
            </div>
            <div className="score-num" style={{ color: scoreColors[outcomeKey] }}>
              {s > 0 ? "+" : ""}{s} pts
            </div>
          </div>

          <button className="gen-btn" onClick={generate} disabled={loading}>
            {loading && <div className="shimmer" />}
            {loading ? "Simulating future…" : "→ Generate Future You"}
          </button>
        </div>

        <div className={panelClass} ref={rightRef}>
          <div className="panel-title" style={{ marginBottom: 28 }}>
            <span className="num">02</span> Future You — 30-Day Prediction
          </div>

          {!result && !loading && (
            <div className="empty">
              <Squiggle style={{ top: 60, left: 60, opacity: 0.3 }} />
              <Star style={{ top: 80, right: 80, opacity: 0.25 }} size={24} color="#7B61FF" />
              <div className="empty-circle">🔮</div>
              <h3>Your future awaits</h3>
              <p>Fill in your habits and hit "Generate Future You" to see where you're headed.</p>
              <Squiggle style={{ bottom: 80, right: 60, opacity: 0.3 }} />
            </div>
          )}

          {loading && (
            <div className="loading">
              <div className="loading-ring" />
              <div className="loading-text">Simulating 7,200 moments…</div>
            </div>
          )}

          {result && revealed && (
            <div className="result">
              <div className="result-eyebrow">Your Future in 30 Days</div>
              <div className="result-headline">
                {result.outcome.headline[0]}
                <span className="outline">{result.outcome.headline[1]}</span>
              </div>

              <div className="traits">
                {result.outcome.traits.map((t, i) => (
                  <div key={t} className={`chip ${result.outcome.type}`}
                    style={{ animationDelay: `${i * 0.07}s` }}>{t}</div>
                ))}
              </div>

              <div className="pred-para">{result.outcome.para}</div>

              <SmallStep text={result.step} />

              <div style={{ marginBottom: 8, fontFamily: "'Unbounded', sans-serif", fontSize: 8, fontWeight: 700, letterSpacing: 3, textTransform: "uppercase", color: "#aaa" }}>
                Projected Dimensions
              </div>
              <div className="dims">
                <DimBar label="Energy" value={result.energy} />
                <DimBar label="Focus" value={result.focus} />
                <DimBar label="Discipline" value={result.discipline} />
                <DimBar label="Mental" value={result.mental} />
              </div>

              <div className="intervention-section">
                 <div className="section-heading">Course Correction</div>
                 
                 {/* NEW: Butterfly Effect Component */}
                 <ButterflyEffect habits={{ sleep, screenTime: screen, studyHours: study, exercise, mood, originalScore: result.s }} />

                 <BreathingExercise />
                 <Journal />
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="footer">
        <div className="footer-msg">
          <span>Small changes today</span> can reshape your entire future.
        </div>
        <div className="footer-mono">FutureYou™ — Habit Forecaster</div>
      </div>
    </>
  );
}