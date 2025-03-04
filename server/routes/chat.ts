import OpenAI from "openai";
import { Router } from "express";

const router = Router();

// Initialize OpenAI with the API key from environment variables
const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

router.post("/api/chat", async (req, res) => {
  try {
    const { message } = req.body;

    if (!message) {
      return res.status(400).json({ 
        status: 'error',
        error: 'Message is required' 
      });
    }

    const response = await openai.chat.completions.create({
      model: "gpt-4", 
      messages: [
        {
          role: "system",
          content: "You are a helpful AI assistant for the SalesBoost AI platform. You help users with analytics, sales strategies, and platform usage questions."
        },
        { role: "user", content: message }
      ],
      temperature: 0.7,
      max_tokens: 500
    });

    res.json({ 
      reply: response.choices[0].message.content,
      status: 'success' 
    });
  } catch (error) {
    console.error('Chat API Error:', error);
    res.status(500).json({ 
      error: 'Failed to get response from AI',
      status: 'error',
      details: error.message
    });
  }
});

export default router;