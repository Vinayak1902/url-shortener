const express = require('express');
const { connectRedis } = require('./db/redisClient');
require('dotenv').config();

const db = require('./db/db');
const urlRoutes = require('./routes/urlRoutes');
const initializeDatabase = require('./db/initDb');
const healthRoutes = require('./routes/healthRoutes');

// Create the Express application
const app = express();

// Server will run on the environment port or default to 3000
const PORT = process.env.PORT || 3000;

// Middleware to automatically parse JSON request bodies
app.use(express.json());

// Register application routes
app.use('/', healthRoutes);
app.use('/', urlRoutes);

// Initialize the database before starting the server
async function startServer() {
    try {
        // Initialize external dependencies before serving requests
        await connectRedis();
        await initializeDatabase();

        app.listen(PORT, () => {
            console.log(`Server running on port ${PORT}`);
        });
    } catch (error) {
        console.error('Failed to start server:', error);
        process.exit(1);
    }
}

startServer();