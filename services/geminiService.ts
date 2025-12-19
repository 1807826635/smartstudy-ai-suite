
import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });

export const getAIResponse = async (prompt: string, context?: string) => {
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: context 
        ? `Context of the document: "${context}"\n\nUser Question: ${prompt}`
        : prompt,
      config: {
        systemInstruction: "You are SmartStudy Assistant, an expert academic tutor and document editor. Help students with their assignments, suggest improvements, check grammar, and answer questions accurately. Keep responses concise and educational.",
        temperature: 0.7,
      },
    });
    return response.text;
  } catch (error) {
    console.error("AI Response Error:", error);
    return "I'm sorry, I'm having trouble connecting right now. Please try again.";
  }
};
