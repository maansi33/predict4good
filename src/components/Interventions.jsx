import React, { useState, useEffect, useRef } from 'react';
import { score, OUTCOMES } from '../utils/engine';
import { Slider } from './UIComponents';

export function AudioMessage() {
  const [isRecording, setIsRecording] = useState(false);
  const [audioURL, setAudioURL] = useState(null);
  const mediaRecorderRef = useRef(null);
  const audioChunksRef = useRef([]);

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      mediaRecorderRef.current = new MediaRecorder(stream);
      
      mediaRecorderRef.current.ondataavailable = (event) => {
        audioChunksRef.current.push(event.data);
      };

      mediaRecorderRef.current.onstop = () => {
        const audioBlob = new Blob(audioChunksRef.current, { type: 'audio/wav' });
        const url = URL.createObjectURL(audioBlob);
        setAudioURL(url);
        audioChunksRef.current = []; // reset for next recording
      };

      mediaRecorderRef.current.start();
      setIsRecording(true);
    } catch (err) {
      alert("Microphone access is needed to record your message!");
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
      // Turn off the microphone hardware light
      mediaRecorderRef.current.stream.getTracks().forEach(track => track.stop());
    }
  };

  return (
    <div className="journal-card" style={{ background: 'var(--sky)', marginBottom: '24px' }}>
      <h3 style={{fontFamily: 'Unbounded', marginBottom: '8px', fontSize: '13px', textTransform: 'uppercase', color: 'var(--ink)'}}>
        Message to Future You
      </h3>
      <p style={{ fontSize: '13px', marginBottom: '16px', lineHeight: 1.5, color: 'var(--ink)' }}>
        Record a daily motivational voice note. Play it back every morning to lock in your trajectory.<br/>
        <span style={{ color: '#444', fontSize: '11px', fontStyle: 'italic', display: 'inline-block', marginTop: '6px' }}>
          e.g., "Hey Future Maansi, remember why we decided to change our habits today..."
        </span>
      </p>

      {!audioURL ? (
        <button 
          onMouseDown={startRecording} 
          onMouseUp={stopRecording}
          onMouseLeave={stopRecording}
          onTouchStart={startRecording}
          onTouchEnd={stopRecording}
          className="void-btn" 
          style={{ background: isRecording ? 'var(--coral)' : 'var(--ink)', marginTop: 0 }}
        >
          {isRecording ? "🔴 Recording... (Release to stop)" : "Hold to Record Message 🎙️"}
        </button>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          <audio src={audioURL} controls style={{ width: '100%', height: '40px' }} />
          <button onClick={() => setAudioURL(null)} style={{ background: 'transparent', border: 'none', color: '#555', cursor: 'pointer', fontSize: '11px', textDecoration: 'underline', fontFamily: 'Syne Mono' }}>
            Discard & Re-record
          </button>
        </div>
      )}
    </div>
  );
}

export function BreathingExercise() {
  const [isActive, setIsActive] = useState(false);
  const [timeLeft, setTimeLeft] = useState(60);

  useEffect(() => {
    let interval;
    if (isActive && timeLeft > 0) {
      interval = setInterval(() => { setTimeLeft((prev) => prev - 1); }, 1000);
    } else if (timeLeft === 0) {
      setIsActive(false); setTimeLeft(60); 
    }
    return () => clearInterval(interval);
  }, [isActive, timeLeft]);

  return (
    <div className="breathe-card">
      <h3 style={{fontFamily: 'Unbounded', marginBottom: '8px', fontSize: '14px', textTransform: 'uppercase'}}>Reset Your Nervous System</h3>
      {isActive ? (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '16px' }}>
            <div className="breathe-circle">Breathe</div>
            <div style={{ fontFamily: 'Syne Mono', fontSize: '14px', color: 'var(--ink)' }}>{timeLeft}s remaining</div>
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
    setTimeout(() => { setEntry(""); setIsSent(false); }, 2500);
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
            <textarea className="journal-textarea" placeholder="Type your thoughts here..." value={entry} onChange={(e) => setEntry(e.target.value)} />
            <button className="void-btn" onClick={sendToVoid} disabled={!entry.trim()}>Send to Void ☄️</button>
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

export function ButterflyEffect({ habits }) {
  let targetKey = "screenTime"; let label = "Screen Time"; let icon = "📱"; let min = 0; let max = 12; let unit = "h";
  let colorFn = v => v > 6 ? "red" : v <= 3 ? "green" : "yellow";

  if (habits.sleep < 6) { 
     targetKey = "sleep"; label = "Sleep"; icon = "🌙"; max = 10; 
     colorFn = v => v < 6 ? "red" : v >= 7 ? "green" : "yellow";
  } else if (habits.screenTime > 6) { 
     targetKey = "screenTime"; label = "Screen Time"; icon = "📱"; max = 12;
     colorFn = v => v > 6 ? "red" : v <= 3 ? "green" : "yellow";
  } else if (habits.studyHours < 3) {
     targetKey = "studyHours"; label = "Study / Work"; icon = "📚"; max = 12;
     colorFn = v => v >= 4 ? "green" : v >= 2 ? "yellow" : "neutral";
  }

  const [val, setVal] = useState(habits[targetKey]);

  const simulatedHabits = { ...habits, [targetKey]: val };
  const sim = score(simulatedHabits);
  const outcomeKey = sim.s >= 3 ? "positive" : sim.s <= -3 ? "negative" : "neutral";
  const out = OUTCOMES[outcomeKey];
  const diff = sim.s - habits.originalScore;

  return (
    <div className="butterfly-card">
      <div className="butterfly-header"><span className="emoji">🦋</span> The Butterfly Effect</div>
      <p className="butterfly-sub">Move the slider to see how changing just one habit alters your timeline.</p>
      
      <div style={{ background: 'var(--white)', padding: '20px', borderRadius: '12px', marginBottom: '16px', border: '2px solid var(--ink)' }}>
        <Slider icon={icon} label={label} value={val} min={min} max={max} unit={unit} onChange={setVal} colorFn={colorFn} />
      </div>

      <div className={`butterfly-result is-${out.type}`}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
          <div className="butterfly-sim-title">Simulated Future</div>
          <div className="butterfly-diff">{diff > 0 ? `+${diff} pts gained` : diff < 0 ? `${diff} pts lost` : "No change"}</div>
        </div>
        <div style={{ fontFamily: 'Unbounded', fontSize: '18px', fontWeight: 900, textTransform: 'uppercase', color: 'var(--ink)' }}>
          {out.headline[0]} {out.headline[1]}
        </div>
      </div>
    </div>
  );
}