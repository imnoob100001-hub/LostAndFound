const express = require('express');
const {
  getAllUsers,
  getAllItems,
  deleteItem,
  banUser,
} = require('../controllers/adminController');
const { protect, admin } = require('../middleware/auth');

const router = express.Router();

router.use(protect);
router.use(admin);

router.get('/users', getAllUsers);
router.get('/items', getAllItems);
router.delete('/items/:id', deleteItem);
router.patch('/users/:id/ban', banUser);

module.exports = router;
