# Quick Start Guide - NIT KKR Lost & Found

Get the complete system running in 5 minutes.

## Prerequisites

- Node.js (v14+)
- MongoDB (local or Atlas)
- Cloudinary account (free)

## Step 1: Clone & Install

```bash
# Install frontend dependencies
npm install

# Install backend dependencies
cd backend
npm install
cd ..
```

## Step 2: Setup MongoDB

### Option A: Local MongoDB
```bash
# Start MongoDB
mongod
```

### Option B: MongoDB Atlas (Recommended)
1. Go to mongodb.com/cloud/atlas
2. Create free cluster
3. Get connection string
4. Use in Step 3

## Step 3: Configure Backend

```bash
cd backend
cp .env.example .env
```

Edit `backend/.env`:

```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/nitkkr-lost-found
# OR for Atlas: mongodb+srv://username:password@cluster.mongodb.net/nitkkr-lost-found

JWT_SECRET=your_super_secret_key_change_this
JWT_EXPIRE=7d

# Get these from cloudinary.com (free account)
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret

NODE_ENV=development
FRONTEND_URL=http://localhost:5173
```

## Step 4: Setup Cloudinary

1. Go to cloudinary.com
2. Sign up (free)
3. Copy credentials from dashboard
4. Paste into `backend/.env`

## Step 5: Start Servers

### Terminal 1 - Backend
```bash
cd backend
npm run dev
```

Backend runs on: http://localhost:5000

### Terminal 2 - Frontend
```bash
# From project root
npm run dev
```

Frontend runs on: http://localhost:5173

## Step 6: Test the System

1. Open http://localhost:5173
2. Click "Register"
3. Use email: `test@nitkkr.ac.in`
4. Complete registration
5. Upload a lost/found item
6. Test search & messaging

## Create Admin User

After registering a user:

```bash
mongosh
use nitkkr-lost-found
db.users.updateOne(
  { email: "your-email@nitkkr.ac.in" },
  { $set: { role: "admin" } }
)
```

## Verify Installation

### Check Backend
```bash
curl http://localhost:5000
# Should return: {"message":"NIT KKR Lost & Found API"}
```

### Check Frontend
Open http://localhost:5173 in browser

## Test API with Postman

1. Import `backend/POSTMAN_COLLECTION.json`
2. Set `base_url` variable to `http://localhost:5000/api`
3. Test all endpoints

## Common Issues

### MongoDB Connection Failed
- Ensure MongoDB is running: `mongod`
- Check MONGODB_URI in .env

### Port 5000 Already in Use
```bash
# Kill process
lsof -ti:5000 | xargs kill -9

# Or change port in backend/.env
PORT=5001
```

### Image Upload Fails
- Verify Cloudinary credentials
- Check .env file has correct values

### CORS Error
- Ensure FRONTEND_URL=http://localhost:5173 in backend/.env
- Restart backend after changes

## What You Get

✅ Complete authentication system
✅ Lost/Found item management
✅ Image upload to cloud
✅ Real-time messaging
✅ Search functionality
✅ Admin panel
✅ Notifications
✅ Mobile-responsive UI
✅ Production-ready code

## Next Steps

1. Test all features
2. Create test data
3. Review API documentation in `backend/README.md`
4. Check integration guide in `INTEGRATION_GUIDE.md`
5. Deploy to production (see deployment guides)

## Project Structure

```
project/
├── backend/               # Node.js + Express backend
│   ├── config/           # Database & Cloudinary config
│   ├── controllers/      # Business logic
│   ├── middleware/       # Auth & upload middleware
│   ├── models/          # MongoDB models
│   ├── routes/          # API routes
│   ├── services/        # External services
│   └── utils/           # Helper functions
├── src/                 # React frontend
│   ├── components/      # React components
│   ├── context/         # State management
│   ├── pages/           # Page components
│   └── utils/           # API utilities
├── BACKEND_SUMMARY.md   # Complete backend documentation
├── INTEGRATION_GUIDE.md # Integration instructions
└── QUICKSTART.md        # This file
```

## Support & Documentation

- Backend API: `backend/README.md`
- Integration: `INTEGRATION_GUIDE.md`
- Full Summary: `BACKEND_SUMMARY.md`
- Postman Tests: `backend/POSTMAN_COLLECTION.json`

## Technology Stack

**Frontend**: React + TypeScript + Tailwind CSS + Vite
**Backend**: Node.js + Express + MongoDB + Socket.IO
**Storage**: Cloudinary
**Auth**: JWT

## Development URLs

- Frontend: http://localhost:5173
- Backend: http://localhost:5000
- API Base: http://localhost:5000/api

Enjoy your Lost & Found system!
