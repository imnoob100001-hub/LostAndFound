# Frontend-Backend Integration Guide

Complete guide for integrating the React frontend with the Node.js backend.

## Quick Start

### 1. Start Backend

```bash
cd backend
npm install
cp .env.example .env
# Edit .env with your MongoDB URI and Cloudinary credentials
npm run dev
```

Backend runs on: `http://localhost:5000`

### 2. Start Frontend

```bash
# In project root
npm install
# Frontend .env is already configured
npm run dev
```

Frontend runs on: `http://localhost:5173`

## Environment Setup

### Backend (.env)

```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/nitkkr-lost-found
JWT_SECRET=your_jwt_secret_key_here_change_in_production
JWT_EXPIRE=7d

CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret

NODE_ENV=development
FRONTEND_URL=http://localhost:5173
```

### Frontend (.env)

```env
VITE_API_URL=http://localhost:5000/api
```

## API Endpoint Mapping

The frontend expects these exact endpoints (already implemented in backend):

| Frontend Call | Backend Route | Method |
|--------------|---------------|--------|
| `/auth/register` | `/api/auth/register` | POST |
| `/auth/login` | `/api/auth/login` | POST |
| `/auth/me` | `/api/auth/me` | GET |
| `/items` | `/api/items` | GET |
| `/items/:id` | `/api/items/:id` | GET |
| `/items` | `/api/items` | POST |
| `/items/my-items` | `/api/items/my-items` | GET |
| `/items/:id/status` | `/api/items/:id/status` | PATCH |
| `/items/:id` | `/api/items/:id` | DELETE |
| `/items/search` | `/api/items/search` | POST |
| `/upload` | `/api/upload` | POST |
| `/messages/conversations` | `/api/messages/conversations` | GET |
| `/messages` | `/api/messages` | POST |
| `/messages/conversation/:id` | `/api/messages/conversation/:id` | GET |
| `/messages/conversation/:id` | `/api/messages/conversation/:id` | POST |
| `/admin/items` | `/api/admin/items` | GET |
| `/admin/items/:id` | `/api/admin/items/:id` | DELETE |

## MongoDB Setup

### Option 1: Local MongoDB

```bash
# Install MongoDB
# macOS
brew install mongodb-community

# Ubuntu
sudo apt-get install mongodb

# Start MongoDB
mongod
```

### Option 2: MongoDB Atlas (Cloud)

1. Go to [mongodb.com/cloud/atlas](https://www.mongodb.com/cloud/atlas)
2. Create free cluster
3. Get connection string
4. Update `MONGODB_URI` in `.env`:

```env
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/nitkkr-lost-found?retryWrites=true&w=majority
```

## Cloudinary Setup

1. Create account at [cloudinary.com](https://cloudinary.com)
2. Get credentials from dashboard
3. Update `.env`:

```env
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
```

## Testing the Integration

### 1. Register User

Frontend: Navigate to `/register`

```
Name: Test User
Email: test@nitkkr.ac.in
Password: password123
```

### 2. Create Item

Frontend: Navigate to `/upload`

- Select type (Lost/Found)
- Fill details
- Upload image
- Submit

### 3. Browse Items

Frontend: Navigate to `/browse`

- View all items
- Apply filters
- Search items

### 4. Messaging

Frontend: Click "Contact Owner" on any item

- Creates conversation
- Real-time messaging with Socket.IO

## Socket.IO Integration

The backend Socket.IO server is already configured. For real-time features:

### Frontend Socket Setup (Optional Enhancement)

```javascript
import { io } from 'socket.io-client';

const socket = io('http://localhost:5000');

// Register user
socket.emit('register', userId);

// Listen for messages
socket.on('receive_message', (message) => {
  console.log('New message:', message);
});

// Send message
socket.emit('send_message', {
  recipientId: 'USER_ID',
  message: messageData
});
```

## CORS Configuration

CORS is already configured in the backend to allow:
- Development: `http://localhost:5173`
- Production: Update `FRONTEND_URL` in `.env`

## Authentication Flow

1. User registers/logs in
2. Backend returns JWT token
3. Frontend stores token in localStorage
4. Axios interceptor adds token to all requests
5. Backend middleware verifies token

## Common Issues

### Port Already in Use

```bash
# Kill process on port 5000
lsof -ti:5000 | xargs kill -9

# Or change PORT in backend/.env
PORT=5001
```

### MongoDB Connection Error

```bash
# Check MongoDB is running
mongod --version

# Start MongoDB
mongod
```

### CORS Error

Update `FRONTEND_URL` in backend `.env`:

```env
FRONTEND_URL=http://localhost:5173
```

### Image Upload Fails

Verify Cloudinary credentials in backend `.env`

## Production Deployment

### Backend Deployment (Render/Railway/Heroku)

1. Push code to GitHub
2. Connect repository to hosting platform
3. Set environment variables
4. Deploy

### Frontend Deployment (Vercel/Netlify)

1. Update `.env`:

```env
VITE_API_URL=https://your-backend-url.com/api
```

2. Deploy frontend

### Update Backend CORS

```env
NODE_ENV=production
FRONTEND_URL=https://your-frontend-url.com
```

## API Testing with Postman

Import the provided Postman collection:

```
backend/POSTMAN_COLLECTION.json
```

## Database Seeding (Optional)

To create an admin user:

```javascript
// Connect to MongoDB
mongosh

// Switch database
use nitkkr-lost-found

// Update user role
db.users.updateOne(
  { email: "admin@nitkkr.ac.in" },
  { $set: { role: "admin" } }
)
```

## Monitoring & Debugging

### Backend Logs

```bash
# Development (with nodemon)
npm run dev

# Logs appear in terminal
```

### Database Inspection

```bash
mongosh
use nitkkr-lost-found
db.users.find()
db.items.find()
db.messages.find()
```

### Frontend Network Tab

Open browser DevTools > Network to see API calls

## Security Checklist

- [ ] Change `JWT_SECRET` to strong random string
- [ ] Use MongoDB Atlas with IP whitelist
- [ ] Enable Cloudinary signed uploads in production
- [ ] Set `NODE_ENV=production`
- [ ] Use HTTPS in production
- [ ] Rate limit API endpoints
- [ ] Validate all user inputs

## Support

For issues:
1. Check MongoDB connection
2. Verify Cloudinary credentials
3. Confirm ports are not blocked
4. Check CORS configuration
5. Review backend logs
