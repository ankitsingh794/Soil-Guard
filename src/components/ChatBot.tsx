'use client';

import React, { useState, useRef, useEffect } from 'react';
import { X, Send, Phone, MessageCircle } from 'lucide-react';
import { useChatStore } from '@/store/chatStore';
import Button from '@/components/ui/Button';
import { cn } from '@/lib/utils';

const ChatBot: React.FC = () => {
  const { isOpen, session, toggleChat, closeChat, addMessage, setUserContext } = useChatStore();
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [session?.messages]);

  const handleSuggestionClick = (suggestion: string) => {
    handleSendMessage(suggestion);
  };

  const handleSendMessage = async (message?: string) => {
    const textToSend = message || inputValue.trim();
    if (!textToSend) return;

    // Add user message
    addMessage({
      sender: 'user',
      message: textToSend,
    });

    setInputValue('');
    setIsTyping(true);

    // Simulate bot response (in production, this would call an API)
    setTimeout(() => {
      let botResponse = '';
      let suggestions: string[] = [];
      
      const lowerMessage = textToSend.toLowerCase();

      if (lowerMessage.includes('indoor') || lowerMessage.includes('houseplant')) {
        botResponse = 'Great! For indoor plants, I recommend our Indoor Plant Potting Mix or Cactus & Succulent Mix. What type of indoor plants are you growing?';
        suggestions = ['Tropical plants', 'Succulents', 'Herbs', 'All types'];
        setUserContext({ application: 'indoor' });
      } else if (lowerMessage.includes('garden') || lowerMessage.includes('vegetable')) {
        botResponse = 'Perfect! For gardens, our Premium Garden Soil Mix and Raised Bed Garden Soil are excellent choices. Are you growing in the ground or raised beds?';
        suggestions = ['In-ground', 'Raised beds', 'Container garden', 'Show me products'];
        setUserContext({ application: 'garden' });
      } else if (lowerMessage.includes('industrial') || lowerMessage.includes('remediation')) {
        botResponse = 'For industrial applications, we have specialized remediation soils. Can you tell me more about your project scope?';
        suggestions = ['Large site (>1000m²)', 'Small site (<1000m²)', 'Contact sales', 'View products'];
        setUserContext({ application: 'industrial' });
      } else if (lowerMessage.includes('lawn')) {
        botResponse = 'For lawns, our Organic Lawn Fertilizer Soil is perfect! It promotes healthy, green grass. What\'s the size of your lawn area?';
        suggestions = ['Small (<500 sq ft)', 'Medium (500-1000 sq ft)', 'Large (>1000 sq ft)', 'View product'];
        setUserContext({ application: 'lawn' });
      } else if (lowerMessage.includes('help') || lowerMessage.includes('don\'t know')) {
        botResponse = 'No problem! Let me ask you a few questions. What will you be using the soil for?';
        suggestions = ['Indoor plants', 'Outdoor garden', 'Lawn care', 'Industrial project'];
      } else if (lowerMessage.includes('price') || lowerMessage.includes('cost') || lowerMessage.includes('budget')) {
        botResponse = 'Our products range from ₹449 to ₹15,999 depending on quantity and type. What\'s your budget range?';
        suggestions = ['Under ₹1,000', '₹1,000-₹5,000', '₹5,000-₹10,000', 'Over ₹10,000'];
        setUserContext({ budget: 'asked' });
      } else {
        botResponse = 'I can help you find the perfect soil solution! Are you looking for indoor plants, outdoor gardens, or industrial applications?';
        suggestions = ['Indoor plants', 'Garden & Lawn', 'Industrial use', 'I need help choosing'];
      }

      addMessage({
        sender: 'bot',
        message: botResponse,
        suggestions,
      });

      setIsTyping(false);
    }, 1000);
  };

  const handleCallSupport = () => {
    // In production, this would trigger a call or open a call scheduling modal
    addMessage({
      sender: 'bot',
      message: 'I\'ll connect you with our soil expert! You can call us at +91 123 456 7890 or schedule a callback. Would you like me to schedule a call for you?',
      suggestions: ['Call now', 'Schedule callback', 'Continue chatting'],
    });
  };

  if (!isOpen) {
    return (
      <button
        onClick={toggleChat}
        className="fixed bottom-6 right-6 z-50 w-16 h-16 bg-botanical-500 hover:bg-botanical-600 text-white rounded-full shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center group"
        aria-label="Open chat support"
      >
        <MessageCircle className="w-7 h-7 group-hover:scale-110 transition-transform" />
        <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full animate-pulse" />
      </button>
    );
  }

  return (
    <div className="fixed bottom-6 right-6 z-50 w-[400px] max-w-[calc(100vw-3rem)] h-[600px] max-h-[calc(100vh-8rem)] bg-white rounded-2xl shadow-2xl flex flex-col animate-slide-in-right">
      {/* Header */}
      <div className="bg-gradient-to-r from-botanical-500 to-botanical-600 text-white p-4 rounded-t-2xl flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
            <MessageCircle className="w-6 h-6" />
          </div>
          <div>
            <h3 className="font-semibold">Soil Guard Assistant</h3>
            <p className="text-xs text-botanical-100">Online • Ready to help</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={handleCallSupport}
            className="p-2 hover:bg-white/10 rounded-lg transition-colors"
            aria-label="Call support"
          >
            <Phone className="w-5 h-5" />
          </button>
          <button
            onClick={closeChat}
            className="p-2 hover:bg-white/10 rounded-lg transition-colors"
            aria-label="Close chat"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4 scrollbar-thin">
        {session?.messages.map((msg) => (
          <div
            key={msg.id}
            className={cn(
              'flex',
              msg.sender === 'user' ? 'justify-end' : 'justify-start'
            )}
          >
            <div
              className={cn(
                'max-w-[80%] rounded-2xl px-4 py-2.5',
                msg.sender === 'user'
                  ? 'bg-botanical-500 text-white rounded-br-sm'
                  : 'bg-sand-100 text-soil-800 rounded-bl-sm'
              )}
            >
              <p className="text-sm leading-relaxed">{msg.message}</p>
              {msg.suggestions && msg.suggestions.length > 0 && (
                <div className="mt-3 space-y-2">
                  {msg.suggestions.map((suggestion, index) => (
                    <button
                      key={index}
                      onClick={() => handleSuggestionClick(suggestion)}
                      className="block w-full text-left px-3 py-2 text-sm bg-white hover:bg-botanical-50 border border-soil-200 rounded-lg transition-colors"
                    >
                      {suggestion}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
        ))}
        
        {isTyping && (
          <div className="flex justify-start">
            <div className="bg-sand-100 rounded-2xl rounded-bl-sm px-4 py-3">
              <div className="flex gap-1.5">
                <div className="w-2 h-2 bg-soil-400 rounded-full animate-bounce" />
                <div className="w-2 h-2 bg-soil-400 rounded-full animate-bounce animation-delay-100" />
                <div className="w-2 h-2 bg-soil-400 rounded-full animate-bounce animation-delay-200" />
              </div>
            </div>
          </div>
        )}
        
        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <div className="p-4 border-t border-soil-200">
        <form onSubmit={(e) => { e.preventDefault(); handleSendMessage(); }} className="flex gap-2">
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder="Type your message..."
            className="flex-1 px-4 py-2.5 border border-soil-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-botanical-500 focus:border-transparent"
          />
          <Button
            type="submit"
            variant="primary"
            size="sm"
            disabled={!inputValue.trim()}
            className="!px-4"
          >
            <Send className="w-5 h-5" />
          </Button>
        </form>
        <p className="text-xs text-soil-500 mt-2 text-center">
          Powered by Soil Guard AI
        </p>
      </div>
    </div>
  );
};

export default ChatBot;
