# Sploot-Backend-Assignment

## Backend RESTful API in NodeJS with ExpressJS and MongoDB 

This service should have a user who will be able to signup and login. 
Only the authenticated (logged in) user will be able to perform actions like creating an Article, Retrieving all Articles and updating their own user profile.


➡️Signup a user with email and password.

    Endpoint: /api/signup
    Request body: { email: string, password: string, name: string, age: number }

➡️Login a user with email and password.

    Endpoint: /api/login
    Request body: { email: string, password: string }

➡️Create an article.

     Endpoint: /api/users/:userId/articles
     Request body: { title: string, description: string }


➡️Get all articles.

     Endpoint: /api/articles
            

➡️Update user profile. Only name and age are editable.

     Endpoint: /api/users/:userId
     Request body: { name: string, age: number }



# Getting Started
  
Create a .env file in the root directory

Enter the following details in it

MONGODB_URI=

JWT_SECRET=

  
# Sploot-Backend-Assignment

