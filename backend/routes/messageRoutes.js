const express = require('express');
const {
  getConversations,
  getConversationMessages,
  sendMessage,
  createConversation,
} = require('../controllers/messageController');
const { protect } = require('../middleware/auth');

const router = express.Router();

router.get('/conversations', protect, getConversations);
router.post('/', protect, createConversation);
router.get('/conversation/:id', protect, getConversationMessages);
router.post('/conversation/:id', protect, sendMessage);

module.exports = router;
