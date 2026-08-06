const { createShortUrl, getOriginalUrl, getUrlStats } = require('../services/urlService');

/**
 * Handles requests to create a shortened URL.
 *
 * Expects a JSON body:
 * {
 *   "url": "https://example.com"
 * }
 */
async function shortenUrl(req, res) {
    try {
        const { url } = req.body;

        // Basic input validation
        if (!url) {
            return res.status(400).json({
                error: 'URL is required',
            });
        }

        // Create and store the shortened URL
        const result = await createShortUrl(url);

        return res.status(201).json({
            message: 'Short URL created successfully',
            shortCode: result.short_code,
            originalUrl: result.original_url,
            shortUrl: `http://localhost:3000/${result.short_code}`,
        });
    } catch (error) {
        console.error('Error creating short URL:', error);

        return res.status(500).json({
            error: 'Internal server error',
        });
    }
}

/**
 * Redirects a short code to its original URL.
 */
async function redirectToOriginalUrl(req, res) {
    try {
        const { shortCode } = req.params;

        const originalUrl = await getOriginalUrl(shortCode);

        if (!originalUrl) {
            return res.status(404).json({
                error: 'Short URL not found',
            });
        }

        return res.redirect(originalUrl);
    } catch (error) {
        console.error('Error redirecting URL:', error);

        return res.status(500).json({
            error: 'Internal server error',
        });
    }
}

/**
 * Returns analytics for a short URL.
 */
async function getStatistics(req, res) {
    try {
        const { shortCode } = req.params;

        const stats = await getUrlStats(shortCode);

        if (!stats) {
            return res.status(404).json({
                error: 'Short URL not found',
            });
        }

        return res.status(200).json({
            shortCode: stats.short_code,
            originalUrl: stats.original_url,
            clickCount: stats.click_count,
            createdAt: stats.created_at,
        });
    } catch (error) {
        console.error('Error retrieving statistics:', error);

        return res.status(500).json({
            error: 'Internal server error',
        });
    }
}

module.exports = {
    shortenUrl,
    redirectToOriginalUrl,
    getStatistics,
};