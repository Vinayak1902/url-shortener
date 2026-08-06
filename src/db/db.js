const { Pool } = require('pg');
require('dotenv').config();

// Create a connection pool so multiple requests can reuse database connections efficiently.
const pool = new Pool({
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
});

// Test the database connection once when the application starts.
pool.connect()
    .then(() => console.log('Connected to PostgreSQL database'))
    .catch((err) => console.error('Database connection error:', err));

module.exports = pool;