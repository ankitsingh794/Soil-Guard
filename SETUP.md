# 🚀 Soil Guard - Setup & Deployment Guide

## Prerequisites

Before you begin, ensure you have the following installed:
- **Node.js**: Version 18.0 or higher
- **npm**: Version 9.0 or higher (comes with Node.js)
- **Git**: For version control
- **Code Editor**: VS Code recommended

## Initial Setup

### 1. Install Dependencies

Open PowerShell in the project directory and run:

```powershell
npm install
```

This will install all required packages:
- Next.js 14
- React 18
- TypeScript 5.3
- Tailwind CSS 3.4
- Lucide React (icons)
- Zustand (state management)
- Framer Motion (animations)

### 2. Verify Installation

Check that everything is installed correctly:

```powershell
npm run type-check
```

You may see some TypeScript errors about missing modules - these are expected until dependencies are installed.

### 3. Run Development Server

Start the development server:

```powershell
npm run dev
```

The application will be available at:
- **Local**: http://localhost:3000
- **Network**: http://[your-ip]:3000

## Project Structure Overview

```
SoilGuard/
├── src/
│   ├── app/              # Next.js 14 App Router
│   ├── components/       # React components
│   ├── lib/              # Utilities and mock data
│   ├── store/            # State management (Zustand)
│   ├── types/            # TypeScript types
│   └── styles/           # Global CSS
├── public/               # Static assets (add your images here)
├── package.json          # Dependencies
├── tsconfig.json         # TypeScript config
├── tailwind.config.ts    # Tailwind configuration
└── next.config.js        # Next.js configuration
```

## Key Features Implemented

### ✅ Homepage
- Hero section with CTA
- Category cards
- How it works section
- Featured products
- Testimonials
- Trust signals

### ✅ Product Pages
- Product listing with filters
- Product detail pages
- Image galleries
- Specifications
- Reviews display
- Related products
- FAQ accordion

### ✅ Shopping Experience
- Shopping cart with persistence
- Quantity management
- Order summary
- Free shipping threshold
- Trust badges

### ✅ AI Chatbot
- Floating chat widget
- Conversation flow
- Product suggestions
- Context-aware responses
- Call support button

### ✅ Responsive Design
- Mobile-first approach
- Tablet optimization
- Desktop layouts
- Touch-friendly interface

### ✅ Accessibility
- Semantic HTML
- ARIA labels
- Keyboard navigation
- Color contrast compliance
- Screen reader support

## Development Workflow

### Running the App

```powershell
# Development mode with hot reload
npm run dev

# Build for production
npm run build

# Start production server
npm start

# Type checking
npm run type-check

# Linting
npm run lint
```

### Making Changes

1. **Components**: Add new components in `src/components/`
2. **Pages**: Create new pages in `src/app/`
3. **Styles**: Modify global styles in `src/styles/globals.css`
4. **Types**: Define types in `src/types/index.ts`
5. **State**: Manage state in `src/store/`

### Tailwind CSS

Use Tailwind utility classes directly in JSX:

```tsx
<div className="bg-botanical-500 text-white p-6 rounded-lg">
  Content
</div>
```

Custom classes are defined in `globals.css` using `@layer components`.

## Replacing Mock Data with Real API

Currently, the app uses mock data from `src/lib/mockData.ts`. To connect to a real backend:

### 1. Create API Service

Create `src/lib/api.ts`:

```typescript
const API_URL = process.env.NEXT_PUBLIC_API_URL;

export async function getProducts() {
  const response = await fetch(`${API_URL}/products`);
  return response.json();
}

export async function getProduct(slug: string) {
  const response = await fetch(`${API_URL}/products/${slug}`);
  return response.json();
}
```

### 2. Update Environment Variables

Create `.env.local`:

```env
NEXT_PUBLIC_API_URL=https://your-api-url.com/api
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

### 3. Replace Mock Data Imports

In component files, replace:

```typescript
// Old
import { mockProducts } from '@/lib/mockData';

// New
import { getProducts } from '@/lib/api';
const products = await getProducts();
```

### 4. Implement Server Components

For better performance, use Next.js Server Components:

```typescript
// app/products/page.tsx
export default async function ProductsPage() {
  const products = await getProducts();
  
  return <ProductGrid products={products} />;
}
```

## Deploying to Production

### Option 1: Vercel (Recommended)

1. Push code to GitHub
2. Connect to Vercel: https://vercel.com
3. Import project
4. Configure environment variables
5. Deploy!

```powershell
# Or use Vercel CLI
npm i -g vercel
vercel
```

### Option 2: Netlify

1. Build the project:
   ```powershell
   npm run build
   ```

2. Deploy the `.next` folder

3. Configure build settings:
   - Build command: `npm run build`
   - Publish directory: `.next`

### Option 3: Self-Hosted

1. Build for production:
   ```powershell
   npm run build
   ```

2. Start production server:
   ```powershell
   npm start
   ```

3. Use PM2 for process management:
   ```powershell
   npm install -g pm2
   pm2 start npm --name "soilguard" -- start
   pm2 save
   pm2 startup
   ```

## Environment Variables

Create `.env.local` for local development:

```env
# API Configuration
NEXT_PUBLIC_API_URL=https://api.soilguard.com
NEXT_PUBLIC_SITE_URL=http://localhost:3000

