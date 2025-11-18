# NIT KKR Lost & Found Backend API

Complete Node.js + Express backend for the AI-Powered Lost & Found System.

## Tech Stack

- Node.js + Express.js
- MongoDB + Mongoose
- JWT Authentication
- Cloudinary (Image Storage)
- Multer (File Upload)
- Socket.IO (Real-time Messaging)

## Features

- User authentication with NIT Kurukshetra email validation
- Lost/Found item management with image upload
- Text-based search functionality
- Real-time messaging with Socket.IO
- In-app notifications
- Admin panel for user & item management

## Setup Instructions

### 1. Install Dependencies

```bash
cd backend
npm install
```

### 2. Environment Configuration

Create a `.env` file in the backend directory:

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

### 3. Setup MongoDB

Make sure MongoDB is installed and running:

```bash
# Start MongoDB
mongod
```

Or use MongoDB Atlas (cloud) and update the MONGODB_URI accordingly.

### 4. Setup Cloudinary

1. Create a free account at [cloudinary.com](https://cloudinary.com)
2. Get your Cloud Name, API Key, and API Secret from the dashboard
3. Add them to your `.env` file

### 5. Run Development Server

```bash
npm run dev
```

The API will be available at `http://localhost:5000`

### 6. Run Production Server

```bash
npm start
```

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/me` - Get current user (protected)

### Items
- `GET /api/items` - Get all items (with filters)
- `GET /api/items/:id` - Get item by ID
- `POST /api/items` - Create new item (protected)
- `GET /api/items/my-items` - Get user's items (protected)
- `PATCH /api/items/:id/status` - Update item status (protected)
- `DELETE /api/items/:id` - Delete item (protected)
- `POST /api/items/search` - Search items

### Upload
- `POST /api/upload` - Upload image (protected, multipart/form-data)

### Messages
- `GET /api/messages/conversations` - Get all conversations (protected)
- `POST /api/messages` - Create new conversation (protected)
- `GET /api/messages/conversation/:id` - Get conversation messages (protected)
- `POST /api/messages/conversation/:id` - Send message (protected)

### Notifications
- `GET /api/notifications` - Get all notifications (protected)
- `GET /api/notifications/unread-count` - Get unread count (protected)
- `PATCH /api/notifications/:id/read` - Mark as read (protected)
- `PATCH /api/notifications/mark-all-read` - Mark all as read (protected)

### Admin
- `GET /api/admin/users` - Get all users (admin only)
- `GET /api/admin/items` - Get all items (admin only)
- `DELETE /api/admin/items/:id` - Delete any item (admin only)
- `PATCH /api/admin/users/:id/ban` - Ban/Unban user (admin only)

## Folder Structure

```
backend/
├── config/
│   ├── cloudinary.js
│   └── db.js
├── controllers/
│   ├── adminController.js
│   ├── authController.js
│   ├── itemController.js
│   ├── messageController.js
│   ├── notificationController.js
│   └── uploadController.js
├── middleware/
│   ├── auth.js
│   ├── errorHandler.js
│   └── upload.js
├── models/
│   ├── Conversation.js
│   ├── Item.js
│   ├── Message.js
│   ├── Notification.js
│   └── User.js
├── routes/
│   ├── adminRoutes.js
│   ├── authRoutes.js
│   ├── itemRoutes.js
│   ├── messageRoutes.js
│   ├── notificationRoutes.js
│   └── uploadRoutes.js
├── services/
│   └── storageService.js
├── utils/
│   ├── generateToken.js
│   └── notificationHelper.js
├── .env.example
├── .gitignore
├── package.json
├── README.md
└── server.js
```

## Socket.IO Events

### Client Events
- `register` - Register user socket connection
- `send_message` - Send message to recipient
- `typing` - Notify recipient of typing status
- `disconnect` - Handle disconnection

### Server Events
- `receive_message` - Receive new message
- `user_typing` - Receive typing notification

## Postman Testing

### 1. Register User
```
POST http://localhost:5000/api/auth/register
Content-Type: application/json

{
  "name": "John Doe",
  "email": "john.doe@nitkkr.ac.in",
  "password": "password123"
}
```

### 2. Login
```
POST http://localhost:5000/api/auth/login
Content-Type: application/json

{
  "email": "john.doe@nitkkr.ac.in",
  "password": "password123"
}
```

Save the token from the response.

### 3. Upload Image
```
POST http://localhost:5000/api/upload
Authorization: Bearer YOUR_TOKEN_HERE
Content-Type: multipart/form-data

Key: image
Value: [Select File]
```

### 4. Create Item
```
POST http://localhost:5000/api/items
Authorization: Bearer YOUR_TOKEN_HERE
Content-Type: application/json

{
  "title": "Lost Black Backpack",
  "description": "Black Nike backpack with laptop inside",
  "category": "accessories",
  "location": "library",
  "type": "lost",
  "imageUrl": "https://cloudinary-url-from-upload"
}
```

### 5. Get All Items
```
GET http://localhost:5000/api/items
```

### 6. Search Items
```
POST http://localhost:5000/api/items/search
Content-Type: application/json

{
  "query": "black backpack"
}
```

### 7. Get User Items
```
GET http://localhost:5000/api/items/my-items
Authorization: Bearer YOUR_TOKEN_HERE
```

### 8. Create Conversation
```
POST http://localhost:5000/api/messages
Authorization: Bearer YOUR_TOKEN_HERE
Content-Type: application/json

{
  "recipientId": "RECIPIENT_USER_ID",
  "itemId": "ITEM_ID",
  "message": "Hi! I found your item"
}
```

## Integration with Frontend

The frontend is already configured to work with this backend. Update the frontend `.env`:

```env
VITE_API_URL=http://localhost:5000/api
```

Both frontend and backend must be running simultaneously:

- Frontend: `http://localhost:5173`
- Backend: `http://localhost:5000`

## Creating Admin User

By default, all users are created with role "user". To create an admin:

1. Register a user normally
2. Open MongoDB and find the user
3. Update the role field to "admin"

```javascript
// MongoDB Shell
use nitkkr-lost-found
db.users.updateOne(
  { email: "admin@nitkkr.ac.in" },
  { $set: { role: "admin" } }
)
```

## Production Deployment

### Environment Variables for Production

```env
NODE_ENV=production
MONGODB_URI=your_production_mongodb_uri
FRONTEND_URL=https://your-frontend-domain.com
JWT_SECRET=strong_random_secret_key
```

### Recommended Hosting

- **Backend**: Render, Railway, Heroku
- **Database**: MongoDB Atlas
- **Images**: Cloudinary

## License

MIT
