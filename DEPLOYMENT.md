# Deployment Guide
Adarsh Gate Grill and Fabrication Shop - MERN Stack

## Quick Start

### 1. Backend Setup
```bash
cd backend
npm install
```

### 2. Environment Variables
Create `.env` file in backend folder:
```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/adarsh-gate-grill
JWT_SECRET=your-secret-key-here
CLOUDINARY_CLOUD_NAME=your-cloud-name
CLOUDINARY_API_KEY=your-api-key
CLOUDINARY_API_SECRET=your-api-secret
ADMIN_USERNAME=admin
ADMIN_PASSWORD=admin123
```

### 3. Run Backend
```bash
npm run dev
```
Server runs on http://localhost:5000

### 4. Run Seed (Optional)
```bash
npm run seed
```
This seeds 30 sample products across 5 categories.

### 5. Frontend Setup
```bash
cd frontend
npm install
npm run dev
```
Frontend runs on http://localhost:5173

## Production Deployment

### Backend - Render.com (SINGLE SERVICE ✅)
**IMPORTANT: Backend serves frontend in production - NO separate frontend deploy needed!**

1. Fork/Connect GitHub repo to Render.com
2. Create **Web Service** (not Static Site)
3. **Build Command:** `npm install && cd backend && npm install && cd ../frontend && npm install && npm run build`
4. **Start Command:** `cd backend && npm start`
5. **Root Directory:** `/` (repo root)

**🚨 CRITICAL Environment Variables (Images will FAIL without these):**
```
NODE_ENV=production
MONGODB_URI=your_atlas_connection_string
JWT_SECRET=your_jwt_secret_32_chars_min
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key  
CLOUDINARY_API_SECRET=your_api_secret
```

**6. Deploy → https://yourapp.onrender.com will serve full app!**

### Render.com Image Upload Checklist
```
✅ 1. CLOUDINARY_* vars set (check server logs)
✅ 2. Backend serves frontend/dist ✅  
✅ 3. /api/health returns OK
✅ 4. Upload image → check console for "Valid Cloudinary URL"
✅ 5. Images load from res.cloudinary.com ✅
```


### Frontend - Vercel
1. Create account on vercel.com
2. Import GitHub repository
3. Set environment variables:
   - VITE_API_URL = your-backend-url (e.g., https://your-app.onrender.com/api)
4. Deploy

### Database - MongoDB Atlas
1. Create account on mongodb.com/atlas
2. Create free cluster
3. Create database user
4. Get connection string
5. Add to backend environment variables

## Reusable for New Shops

To create a new shop site:
1. Edit `frontend/src/config/siteConfig.js` with new shop details
2. Edit `backend/config/siteConfig.js` with same details
3. Deploy - no code changes needed!
