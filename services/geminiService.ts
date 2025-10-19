import { GoogleGenAI, Type } from "@google/genai";

// Get the API key from environment variables
const apiKey = import.meta.env.VITE_GEMINI_API_KEY;
if (!apiKey) {
  console.error("Google Gemini API key is not set. Please check your .env file.");
  throw new Error("Google Gemini API key is not configured. Please set VITE_GEMINI_API_KEY in your .env file.");
}

const ai = new GoogleGenAI({ apiKey });

export const generateContent = async (prompt: string): Promise<string> => {
  try {
    const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: prompt,
        config: {
            systemInstruction: "You are Content Wizard, an expert AI assistant for content creators. Your goal is to generate high-quality, creative, and ready-to-use content based on user prompts. Provide well-structured and engaging text.",
        }
    });
    return response.text;
  } catch (error) {
    console.error("Error generating content from Gemini API:", error);
    if (error instanceof Error) {
        return `An error occurred while generating content: ${error.message}`;
    }
    return "An unknown error occurred while generating content.";
  }
};

export const generateTaskListForProject = async (projectName: string, projectDescription: string): Promise<string[]> => {
    try {
        const prompt = `For a project named "${projectName}" with the description "${projectDescription}", generate a list of common high-level tasks needed for completion. Focus on key phases like planning, design, development, testing, and launch. Return only a JSON object with a single key "tasks" which is an array of strings, where each string is a task name. Example: ["Plan project timeline", "Design UI/UX mockups", "Develop frontend components"].`;

        const response = await ai.models.generateContent({
            model: 'gemini-2.5-flash',
            contents: prompt,
            config: {
                responseMimeType: "application/json",
                responseSchema: {
                    type: Type.OBJECT,
                    properties: {
                        tasks: {
                            type: Type.ARRAY,
                            items: {
                                type: Type.STRING,
                            },
                        },
                    },
                },
            },
        });

        const jsonStr = response.text;
        const result = JSON.parse(jsonStr);
        return result.tasks || [];
    } catch (error) {
        console.error("Error generating task list from Gemini API:", error);
        throw error;
    }
};
