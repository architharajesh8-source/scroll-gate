// promptGenerator.js

/**
 * Takes the raw user profile answers and constructs a clean prompt string
 * for an AI generation engine or API call.
 */
export function generateAIVideoPrompt(userProfile) {
  if (!userProfile) return "";

  // 1. Extract the goals data (handle custom vs standard)
  const goalData = userProfile.goals;
  const goalText = goalData.customText ? goalData.customText : `Focusing on: ${goalData.tag}`;

  // 2. Extract the obstacles data (handle custom vs standard)
  const obstacleData = userProfile.obstacles;
  const obstacleText = obstacleData.customText ? obstacleData.customText : `Overcoming: ${obstacleData.tag}`;

  // 3. Extract learning style
  const learningStyle = userProfile.learning_style?.tag || "general";

  // 4. Construct the blueprint prompt string
  const completePrompt = `Create a high-impact, short-form video tailored for a user whose learning style is "${learningStyle}". The target objective is: "${goalText}". The content must explicitly address and provide strategies to overcome this obstacle: "${obstacleText}". Ensure the video delivers actionable takeaways within the first 10 seconds to combat doom-scrolling.`;

  return completePrompt;
}
