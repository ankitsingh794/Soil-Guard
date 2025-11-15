# 🎨 Soil Guard Design Guide

## Brand Identity

### Mission
Provide premium, sustainable soil solutions with modern technology assistance.

### Personality
- Professional yet approachable
- Eco-conscious and trustworthy
- Modern and innovative
- Expert and knowledgeable

---

## Visual Design

### Color System

#### Primary Palette
```
Soil Brown (#6B4F2D)
├── Lighter: #B8AA99
├── Base: #6B4F2D
└── Darker: #382618

Use: Brand identity, secondary buttons, headings
```

#### Secondary Palette
```
Botanical Green (#4A7C59)
├── Lighter: #87C3A7
├── Base: #4A7C59
└── Darker: #2F4F38

Use: CTAs, links, accents, success states
```

#### Neutral Palette
```
Sand (#F6F5F3)
└── Use: Backgrounds, cards

White (#FFFFFF)
└── Use: Primary backgrounds, text on dark

Soil Grays (#F9F7F4 → #271A11)
└── Use: Text, borders, shadows
```

#### Accent Colors
```
Success: #4A7C59 (Green)
Warning: #D4972E (Amber)
Error: #C84B31 (Red)
```

### Typography

#### Font Families
- **Display (Headings)**: Outfit
  - Weights: 400, 500, 600, 700, 800
  - Use: H1, H2, H3, brand text
  
- **Body**: Inter
  - Weights: 300, 400, 500, 600, 700
  - Use: Body text, buttons, UI elements

#### Type Scale
```
Hero Desktop:   48px / 3rem   (Line height: 1.1)
Hero Mobile:    32px / 2rem   (Line height: 1.2)
H2:             36px / 2.25rem
H3:             24px / 1.5rem
H4:             20px / 1.25rem
Body Large:     18px / 1.125rem
Body:           16px / 1rem    (Line height: 1.5)
Body Small:     14px / 0.875rem
Caption:        12px / 0.75rem
```

---

## UI Components

### Buttons

