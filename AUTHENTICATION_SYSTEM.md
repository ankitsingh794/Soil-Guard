# Authentication & Permission System - Complete Guide

## Overview
This document describes the complete authentication and permission system implemented in SoilGuard, including how to manage logged-in vs logged-out user access.

---

## 🔐 Authentication Architecture

### Core Components

#### 1. **AuthContext** (`src/contexts/AuthContext.tsx`)
Global authentication state management using React Context API.

**State:**
- `user`: User object (id, name, email, role) or null
- `isAuthenticated`: Boolean indicating login status
- `isLoading`: Boolean for initial auth check

**Methods:**
- `login(email, password)`: Authenticates user and stores token
- `register(name, email, password)`: Creates account and auto-logs in
- `logout()`: Clears token and redirects to home
- `refreshAuth()`: Re-fetches user data from stored token

**Usage in Components:**
```tsx
import { useAuth } from '@/contexts/AuthContext';

function MyComponent() {
  const { user, isAuthenticated, isLoading, login, logout } = useAuth();
  
  if (isLoading) return <div>Loading...</div>;
  
  return (
    <div>
      {isAuthenticated ? (
        <p>Welcome, {user.name}!</p>
      ) : (
        <button onClick={() => login(email, password)}>Login</button>
      )}
    </div>
  );
}
```

#### 2. **ProtectedRoute** (`src/components/ProtectedRoute.tsx`)
Component wrapper that restricts access to authenticated users only.

**Features:**
- Shows loading spinner while checking auth status
- Automatically redirects to `/login` if not authenticated
- Renders children only when authenticated

**Usage:**
```tsx
import ProtectedRoute from '@/components/ProtectedRoute';

export default function ProfilePage() {
  return (
    <ProtectedRoute>
      <YourProtectedContent />
    </ProtectedRoute>
  );
}
```

**Pages Currently Protected:**
- `/profile` - User profile and settings

#### 3. **LoginModal** (`src/components/LoginModal.tsx`)
Reusable modal for login/register prompts.

**Props:**
- `isOpen`: Boolean to show/hide modal
- `onClose`: Function to close modal
- `message`: Optional message to display (e.g., "Please login to checkout")

**Features:**
- Tabbed interface (Login / Register)
- Form validation
- Error handling
- Password visibility toggle
- Link to full login page

**Usage:**
```tsx
import LoginModal from '@/components/LoginModal';

function MyComponent() {
  const [showModal, setShowModal] = useState(false);
  
  return (
    <>
      <button onClick={() => setShowModal(true)}>Login</button>
      <LoginModal 
        isOpen={showModal} 
        onClose={() => setShowModal(false)}
        message="Please login to continue"
      />
    </>
  );
}
```

#### 4. **API Client** (`src/lib/api.ts`)
Handles all backend communication with automatic token injection.

**Auth Methods:**
- `auth.login({ email, password })`: Returns { success, token, user }
- `auth.register({ name, email, password })`: Returns { success, token, user }
- `auth.logout()`: Removes token from localStorage
- `auth.getProfile()`: Fetches current user data
- `auth.updateProfile(data)`: Updates user information
- `auth.isAuthenticated()`: Checks if token exists
- `auth.getUser()`: Returns user object from localStorage
- `auth.getToken()`: Returns JWT token

---

## 🔄 Authentication Flow

### Registration Flow
1. User fills registration form (name, email, password)
2. `useAuth().register()` called
3. API creates user account → returns JWT token
4. Token stored in localStorage (key: `soilguard_token`)
5. User object stored in localStorage (key: `soilguard_user`)
6. AuthContext updates state (user, isAuthenticated = true)
7. Redirect to `/profile` or intended page

### Login Flow
1. User enters email and password
2. `useAuth().login()` called
3. API validates credentials → returns JWT token
4. Token and user stored in localStorage
5. AuthContext updates state
6. Redirect to intended page (or `/profile`)

### Logout Flow
1. User clicks "Logout" button
2. `useAuth().logout()` called
3. Token and user removed from localStorage
4. AuthContext clears state (user = null, isAuthenticated = false)
5. Redirect to home page (`/`)

### Session Persistence
- Token stored in localStorage persists across page reloads
- On app load, AuthContext checks for existing token
- If token exists, user data loaded from localStorage
- Token expires after 30 days (backend validation)

---

## 🛡️ Permission System

### Access Control Levels

#### **Public Access** (No Login Required)
- Homepage (`/`)
- Product catalog (`/products`)
- Individual product pages (`/products/[slug]`)
- Category pages (`/categories/[category]`)
- About page (`/about`)
- Contact page (`/contact`)
- Chat page (`/chat`) - Enhanced with login

