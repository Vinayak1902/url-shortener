const express = require('express');
const router = express.Router();

const {
    shortenUrl,
    redirectToOriginalUrl,
    getStatistics,
} = require('../controllers/urlController');

// POST /shorten
// Creates a new shortened URL
router.post('/shorten', shortenUrl);

// GET /stats/:shortCode
// Returns analytics for a shortened URL
router.get('/stats/:shortCode', getStatistics);

// GET /:shortCode
router.get('/:shortCode', redirectToOriginalUrl);

module.exports = router;