#### Primary Button
```tsx
<Button variant="primary" size="md">
  Action Text
</Button>
```
- Background: Botanical Green (#4A7C59)
- Text: White
- Hover: Darker green
- Shadow on hover

#### Secondary Button
```tsx
<Button variant="secondary" size="md">
  Action Text
</Button>
```
- Background: Soil Brown (#6B4F2D)
- Text: White
- Use for alternative actions

#### Outline Button
```tsx
<Button variant="outline" size="md">
  Action Text
</Button>
```
- Border: 2px Soil Brown
- Background: Transparent
- Hover: Soft background

#### Sizes
- Small (`sm`): 32px height, px-4 py-2
- Medium (`md`): 40px height, px-6 py-3
- Large (`lg`): 48px height, px-8 py-4

### Cards

```tsx
<div className="card card-hover">
  <!-- Content -->
</div>
```

- Background: White
- Border radius: 8px
- Shadow: Soft shadow
- Hover: Elevated shadow
- Padding: 24px (p-6)

### Inputs

```tsx
<Input 
  label="Label Text"
  placeholder="Placeholder"
  error="Error message"
/>
```

- Height: 40px
- Border: 1px solid Soil-300
- Focus: 2px ring Botanical-500
- Padding: px-4 py-2.5

### Badges

```tsx
<Badge variant="success">Text</Badge>
<Badge variant="warning">Text</Badge>
<Badge variant="info">Text</Badge>
```

- Padding: 4px 10px
- Border radius: 9999px (fully rounded)
- Font size: 12px
- Font weight: 600

---

## Layout Guidelines

### Spacing System

```
4px increments:
4, 8, 12, 16, 24, 32, 48, 64, 96, 128
```

### Container
- Max width: 1280px (7xl)
- Padding: 
  - Mobile: 16px (px-4)
  - Tablet: 24px (px-6)
  - Desktop: 32px (px-8)

### Section Spacing
- Mobile: 48px (py-12)
- Tablet: 64px (py-16)
- Desktop: 96px (py-24)

### Grid Systems

#### Product Grid
- Mobile: 1 column
- Tablet: 2 columns
- Desktop: 3 columns
- Large: 4 columns
- Gap: 32px

#### Category Grid
- Mobile: 1 column
- Tablet: 2 columns
- Desktop: 3 columns
- Gap: 32px

---

## Imagery Guidelines

### Product Images
- Aspect ratio: 3:4 (vertical) or 1:1 (square)
- Min resolution: 800x1000px
- Format: WebP (with JPEG fallback)
- Show product in context
- Clean backgrounds (white/neutral)

### Hero Images
- Aspect ratio: 16:9
- Min resolution: 1920x1080px
- Show soil texture, plants, or applications
- High quality, professional photography
- Warm, natural lighting

### Image Optimization
- Use Next/Image component
- Lazy loading enabled
- Sizes attribute specified
- Alt text required

---

## Iconography

### Icon Library
Using **Lucide React**

### Icon Sizes
- Small: 16px (w-4 h-4)
- Medium: 20px (w-5 h-5)
- Large: 24px (w-6 h-6)
- XL: 32px (w-8 h-8)

### Icon Style
- Stroke width: 2
- Line style: Rounded
- Colors: Inherit from text or themed

### Common Icons
- Shopping: ShoppingCart, ShoppingBag
- User: User, UserCircle
- Communication: MessageCircle, Phone, Mail
- Actions: Search, ChevronRight, ArrowRight
- Status: CheckCircle, AlertCircle, X

---

## Animation & Motion

### Principles
- Subtle and purposeful
- Duration: 200-400ms
- Easing: ease-in-out, ease-out

### Common Animations

#### Fade In
```css
@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}
Duration: 600ms
```

#### Slide Up
```css
@keyframes slideUp {
  from { 
    transform: translateY(20px);
    opacity: 0;
  }
  to { 
    transform: translateY(0);
    opacity: 1;
  }
}
Duration: 600ms
```

#### Hover Effects
- Scale: 1.05 (buttons, cards)
- Translate: 2-4px (icons, arrows)
- Shadow elevation
- Color transition

### Reduced Motion
Always respect `prefers-reduced-motion` media query

---

## Chatbot Design

### Widget Appearance
- Position: Fixed bottom-right
- Size: 400x600px (desktop)
- Mobile: Full width, 90% height
- Border radius: 16px
- Shadow: Large elevation
- Colors: Botanical green gradient

### Conversation UI
- User messages: Right-aligned, botanical green
- Bot messages: Left-aligned, sand background
- Border radius: 16px (with tail)
- Timestamp: Hidden by default
- Suggestions: White cards with border

---

## Trust Signals

### Security Badges
- Icons: Shield, Lock, CheckCircle
- Colors: Botanical green or neutral
- Size: 48px x 48px
- Always visible in footer and checkout

### Customer Reviews
- 5-star rating system
- Yellow stars (#F59E0B)
- Show count: "4.8 (247 reviews)"
- Verified badge for purchases

### Certifications
- Display as badges
- Green background for organic
- Include: "Organic Certified", "Quality Tested"

---

## Accessibility

### Color Contrast
- Text on white: Min 4.5:1 ratio
- Large text: Min 3:1 ratio
- UI elements: Min 3:1 ratio

### Interactive Elements
- Min touch target: 44x44px
- Focus indicators: 2px ring
- Keyboard navigable
- Screen reader labels

### Content
- Semantic HTML
- Alt text for images
- ARIA labels where needed
- Heading hierarchy

---

## Responsive Breakpoints

```
Mobile:     < 768px   (sm)
Tablet:     768px     (md)
Desktop:    1024px    (lg)
Large:      1280px    (xl)
XL:         1536px    (2xl)
```

### Mobile-First Approach
Design for mobile, enhance for larger screens

### Key Considerations
- Touch-friendly targets (min 44px)
- Readable font sizes (min 16px)
- Collapsible navigation
- Stacked layouts on mobile
- Grid adaptations

---

## Performance Guidelines

### Images
- WebP format preferred
- Lazy loading enabled
- Responsive sizes
- Max file size: 200KB

### CSS
- Tailwind for utility classes
- Minimal custom CSS
- PurgeCSS in production

### JavaScript
- Code splitting
- Lazy load components
- Minimize bundle size

### Metrics Goals
- Largest Contentful Paint: < 2.5s
- First Input Delay: < 100ms
- Cumulative Layout Shift: < 0.1

---

## Content Guidelines

### Voice & Tone
- Professional but friendly
- Educational without being condescending
- Action-oriented
- Sustainable and eco-conscious

### Product Descriptions
- Lead with benefits
- Include specifications
- Use bullet points
- Highlight certifications

### CTAs
- Action verbs: "Find", "Browse", "Add", "Shop"
- Clear and direct
- Create urgency where appropriate
- Examples: "Find Your Soil Solution", "Add to Cart", "Get Started"

---

## Component Library

### When to Use Each Component

**Button**: Primary actions, CTAs, form submissions
**Card**: Product displays, content blocks, features
**Badge**: Status indicators, categories, labels
**Input**: Forms, search, user input
**Modal**: Confirmations, detailed info (future)
**Toast**: Success/error notifications (future)

---

## Brand Applications

### Logo Usage
- Primary: Full logo with icon + text
- Icon only: For tight spaces
- Minimum size: 32px height
- Clear space: Equal to logo height

### Social Media
- Profile images: Icon version
- Cover photos: Hero imagery with logo
- Post graphics: Brand colors, clean layouts

---

This design guide ensures consistency across the Soil Guard platform while maintaining flexibility for growth and enhancement.
