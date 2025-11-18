const express = require('express');
const { uploadImage } = require('../controllers/uploadController');
const { protect } = require('../middleware/auth');
const upload = require('../middleware/upload');

const router = express.Router();

router.post('/', protect, upload.single('image'), uploadImage);

module.exports = router;
