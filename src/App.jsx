import React, { useState } from "react";
import User from "./components/User";
import Chatbot from "./components/Chatbot";
import { GoogleGenAI } from "@google/genai";
import CircularProgress from "@mui/material/CircularProgress";

const ai = new GoogleGenAI({
  apiKey: import.meta.env.VITE_GEMINI_API_KEY,
});

function App() {
  const [userInput, setUserInput] = useState("");
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(false);

  async function handleChat(e) {
    e.preventDefault();
    setLoading(true);

    const userMessage = { role: "user", text: userInput };

    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: `
ANSWER IN MARKDOWN FORMAT ONLY.

FORMAT (FOLLOW EXACTLY):
1. First item
2. Second item
3. Third item

RULES:
- Use numbered list (1., 2., 3.)
- Maximum 3 items
- Each item must be one sentence
- Do not add any text before or after the list

QUESTION:

${userInput}
`,
    });

    const botMessage = {
      role: "model",
      text: response.text,
    };

    setHistory((prev) => [...prev, userMessage, botMessage]);
    setUserInput("");
    setLoading(false);
  }

  return (
    <div className="max-w-2xl mx-auto mt-60 p-4 border border-blue-700 rounded-lg ">
      <h1 className=" text-2xl font-bold">Chatbot</h1>

      {history.map((msg, i) =>
        msg.role === "user" ? (
          <User key={i} text={msg.text} />
        ) : (
          <Chatbot key={i} text={msg.text} />
        )
      )}

      <form onSubmit={handleChat}>
        <input
          value={userInput}
          onChange={(e) => setUserInput(e.target.value)}
          className="border border-blue-700 rounded-lg p-2 w-full mt-4"
        />
        <button
          className={`m-auto mt-4 flex bg-blue-500 text-white px-2 w-37.5 rounded h-11.5 items-center justify-center ${
            loading ? "pointer-events-none opacity-50" : "pointer-events-auto"
          }`}
          disabled={loading}
          type="submit"
        >
          {loading ? (
            <CircularProgress color="secondary" size="30px" />
          ) : (
            "Send"
          )}
        </button>
      </form>
    </div>
  );
}

export default App;
