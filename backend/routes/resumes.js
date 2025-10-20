const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const { getMyResume, updateResume, generateSummary } = require('../controllers/resumeController');

router.get('/me', auth, getMyResume);
router.put('/me', auth, updateResume);
router.post('/me/generate-summary', auth, generateSummary);

module.exports = router;
