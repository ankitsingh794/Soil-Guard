# Component Usage Examples

This document provides examples of how to use the Soil Guard components in your pages and features.

## UI Components

### Button Component

```tsx
import Button from '@/components/ui/Button';
import { ShoppingCart, ArrowRight } from 'lucide-react';

// Primary button
<Button variant="primary" size="md">
  Click Me
</Button>

// Button with icon
<Button 
  variant="primary" 
  size="lg"
  leftIcon={<ShoppingCart className="w-5 h-5" />}
>
  Add to Cart
</Button>

// Loading state
<Button variant="primary" isLoading>
  Processing...
</Button>

// Disabled button
<Button variant="primary" disabled>
  Sold Out
</Button>

// All variants
<Button variant="primary">Primary</Button>
<Button variant="secondary">Secondary</Button>
<Button variant="outline">Outline</Button>
<Button variant="ghost">Ghost</Button>

// All sizes
<Button size="sm">Small</Button>
<Button size="md">Medium</Button>
<Button size="lg">Large</Button>
```

### Input Component

```tsx
import Input from '@/components/ui/Input';
import { Search, Mail } from 'lucide-react';

// Basic input
<Input 
  type="text"
  placeholder="Enter text"
/>

// With label
<Input 
  label="Email Address"
  type="email"
  placeholder="you@example.com"
/>

// With icon
<Input 
  type="search"
  placeholder="Search products..."
  leftIcon={<Search className="w-5 h-5 text-soil-400" />}
/>

// With error
<Input 
  type="email"
  label="Email"
  error="Please enter a valid email address"
/>

// With helper text
<Input 
  type="text"
  label="Username"
  helperText="Choose a unique username"
/>
```

### Card Component

```tsx
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '@/components/ui/Card';

// Basic card
<Card>
  <CardContent>
    <p>Card content here</p>
  </CardContent>
</Card>

// Card with hover effect
<Card hover>
  <CardHeader>
    <CardTitle>Card Title</CardTitle>
  </CardHeader>
  <CardContent>
    <p>This card elevates on hover</p>
  </CardContent>
  <CardFooter>
    <Button variant="primary">Learn More</Button>
  </CardFooter>
</Card>

// Custom styled card
<Card className="bg-botanical-50 border-2 border-botanical-200">
  <CardContent>
    <p>Custom background card</p>
  </CardContent>
</Card>
```

### Badge Component

```tsx
import Badge from '@/components/ui/Badge';

// Success badge
<Badge variant="success">In Stock</Badge>

// Warning badge
<Badge variant="warning">Low Stock</Badge>

// Info badge
<Badge variant="info">New</Badge>

// With custom styling
<Badge variant="success" className="text-xs">
  Certified Organic
</Badge>
```

## Product Components

### ProductCard

```tsx
import ProductCard from '@/components/products/ProductCard';

const product = {
  id: '1',
  name: 'Premium Garden Soil',
  slug: 'premium-garden-soil',
  price: 899,
  originalPrice: 1199,
  images: ['/images/product.jpg'],
  category: 'garden-lawn',
  rating: 4.8,
  reviewCount: 247,
  stock: 50,
  // ... other product fields
};

<ProductCard product={product} />
```

### Product Grid

```tsx
import ProductCard from '@/components/products/ProductCard';

const products = [...]; // Array of products

<div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
  {products.map((product) => (
    <ProductCard key={product.id} product={product} />
  ))}
</div>
```

## Layout Components

### Using Layout

```tsx
import Layout from '@/components/layout/Layout';

export default function MyPage() {
  return (
    <Layout>
      {/* Your page content */}
      <div className="container-custom py-12">
        <h1>Page Title</h1>
      </div>
    </Layout>
  );
}
```

### Header

The header is automatically included in Layout. To customize navigation links, edit:
`src/components/layout/Header.tsx`

```tsx
const navLinks = [
  { href: '/', label: 'Home' },
  { href: '/products', label: 'Products' },
  // Add more links...
];
```

### Footer

The footer is automatically included in Layout. To customize sections, edit:
`src/components/layout/Footer.tsx`

## Home Page Sections

### Hero Section

