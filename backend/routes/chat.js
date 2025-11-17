const express = require('express');
const router = express.Router();
const axios = require('axios');
const { optionalAuth } = require('../middleware/auth');
const ChatMessage = require('../models/ChatMessage');

// System prompt for SoilGuard AI
const SYSTEM_PROMPT = `You are a helpful AI assistant for SoilGuard, an e-commerce platform specializing in soil products. Your role is to:
1. Help customers find the right soil products for their needs (gardens, indoor plants, lawns, industrial use)
2. Provide information about soil types, benefits, and usage
3. Answer questions about products, pricing, and delivery
4. Be friendly, professional, and knowledgeable about soil and gardening

Available product categories:
- Garden & Lawn: Premium garden soil, vegetable garden soil, lawn fertilizer, raised bed soil, compost, seed starting mix, rose garden soil, herb garden mix, topsoil
- Indoor Planting: Indoor potting mix, cactus & succulent mix, orchid mix, bonsai soil, container garden mix
- Industrial: Remediation soil for industrial sites

Always ask clarifying questions to understand the customer's specific needs before recommending products.`;

// @route   POST /api/chat
// @desc    Send message to AI and get response
// @access  Public (with optional auth)
router.post('/', optionalAuth, async (req, res) => {
  try {
    const { message, sessionId, context } = req.body;

    if (!message || !sessionId) {
      return res.status(400).json({
        success: false,
        message: 'Message and sessionId are required'
      });
    }

    // Get or create chat session
    let chatSession = await ChatMessage.findOne({ sessionId });
    
    if (!chatSession) {
      chatSession = new ChatMessage({
        sessionId,
        userId: req.user ? req.user._id : null,
        messages: [],
        context: context || {}
      });
    }

    // Add user message to history
    chatSession.messages.push({
      role: 'user',
      content: message,
      timestamp: new Date()
    });

    // Prepare messages for OpenRouter
    const messages = [
      { role: 'system', content: SYSTEM_PROMPT },
      ...chatSession.messages.slice(-10).map(msg => ({ // Last 10 messages for context
        role: msg.role === 'assistant' ? 'assistant' : 'user',
        content: msg.content
      }))
    ];

    // Call OpenRouter API
    try {
      const response = await axios.post(
        `${process.env.OPENROUTER_BASE_URL}/chat/completions`,
        {
          model: 'meta-llama/llama-4-maverick', // Llama 4 Maverick model
          messages: messages,
          temperature: 0.7,
          max_tokens: 500
        },
        {
          headers: {
            'Authorization': `Bearer ${process.env.OPENROUTER_API_KEY}`,
            'Content-Type': 'application/json',
            'HTTP-Referer': process.env.FRONTEND_URL,
            'X-Title': 'SoilGuard AI Assistant'
          }
        }
      );

      const aiResponse = response.data.choices[0].message.content;

      // Add AI response to history
      chatSession.messages.push({
        role: 'assistant',
        content: aiResponse,
        timestamp: new Date()
      });

      // Update context if provided
      if (context) {
        chatSession.context = { ...chatSession.context, ...context };
      }

      // Save session
      await chatSession.save();

      res.json({
        success: true,
        response: aiResponse,
        sessionId: sessionId
      });

    } catch (apiError) {
      console.error('OpenRouter API error:', apiError.response?.data || apiError.message);
      
      // Fallback response if API fails
      const fallbackResponse = generateFallbackResponse(message);
      
      chatSession.messages.push({
        role: 'assistant',
        content: fallbackResponse,
        timestamp: new Date()
      });

      await chatSession.save();

      res.json({
        success: true,
        response: fallbackResponse,
        sessionId: sessionId,
        fallback: true
      });
    }

  } catch (error) {
    console.error('Chat error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error processing chat'
    });
  }
});

// @route   GET /api/chat/history/:sessionId
// @desc    Get chat history
// @access  Public
router.get('/history/:sessionId', async (req, res) => {
  try {
    const { sessionId } = req.params;

    const chatSession = await ChatMessage.findOne({ sessionId });

    if (!chatSession) {
      return res.status(404).json({
        success: false,
        message: 'Chat session not found'
      });
    }

    res.json({
      success: true,
      messages: chatSession.messages,
      context: chatSession.context
    });

  } catch (error) {
    console.error('Get history error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error fetching chat history'
    });
  }
});

// Fallback response generator
function generateFallbackResponse(message) {
  const lowerMessage = message.toLowerCase();

  if (lowerMessage.includes('indoor') || lowerMessage.includes('houseplant')) {
    return "For indoor plants, I recommend our Indoor Plant Potting Mix (₹599) which provides excellent drainage and is perfect for all houseplants. We also have specialized mixes for cacti/succulents (₹449), orchids (₹649), and bonsai (₹899). What type of indoor plants are you growing?";
  }

  if (lowerMessage.includes('garden') || lowerMessage.includes('vegetable')) {
    return "Great! For gardens, our Premium Garden Soil Mix (₹899) and Vegetable Garden Soil (₹1,099) are excellent choices. For raised beds, we have Raised Bed Garden Soil (₹1,499). Are you growing vegetables, flowers, or both?";
  }

  if (lowerMessage.includes('lawn')) {
    return "For lawns, our Organic Lawn Fertilizer Soil (₹1,299) is perfect! It promotes thick, green grass and is safe for pets. What's the size of your lawn area?";
  }

  if (lowerMessage.includes('price') || lowerMessage.includes('cost')) {
    return "Our products range from ₹449 to ₹15,999 depending on type and quantity. We offer free shipping on orders above ₹2,000. What's your budget range, and what are you looking to grow?";
  }

  return "I'm here to help you find the perfect soil for your needs! Could you tell me more about your project? Are you working on a garden, lawn, indoor plants, or an industrial project?";
}

module.exports = router;
