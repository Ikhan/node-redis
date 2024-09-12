# Product Management API

This project is a RESTful API for managing products. It provides endpoints for creating, reading, updating, and deleting products, as well as bulk creation of products.

## Features

- Get products with pagination
- Create a single product
- Update a product
- Delete a product
- Bulk create multiple products
- Caching for improved performance

## Technologies Used

- Node.js
- Express.js
- MongoDB with Mongoose
- Redis for caching

## API Endpoints

### GET /products

Retrieves a list of products with pagination support.

Query Parameters:

- `pageSize` (optional): Number of items per page (default: 1000)
- `page` (optional): Page number (default: 1)

### POST /products

Creates a new product.

Required fields in request body:

- `name`
- `description`

### PUT /products/:id

Updates an existing product.

### DELETE /products/:id

Deletes a product.

### POST /products/bulk

Creates multiple products in bulk.

Request body should contain an array of products, each with `name` and `description`.

## Setup and Installation

1. Clone the repository
2. Install dependencies: `npm install`
3. Set up MongoDB and Redis
4. Configure environment variables
5. Run the server: `npm start`

## Error Handling

The API returns appropriate HTTP status codes and error messages for various scenarios, including:

- 400 Bad Request for invalid input
- 404 Not Found for invalid product IDs
- 500 Internal Server Error for server-side issues

## Caching

The API uses Redis caching for improved performance when fetching products.

## Contributing

Contributions are welcome. Please fork the repository and create a pull request with your changes.
