"use client";

import { useState, useRef, useEffect } from "react";
import { Video, Minus, Plus, Send } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

type Message = {
  role: "user" | "model";
  content: string;
};

export default function RealEstateAssistant() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "model",
      content:
        "Hi! 👋 I'm here to help you with Real Estate AI! Ask me anything about this challenge, video requirements, or any other questions you have.",
    },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  const chatContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [messages, loading]);

  const sendMessage = async () => {
    if (!input.trim()) return;

    const newMessage: Message = { role: "user", content: input };
    setMessages((prev) => [...prev, newMessage]);
    setInput("");
    setLoading(true);

    try {
      const res = await fetch("/api/boat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: [...messages, newMessage] }),
      });

      const data = await res.json();

      const botReply: Message = {
        role: "model",
        content: data.success
          ? data.response
          : "❌ Sorry, something went wrong. Try again.",
      };

      setMessages((prev) => [...prev, botReply]);
    } catch (err) {
      console.error(err);
      setMessages((prev) => [
        ...prev,
        { role: "model", content: " Sorry Try Again" },
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed bottom-4 right-4 w-full max-w-md sm:max-w-sm font-sans z-50">
      {/* Header */}
      <div className="flex items-center justify-between bg-gradient-to-r from-purple-900 to-black text-white p-4 rounded-t-2xl shadow-xl">
        <div className="flex items-center gap-3">
          <motion.div
            animate={isOpen ? { scale: [1, 1.2, 1] } : { scale: 1 }}
            transition={{ repeat: isOpen ? Infinity : 0, duration: 1.5 }}
            className="bg-purple-700 p-2 rounded-full shadow-md"
          >
            <Video className="w-5 h-5 text-white" />
          </motion.div>
          <div>
            <h2 className="font-semibold text-lg">Prop AI Assistant</h2>
            <p className="text-sm text-gray-300">Guide & Support</p>
          </div>
        </div>

        <button
          onClick={() => setIsOpen(!isOpen)}
          className="bg-purple-700 hover:bg-purple-600 rounded-md p-2 transition shadow-md"
        >
          {isOpen ? <Minus className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
        </button>
      </div>

      {/* Chat Body */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 50 }}
            transition={{ duration: 0.3 }}
            className="bg-gradient-to-b from-black via-purple-950 to-black rounded-b-2xl shadow-xl flex flex-col h-[70vh] max-h-[600px] border border-purple-900"
          >
            {/* Messages */}
            <div
              ref={chatContainerRef}
              className="flex-1 overflow-y-auto p-4 space-y-4 scrollbar-thin scrollbar-thumb-purple-700 scrollbar-track-black"
            >
              {messages.map((m, i) => (
                <div
                  key={i}
                  className={`flex items-start gap-3 ${
                    m.role === "user" ? "justify-end" : "justify-start"
                  }`}
                >
                  {m.role === "model" && (
                    <div className="bg-purple-700 p-2 rounded-full">
                      <Video className="w-5 h-5 text-white" />
                    </div>
                  )}
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.2 }}
                    className={`p-3 max-w-[75%] rounded-2xl text-sm leading-relaxed shadow-md ${
                      m.role === "user"
                        ? "bg-purple-600 text-white rounded-br-none"
                        : "bg-gray-800 text-purple-100 rounded-bl-none"
                    }`}
                  >
                    {m.content}
                  </motion.div>
                  {m.role === "user" && (
                    <div className="bg-purple-600 p-2 rounded-full">
                      <Video className="w-5 h-5 text-white" />
                    </div>
                  )}
                </div>
              ))}
              {loading && (
                <div className="text-purple-300 text-sm animate-pulse">Thinking...</div>
              )}
            </div>

            {/* Input area */}
            <div className="border-t border-purple-800 p-3 flex items-center gap-2 bg-black">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Type your message..."
                className="flex-1 bg-gray-900 text-white placeholder-gray-400 rounded-xl px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-600"
                onKeyDown={(e) => e.key === "Enter" && sendMessage()}
              />
              <button
                onClick={sendMessage}
                className="bg-purple-700 hover:bg-purple-600 p-2 rounded-full transition shadow-md"
              >
                <Send className="w-5 h-5 text-white" />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
