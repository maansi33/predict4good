import React, { useState, useEffect } from 'react';

export function BreathingExercise() {
  const [isActive, setIsActive] = useState(false);
  const [timeLeft, setTimeLeft] = useState(60);

  useEffect(() => {
    let interval;
    if (isActive && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
    } else if (timeLeft === 0) {
      setIsActive(false);
      setTimeLeft(60); 
    }
    return () => clearInterval(interval);
  }, [isActive, timeLeft]);

  return (
    <div className="breathe-card">
      <h3 style={{fontFamily: 'Unbounded', marginBottom: '8px', fontSize: '14px', textTransform: 'uppercase'}}>Reset Your Nervous System</h3>
      
      {isActive ? (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '16px' }}>
            <div className="breathe-circle">Breathe</div>
            <div style={{ fontFamily: 'Syne Mono', fontSize: '14px', color: 'var(--ink)' }}>
              {timeLeft}s remaining
            </div>
        </div>
      ) : (
        <>
            <p style={{ fontSize: '12px', color: '#555', marginBottom: '24px' }}>Take exactly 60 seconds to reset.</p>
            <button className="gen-btn" style={{marginTop: 0, width: 'auto', padding: '12px 24px'}} onClick={() => setIsActive(true)}>
              Start 1-Minute Reset
            </button>
        </>
      )}
    </div>
  );
}

export function Journal() {
  const [entry, setEntry] = useState("");
  const [isSent, setIsSent] = useState(false);
  const prompt = "What is one small choice you can make today to shift your trajectory?";

  const sendToVoid = () => {
    if (!entry.trim()) return;
    setIsSent(true);
    setTimeout(() => {
      setEntry("");
      setIsSent(false);
    }, 2500);
  };

  return (
    <div className="journal-card">
      <div className="journal-prompt">↳ {prompt}</div>
      
      {isSent ? (
        <div className="void-success">
           <span style={{ fontSize: '24px' }}>✨</span>
           <p>Your thought has been released into the void.</p>
        </div>
      ) : (
        <>
            <textarea 
              className="journal-textarea" 
              placeholder="Type your thoughts here..."
              value={entry}
              onChange={(e) => setEntry(e.target.value)}
            />
            <button className="void-btn" onClick={sendToVoid} disabled={!entry.trim()}>
                Send to Void ☄️
            </button>
        </>
      )}
    </div>
  );
}

export function SmallStep({ text }) {
  return (
    <div className="small-step-card">
      <div className="step-label">🎯 One Small Step Today</div>
      <p className="step-text">{text}</p>
    </div>
  );
}