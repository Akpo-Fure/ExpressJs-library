# Node-Js-Book-LIbrary API

This is a book library API built using Node.js, TypeScript, Express.js, and MongoDB. It enables users to sign up, add books, or view details of their favoirite books. The project makes use of authentication and authorization to ensure that users can only access, update, or delete books they've created themselves, ensuring privacy. It is a full stack application so please ensure to run the application either via the docker hub. You can also checkout postman for the documentation if you are interested in interacting with the backend API

## Features

- Frontend built using JavasScript with axios and Pug as template engine
- User signup and authentication
- Orchestrated seamless containerization using Docker
- Books management
- JWT-based token authentication
- Protected routes for authorized access

## Getting Started

Follow these steps to set up and run the project on your local machine.

#. The best way to run this application is using docker, I advice you use docker as this gives you the full scope of the whole project from start to finish 
```
docker pull akpofure/library:pug
```

#. Link to docker hub: I really appreciate you guys check it out 
```
https://hub.docker.com/repository/docker/akpofure/library/general
```

1. Clone the repository:

```bash
git clone https://github.com/Akpo-Fure/Node-Js-Task-Manager.git](https://github.com/Akpo-Fure/FullStack-ExpressJs-library.git)
```

2. Install the dependecies using yarn
```
RUN yarn
```

3. Set up environmental variables in .env file for your mongoDB database using MONGO_URI

4. Set up environmental variables in .env for your password hashing using SALT_ROUNDS

5. Set up environmental variable in .env for encryption and decryption of your token using JWT_SECRET

6. Set NODE_ENV to production in .env file to get production based error pages and benefits

7. Build the typescript code
```
RUN yarn watch
```
8. Build javascript code using parcel builder
```
RUN yarn watch:js
```

10. Start the server
```
RUN yarn library
```

10. Checkout https://documenter.getpostman.com/view/28610649/2s9Y5Zwhyy for postman documentation for a seamless user experience
```
https://documenter.getpostman.com/view/28610649/2s9Y5Zwhyy
```