#### **Authentication Required**
- User Profile (`/profile`) - Wrapped with ProtectedRoute
- Checkout (`/checkout`) - Login modal prompts before proceeding
- Order History - (Not yet implemented)
- Wishlist - (Not yet implemented)

#### **Conditional Features**
- **Cart Page**: View cart without login, but login required for checkout
- **Product Pages**: View products without login, add to cart without login (stored locally), but checkout requires login
- **Chat**: Works without login (no user ID), but logged-in users get personalized history

### Implementation Patterns

#### Pattern 1: Protected Route
For entire pages that require authentication:
```tsx
export default function ProtectedPage() {
  return (
    <ProtectedRoute>
      <YourPageContent />
    </ProtectedRoute>
  );
}
```

#### Pattern 2: Conditional Rendering
For components that show different UI based on auth:
```tsx
function MyComponent() {
  const { isAuthenticated, user } = useAuth();
  
  return (
    <div>
      {isAuthenticated ? (
        <div>Welcome, {user.name}!</div>
      ) : (
        <button>Login</button>
      )}
    </div>
  );
}
```

#### Pattern 3: Action Gating with Modal
For actions that require login:
```tsx
function ProductPage() {
  const { isAuthenticated } = useAuth();
  const [showLoginModal, setShowLoginModal] = useState(false);
  
  const handleCheckout = () => {
    if (!isAuthenticated) {
      setShowLoginModal(true);
    } else {
      proceedToCheckout();
    }
  };
  
  return (
    <>
      <button onClick={handleCheckout}>Checkout</button>
      <LoginModal 
        isOpen={showLoginModal} 
        onClose={() => setShowLoginModal(false)}
        message="Please login to complete your purchase"
      />
    </>
  );
}
```

---

## 🎯 Component Updates

### Header (`src/components/layout/Header.tsx`)
**Changes:**
- Uses `useAuth()` hook instead of local useState
- Shows user dropdown when authenticated (name, email, profile link, logout)
- Shows login icon when not authenticated

**Before:**
```tsx
const [isAuthenticated, setIsAuthenticated] = useState(false);
const [user, setUser] = useState(null);
useEffect(() => {
  setIsAuthenticated(auth.isAuthenticated());
  setUser(auth.getUser());
}, [pathname]);
```

**After:**
```tsx
const { user, isAuthenticated, logout } = useAuth();
```

### Login Page (`src/app/login/page.tsx`)
**Changes:**
- Uses `useAuth()` methods instead of direct API calls
- Simplified error handling (handled in context)
- Automatic redirect after successful login/register

**Before:**
```tsx
const response = await auth.login({ email, password });
if (response.success) {
  // handle success
}
```

**After:**
```tsx
await login(email, password);
// Success handled in context, just redirect
```

### Chat Page (`src/app/chat/page.tsx`)
**Changes:**
- Gets user from AuthContext instead of API client
- Simplified user ID retrieval

**Before:**
```tsx
const user = auth.getUser();
const userId = user?.id;
```

**After:**
```tsx
const { user } = useAuth();
const userId = user?.id;
```

### Cart Page (`src/app/cart/page.tsx`)
**Changes:**
- Added login check before checkout
- Shows LoginModal if not authenticated
- Allows viewing cart without login

**New Features:**
```tsx
const { isAuthenticated } = useAuth();
const [showLoginModal, setShowLoginModal] = useState(false);

const handleCheckout = () => {
  if (!isAuthenticated) {
    setShowLoginModal(true);
  } else {
    proceedToCheckout();
  }
};
```

### Profile Page (`src/app/profile/page.tsx`)
**Changes:**
- Wrapped entire page with ProtectedRoute
- Only accessible to logged-in users
- Auto-redirects to /login if not authenticated

**Structure:**
```tsx
function ProfilePageContent() {
  // Main profile component
}

export default function ProfilePage() {
  return (
    <ProtectedRoute>
      <ProfilePageContent />
    </ProtectedRoute>
  );
}
```

---

## 📋 User Experience Flow

### For Logged-Out Users
1. **Browse freely**: Homepage, products, categories
2. **Add to cart**: Can add items (stored locally in Zustand)
3. **Try to checkout**: LoginModal appears with message
4. **Login/Register**: Complete authentication in modal or full page
5. **Return to cart**: Automatically proceed to checkout

### For Logged-In Users
1. **See name in header**: User dropdown shows name/email
2. **Access profile**: Click name → Profile page
3. **Chat with history**: Messages saved with user ID
4. **Quick checkout**: No login prompt, direct to checkout
5. **View orders**: (Future) Order history accessible
6. **Logout anytime**: Click logout → Return to home

