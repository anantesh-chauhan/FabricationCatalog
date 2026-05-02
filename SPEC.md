# Pappu Iron Works - Digital Catalogue Specification

## 1. Project Overview

- **Project Name**: Pappu Iron Works Digital Catalogue
- **Type**: MERN Stack Web Application (MongoDB, Express, React, Node.js)
- **Core Functionality**: Digital album to showcase fabrication designs (gates, windows, railings, grills) and allow customers to contact the shop
- **Target Users**: Potential customers browsing designs, Shop owner managing products

---

## 2. Technical Architecture

### Folder Structure
```
pappu-iron-works/
├── backend/
│   ├── config/
│   │   └── db.js
│   ├── controllers/
│   │   └── productController.js
│   ├── middleware/
│   │   └── auth.js
│   ├── models/
│   │   └── Product.js
│   ├── routes/
│   │   └── productRoutes.js
│   ├── uploads/
│   ├── server.js
│   └── package.json
├── frontend/
│   ├── public/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── context/
│   │   ├── App.jsx
│   │   └── index.css
│   ├── index.html
│   └── package.json
└── README.md
```

### Tech Stack
- **Runtime**: Node.js
- **Framework**: Express.js (Backend), React (Frontend)
- **Database**: MongoDB with Mongoose ODM
- **Image Upload**: Cloudinary
- **Authentication**: JWT-based simple auth
- **Build Tool**: Vite
- **Animations**: Framer Motion
- **Styling**: Custom CSS with CSS Variables

---

## 3. UI/UX Specification

### Color Palette
```css
--primary: #1a1a2e;        /* Deep navy - main background */
--primary-light: #16213e;  /* Lighter navy - cards */
--accent: #e94560;         /* Vibrant red-pink - buttons, highlights */
--accent-hover: #ff6b6b;    /* Lighter accent - hover states */
--text: #eaeaea;           /* Off-white - main text */
--text-muted: #a0a0a0;     /* Gray - secondary text */
--surface: #0f0f1a;        /* Dark surface - input backgrounds */
--success: #4ecca3;        /* Teal green - success states */
--warning: #ffc107;        /* Amber - warnings */
```

### Typography
- **Headings**: 'Bebas Neue', sans-serif (Bold, industrial feel)
- **Body**: 'Outfit', sans-serif (Clean, modern)
- **Sizes**:
  - H1: 3.5rem (56px)
  - H2: 2.5rem (40px)
  - H3: 1.5rem (24px)
  - Body: 1rem (16px)
  - Small: 0.875rem (14px)

### Layout
- **Max Width**: 1400px
- **Grid**: CSS Grid with auto-fit columns
- **Responsive Breakpoints**:
  - Mobile: < 640px (1 column)
  - Tablet: 640px - 1024px (2 columns)
  - Desktop: > 1024px (3-4 columns)
- **Spacing System**: 8px base unit (0.5rem)

### Visual Effects
- **Card Shadows**: 0 4px 20px rgba(233, 69, 96, 0.1)
- **Hover Transform**: translateY(-4px)
- **Border Radius**: 12px for cards, 8px for buttons
- **Transitions**: 0.3s ease for all interactive elements

---

## 4. Page Specifications

### 4.1 Public Website

#### Home Page (/)
- **Hero Section**:
  - Full-width banner with parallax effect
  - Shop name "Pappu Iron Works" in large display text
  - Tagline: "Crafting Excellence in Metal"
  - Call Now button (links to tel:98XXXXXX12)
  - Animated iron/steel decorative elements
  
- **About Section**:
  - Shop name, address, phone display
  - Services list with icons
  - Working hours placeholder

- **Featured Products**: Grid of 6 featured items
- **Quick Contact**: WhatsApp and Call buttons

#### Gallery Page (/gallery)
- **Category Filter Tabs**: All, Gates, Windows, Railings, Other
- **Product Grid**: 
  - Card with image (aspect-ratio: 4:3)
  - Title overlay on hover
  - WhatsApp share button
- **Empty State**: Message when no products in category

#### Product Card Component
- Image with object-fit: cover
- Title at bottom
- Hover overlay with:
  - "Share on WhatsApp" button
  - View details (optional)
- Smooth scale animation on hover

