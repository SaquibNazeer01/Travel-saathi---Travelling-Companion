
import { GoogleGenAI, Type } from "@google/genai";
import { LatLng, TravelResponse, TransportMode } from "../types";

export const getTravelSuggestions = async (
  origin: string,
  destination: string,
  location?: LatLng
): Promise<TravelResponse> => {
  // Initialize the Gemini API client using the environment variable directly.
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  
  const prompt = `You are TravelSaathi, a world-class Indian travel expert and logistics architect. Plan a journey from "${origin}" to "${destination}".
  
  Your goal is to provide "Completely detailed and efficient guidance". 
  
  For each route option:
  1. Specify EXACTLY where the user needs to change vehicles (e.g., "Get off at Gate 2 of ISBT Kashmiri Gate and walk to the local bus stand on the left").
  2. Compare efficiency: Explain which route saves time vs. which saves money.
  3. Availability: Confirm if Cabs (Ola/Uber), Autos, or local RTC buses are reliably available at transfer points.
  4. Local Nuances: Mention specific train names (Vande Bharat, Rajdhani, Shatabdi) or specific bus types (Electric AC, Sleeper, Volvo).
  
  Provide a 'comprehensiveReport' that summarizes the best overall strategy for this trip considering the current climate and typical Indian transit delays.`;

  try {
    // Using gemini-3-pro-preview for complex multi-modal travel planning.
    const response = await ai.models.generateContent({
      model: "gemini-3-pro-preview",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            origin: { type: Type.STRING },
            destination: { type: Type.STRING },
            comprehensiveReport: { type: Type.STRING, description: "Detailed narrative analysis of the best travel strategy." },
            routes: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  id: { type: Type.STRING },
                  label: { type: Type.STRING },
                  totalDuration: { type: Type.STRING },
                  totalCost: { type: Type.STRING },
                  summary: { type: Type.STRING },
                  efficiencyScore: { type: Type.NUMBER },
                  whyEfficient: { type: Type.STRING },
                  segments: {
                    type: Type.ARRAY,
                    items: {
                      type: Type.OBJECT,
                      properties: {
                        mode: { type: Type.STRING, enum: Object.values(TransportMode) },
                        from: { type: Type.STRING },
                        to: { type: Type.STRING },
                        duration: { type: Type.STRING },
                        cost: { type: Type.STRING },
                        instructions: { type: Type.STRING },
                        transferDetails: { type: Type.STRING, description: "Specific instructions on where and how to switch to the next mode." },
                      },
                      required: ["mode", "from", "to", "instructions"]
                    }
                  }
                },
                required: ["id", "label", "totalDuration", "segments", "efficiencyScore", "whyEfficient"]
              }
            },
            proTips: { type: Type.ARRAY, items: { type: Type.STRING } },
            destinationWeatherInfo: { type: Type.STRING }
          },
          required: ["origin", "destination", "routes", "proTips", "comprehensiveReport"]
        }
      },
    });

    // Use the .text property to access the response body directly.
    const responseText = response.text || "{}";
    const data = JSON.parse(responseText);
    const chunks = response.candidates?.[0]?.groundingMetadata?.groundingChunks || [];

    return { data, chunks };
  } catch (error) {
    console.error("Gemini API Error:", error);
    throw error;
  }
};
