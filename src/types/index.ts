// Product Types
export interface Product {
  id: string;
  name: string;
  slug: string;
  description: string;
  shortDescription: string;
  price: number;
  originalPrice?: number;
  images: string[];
  category: ProductCategory;
  subcategory?: string;
  stock: number;
  rating: number;
  reviewCount: number;
  benefits: string[];
  specifications: ProductSpecification[];
  variants?: ProductVariant[];
  tags: string[];
  certifications?: string[];
  featured?: boolean;
  popular?: boolean;
}

export interface ProductVariant {
  id: string;
  name: string;
  price: number;
  stock: number;
  attributes: { [key: string]: string };
}

export interface ProductSpecification {
  label: string;
  value: string;
}

export type ProductCategory = 
  | 'garden-lawn'
  | 'industrial-remediation'
  | 'indoor-planting'
  | 'specialty-soils'
  | 'organic';

// Cart Types
export interface CartItem {
  product: Product;
  quantity: number;
  variantId?: string;
}

export interface Cart {
  items: CartItem[];
  total: number;
  itemCount: number;
}

// Review Types
export interface Review {
  id: string;
  productId: string;
  userName: string;
  rating: number;
  title: string;
  comment: string;
  date: string;
  verified: boolean;
  helpful: number;
}

// FAQ Types
export interface FAQ {
  question: string;
  answer: string;
}

// Filter Types
export interface FilterOptions {
  categories: ProductCategory[];
  priceRange: [number, number];
  volumeRange?: string[];
  tags: string[];
  inStock?: boolean;
}

export type SortOption = 
  | 'popularity'
  | 'price-asc'
  | 'price-desc'
  | 'newest'
  | 'rating';

// Chatbot Types
export interface ChatMessage {
  id: string;
  sender: 'user' | 'bot';
  message: string;
  timestamp: Date;
  suggestions?: string[];
  productRecommendations?: Product[];
}

export interface ChatSession {
  id: string;
  messages: ChatMessage[];
  userContext?: {
    application?: string;
    budget?: string;
    volume?: string;
  };
}

// Order Types
export interface Order {
  id: string;
  orderNumber: string;
  items: CartItem[];
  total: number;
  shippingAddress: Address;
  paymentMethod: string;
  status: OrderStatus;
  createdAt: Date;
}

export type OrderStatus = 
  | 'pending'
  | 'processing'
  | 'shipped'
  | 'delivered'
  | 'cancelled';

export interface Address {
  fullName: string;
  email: string;
  phone: string;
  addressLine1: string;
  addressLine2?: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
}

// Trust Signal Types
export interface TrustBadge {
  id: string;
  icon: string;
  label: string;
  description?: string;
}

// Testimonial Types
export interface Testimonial {
  id: string;
  name: string;
  role?: string;
  company?: string;
  content: string;
  rating: number;
  image?: string;
}
