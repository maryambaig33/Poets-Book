import { GoogleGenAI, Type } from "@google/genai";
import { LIBRARIAN_SYSTEM_INSTRUCTION } from "../constants";
import { Book } from "../types";

// Initialize the Gemini Client
// CRITICAL: We use the Flash model for responsiveness in this interactive app.
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const chatWithLibrarian = async (history: { role: string; text: string }[], newMessage: string) => {
  try {
    const chat = ai.chats.create({
      model: 'gemini-2.5-flash',
      config: {
        systemInstruction: LIBRARIAN_SYSTEM_INSTRUCTION,
        temperature: 0.7, // Slightly creative
      },
      history: history.map(h => ({ role: h.role, parts: [{ text: h.text }] })),
    });

    const response = await chat.sendMessage({ message: newMessage });
    return response.text;
  } catch (error) {
    console.error("Gemini Chat Error:", error);
    throw new Error("The librarian is currently deep in the stacks. Please try again.");
  }
};

export const getMoodBasedRecommendations = async (mood: string): Promise<Book[]> => {
  try {
    const prompt = `
      The user is feeling: "${mood}".
      Recommend 3 distinct poetry books that match this mood. 
      They can be real books.
      Return a JSON array of objects with the following schema:
      {
        "title": "Book Title",
        "author": "Author Name",
        "description": "A 1-sentence reason why this fits the mood.",
        "tags": ["tag1", "tag2"]
      }
    `;

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.ARRAY,
          items: {
            type: Type.OBJECT,
            properties: {
              title: { type: Type.STRING },
              author: { type: Type.STRING },
              description: { type: Type.STRING },
              tags: { type: Type.ARRAY, items: { type: Type.STRING } },
            },
            required: ["title", "author", "description", "tags"],
          },
        },
      },
    });

    const rawBooks = JSON.parse(response.text || '[]');
    
    // Map to our Book interface, adding placeholder data for missing fields
    return rawBooks.map((b: any, index: number) => ({
      id: `rec-${index}-${Date.now()}`,
      title: b.title,
      author: b.author,
      description: b.description,
      tags: b.tags,
      price: 15.00 + Math.floor(Math.random() * 15), // Random price between 15 and 30
      coverUrl: `https://picsum.photos/seed/${b.title.replace(/\s/g, '')}/300/450`, // Consistent seed based on title
    }));

  } catch (error) {
    console.error("Recommendation Error:", error);
    return [];
  }
};

export const analyzePoem = async (poemText: string) => {
  try {
    const prompt = `Analyze the following poem fragment or text. Provide the tone, key themes, and a brief critique.`;

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: {
        parts: [
            { text: prompt },
            { text: poemText }
        ]
      },
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            tone: { type: Type.STRING },
            themes: { type: Type.ARRAY, items: { type: Type.STRING } },
            structure: { type: Type.STRING },
            critique: { type: Type.STRING },
          },
        }
      }
    });

    return JSON.parse(response.text || '{}');
  } catch (error) {
    console.error("Analysis Error:", error);
    throw error;
  }
};
