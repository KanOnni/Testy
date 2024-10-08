# Express REST API with MongoDB

This project is a RESTful API built with **Express.js** and **MongoDB**. It provides endpoints for managing products, users, orders, and order items. The app uses **Mongoose** for database interaction and includes essential middleware such as logging, CORS handling, and error management.

## Features

- CRUD operations for products, users, orders, and order items.
- MongoDB database connection using **Mongoose**.
- Error handling and logging with **morgan**.
- CORS support for cross-origin requests.
- Environment variable configuration using **dotenv**.

## Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** (version 14 or higher)
- **MongoDB** instance (local or remote)

## Installation

Follow these steps to get the project running locally:

1. Clone the repository:

   ```bash
   https://github.com/KanOnni/Web-and-c-project.git

2. Navigate to the project directory:
3. Do all the following 
   ```cmd
    cd Web-and-c-project
    npm install
   // Create a .env file and ask the vowner of this respotory for the connection string

4. Check if enverything looks good and then start the application
   ```cmd
     node app.js

## API Endpoints

  ```js
Products
GET /products - // Fetch all products.
GET /products/:id - // Fetch a product by its ID.
POST /products - // Add a new product.
PUT /products/:id - // Update an existing product by ID.
DELETE /products/:id - // Delete a product by ID.

Users

GET /users - // Fetch all users.
GET /users/:id - // Fetch a user by ID.
POST /users - // Create a new user.
POST /user/find - // finds users by email 📧
PUT /users/:id - // Update an existing user by ID.
DELETE /users/:id - // Delete a user by ID.

Orders

GET /orders - // Fetch all orders.
GET /orders/:id - // Fetch an order by ID.
POST /orders - // Create a new order.
PUT /orders/:id - // Update an existing order by ID.
DELETE /orders/:id - // Delete an order by ID.

Order Items

GET /orderItems - // Fetch all order items.
GET /orderItems/:id - // Fetch an order item by ID.
POST /orderItems - // Create a new order item.
PUT /orderItems/:id - // Update an existing order item by ID.
DELETE /orderItems/:id - // Delete an order item by ID.
   
