"use client";

import React, { useState, useRef, useEffect } from "react";
import Header from "../_components/Header";

type Message = {
  id: string;
  role: "user" | "assistant";
  text: string;
};

export default function Dashboard() {
  const [messages, setMessages] = useState<Message[]>([
    { id: "1", role: "assistant", text: "Hello — I\u2019m MedoBoto. How can I help you today?" },
  ]);
  const [input, setInput] = useState("");
  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  function sendMessage() {
    const trimmed = input.trim();
    if (!trimmed) return;

    const userMsg: Message = {
      id: String(Date.now()),
      role: "user",
      text: trimmed,
    };

    setMessages((m) => [...m, userMsg]);
    setInput("");

    // Simulate assistant response (placeholder). Replace with real API call later.
    setTimeout(() => {
      const reply: Message = {
        id: String(Date.now() + 1),
        role: "assistant",
        text: `You said: "${trimmed}" — (this is a simulated reply).`,
      };
      setMessages((m) => [...m, reply]);
    }, 700);
  }

  function handleKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === "Enter") {
      e.preventDefault();
      sendMessage();
    }
  }

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      <Header />

      <main className="max-w-3xl mx-auto p-4 h-[80vh] flex flex-col">
        <div className="flex-1 overflow-auto bg-white rounded-lg shadow p-4">
          <div className="space-y-4">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
              >
                <div
                  className={`max-w-[80%] px-4 py-2 rounded-lg leading-relaxed whitespace-pre-wrap ${
                    msg.role === "user"
                      ? "bg-indigo-600 text-white rounded-br-none"
                      : "bg-gray-100 text-slate-900 rounded-bl-none"
                  }`}
                >
                  {msg.text}
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>
        </div>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            sendMessage();
          }}
          className="mt-4 flex items-center gap-2"
        >
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Type a message..."
            className="flex-1 rounded-md border border-slate-200 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-400"
            aria-label="Message"
          />
          <button
            type="submit"
            className="inline-flex items-center gap-2 bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700"
          >
            Send
          </button>
        </form>
      </main>
    </div>
  );
}