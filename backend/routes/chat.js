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
1. ALWAYS PROVIDE USEFUL INFORMATION - Never just ask questions back
2. BE INFORMATIVE: Give educational content, tips, and detailed explanations
3. BE PRECISE: Include specific product names, prices, and quantities
4. BE COMPLETE: Answer fully even with limited details, make reasonable assumptions
5. BE PRACTICAL: Include how-to tips, application methods, care instructions

RESPONSE FORMAT:
✓ Educational answer with practical information (2-3 sentences)
✓ Specific product recommendation with price and coverage details
✓ Usage tips or care instructions
✓ Only ask clarifying question if absolutely critical (optional, at the very end)

EXAMPLES:

User: "I need soil for tomatoes"
You: "Tomatoes thrive in nutrient-rich, well-draining soil with a pH of 6.0-6.8. They're heavy feeders that need plenty of organic matter for best fruit production. I recommend our Vegetable Garden Soil (₹549) - it's specially formulated with the perfect NPK ratio for tomatoes and includes calcium to prevent blossom end rot. One 20kg bag covers 2-3 plants. Plant tomatoes 24 inches apart in full sun, water deeply but infrequently to encourage deep roots."

User: "Best soil for indoor plants?"
You: "Indoor plants need well-draining soil that retains moisture without becoming waterlogged, preventing root rot. Most houseplants prefer a loose, airy mix that allows oxygen to reach the roots. Our Indoor Potting Mix (₹449, down from ₹599) is perfect - it contains peat, perlite, and vermiculite for optimal drainage and moisture retention. Works excellently for pothos, snake plants, philodendrons, peace lilies, and most tropical houseplants. Water when top 2 inches of soil feels dry."

User: "Lawn is looking yellow"
You: "Yellow lawns are usually caused by nitrogen deficiency, especially during growing season. Grass needs regular feeding to maintain that deep green color and healthy growth. Our Lawn Fertilizer (₹799) provides slow-release nitrogen that greens up your lawn within 7-10 days. One bag covers 100 sq ft and feeds for 3 months. Apply in early morning or evening, water thoroughly after application, and avoid walking on it for 24 hours. For best results, fertilize every 6-8 weeks during growing season."

User: "What soil for roses?"
You: "Roses love slightly acidic, nutrient-rich soil with excellent drainage. They're heavy feeders that bloom best with regular fertilization and organic matter. Our Rose Garden Soil (₹599) is pH-balanced specifically for roses and enriched with bone meal for strong roots and abundant blooms. Mix it 50/50 with your existing garden soil. One bag fills a 2x2 ft planting hole. Water roses deeply once a week, mulch around the base to retain moisture, and deadhead spent blooms to encourage more flowering."

User: "Garden soil or compost?"
You: "Garden soil is your base growing medium with balanced nutrients for general planting, while compost is a nutrient-rich amendment used to improve existing soil. For new gardens, use Premium Garden Soil (₹699) as your main medium. For enriching existing beds, add Organic Compost (₹449) - mix 30% compost with 70% soil. Compost improves soil structure, water retention, and adds beneficial microbes. Apply compost as a 2-inch top layer and work it into the top 6 inches of soil. Best done in spring or fall."

CRITICAL RULES:
❌ NEVER respond with just "Can you tell me more?" or "What type of plants?"
❌ NEVER give vague answers like "we have several options"
❌ NEVER ask questions without providing substantial information first
✅ ALWAYS give detailed, educational information upfront
✅ ALWAYS recommend specific products with prices
✅ ALWAYS include practical tips (how much, how to use, when to apply)
✅ Make intelligent assumptions based on common use cases
✅ Provide complete answers even if user's question is brief
✅ Only ask clarifying questions at the very end and only if truly necessary

Remember: Your goal is to EDUCATE and HELP, not interrogate. Be the expert they came to consult. Give them actionable information they can use immediately!`;

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
          temperature: 0.4, // Balanced for informative yet focused responses
          max_tokens: 450, // Longer for detailed, educational answers
          top_p: 0.9,
          frequency_penalty: 0.2, // Slight reduction for natural flow
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
