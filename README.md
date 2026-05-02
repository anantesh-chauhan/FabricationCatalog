# Adarsh Gate Grill and Fabrication Shop - Digital Catalogue

A production-ready MERN stack website for fabrication shops. Easily customizable for different shops.

![License](https://img.shields.io/badge/license-MIT-blue.svg)
![Node.js](https://img.shields.io/badge/Node.js-18+-green.svg)
![React](https://img.shields.io/badge/React-18+-blue.svg)

## Features

- 🏗️ **Modern MERN Stack** - React + Vite, Node + Express
- 🎨 **Beautiful UI** - Professional design with animations
- 📱 **Mobile Responsive** - Works on all devices
- 🖼️ **Image Gallery** - Cloudinary-powered image handling
- ⚡ **Production Ready** - Error handling, optimizations
- 🔄 **Reusable** - Only edit config to create new shop site
- 🛒 **Admin Panel** - Easy product management

## Quick Start

### Prerequisites
- Node.js 18+
- MongoDB (local or Atlas)

### Installation

```bash
# Clone repository
git clone <your-repo-url>
cd <repo-folder>

# Backend setup
cd backend
cp .env.example .env
# Edit .env with your values
npm install
npm run seed

# Frontend setup
cd ../frontend
cp .env.example .env
# Edit .env with your API URL
npm install
npm run dev
```

### Access
- Frontend: http://localhost:5173
- Backend: http://localhost:5000
- Admin: http://localhost:5173/admin
- Credentials: admin / admin123

## Project Structure

```
├── backend/
│   ├── config/          # Configuration files
│   ├── controllers/     # API controllers
│   ├── middleware/    # Express middleware
│   ├── models/        # Mongoose models
│   ├── routes/        # API routes
│   ├── seed.js       # Database seeder
│   └── server.js     # Express server
│
├── frontend/
│   ├── src/
│   │   ├── components/   # React components
│   │   ├── config/      # Site configuration
│   │   ├── context/    # React contexts
│   │   ├── pages/      # Page components
│   │   └── utils/     # Utility functions
│   └── index.html
│
├── DEPLOYMENT.md      # Deployment guide
└── README.md
```

## Customization

### Change Shop Details

Edit these 2 files ONLY:

1. `frontend/src/config/siteConfig.js`
2. `backend/config/siteConfig.js`

Update:
- shopName
- founded (year)
- founder
- contact (phone, whatsapp, email)
- address
- services
- heroImages
- stats

No code changes needed!

## Deployment

See [DEPLOYMENT.md](DEPLOYMENT.md) for detailed instructions.

### Quick Deploy

**Backend (Render.com)**
1. Connect GitHub repo
2. Set environment variables
3. Deploy

**Frontend (Vercel)**
1. Import repo
2. Set VITE_API_URL
3. Deploy

**Database (MongoDB Atlas)**
1. Create free cluster
2. Get connection string
3. Add to backend env

## Tech Stack

- **Frontend**: React, Vite, Framer Motion, Axios
- **Backend**: Node.js, Express, Mongoose
- **Database**: MongoDB
- **Images**: Cloudinary
- **Deployment**: Vercel, Render

## License

MIT License - Use freely for your own shops!

## Support

For issues or questions, open a GitHub issue.

---

Built with ❤️ for fabrication shops everywhere
