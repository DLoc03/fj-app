import { GoogleGenAI } from "@google/genai";
import { GEMINI_MODEL } from "../utils/constant.js";
import { SOCKET_ENUM } from "../utils/enum.js";

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_KEY,
});

export default async function streamDataResponse(message, callback) {
  const response = await ai.models.generateContentStream({
    model: GEMINI_MODEL,
    contents: message,
  });
  for await (const chunk of response) {
    callback(chunk.text);
  }
  callback(SOCKET_ENUM.END);
}
