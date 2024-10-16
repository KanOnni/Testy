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
3. Now open two terminals in the directory:
4. In the first terminal type the following:
      ```cmd
      cd ./Backend
      npm i

5. Now add the .env file it shold look like 
   ```js
   URL = "mongodb+srv://<username>:<password>@atlascluster.<clusterID>.mongodb.net/testy"

The correct info can be accuired from the owner of this repositories owner

6. And now you can start the backend
   ```cmd
    npm run start
   //this starts the backend in localhost:3001

8. In the second terminal type the following in the orde as shown here:
      ```cmd
      cd ./Frontend
      npm i
      npm run dev
      //The last row starts the frontend in localhost:5173

9. Now everything should be in order

## API Endpoints

  ```js
Products
GET /products - // Fetch all products.
POST /products - // Add a new product.
PUT /products/:id - // Update an existing products amount by ID.
DELETE /products/:id - // Delete a product by ID.

Users

GET /users - // Fetch all users.
POST /users - // Create a new user.
POST /user/find - // finds users by email 📧
PUT /users/:id - // Update an existing user by ID.
DELETE /users/:id - // Delete a user by ID.

Orders

GET /orders - // Fetch all orders.
POST /orders - // Create a new order.
PUT /orders/:id - // Update an existing order by ID.
DELETE /orders/:id - // Delete an order by ID.

Order Items

GET /orderItems - // Fetch all order items.
POST /orderItems - // Create a new order item.
PUT /orderItems/:id - // Update an existing order item by ID.
DELETE /orderItems/:id - // Delete an order item by ID.
   
