# 🌱 Soil Guard - Modern E-Commerce Frontend

A beautiful, modern, and fully responsive e-commerce platform for soil solutions, built with Next.js 14, TypeScript, and Tailwind CSS. Features an AI-powered chatbot assistant and voice support integration.

![Soil Guard](https://img.shields.io/badge/Next.js-14-black?style=flat-square&logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-5.3-blue?style=flat-square&logo=typescript)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.4-38B2AC?style=flat-square&logo=tailwind-css)

## ✨ Features

### 🎨 Design & UX
- **Modern, Clean Interface**: Earthy color palette with botanical green accents
- **Fully Responsive**: Optimized for mobile, tablet, and desktop devices
- **Accessibility Compliant**: WCAG AA standards with keyboard navigation
- **Micro-Animations**: Smooth transitions and hover effects
- **Performance Optimized**: Fast page loads with lazy loading and image optimization

### 🛍️ E-Commerce Functionality
- **Product Catalog**: Browse soil products by category with advanced filtering
- **Product Details**: Comprehensive product pages with specs, reviews, and FAQs
- **Shopping Cart**: Persistent cart with real-time updates
- **Checkout Flow**: Multi-step checkout process (ready for backend integration)
- **Trust Signals**: Security badges, customer reviews, and certifications

### 🤖 AI-Powered Features
- **Smart Chatbot**: Conversational AI assistant to help users find the right soil
- **Suggestion Wizard**: Guided product recommendations based on user needs
- **Call-Bot Integration**: Voice support button for phone assistance
- **Context-Aware**: Remembers user preferences throughout the session

### 🎯 Key Pages
- **Homepage**: Hero section, featured products, testimonials, how-it-works
- **Product Listing**: Filterable and sortable product grid
- **Product Detail**: Complete product information with image gallery
- **Shopping Cart**: Cart management with order summary
- **Category Pages**: Specialized pages for different soil types

## 🚀 Getting Started

### Prerequisites
- Node.js 18.0 or higher
- npm 9.0 or higher

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd SoilGuard
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Run the development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

### Build for Production

```bash
npm run build
npm start
```

## 📁 Project Structure

```
SoilGuard/
├── src/
│   ├── app/                      # Next.js 14 App Router pages
│   │   ├── layout.tsx           # Root layout with metadata
│   │   ├── page.tsx             # Homepage
│   │   ├── products/
│   │   │   ├── page.tsx         # Product listing page
│   │   │   └── [slug]/
│   │   │       └── page.tsx     # Dynamic product detail page
│   │   └── cart/
│   │       └── page.tsx         # Shopping cart page
│   │
│   ├── components/              # React components
│   │   ├── ui/                  # Reusable UI components
│   │   │   ├── Button.tsx
│   │   │   ├── Input.tsx
│   │   │   ├── Card.tsx
│   │   │   └── Badge.tsx
│   │   ├── layout/              # Layout components
│   │   │   ├── Header.tsx       # Sticky header with navigation
│   │   │   ├── Footer.tsx       # Footer with links
│   │   │   └── Layout.tsx       # Main layout wrapper
│   │   ├── home/                # Homepage sections
│   │   │   ├── HeroSection.tsx
│   │   │   ├── CategoriesSection.tsx
│   │   │   ├── HowItWorksSection.tsx
│   │   │   ├── FeaturedProductsSection.tsx
│   │   │   └── TestimonialsSection.tsx
│   │   ├── products/            # Product components
│   │   │   └── ProductCard.tsx
│   │   └── ChatBot.tsx          # AI chatbot widget
│   │
│   ├── lib/                     # Utilities and helpers
│   │   ├── utils.ts             # Helper functions
│   │   └── mockData.ts          # Mock data for development
│   │
│   ├── store/                   # State management (Zustand)
│   │   ├── cartStore.ts         # Shopping cart state
│   │   └── chatStore.ts         # Chatbot state
│   │
│   ├── types/                   # TypeScript type definitions
│   │   └── index.ts
│   │
│   └── styles/                  # Global styles
│       └── globals.css          # Tailwind + custom CSS
│
├── public/                      # Static assets
├── package.json
├── tsconfig.json
├── tailwind.config.ts
├── next.config.js
└── README.md
```

## 🎨 Design System

### Color Palette

```css
/* Primary Colors */
Soil Brown: #6B4F2D    /* Primary brand color */
Botanical Green: #4A7C59    /* Secondary/CTA color */
Sand Beige: #F6F5F3    /* Background neutral */

/* Accent Colors */
Success: #4A7C59
Warning: #D4972E
Error: #C84B31
```

### Typography

- **Display Font**: Outfit (headings)
- **Body Font**: Inter (body text)
- **Hero Desktop**: 48px / 3rem
- **Hero Mobile**: 32px / 2rem

### Component Classes

```css
/* Buttons */
.btn-primary       /* Green background, white text */
.btn-secondary     /* Brown background, white text */
.btn-outline       /* Border with transparent bg */
.btn-ghost         /* Minimal style */

/* Sizes */
.btn-sm            /* Small button */
.btn-md            /* Medium button (default) */
.btn-lg            /* Large button */

/* Cards */
.card              /* White card with shadow */
.card-hover        /* Card with hover effect */

/* Badges */
.badge-success     /* Green badge */
.badge-warning     /* Yellow badge */
.badge-info        /* Neutral badge */
```

## 🔧 Configuration

### Environment Variables

Create a `.env.local` file:

```env
NEXT_PUBLIC_API_URL=your_api_url_here
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

### Tailwind Configuration

The design system is fully configured in `tailwind.config.ts` with:
- Custom color palette
- Extended spacing
- Custom animations
- Typography presets

## 📱 Responsive Breakpoints

```
Mobile: < 768px
Tablet: 768px - 1023px
Desktop: ≥ 1024px
Large Desktop: ≥ 1280px
```

## ♿ Accessibility Features

- ✅ Semantic HTML structure
- ✅ ARIA labels and roles
- ✅ Keyboard navigation support
- ✅ Focus visible indicators
- ✅ Color contrast compliance (WCAG AA)
- ✅ Alt text for all images
- ✅ Screen reader friendly

## 🎯 Key Features Implementation

### Chatbot
- Floating widget (bottom-right)
- Context-aware suggestions
- Conversation history
- Product recommendations
- Voice support button

### Shopping Cart
- Persistent storage (localStorage)
- Real-time updates
- Quantity management
- Free shipping threshold indicator
- Order summary

### Product Filtering
- Category filters
- Price range
- Sort options (popularity, price, rating, newest)
- Search functionality

## 🚀 Performance Optimizations

- ✅ Next.js 14 App Router with Server Components
- ✅ Image optimization with Next/Image
- ✅ Lazy loading for images and components
- ✅ Code splitting
- ✅ Font optimization
- ✅ CSS optimization with Tailwind
- ✅ Minimal JavaScript bundle

## 🔮 Future Enhancements

### Backend Integration
- [ ] Connect to REST/GraphQL API
- [ ] User authentication
- [ ] Payment gateway integration
- [ ] Order tracking
- [ ] Email notifications

### Features
- [ ] Wishlist functionality
- [ ] Product comparison
- [ ] Advanced filters
- [ ] Product reviews submission
- [ ] Live chat with support
- [ ] Multi-language support

### AI Enhancements
- [ ] Real AI/ML integration
- [ ] Voice recognition
- [ ] Image-based soil identification
- [ ] Personalized recommendations

## 🤝 Contributing

This is a showcase project. For production use:
1. Replace mock data with real API calls
2. Implement authentication
3. Add payment processing
4. Set up proper backend
5. Implement real chatbot AI

## 📄 License

This project is created for educational and demonstration purposes.

## 👨‍💻 Author

Built with ❤️ for modern e-commerce standards

---

## 📞 Support

For questions or issues, use the integrated chatbot or contact support through the footer links.

**Happy Shopping! 🌱**
