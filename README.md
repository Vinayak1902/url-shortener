# Distributed URL Shortener

A production-oriented URL Shortener built using **Node.js**, **Express.js**, **PostgreSQL**, and **Redis**. The application provides URL shortening, redirection, click analytics, caching, and rate limiting while following a modular backend architecture.

---

## Features

- Generate short URLs from long URLs
- Redirect shortened URLs to the original destination
- Click analytics for each shortened URL
- Redis caching for faster URL lookups
- PostgreSQL for persistent storage
- Duplicate URL detection (idempotent API)
- Input validation
- API rate limiting
- Dockerized application
- Modular backend architecture

---

## Tech Stack

| Category | Technologies |
|----------|--------------|
| Backend | Node.js, Express.js |
| Database | PostgreSQL |
| Cache | Redis |
| Containerization | Docker, Docker Compose |
| Tools | Git, VS Code |

---

## Project Structure

```
distributed-url-shortener/
│
├── src/
│   ├── controllers/
│   ├── db/
│   ├── routes/
│   ├── services/
│   └── index.js
│
├── Dockerfile
├── docker-compose.yml
├── package.json
└── README.md
```

---

## Architecture

```
                Client
                   │
                   ▼
            Express REST API
                   │
        ┌──────────┴──────────┐
        ▼                     ▼
     Redis Cache        PostgreSQL
   (Fast Lookups)     (Persistent Data)
```

---

## API Endpoints

### Create Short URL

**POST**

```
POST /shorten
```

Request

```json
{
    "url": "https://www.amazon.in"
}
```

Response

```json
{
    "message": "Short URL created successfully",
    "data": {
        "shortUrl": "http://localhost:3000/abc123"
    }
}
```

---

### Redirect

```
GET /:shortCode
```

Example

```
GET /abc123
```

Redirects the client to the original URL.

---

### Analytics

```
GET /stats/:shortCode
```

Response

```json
{
    "original_url": "https://www.amazon.in",
    "short_code": "abc123",
    "click_count": 12,
    "created_at": "2026-08-06T11:35:12.000Z"
}
```

---

### Health Check

```
GET /health
```

---

## Getting Started

### Clone the repository

```bash
git clone https://github.com/Vinayak1902/url-shortener

cd distributed-url-shortener
```

### Install dependencies

```bash
npm install
```

### Configure environment variables

Create a `.env` file.

```
PORT=3000

DB_HOST=localhost
DB_PORT=5432
DB_USER=postgres
DB_PASSWORD=your_password
DB_NAME=url_shortener

REDIS_HOST=localhost
REDIS_PORT=6379
```

### Start the application

```bash
npm start
```

---

## Running with Docker

Build the Docker image

```bash
docker build -t distributed-url-shortener .
```

Run Docker Compose

```bash
docker compose up --build
```

---

## Key Backend Features

- Layered architecture (Routes → Controllers → Services → Database)
- PostgreSQL connection pooling
- Redis-based caching for improved response time
- Duplicate URL handling
- Input validation using Validator.js
- Express Rate Limiting
- RESTful API design
- Dockerized deployment



---

## Author

**Vinayak Agrawal**

GitHub: https://github.com/Vinayak1902/url-shortener