---

## 🔒 Security Features

### Token Management
- **Storage**: localStorage (key: `soilguard_token`)
- **Format**: JWT with 30-day expiration
- **Transmission**: Bearer token in Authorization header
- **Validation**: Backend validates on every API call

### Password Security
- **Hashing**: bcryptjs with 10 salt rounds (backend)
- **Minimum Length**: 6 characters
- **Visibility Toggle**: Eye icon to show/hide password
- **No Plain Text**: Never logged or stored

### Session Security
- **Auto-expire**: 30-day token expiration
- **Logout**: Clears all client-side data
- **Refresh**: Can re-validate token with `/api/auth/me`

---

## 🧪 Testing Scenarios

### Test 1: Registration Flow
1. Go to `/login`
2. Click "Register" tab
3. Fill: Name, Email, Password
4. Submit → Should see success message
5. Auto-redirect to `/profile` after 1 second
6. Header should show user name

### Test 2: Login Flow
1. Go to `/login`
2. Enter email and password
3. Submit → Should see success message
4. Redirect to `/profile`
5. Header dropdown shows name/email

### Test 3: Protected Route Access
1. Logout (if logged in)
2. Try to go to `/profile` directly
3. Should see loading spinner briefly
4. Redirect to `/login` page
5. Login → Return to `/profile`

### Test 4: Checkout with Authentication
1. Logout
2. Add items to cart
3. Go to `/cart`
4. Click "Proceed to Checkout"
5. LoginModal should appear
6. Login in modal
7. Modal closes, can proceed to checkout

### Test 5: Session Persistence
1. Login
2. Refresh page → Still logged in
3. Close browser → Reopen → Still logged in
4. Wait 30 days (or manually delete token) → Need to login again

### Test 6: Logout Flow
1. Login
2. Click user dropdown in header
3. Click "Logout"
4. Redirect to home page
5. Header shows login icon (not user dropdown)
6. Try to access `/profile` → Redirect to `/login`

---

## 🚀 Future Enhancements

### Planned Features
- [ ] Email verification on registration
- [ ] Password reset via email
- [ ] Remember me checkbox (longer token expiration)
- [ ] Social login (Google, Facebook)
- [ ] Two-factor authentication
- [ ] Admin role with elevated permissions
- [ ] Order history page (protected)
- [ ] Wishlist functionality (protected)
- [ ] Address book management (protected)

### Recommended Improvements
- [ ] Toast notifications for better UX (react-hot-toast)
- [ ] Loading skeletons during auth checks
- [ ] Token refresh mechanism (before 30-day expiry)
- [ ] Rate limiting on login attempts
- [ ] CAPTCHA on registration (bot prevention)
- [ ] Audit log for security events

---

## 📡 API Endpoints

### Authentication
- `POST /api/auth/register` - Create new account
  - Body: `{ name, email, password }`
  - Returns: `{ success, token, user }`

- `POST /api/auth/login` - Authenticate user
  - Body: `{ email, password }`
  - Returns: `{ success, token, user }`

- `GET /api/auth/me` - Get current user
  - Headers: `Authorization: Bearer <token>`
  - Returns: `{ success, user }`

- `PUT /api/auth/profile` - Update user profile
  - Headers: `Authorization: Bearer <token>`
  - Body: `{ name, phone, address, ... }`
  - Returns: `{ success, user }`

### Chat (with Optional Auth)
- `POST /api/chat` - Send message
  - Body: `{ message, sessionId, userId (optional) }`
  - Returns: `{ success, response, sessionId }`

---

## 🛠️ Troubleshooting

### Issue: User not staying logged in after refresh
**Solution:** Check that token is stored in localStorage and AuthContext loads it on mount.

### Issue: Protected route not redirecting
**Solution:** Ensure ProtectedRoute wrapper is used and AuthContext is provided in root layout.

### Issue: LoginModal not appearing
**Solution:** Check that `isOpen` prop is passed correctly and modal is rendered in JSX.

### Issue: Token expired but no prompt to re-login
**Solution:** Backend returns 401 on expired token. Frontend should catch and show login modal.

### Issue: User dropdown not showing after login
**Solution:** Verify AuthContext is updating state after successful login.

---

## 📞 Support

For issues or questions:
- Check browser console for errors
- Verify backend is running: https://soil-guard.onrender.com/api/health
- Check localStorage for token: `soilguard_token`
- Review network tab for failed API calls

---

**Last Updated:** January 2025  
**Version:** 1.0  
**Author:** SoilGuard Development Team
