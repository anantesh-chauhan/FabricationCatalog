# Pappu Iron Works - Backend API

A complete Node.js backend using Express and MongoDB for a digital catalogue website for Pappu Iron Works (fabrication shop).

## Features

- Product management with image upload
- Cloudinary for image storage
- JWT authentication for admin routes
- RESTful API endpoints

## Folder Structure

```
backend/
├── config/
│   ├── cloudinary.js    # Cloudinary configuration
│   ├── db.js           # MongoDB connection
│   └── multer.js       # Multer storage config
├── controllers/
│   └── productController.js
├── middleware/
│   └── auth.js         # JWT authentication
├── models/
│   └── Product.js     # Product schema
├── routes/
│   ├── authRoutes.js
│   └── productRoutes.js
├── uploads/           # Local uploads (if needed)
├── .env               # Environment variables
├── .env.example       # Example env file
├── package.json
├── server.js          # Entry point
└── README.md
```

## Prerequisites

1. Node.js (v14 or higher)
2. MongoDB (local or Atlas)
3. Cloudinary account (free tier)

## Installation

1. Navigate to the backend directory:
```bash
cd backend
```

2. Install dependencies:
```bash
npm install
```

3. Create environment file:
```bash
cp .env.example .env
```

4. Configure your `.env` file:
```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/pappu-iron-works
JWT_SECRET=your_secret_key
ADMIN_PASSWORD=your_admin_password
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
```

## Cloudinary Setup

1. Create a free account at [cloudinary.com](https://cloudinary.com)
2. Go to your Dashboard
3. Copy your Cloud Name, API Key, and API Secret
4. Add them to your `.env` file

## Running the Server

### Development Mode
```bash
npm run dev
# or
node server.js
```

### Production Mode
```bash
npm start
```

The server will start on port 5000 (or the port specified in your .env file).

## API Endpoints

### Public Routes

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/products` | Get all products (optional: ?category=gates) |
| GET | `/api/products/:id` | Get single product |
| GET | `/api/health` | Health check |

### Protected Routes (Require Admin Token)

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/products` | Create product (with image) |
| PUT | `/api/products/:id` | Update product (with image) |
| DELETE | `/api/products/:id` | Delete product |
| POST | `/api/auth/login` | Admin login |

### Authentication

1. Login to get token:
```bash
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"username": "admin", "password": "your_password"}'
```

2. Use the token in subsequent requests:
```bash
curl -X POST http://localhost:5000/api/products \
  -H "x-auth-token: YOUR_TOKEN_HERE" \
  -H "Content-Type: multipart/form-data" \
  -F "title=Iron Gate" \
  -F "category=gates" \
  -F "image=@path/to/image.jpg"
```

## Product Categories

- `gates` - Gates
- `windows` - Windows
- `railings` - Railings
- `other` - Other fabrication items

## Example API Usage

### Get All Products
```javascript
fetch('http://localhost:5000/api/products')
  .then(res => res.json())
  .then(data => console.log(data));
```

### Get Products by Category
```javascript
fetch('http://localhost:5000/api/products?category=gates')
  .then(res => res.json())
  .then(data => console.log(data));
```

### Create Product (with image)
```javascript
const formData = new FormData();
formData.append('title', 'Decorative Gate');
formData.append('category', 'gates');
formData.append('image', fileInput.files[0]);

fetch('http://localhost:5000/api/products', {
  method: 'POST',
  headers: {
    'x-auth-token': 'YOUR_TOKEN_HERE'
  },
  body: formData
})
  .then(res => res.json())
  .then(data => console.log(data));
```

### Delete Product
```javascript
fetch('http://localhost:5000/api/products/PRODUCT_ID', {
  method: 'DELETE',
  headers: {
    'x-auth-token': 'YOUR_TOKEN_HERE'
  }
})
  .then(res => res.json())
  .then(data => console.log(data));
```

## Error Responses

- `200` - Success
- `400` - Bad Request (validation error)
- `401` - Unauthorized (invalid or missing token)
- `404` - Not Found
- `500` - Server Error

Example error response:
```json
{
  "message": "Product title is required"
}
```

## Security Notes

1. Change the default admin password in production
2. Use a strong JWT_SECRET
3. Keep your Cloudinary API secrets secure
4. Enable CORS only for your frontend domain in production

## Development Tips

- Use Postman or Insomnia for testing APIs
- Check MongoDB connection status in console
- Cloudinary images are automatically optimized

## License

MIT
