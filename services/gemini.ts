import { GoogleGenAI, Type } from "@google/genai";
import { BowlerType, Line, Length, ShotAdvice } from "../types";

const apiKey = process.env.API_KEY || '';
const ai = new GoogleGenAI({ apiKey });

export const getShotAdvice = async (
  bowler: BowlerType,
  line: Line,
  length: Length
): Promise<ShotAdvice> => {
  const model = "gemini-2.5-flash";

  const prompt = `
    You are an expert cricket batting coach.
    A Right Handed Batsman (RHB) is facing a delivery.
    
    Condition:
    - Bowler Type: ${bowler}
    - Line: ${line}
    - Length: ${length}

    Suggest the single best, most effective orthodox cricket shot for this specific delivery.
    Calculate the angle of the shot relative to the pitch.
    Coordinate system for angle:
    - 0 degrees: Straight drive (towards bowler)
    - 45 degrees: Mid-off / Extra Cover
    - 90 degrees: Point / Cover (Off-side square)
    - 135 degrees: Third Man
    - 180 degrees: Behind the keeper (Scoop/Ramp)
    - 225 degrees: Fine Leg
    - 270 degrees: Square Leg / Mid Wicket (Leg-side square)
    - 315 degrees: Mid-on

    Return the response in strict JSON format.
  `;

  try {
    const response = await ai.models.generateContent({
      model,
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            shotName: { type: Type.STRING, description: "Name of the cricket shot" },
            description: { type: Type.STRING, description: "Brief explanation of why this shot is chosen" },
            executionTips: { 
              type: Type.ARRAY, 
              items: { type: Type.STRING },
              description: "List of 2-3 key technical tips to execute the shot"
            },
            riskLevel: { type: Type.STRING, enum: ["Low", "Medium", "High"] },
            placementAngle: { type: Type.NUMBER, description: "Angle in degrees (0-360) for visual placement" },
            fieldingRegion: { type: Type.STRING, description: "Name of the fielding position where ball is likely to go" }
          },
          required: ["shotName", "description", "executionTips", "riskLevel", "placementAngle", "fieldingRegion"]
        }
      }
    });

    const text = response.text;
    if (!text) throw new Error("No response from Gemini");

    return JSON.parse(text) as ShotAdvice;
  } catch (error) {
    console.error("Gemini API Error:", error);
    // Fallback in case of error (though UI handles loading state)
    throw error;
  }
};