#### Contact Page (/contact)
- Shop details card:
  - Name: Pappu Iron Works
  - Address: Kanpur, Uttar Pradesh
  - Phone: 98XXXXXX12
- Map placeholder (iframe or div)
- Direct call button
- WhatsApp quick chat button

### 4.2 Admin Panel

#### Login Page (/admin/login)
- Simple username/password form
- Demo credentials: admin / pappu123
- Error message display

#### Dashboard (/admin)
- Stats cards: Total Products, Gates, Windows, Railings, Other
- Recent products list
- Quick actions: Add New Product

#### Add Product (/admin/add)
- Image upload with preview:
  - Drag & drop zone
  - File input fallback
  - Cloudinary upload on submit
- Title input (text)
- Category dropdown (select)
- Submit button
- Cancel button

#### Manage Products (/admin/products)
- Table/grid of all products
- Edit button per item
- Delete button per item (with confirmation)
- Search/filter functionality

---

## 5. Backend API Specification

### Product Schema (MongoDB)
```javascript
{
  title: String (required, max 100 chars),
  imageUrl: String (required, Cloudinary URL),
  category: String (enum: ['gates', 'windows', 'railings', 'other']),
  createdAt: Date (default: Date.now)
}
```

### API Endpoints

#### Public Endpoints
- `GET /api/products` - Get all products (optional ?category=gates)
- `GET /api/products/:id` - Get single product

#### Protected Endpoints (Admin)
- `POST /api/products` - Create product (requires auth)
  - Body: { title, imageUrl, category }
- `PUT /api/products/:id` - Update product
- `DELETE /api/products/:id` - Delete product

#### Auth Endpoints
- `POST /api/auth/login` - Login (body: { username, password })

### Middleware
- `authMiddleware` - JWT verification for protected routes

---

## 6. Frontend State Management

### React Context
- **AuthContext**: Login state, logout function
- **ProductContext**: Products list, add/update/delete functions

### Local Storage
- `auth_token`: JWT token for admin sessions

---

## 7. Component List

### Public Components
- Navbar (responsive, hamburger menu)
- Hero (animated banner)
- ProductCard (grid item)
- ProductGrid (gallery)
- CategoryFilter (tabs)
- WhatsAppButton (share individual)
- CallButton (direct dial)
- Footer (shop info)
- LoadingSpinner

### Admin Components
- AdminSidebar
- ProductTable
- ImageUploader
- StatsCard

---

## 8. Animations (Framer Motion)

### Page Transitions
- Fade in + slide up on route change
- `initial: { opacity: 0, y: 20 }`
- `animate: { opacity: 1, y: 0 }`
- `exit: { opacity: 0 }`

### Product Cards
- Scale up on hover: `scale: 1.02`
- Shadow increase on hover

### Buttons
- Subtle bounce on click
- Color transition on hover

### Stagger Children
- Grid items animate with 0.1s delay between each

---

## 9. Environment Variables

### Backend (.env)
```
PORT=5000
MONGODB_URI=mongodb://localhost:27017/pappu-iron-works
JWT_SECRET=pappu_iron_works_secret_key
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
```

### Frontend (.env)
```
VITE_API_URL=http://localhost:5000/api
```

---

## 10. Acceptance Criteria

### Must Have
- [ ] Home page loads with shop name and banner
- [ ] Gallery displays products in responsive grid
- [ ] Category filtering works correctly
- [ ] WhatsApp share button generates correct link
- [ ] Call button initiates phone call
- [ ] Admin login works with demo credentials
- [ ] Add product with image upload works
- [ ] Edit product functionality works
- [ ] Delete product with confirmation works
- [ ] Mobile responsive design works

### Should Have
- [ ] Smooth page transitions
- [ ] Loading states
- [ ] Error handling with user feedback
- [ ] Empty state messages

### Nice to Have
- [ ] Search functionality
- [ ] Image optimization
- [ ] SEO meta tags
- [ ] PWA capabilities

---

## 11. Demo Data

Initial products to seed:
1. "Designer Gate 01" - gates
2. "Modern Window 01" - windows  
3. "Iron Railing 01" - railings
4. "Custom Grill Design" - other
5. "Garden Gate" - gates
6. "Steel Window" - windows

---

*Specification Version: 1.0*
*Created: Auto-generated for Pappu Iron Works*
