'use client';

import React, { useState } from 'react';
import { MessageCircle, Sparkles } from 'lucide-react';
import Link from 'next/link';

const ChatBot: React.FC = () => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <Link href="/chat">
      <div
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className="fixed bottom-6 right-6 z-50 group cursor-pointer"
      >
        {/* Animated rings */}
        <div className="absolute inset-0 rounded-full">
          <div className="absolute inset-0 rounded-full bg-gradient-to-r from-purple-500 to-blue-500 animate-pulse opacity-75" />
          <div
            className="absolute inset-0 rounded-full bg-gradient-to-r from-purple-500 to-blue-500 animate-ping opacity-50"
            style={{ animationDuration: '2s' }}
          />
        </div>

        {/* Main button */}
        <div className="relative w-16 h-16 bg-gradient-to-br from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white rounded-full shadow-2xl transition-all duration-300 flex items-center justify-center group-hover:scale-110">
          {isHovered ? (
            <Sparkles className="w-7 h-7 animate-pulse" />
          ) : (
            <MessageCircle className="w-7 h-7" />
          )}
          {/* Online indicator */}
          <span className="absolute -top-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-white animate-pulse" />
        </div>

        {/* Tooltip */}
        <div
          className={`absolute bottom-20 right-0 whitespace-nowrap transition-all duration-300 ${
            isHovered ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2 pointer-events-none'
          }`}
        >
          <div className="bg-gradient-to-r from-purple-600 to-blue-600 text-white px-4 py-2 rounded-lg shadow-xl">
            <p className="text-sm font-medium">Chat with AI Assistant</p>
            <div className="absolute bottom-0 right-6 transform translate-y-1/2 rotate-45 w-2 h-2 bg-blue-600" />
          </div>
        </div>
      </div>
    </Link>
  );
};

export default ChatBot;