```tsx
import HeroSection from '@/components/home/HeroSection';

<HeroSection />
```

Customize the hero in `src/components/home/HeroSection.tsx`:
- Change headline text
- Update CTA button text
- Replace hero image
- Modify trust indicators

### Categories Section

```tsx
import CategoriesSection from '@/components/home/CategoriesSection';

<CategoriesSection />
```

Add more categories by editing the `categories` array in the component.

### Featured Products

```tsx
import FeaturedProductsSection from '@/components/home/FeaturedProductsSection';

<FeaturedProductsSection />
```

Products marked as `featured: true` in the data will appear here.

### Testimonials

```tsx
import TestimonialsSection from '@/components/home/TestimonialsSection';

<TestimonialsSection />
```

Add testimonials to `src/lib/mockData.ts` in the `mockTestimonials` array.

## Chatbot

### Basic Usage

```tsx
import ChatBot from '@/components/ChatBot';

// Place at the end of your page
<ChatBot />
```

### Opening Chat Programmatically

```tsx
import { useChatStore } from '@/store/chatStore';

function MyComponent() {
  const openChat = useChatStore((state) => state.openChat);
  
  return (
    <Button onClick={openChat}>
      Get Help
    </Button>
  );
}
```

### Customizing Responses

Edit `src/components/ChatBot.tsx`, find the `handleSendMessage` function:

```tsx
const handleSendMessage = async (message?: string) => {
  // Add custom logic
  if (lowerMessage.includes('your-keyword')) {
    botResponse = 'Your custom response';
    suggestions = ['Option 1', 'Option 2'];
    setUserContext({ application: 'custom' });
  }
};
```

## State Management (Zustand)

### Cart Store

```tsx
import { useCartStore } from '@/store/cartStore';

function MyComponent() {
  // Get cart items
  const items = useCartStore((state) => state.items);
  
  // Get functions
  const addItem = useCartStore((state) => state.addItem);
  const removeItem = useCartStore((state) => state.removeItem);
  const updateQuantity = useCartStore((state) => state.updateQuantity);
  const getTotal = useCartStore((state) => state.getTotal);
  const clearCart = useCartStore((state) => state.clearCart);
  
  // Use them
  const handleAddToCart = () => {
    addItem(product, 1);
  };
  
  return (
    <div>
      <p>Cart items: {items.length}</p>
      <p>Total: ₹{getTotal()}</p>
    </div>
  );
}
```

### Chat Store

```tsx
import { useChatStore } from '@/store/chatStore';

function MyComponent() {
  const { isOpen, session, openChat, closeChat, addMessage } = useChatStore();
  
  const handleSendMessage = () => {
    addMessage({
      sender: 'user',
      message: 'Hello',
    });
  };
  
  return (
    <Button onClick={openChat}>
      Open Chat
    </Button>
  );
}
```

## Utility Functions

### Format Price

```tsx
import { formatPrice } from '@/lib/utils';

const price = 899;
const formatted = formatPrice(price); // "₹899"
```

### Calculate Discount

```tsx
import { calculateDiscount } from '@/lib/utils';

const originalPrice = 1199;
const currentPrice = 899;
const discount = calculateDiscount(originalPrice, currentPrice); // 25
```

### Generate Slug

```tsx
import { generateSlug } from '@/lib/utils';

const slug = generateSlug('Premium Garden Soil Mix'); // "premium-garden-soil-mix"
```

### Class Names (cn utility)

```tsx
import { cn } from '@/lib/utils';

// Conditionally apply classes
<div className={cn(
  'base-class',
  isActive && 'active-class',
  'another-class'
)}>
  Content
</div>
```

## Responsive Design

### Using Tailwind Breakpoints

```tsx
// Mobile-first approach
<div className="
  text-sm          // Mobile (default)
  md:text-base     // Tablet (≥768px)
  lg:text-lg       // Desktop (≥1024px)
">
  Responsive text
</div>

// Grid responsive
<div className="
  grid 
  grid-cols-1       // 1 column on mobile
  md:grid-cols-2    // 2 columns on tablet
  lg:grid-cols-3    // 3 columns on desktop
  gap-8
">
  {/* Grid items */}
</div>
```

