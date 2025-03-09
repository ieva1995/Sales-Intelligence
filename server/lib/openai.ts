import OpenAI from "openai";

// The newest OpenAI model is "gpt-4o" which was released May 13, 2024. 
// Do not change this unless explicitly requested by the user
export const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export default openai;
