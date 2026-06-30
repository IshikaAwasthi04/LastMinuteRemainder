require("dotenv").config()
const { GoogleGenAI } = require("@google/genai");

console.log(process.env.GEMINI_API_KEY);
const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
});

async function testGemini() {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: "Say Hello from Gemini!",
    });

    console.log(response.text);

  } catch (error) {
    console.log(error);
  }
}

require("dotenv").config();

testGemini();