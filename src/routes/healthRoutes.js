const express = require('express');
const router = express.Router();

// Root endpoint
router.get('/', (req, res) => {
    res.send('Distributed URL Shortener Service is running');
});

// Health-check endpoint
router.get('/health', (req, res) => {
    res.status(200).json({
        status: 'OK',
        service: 'Distributed URL Shortener',
        timestamp: new Date().toISOString()
    });
});

module.exports = router;