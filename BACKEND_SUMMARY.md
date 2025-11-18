# NIT KKR Lost & Found - Complete Backend Summary

## Overview

Complete production-ready backend built with Node.js, Express, MongoDB, and Socket.IO for the AI-Powered Lost & Found System at NIT Kurukshetra.

## Technology Stack

- **Runtime**: Node.js
- **Framework**: Express.js v5
- **Database**: MongoDB + Mongoose
- **Authentication**: JWT (jsonwebtoken + bcryptjs)
- **File Upload**: Multer
- **Image Storage**: Cloudinary
- **Real-time**: Socket.IO
- **Validation**: express-validator
- **Security**: CORS, JWT middleware

## Folder Structure

```
backend/
├── config/
│   ├── cloudinary.js          # Cloudinary configuration
│   └── db.js                  # MongoDB connection
├── controllers/
│   ├── adminController.js     # Admin operations
│   ├── authController.js      # Authentication logic
│   ├── itemController.js      # Item CRUD operations
│   ├── messageController.js   # Messaging logic
│   ├── notificationController.js  # Notifications
│   └── uploadController.js    # Image upload handler
├── middleware/
│   ├── auth.js               # JWT verification & admin check
│   ├── errorHandler.js       # Global error handler
│   └── upload.js             # Multer configuration
├── models/
│   ├── Conversation.js       # Chat conversations
│   ├── Item.js              # Lost/Found items
│   ├── Message.js           # Chat messages
│   ├── Notification.js      # User notifications
│   └── User.js              # User accounts
├── routes/
│   ├── adminRoutes.js       # Admin endpoints
│   ├── authRoutes.js        # Auth endpoints
│   ├── itemRoutes.js        # Item endpoints
│   ├── messageRoutes.js     # Message endpoints
│   ├── notificationRoutes.js # Notification endpoints
│   └── uploadRoutes.js      # Upload endpoints
├── services/
│   └── storageService.js    # Cloudinary upload/delete
├── utils/
│   ├── generateToken.js     # JWT token generator
│   └── notificationHelper.js # Notification creator
├── .env.example             # Environment template
├── .gitignore
├── package.json
├── POSTMAN_COLLECTION.json  # API testing collection
├── README.md                # Detailed documentation
└── server.js                # Main entry point
```

## Database Models

### User Model
- name, email (@nitkkr.ac.in only), password (hashed)
- role (user/admin), isBanned flag
- Password hashing with bcrypt
- Password comparison method

### Item Model
- user (ref), title, description, category, location
- imageUrl, type (lost/found), status (active/resolved/closed)
- reports count
- Text search index on title & description

### Message Model
- conversation (ref), sender (ref), content
- read status, timestamps

### Conversation Model
- participants (array of user refs)
- item (optional ref), lastMessage (ref)
- Indexed by participants

### Notification Model
- user (ref), type (message/item_match/status_update)
- title, message, relatedItem, relatedConversation
- read status
- Indexed by user & read status

## API Endpoints

### Authentication (`/api/auth`)
- `POST /register` - Register with NIT email
- `POST /login` - Login and get JWT
- `GET /me` - Get current user (protected)

### Items (`/api/items`)
- `GET /` - Get all items (filterable by category, location, type, status)
- `GET /:id` - Get single item
- `POST /` - Create item (protected)
- `GET /my-items` - Get user's items (protected)
- `PATCH /:id/status` - Update status (protected)
- `DELETE /:id` - Delete item (protected)
- `POST /search` - Text search (title, description, category, location)

### Upload (`/api/upload`)
- `POST /` - Upload image to Cloudinary (protected, multipart)

### Messages (`/api/messages`)
- `GET /conversations` - Get user's conversations (protected)
- `POST /` - Create conversation (protected)
- `GET /conversation/:id` - Get messages (protected)
- `POST /conversation/:id` - Send message (protected)

### Notifications (`/api/notifications`)
- `GET /` - Get user notifications (protected)
- `GET /unread-count` - Get unread count (protected)
- `PATCH /:id/read` - Mark as read (protected)
- `PATCH /mark-all-read` - Mark all as read (protected)

### Admin (`/api/admin`)
- `GET /users` - Get all users (admin only)
- `GET /items` - Get all items (admin only)
- `DELETE /items/:id` - Delete any item (admin only)
- `PATCH /users/:id/ban` - Ban/unban user (admin only)

## Features Implemented

### Authentication & Authorization
- JWT-based authentication
- Password hashing with bcryptjs
- NIT Kurukshetra email validation (@nitkkr.ac.in)
- Protected routes middleware
- Admin-only routes middleware
- User ban functionality

### Item Management
- Full CRUD operations
- Image upload to Cloudinary
- Category & location filtering
- Status management (active/resolved/closed)
- User-specific item retrieval
- Report counting system

