export function score({ sleep, screenTime, studyHours, exercise, mood }) {
  let s = 0, energy = 0, focus = 0, discipline = 0, mental = 0;
  
  if (sleep < 6) { s -= 2; energy -= 2; }
  else if (sleep >= 7) { s += 2; energy += 2; }
  
  if (screenTime > 6) { s -= 2; focus -= 2; }
  else if (screenTime <= 3) { s += 1; focus += 1; }
  
  if (studyHours >= 4) { s += 2; discipline += 2; }
  else if (studyHours >= 2) { s += 1; discipline += 1; }
  
  if (exercise === "yes") { s += 2; mental += 2; energy += 1; }
  
  if (mood === "bad")  { s -= 2; mental -= 2; }
  if (mood === "good") { s += 1; mental += 1; }
  
  return { s, energy, focus, discipline, mental };
}

export function getSmallStep({ sleep, screenTime, studyHours, exercise, mood }) {
  const steps = [];
  
  if (sleep < 6) steps.push("Sleep Debt: Go to bed 15 minutes earlier tonight and leave your phone across the room.");
  if (screenTime > 6) steps.push("Screen Detox: Turn your phone's screen to grayscale for the next 2 hours.");
  if (studyHours < 2) steps.push("Focus Kickstart: Do just 10 minutes of uninterrupted work right now. Set a timer.");
  if (exercise === "no") steps.push("Movement: Stand up and do 10 squats, or stretch your arms for 60 seconds.");
  if (mood === "bad") steps.push("Mental Reset: Write down one tiny thing that went well today, no matter how small.");

  if (steps.length > 0) return steps[0]; 
  
  return "You're doing great! Your small step is simply to maintain this momentum tomorrow.";
}

export const OUTCOMES = {
  positive: {
    type: "positive",
    headline: ["Your future", "looks bright"],
    color: "#BFFF00",
    traits: ["Focused", "Disciplined", "Energized", "Resilient"],
    para: "Your current habits are quietly building something powerful. In 30 days, you'll feel sharper, more driven, and genuinely proud of the consistency you've built. The compounding effect of these choices is larger than you know.",
    micro: [
      { text: "Deeper focus during work & study", col: "#22c55e" },
      { text: "Natural energy throughout the day", col: "#22c55e" },
      { text: "Better emotional regulation under pressure", col: "#22c55e" },
    ],
  },
  neutral: {
    type: "neutral",
    headline: ["Holding", "the line"],
    color: "#FFB830",
    traits: ["Stable", "Inconsistent", "Managing"],
    para: "You're in maintenance mode — not losing ground, not gaining much either. In 30 days you'll feel familiar with this plateau. One or two habit changes could shift the trajectory significantly.",
    micro: [
      { text: "Energy will fluctuate day-to-day", col: "#d97706" },
      { text: "Focus improvable with small changes", col: "#d97706" },
      { text: "Mood likely tied to outside circumstances", col: "#d97706" },
    ],
  },
  negative: {
    type: "negative",
    headline: ["A warning", "from future you"],
    color: "#FF5733",
    traits: ["Burned Out", "Distracted", "Low Energy"],
    para: "If these patterns continue, the next 30 days may feel increasingly heavy. Fatigue and scattered thinking compound — making it harder to find motivation. But you're aware, and awareness is the first step toward change.",
    micro: [
      { text: "Risk of chronic fatigue building", col: "#dc2626" },
      { text: "Difficulty sustaining attention on tasks", col: "#dc2626" },
      { text: "Emotional resilience may feel thin", col: "#dc2626" },
    ],
  },
};