# Optional: Analytics
NEXT_PUBLIC_GA_ID=your-google-analytics-id

# Optional: Payment Gateway
NEXT_PUBLIC_STRIPE_KEY=your-stripe-public-key
```

## Adding New Features

### Adding a New Page

1. Create file in `src/app/`:
   ```
   src/app/about/page.tsx
   ```

2. Add content:
   ```tsx
   export default function AboutPage() {
     return (
       <Layout>
         <div className="container-custom py-12">
           <h1>About Soil Guard</h1>
         </div>
       </Layout>
     );
   }
   ```

3. Page automatically available at `/about`

### Adding a New Component

1. Create component file:
   ```
   src/components/NewComponent.tsx
   ```

2. Define component:
   ```tsx
   import React from 'react';
   
   interface NewComponentProps {
     title: string;
   }
   
   const NewComponent: React.FC<NewComponentProps> = ({ title }) => {
     return <div>{title}</div>;
   };
   
   export default NewComponent;
   ```

3. Import and use:
   ```tsx
   import NewComponent from '@/components/NewComponent';
   
   <NewComponent title="Hello" />
   ```

### Customizing the Chatbot

Edit `src/components/ChatBot.tsx`:

```typescript
// Customize responses in handleSendMessage function
if (lowerMessage.includes('custom-keyword')) {
  botResponse = 'Custom response here';
  suggestions = ['Option 1', 'Option 2'];
}
```

For real AI integration, connect to:
- OpenAI API
- Dialogflow
- Azure Bot Service
- Custom ML model

## Performance Optimization

### Images

1. Place images in `public/` folder
2. Use Next/Image component:
   ```tsx
   import Image from 'next/image';
   
   <Image
     src="/images/product.jpg"
     alt="Product"
     width={800}
     height={600}
     quality={85}
   />
   ```

### Code Splitting

Next.js automatically splits code. For manual splitting:

```typescript
import dynamic from 'next/dynamic';

const HeavyComponent = dynamic(() => import('./HeavyComponent'), {
  loading: () => <p>Loading...</p>,
});
```

### Caching

Configure caching in `next.config.js`:

```javascript
module.exports = {
  images: {
    domains: ['your-cdn.com'],
  },
  headers: async () => [
    {
      source: '/:path*',
      headers: [
        {
          key: 'Cache-Control',
          value: 'public, max-age=31536000, immutable',
        },
      ],
    },
  ],
};
```

## Troubleshooting

### TypeScript Errors

Run type check:
```powershell
npm run type-check
```

Fix by ensuring all imports are correct and dependencies are installed.

### Styling Not Working

1. Ensure Tailwind is processing files:
   - Check `tailwind.config.ts`
   - Verify `content` paths

2. Clear Next.js cache:
   ```powershell
   Remove-Item -Recurse -Force .next
   npm run dev
   ```

### Build Errors

1. Check Node version:
   ```powershell
   node --version  # Should be 18+
   ```

2. Clear cache and reinstall:
   ```powershell
   Remove-Item -Recurse -Force node_modules
   Remove-Item package-lock.json
   npm install
   ```

### Port Already in Use

Change port:
```powershell
$env:PORT=3001
npm run dev
```

Or in package.json:
```json
"dev": "next dev -p 3001"
```

## Testing

### Manual Testing Checklist

- [ ] Homepage loads correctly
- [ ] Navigation works (desktop & mobile)
- [ ] Product listing displays all products
- [ ] Product detail pages show correct info
- [ ] Add to cart functionality works
- [ ] Cart persists on page reload
- [ ] Chatbot opens and responds
- [ ] All links work correctly
- [ ] Images load properly
- [ ] Responsive on mobile/tablet
- [ ] Accessibility (keyboard navigation)

### Browser Testing

Test on:
- ✅ Chrome (latest)
- ✅ Firefox (latest)
- ✅ Safari (latest)
- ✅ Edge (latest)
- ✅ Mobile browsers (iOS/Android)

## Security Considerations

### Before Production

1. **Environment Variables**: Never commit `.env` files
2. **API Keys**: Use environment variables
3. **HTTPS**: Always use HTTPS in production
4. **CSP**: Configure Content Security Policy
5. **Rate Limiting**: Implement on API endpoints
6. **Input Validation**: Validate all user inputs
7. **XSS Protection**: Sanitize user-generated content

## Maintenance

### Regular Updates

```powershell
# Check for outdated packages
npm outdated

# Update packages
npm update

# Update Next.js specifically
npm install next@latest react@latest react-dom@latest
```

### Monitoring

Set up monitoring:
- Google Analytics
- Sentry for error tracking
- Vercel Analytics
- Custom logging

## Support & Resources

### Official Documentation
- [Next.js Documentation](https://nextjs.org/docs)
- [React Documentation](https://react.dev)
- [Tailwind CSS](https://tailwindcss.com/docs)
- [TypeScript](https://www.typescriptlang.org/docs)

### Community
- Next.js Discord
- Stack Overflow
- GitHub Discussions

---

**You're all set! Happy coding! 🌱**

For questions or issues, refer to the README.md or check the inline code comments.
