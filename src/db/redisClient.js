const { createClient } = require('redis');

// Create a Redis client that connects to the local Redis container.
const redisClient = createClient({
    url: 'redis://${process.env.REDIS_HOST}:${process.env.REDIS_PORT}',
});

// Log connection status for easier debugging.
redisClient.on('connect', () => {
    console.log('Connected to Redis');
});

redisClient.on('error', (err) => {
    console.error('Redis connection error:', err);
});

/**
 * Establish the Redis connection.
 * This should be called once during application startup.
 */
async function connectRedis() {
    if (!redisClient.isOpen) {
        await redisClient.connect();
    }
}

module.exports = {
    redisClient,
    connectRedis,
};