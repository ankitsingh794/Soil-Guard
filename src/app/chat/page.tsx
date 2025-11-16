'use client';

import React, { useState, useRef, useEffect } from 'react';
import { Send, Sparkles, Loader2, ArrowLeft, Leaf } from 'lucide-react';
import Button from '@/components/ui/Button';
import Link from 'next/link';

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'bot';
  timestamp: Date;
}

export default function ChatPage() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: "Hello! I'm your Soil Guard AI assistant. I can help you find the perfect soil for your needs. What type of project are you working on?",
      sender: 'bot',
      timestamp: new Date(),
    },
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const quickPrompts = [
    'I need soil for my garden',
    'Best soil for indoor plants',
    'Soil for lawn maintenance',
    'Agricultural soil solutions',
    'Soil testing services',
    'Organic compost options',
  ];

  const handleSend = async () => {
    if (!inputValue.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputValue,
      sender: 'user',
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputValue('');
    setIsLoading(true);

    // Simulate AI response
    setTimeout(() => {
      const botResponse = generateResponse(inputValue);
      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: botResponse,
        sender: 'bot',
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, botMessage]);
      setIsLoading(false);
    }, 1500);
  };

  const handleQuickPrompt = (prompt: string) => {
    setInputValue(prompt);
  };

  const generateResponse = (input: string): string => {
    const lowerInput = input.toLowerCase();

    if (lowerInput.includes('garden') || lowerInput.includes('backyard')) {
      return "Great! For garden projects, I recommend our Premium Garden Soil Mix. It's enriched with organic matter and perfect for vegetables, flowers, and shrubs. Would you like to know more about specific products or see our garden soil collection?";
    }

    if (lowerInput.includes('indoor') || lowerInput.includes('houseplant')) {
      return "Perfect! For indoor plants, our Indoor Potting Mix is specially formulated with excellent drainage and aeration. It's lightweight and prevents root rot. Would you like to see our indoor plant soil options?";
    }

    if (lowerInput.includes('lawn') || lowerInput.includes('grass')) {
      return "For lawn care, I recommend our Lawn Soil Blend. It promotes healthy root growth and improves drainage. We also have topsoil options for leveling. What's your lawn size?";
    }

    if (lowerInput.includes('test') || lowerInput.includes('analysis')) {
      return "We offer professional soil testing services starting at ₹1,499! Our tests analyze pH, NPK levels, organic matter, and more. Would you like to book a soil test or learn about our testing packages?";
    }

    if (lowerInput.includes('organic') || lowerInput.includes('compost')) {
      return "Our organic compost is rich in nutrients and perfect for enriching soil naturally. It improves soil structure and water retention. Would you like to see our compost products or learn about application methods?";
    }

    if (lowerInput.includes('agriculture') || lowerInput.includes('farm')) {
      return "For agricultural use, we offer bulk quantities of specialized soil blends. Our agricultural solutions are designed for optimal crop yield. What crops are you planning to grow?";
    }

    if (lowerInput.includes('price') || lowerInput.includes('cost')) {
      return "Our products range from ₹299 to ₹4,999 depending on the type and quantity. We also offer free shipping on orders above ₹2,000. Would you like to see products within a specific price range?";
    }

    return "I'd be happy to help you find the right soil solution! Could you tell me more about your project? For example: Are you working on a garden, lawn, indoor plants, or agricultural project? Or would you like to explore our product categories?";
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 relative overflow-hidden">
      {/* Animated background effects */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl animate-pulse-slow" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl animate-pulse-slow" style={{ animationDelay: '1s' }} />
        <div className="absolute top-1/2 left-1/2 w-96 h-96 bg-green-500/10 rounded-full blur-3xl animate-pulse-slow" style={{ animationDelay: '2s' }} />
        
        {/* Floating particles */}
        <div className="absolute top-20 left-20 w-2 h-2 bg-purple-400 rounded-full animate-float" />
        <div className="absolute top-40 right-40 w-3 h-3 bg-blue-400 rounded-full animate-float" style={{ animationDelay: '0.5s' }} />
        <div className="absolute bottom-40 left-60 w-2 h-2 bg-green-400 rounded-full animate-float" style={{ animationDelay: '1s' }} />
        <div className="absolute bottom-60 right-20 w-3 h-3 bg-purple-400 rounded-full animate-float" style={{ animationDelay: '1.5s' }} />
      </div>

      {/* Header */}
      <header className="relative z-10 border-b border-white/10 bg-black/20 backdrop-blur-xl">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Link href="/">
                <Button variant="ghost" size="sm" className="text-white hover:bg-white/10">
                  <ArrowLeft className="w-5 h-5" />
                </Button>
              </Link>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-blue-500 rounded-xl flex items-center justify-center">
                  <Sparkles className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h1 className="text-xl font-bold text-white">Soil Guard AI Assistant</h1>
                  <p className="text-sm text-purple-300">Powered by Advanced AI</p>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <div className="flex items-center gap-2 px-3 py-1.5 bg-green-500/20 border border-green-500/30 rounded-full">
                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                <span className="text-sm text-green-300">Online</span>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main chat area */}
      <main className="relative z-10 container mx-auto px-4 py-6 max-w-5xl h-[calc(100vh-200px)]">
        <div className="h-full flex flex-col bg-black/30 backdrop-blur-xl rounded-2xl border border-white/10 shadow-2xl overflow-hidden">
          {/* Messages area */}
          <div className="flex-1 overflow-y-auto p-6 space-y-6">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex gap-4 ${message.sender === 'user' ? 'flex-row-reverse' : ''}`}
              >
                {/* Avatar */}
                <div
                  className={`flex-shrink-0 w-10 h-10 rounded-xl flex items-center justify-center ${
                    message.sender === 'bot'
                      ? 'bg-gradient-to-br from-purple-500 to-blue-500'
                      : 'bg-gradient-to-br from-green-500 to-emerald-500'
                  }`}
                >
                  {message.sender === 'bot' ? (
                    <Sparkles className="w-5 h-5 text-white" />
                  ) : (
                    <Leaf className="w-5 h-5 text-white" />
                  )}
                </div>

                {/* Message bubble */}
                <div
                  className={`flex-1 max-w-[70%] ${
                    message.sender === 'user' ? 'items-end' : 'items-start'
                  }`}
                >
                  <div
                    className={`px-6 py-4 rounded-2xl ${
                      message.sender === 'bot'
                        ? 'bg-white/10 border border-white/20 text-white'
                        : 'bg-gradient-to-br from-green-500 to-emerald-500 text-white'
                    }`}
                  >
                    <p className="text-sm leading-relaxed">{message.text}</p>
                  </div>
                  <p className="text-xs text-gray-400 mt-2 px-2">
                    {message.timestamp.toLocaleTimeString([], {
                      hour: '2-digit',
                      minute: '2-digit',
                    })}
                  </p>
                </div>
              </div>
            ))}

            {isLoading && (
              <div className="flex gap-4">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-purple-500 to-blue-500 flex items-center justify-center">
                  <Sparkles className="w-5 h-5 text-white" />
                </div>
                <div className="px-6 py-4 rounded-2xl bg-white/10 border border-white/20">
                  <div className="flex items-center gap-2">
                    <Loader2 className="w-4 h-4 text-purple-400 animate-spin" />
                    <span className="text-sm text-gray-300">Thinking...</span>
                  </div>
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Quick prompts */}
          {messages.length === 1 && (
            <div className="px-6 py-4 border-t border-white/10 bg-black/20">
              <p className="text-sm text-gray-300 mb-3">Quick prompts:</p>
              <div className="flex flex-wrap gap-2">
                {quickPrompts.map((prompt, index) => (
                  <button
                    key={index}
                    onClick={() => handleQuickPrompt(prompt)}
                    className="px-4 py-2 bg-white/5 hover:bg-white/10 border border-white/20 rounded-full text-sm text-gray-300 transition-colors"
                  >
                    {prompt}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Input area */}
          <div className="p-6 border-t border-white/10 bg-black/20">
            <div className="flex gap-3">
              <div className="flex-1 relative">
                <input
                  type="text"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Type your message..."
                  className="w-full px-6 py-4 bg-white/10 border border-white/20 rounded-2xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent backdrop-blur-sm"
                  disabled={isLoading}
                />
              </div>
              <button
                onClick={handleSend}
                disabled={!inputValue.trim() || isLoading}
                className="px-6 py-4 bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 disabled:from-gray-600 disabled:to-gray-600 text-white rounded-2xl transition-all disabled:cursor-not-allowed flex items-center justify-center min-w-[60px]"
              >
                {isLoading ? (
                  <Loader2 className="w-5 h-5 animate-spin" />
                ) : (
                  <Send className="w-5 h-5" />
                )}
              </button>
            </div>
            <p className="text-xs text-gray-500 mt-3 text-center">
              Press Enter to send • Shift + Enter for new line
            </p>
          </div>
        </div>
      </main>

      {/* Footer info */}
      <div className="relative z-10 text-center py-4">
        <p className="text-sm text-gray-400">
          AI responses are generated for assistance. For accurate product information, please visit our{' '}
          <Link href="/products" className="text-purple-400 hover:text-purple-300 underline">
            products page
          </Link>
        </p>
      </div>
    </div>
  );
}
