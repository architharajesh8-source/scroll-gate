// quizData.js
export const quizQuestions = [
  {
    id: "goals",
    title: "What is your primary focus right now?",
    options: [
      { label: "Changing my body / Fitness", tag: "fitness" },
      { label: "Getting smarter / Learning", tag: "intellect" },
      { label: "Building a career / Wealth", tag: "career" },
      { label: "Other", tag: "custom_goal", requiresInput: true }
    ]
  },
  {
    id: "obstacles",
    title: "What is your biggest obstacle?",
    options: [
      { label: "Procrastination & Screen time", tag: "procrastination" },
      { label: "Lack of energy / Burnout", tag: "fatigue" },
      { label: "Other", tag: "custom_obstacle", requiresInput: true }
    ]
  },
  {
    id: "learning_style",
    title: "How do you learn best?",
    options: [
      { label: "Visual (Animations / Diagrams)", tag: "visual" },
      { label: "Auditory (Podcast style / Speech)", tag: "auditory" },
      { label: "Actionable (Step-by-step breakdowns)", tag: "practical" }
    ]
  }
];
