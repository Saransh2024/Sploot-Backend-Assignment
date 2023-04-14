# Node.js RESTful API with MongoDB and User Authentication

This repository contains an implementation of a Node.js RESTful API using Express.js and MongoDB for data storage. 
The API provides user authentication, allowing only authenticated users to create articles, retrieve all articles and update their own user profile.

Features
Signup a user with email and password.

      Endpoint: /api/signup
Request body: { email: string, password: string, name: string, age: number }

Login a user with email and password.

       Endpoint: /api/login
Request body: { email: string, password: string }
Response body: { message: string, token: string }

Create an article.

            Endpoint: /api/users/:userId/articles
Request body: { title: string, description: string }
Response body: { message: string, article: object }

Get all articles.

            Endpoint: /api/articles
Response body: [{ title: string, description: string, author: { name: string, age: number } }]

Update user profile. Only name and age are editable.

               Endpoint: /api/users/:userId
Request body: { name: string, age: number }
Response body: { message: string, user: object }

# Technologies Used
Node.js
Express.js
MongoDB
JSON Web Tokens (JWT)
bcrypt
Getting Started

# Clone the repository: 
git clone https://github.com/<your-username>/nodejs-mongodb-restful-api.git
  
Install dependencies: npm install
Start the server: npm start
  
  
 Next, create a .env file in the root directory and add the following environment variables:

makefile
Copy code
MONGODB_URI=<mongodb_connection_uri>
JWT_SECRET=<jwt_secret_key>
Replace <mongodb_connection_uri> with the connection URI for your MongoDB database and <jwt_secret_key> with a secret key for JWT authentication.
  
Use a tool like Postman to make requests to the API.
License
This project is licensed under the MIT License - see the LICENSE file for details.
# Sploot-Backend-Assignment
# Sploot-Backend-Assignment
