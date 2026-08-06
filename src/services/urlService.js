const shortid = require('shortid');
const pool = require('../db/db');
const { redisClient } = require('../db/redisClient');

/**
 * Creates a new short URL mapping and stores it in PostgreSQL.
 *
 * @param {string} originalUrl - The original long URL provided by the user.
 * @returns {Object} The generated short code and original URL.
 */
async function createShortUrl(originalUrl) {
    // Generate a unique short code
    const shortCode = shortid.generate();

    // Insert the mapping into the database
    const query = `
        INSERT INTO urls (short_code, original_url)
        VALUES ($1, $2)
        RETURNING short_code, original_url;
    `;

    const values = [shortCode, originalUrl];
    const result = await pool.query(query, values);

    return result.rows[0];
}

/**
 * Retrieves the original URL for a given short code and increments the click count.
 *
 * @param {string} shortCode - The generated short code.
 * @returns {string|null} The original URL if found, otherwise null.
 */
/**
 * Retrieves the original URL for a given short code.
 * First checks Redis cache; if not found, falls back to PostgreSQL and caches the result.
 *
 * @param {string} shortCode - The generated short code.
 * @returns {string|null} The original URL if found, otherwise null.
 */
async function getOriginalUrl(shortCode) {
    // 1. Check Redis cache
    const cachedUrl = await redisClient.get(shortCode);

    if (cachedUrl) {
        console.log('Cache hit');
        return cachedUrl;
    }

    console.log('Cache miss');

    // 2. Fetch from PostgreSQL and increment click count
    const query = `
        UPDATE urls
        SET click_count = click_count + 1
        WHERE short_code = $1
        RETURNING original_url;
    `;

    const result = await pool.query(query, [shortCode]);

    if (result.rows.length === 0) {
        return null;
    }

    const originalUrl = result.rows[0].original_url;

    // 3. Store in Redis for future requests
    await redisClient.set(shortCode, originalUrl);

    return originalUrl;
}

/**
 * Returns analytics for a short URL.
 *
 * @param {string} shortCode - The generated short code.
 * @returns {Object|null} URL statistics if found, otherwise null.
 */
async function getUrlStats(shortCode) {
    const query = `
        SELECT short_code, original_url, click_count, created_at
        FROM urls
        WHERE short_code = $1;
    `;

    const result = await pool.query(query, [shortCode]);

    if (result.rows.length === 0) {
        return null;
    }

    return result.rows[0];
}

module.exports = {
    createShortUrl,
    getOriginalUrl,
    getUrlStats,
};