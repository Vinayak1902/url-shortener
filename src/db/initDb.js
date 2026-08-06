const pool = require('./db');

// Creates the URLs table if it does not already exist.
// This script can be safely run multiple times.
async function initializeDatabase() {
    const query = `
        CREATE TABLE IF NOT EXISTS urls (
            id SERIAL PRIMARY KEY,
            short_code VARCHAR(20) UNIQUE NOT NULL,
            original_url TEXT NOT NULL,
            click_count INTEGER DEFAULT 0,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        );
    `;

    try {
        await pool.query(query);
        console.log('URLs table created successfully');
    } catch (error) {
        console.error('Error creating URLs table:', error);
    }
}

module.exports = initializeDatabase;