### Search Functionality
- Text-based search (NO ML/AI)
- Searches across: title, description, category, location
- Case-insensitive regex matching
- MongoDB text index for performance

### Real-time Messaging
- Socket.IO integration
- User-to-user conversations
- Real-time message delivery
- Typing indicators support
- Message read status
- Conversation creation with item context

### Notifications
- In-app notification system
- Message notifications
- Unread count tracking
- Bulk mark as read
- Related item/conversation references

### Image Storage
- Cloudinary integration
- Multer for file handling
- 5MB file size limit
- Image-only validation
- Secure upload with buffer streaming

### Admin Features
- View all users
- View all items
- Delete any item
- Ban/unban users
- Protected admin routes

## Security Features

- JWT token authentication
- Password hashing (bcrypt)
- Email validation (NIT KKR only)
- Protected route middleware
- Admin role verification
- CORS configuration
- File type validation
- File size limits
- User ban system

## Socket.IO Events

### Client → Server
- `register` - Register user's socket connection
- `send_message` - Send message to recipient
- `typing` - Typing indicator
- `disconnect` - Handle disconnection

### Server → Client
- `receive_message` - Receive new message
- `user_typing` - Typing notification

## Environment Variables

```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/nitkkr-lost-found
JWT_SECRET=your_jwt_secret_key
JWT_EXPIRE=7d
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
NODE_ENV=development
FRONTEND_URL=http://localhost:5173
```

## Setup & Running

### Install Dependencies
```bash
cd backend
npm install
```

### Configure Environment
```bash
cp .env.example .env
# Edit .env with your credentials
```

### Start Development Server
```bash
npm run dev
```

### Start Production Server
```bash
npm start
```

## Testing

### Postman Collection
Import `POSTMAN_COLLECTION.json` into Postman for complete API testing.

### Test Flow
1. Register user
2. Login and save token
3. Upload image
4. Create item
5. Search items
6. Create conversation
7. Send messages
8. Test admin routes

## MongoDB Indexes

- User: email (unique)
- Item: title & description (text search)
- Conversation: participants
- Notification: user & read status

## Error Handling

- Global error handler middleware
- Mongoose validation errors
- JWT verification errors
- File upload errors
- Custom error messages
- Development vs production error stack

## CORS Configuration

- Development: http://localhost:5173
- Production: Set via FRONTEND_URL env variable
- Credentials enabled
- Socket.IO CORS configured

## Frontend Compatibility

All endpoints match the existing frontend API expectations:
- Response formats aligned
- Authentication flow compatible
- Route paths matching
- Error handling consistent

## NO AI/ML Components

As requested:
- No HuggingFace integration
- No embeddings
- No semantic search
- No AI captioning
- Simple text-based search using MongoDB regex

## Production Deployment

### Recommended Hosting
- **Backend**: Render, Railway, Heroku
- **Database**: MongoDB Atlas
- **Images**: Cloudinary

### Deployment Checklist
- [ ] Set strong JWT_SECRET
- [ ] Use MongoDB Atlas
- [ ] Configure Cloudinary
- [ ] Set NODE_ENV=production
- [ ] Update FRONTEND_URL
- [ ] Enable HTTPS
- [ ] Add rate limiting

## Creating Admin User

```javascript
// MongoDB Shell
use nitkkr-lost-found
db.users.updateOne(
  { email: "admin@nitkkr.ac.in" },
  { $set: { role: "admin" } }
)
```

## File Count

- **Total Files**: 25 JavaScript files
- **Models**: 5
- **Controllers**: 6
- **Routes**: 6
- **Middleware**: 3
- **Config**: 2
- **Services**: 1
- **Utils**: 2

## Code Quality

- Modular architecture
- Single responsibility principle
- Clean separation of concerns
- Consistent error handling
- Production-ready code
- No hardcoded values
- Environment-based configuration

## Dependencies

### Production
- express: Web framework
- mongoose: MongoDB ODM
- jsonwebtoken: JWT auth
- bcryptjs: Password hashing
- dotenv: Environment variables
- cors: CORS middleware
- multer: File upload
- cloudinary: Image storage
- socket.io: Real-time communication
- cookie-parser: Cookie parsing
- express-validator: Input validation

### Development
- nodemon: Auto-restart server

## Integration with Frontend

The frontend repository already expects this exact backend structure. Simply:
1. Start backend on port 5000
2. Start frontend on port 5173
3. Frontend will automatically connect to backend

## Additional Files

- `README.md` - Complete backend documentation
- `POSTMAN_COLLECTION.json` - API testing collection
- `.env.example` - Environment template
- `INTEGRATION_GUIDE.md` - Frontend integration guide (in project root)

## Notes

- NO machine learning components
- NO AI features (as requested)
- Simple text-based search
- Production-ready code
- Fully compatible with existing frontend
- Complete CRUD operations
- Real-time messaging
- Admin panel ready
- Image upload working
- Authentication secure
