import { create } from 'zustand';
import { ChatMessage, ChatSession } from '@/types';

interface ChatStore {
  isOpen: boolean;
  session: ChatSession | null;
  toggleChat: () => void;
  openChat: () => void;
  closeChat: () => void;
  addMessage: (message: Omit<ChatMessage, 'id' | 'timestamp'>) => void;
  setUserContext: (context: ChatSession['userContext']) => void;
  clearSession: () => void;
}

export const useChatStore = create<ChatStore>((set, get) => ({
  isOpen: false,
  session: null,

  toggleChat: () => set((state) => ({ isOpen: !state.isOpen })),
  
  openChat: () => {
    const state = get();
    if (!state.session) {
      set({
        isOpen: true,
        session: {
          id: Date.now().toString(),
          messages: [
            {
              id: '1',
              sender: 'bot',
              message: "Hi there! I'm Soil Guard's smart soil assistant. What kind of soil solution are you looking for today?",
              timestamp: new Date(),
              suggestions: [
                'Indoor plants',
                'Garden & Lawn',
                'Industrial remediation',
                'I need help choosing',
              ],
            },
          ],
        },
      });
    } else {
      set({ isOpen: true });
    }
  },
  
  closeChat: () => set({ isOpen: false }),

  addMessage: (message) => {
    set((state) => {
      if (!state.session) return state;

      const newMessage: ChatMessage = {
        ...message,
        id: Date.now().toString(),
        timestamp: new Date(),
      };

      return {
        session: {
          ...state.session,
          messages: [...state.session.messages, newMessage],
        },
      };
    });
  },

  setUserContext: (context) => {
    set((state) => {
      if (!state.session) return state;
      return {
        session: {
          ...state.session,
          userContext: { ...state.session.userContext, ...context },
        },
      };
    });
  },

  clearSession: () => set({ session: null, isOpen: false }),
}));
