# 🔮 FutureYou: The Predictive Habit Forecaster  
**Live Project:** https://futureyouproject.vercel.app/  

*Built for the Predict4Good Hackathon*

---

## The Problem

We are all authors of our own futures, yet we write the most important chapters completely blind.  

Every day, we navigate complex, grey areas of decision-making. We compromise on sleep, doomscroll for comfort, and promise ourselves we’ll do better tomorrow. Individually, these micro-choices feel harmless — but over time, they compound into burnout, declining mental health, and lost potential.  

The core issue is this: **the future is invisible.**  

Traditional habit trackers only reflect the past. Without visibility into long-term consequences, it becomes incredibly difficult to stay motivated and make meaningful change.

---

## The Solution

**FutureYou** is a predictive intervention engine that bridges the gap between today’s actions and tomorrow’s outcomes. It doesn’t judge your imperfections — it *illuminates* them.  

By inputting daily metrics (Sleep, Screen Time, Focus, Exercise, and Mood), the system calculates a holistic **Habit Score** and projects it across a 30-day timeline.  

But prediction alone isn’t enough. FutureYou immediately pivots from insight to action — providing tools to help users rewrite their trajectory *before* it unfolds.

---

## Key Features

### Butterfly Effect Sandbox  
A real-time simulator where users adjust a single habit and instantly see how their 30-day future changes — demonstrating how small actions compound into major outcomes.

### 30-Day Trajectory Engine  
A visual, data-driven forecast that makes the invisible future tangible and easy to understand.

### One Small Step Generator  
Instead of overwhelming users, the system identifies the weakest habit and generates one simple, achievable action for today.

### Message to Future You (Audio Pledge)  
Using the browser’s native `MediaRecorder API`, users record a voice commitment to themselves — increasing accountability through self-reflection.

### “Send to Void” Journaling & Reset  
Built-in emotional regulation tools, including:
- A 60-second breathing pacer  
- A disappearing journal for safe emotional release  

---

## Tech Stack

- **Frontend:** React.js  
- **Styling:** CSS3 (Variables, Animations, Flexbox/Grid)  
- **Logic:** Custom predictive engine (`engine.js`)  
- **APIs:**  
  - `SpeechSynthesis`  
  - `MediaRecorder`  
- **Deployment:** Vercel  
- **Storage:** Browser `localStorage`  

---

## Run Locally

```bash
git clone https://github.com/YourUsername/predict4good.git
cd predict4good
npm install
npm start
