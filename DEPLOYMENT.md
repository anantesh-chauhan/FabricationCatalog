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

### Backend - Render.com
1. Create account on render.com
2. Create new Web Service
3. Connect GitHub repository
4. Set environment variables:
   - MONGODB_URI (from MongoDB Atlas)
   - JWT_SECRET
   - CLOUDINARY_CLOUD_NAME
   - CLOUDINARY_API_KEY
   - CLOUDINARY_API_SECRET
5. Build command: `npm run start`
6. Start command: `node server.js`

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
