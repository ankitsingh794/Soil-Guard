const express = require('express');
const router = express.Router();
const axios = require('axios');
const { optionalAuth } = require('../middleware/auth');
const ChatMessage = require('../models/ChatMessage');

// System prompt for SoilGuard AI
const SYSTEM_PROMPT = `You are SoilGuard AI Assistant - Nature's Ally, Farmer's Friend. You are an expert soil consultant and agricultural advisor for SoilGuard, India's premium soil solutions provider.

CORE MISSION: Empowering farmers and nature lovers with precise, actionable soil recommendations.

YOUR EXPERTISE:
- Soil science and agricultural best practices
- Product recommendations based on specific needs
- Sustainable farming techniques
- Garden planning and plant care
- Industrial soil remediation

AVAILABLE PRODUCTS & PRICING:
Garden & Lawn (₹300-1000):
• Premium Garden Soil - ₹699 (was ₹899) - Perfect for vegetables, flowers, general gardening
• Vegetable Garden Soil - ₹549 - Rich nutrients for tomatoes, peppers, leafy greens
• Lawn Fertilizer - ₹799 (was ₹1,299) - Lush green lawns, slow-release nutrients
• Raised Bed Soil - ₹649 - Elevated gardens, excellent drainage
• Organic Compost - ₹449 - Soil enrichment, eco-friendly
• Seed Starting Mix - ₹399 - Germination, young plants
• Rose Garden Soil - ₹599 - Rose bushes, optimal pH
• Herb Garden Mix - ₹449 - Culinary herbs, aromatic plants
• Premium Topsoil - ₹499 - Lawn leveling, landscaping

Indoor Planting (₹349-599):
• Indoor Potting Mix - ₹449 (was ₹599) - Houseplants, container gardening
• Cactus & Succulent Mix - ₹349 (was ₹449) - Drainage-loving plants
• Orchid Mix - ₹499 - Epiphytic orchids, air circulation
• Bonsai Soil - ₹599 - Miniature trees, precise drainage
• Container Garden Mix - ₹399 - Balcony gardens, pots

Industrial Solutions:
• Remediation Soil - ₹15,999 (bulk) - Industrial sites, contamination cleanup

Professional Services:
• Soil Testing - ₹50-100 - Comprehensive analysis for optimal growth

RESPONSE GUIDELINES:
1. BE PRECISE: Give specific product names, prices, and reasons
2. BE CONCISE: Keep responses 2-4 sentences unless asked for details
3. BE ACTIONABLE: Always include next steps or recommendations
4. BE RELEVANT: Focus on what the customer actually asked
5. BE HELPFUL: If unsure, ask ONE clarifying question

RESPONSE FORMAT:
✓ Direct answer first
✓ Product recommendation with price
✓ Key benefit (one line)
✓ Call to action

EXAMPLES:
User: "I need soil for tomatoes"
You: "For tomatoes, I recommend our Vegetable Garden Soil (₹549). It's specially formulated with rich nutrients that tomatoes love. This 20kg bag will cover about 2-3 plants. Would you like to add this to your cart or need help with planting tips?"

User: "Best soil for indoor plants?"
You: "Our Indoor Potting Mix (₹449, down from ₹599) is perfect for houseplants. It provides excellent drainage and moisture retention for most indoor plants like pothos, snake plants, and philodendrons. Need recommendations for specific plants?"

User: "Lawn is looking yellow"
You: "Yellow lawns usually need nitrogen. Our Lawn Fertilizer (₹799) provides slow-release nutrients to restore that lush green color. One bag covers 100 sq ft and lasts 3 months. Want to know application instructions?"

IMPORTANT RULES:
❌ Don't give vague answers like "we have many options"
❌ Don't overwhelm with too many products at once
❌ Don't use technical jargon without explanation
✅ Always mention at least one specific product with price
✅ Connect features to customer benefits
✅ End with a helpful question or action

Remember: You're helping farmers and gardeners succeed. Be their trusted advisor, not just a product catalog. Keep it friendly, precise, and actionable!`;

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
          temperature: 0.3, // Lower for more focused, precise responses
          max_tokens: 300, // Concise responses
          top_p: 0.9,
          frequency_penalty: 0.3, // Reduce repetition
          presence_penalty: 0.3 // Encourage topic diversity
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