### Hide/Show on Breakpoints

```tsx
// Show only on mobile
<div className="block lg:hidden">
  Mobile only
</div>

// Show only on desktop
<div className="hidden lg:block">
  Desktop only
</div>

// Hamburger menu pattern
<button className="lg:hidden">
  {/* Mobile menu button */}
</button>

<nav className="hidden lg:block">
  {/* Desktop navigation */}
</nav>
```

## Animation Examples

### Fade In

```tsx
<div className="animate-fade-in">
  Fades in on load
</div>
```

### Slide Up

```tsx
<div className="animate-slide-up">
  Slides up on load
</div>
```

### Staggered Animation

```tsx
{items.map((item, index) => (
  <div 
    key={item.id}
    className="animate-fade-in"
    style={{ animationDelay: `${index * 100}ms` }}
  >
    {item.content}
  </div>
))}
```

### Hover Effects

```tsx
// Scale on hover
<div className="transition-transform hover:scale-105">
  Hover me
</div>

// Shadow on hover
<div className="transition-shadow hover:shadow-card-hover">
  Hover for shadow
</div>

// Color transition
<button className="transition-colors hover:bg-botanical-600">
  Hover me
</button>
```

## Forms

### Contact Form Example

```tsx
import { useState } from 'react';
import Input from '@/components/ui/Input';
import Button from '@/components/ui/Button';

export default function ContactForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });
  
  const [errors, setErrors] = useState({});
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validation
    const newErrors: any = {};
    if (!formData.name) newErrors.name = 'Name is required';
    if (!formData.email) newErrors.email = 'Email is required';
    
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
    
    // Submit form
    console.log('Form submitted:', formData);
  };
  
  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <Input
        label="Name"
        value={formData.name}
        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
        error={errors.name}
      />
      
      <Input
        label="Email"
        type="email"
        value={formData.email}
        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
        error={errors.email}
      />
      
      <div>
        <label className="block text-sm font-medium text-soil-700 mb-2">
          Message
        </label>
        <textarea
          className="input min-h-[120px]"
          value={formData.message}
          onChange={(e) => setFormData({ ...formData, message: e.target.value })}
        />
      </div>
      
      <Button type="submit" variant="primary" size="lg">
        Send Message
      </Button>
    </form>
  );
}
```

## Page Templates

### Basic Page Template

```tsx
import Layout from '@/components/layout/Layout';
import ChatBot from '@/components/ChatBot';

export default function MyPage() {
  return (
    <Layout>
      {/* Hero/Header Section */}
      <section className="bg-botanical-500 text-white py-16">
        <div className="container-custom">
          <h1 className="text-4xl font-display font-bold mb-4">
            Page Title
          </h1>
          <p className="text-lg text-botanical-100 max-w-2xl">
            Page description
          </p>
        </div>
      </section>
      
      {/* Main Content */}
      <section className="section-spacing">
        <div className="container-custom">
          {/* Your content */}
        </div>
      </section>
      
      {/* Chatbot */}
      <ChatBot />
    </Layout>
  );
}
```

### Two-Column Layout

```tsx
<div className="container-custom py-12">
  <div className="grid lg:grid-cols-3 gap-8">
    {/* Sidebar */}
    <aside className="lg:col-span-1">
      <div className="card p-6 sticky top-8">
        {/* Sidebar content */}
      </div>
    </aside>
    
    {/* Main Content */}
    <main className="lg:col-span-2">
      {/* Main content */}
    </main>
  </div>
</div>
```

---

## Best Practices

1. **Always use the Layout component** for consistent header/footer
2. **Use TypeScript** types for props and state
3. **Follow the color palette** defined in Tailwind config
4. **Test responsiveness** on multiple screen sizes
5. **Add accessibility** attributes (aria-labels, alt text)
6. **Optimize images** using Next/Image
7. **Keep components small** and focused
8. **Use semantic HTML** (header, nav, main, section, article)
9. **Add loading states** for async operations
10. **Handle errors gracefully** with user-friendly messages

---

For more examples, check the actual component source code in `src/components/`.
