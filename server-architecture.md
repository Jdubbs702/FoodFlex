# Server Architecture Document

## Introduction
This document outlines the server architecture for the project. It provides an overview of the backend development process and describes the challenges faced, solutions implemented, and reasons behind the chosen approaches.

## Table of Contents
- [Express Server](#express-server)
    - [Environment Variables](#environment-variables)
    - [Mongoose](#mongoose)
    - [Custom Error Handling](#custom-error-handling)
    - [Routes](#routes)
- [Database and Data Models ](#database)
    - [DB Class](#db-class)
    - [Users](#users)
    - [Orders](#orders)
- [Parent](#parent)
    - [Child](#child)

---

## Express Server
**Description**: Set up Express server using Mongoose.

### Environment Variables
- **Challenge**: The environment variables need to be loaded from a `.env` file to securely store sensitive information like database credentials.
- **Solution**: The `dotenv` package is used to load the environment variables from the `.env` file into the server.
- **Reason**: This solution allows for the secure management of sensitive information in the server configuration.

### Mongoose
- **Challenge**: Establish a connection to a MongoDB database using Mongoose.
- **Solution**: Mongoose is used to connect to the MongoDB database using the connection URL.
- **Reason**: Mongoose is a popular Object Data Modeling (ODM) library for MongoDB, providing a convenient and efficient way to interact with the database.

### Custom Error Handling
- **Challenge**: Define a custom error class to handle HTTP errors.
- **Solution**: The `HttpError` class is defined in the `http-error.js` file to handle HTTP errors with custom status codes and error messages.
- **Reason**: Custom error classes provide a structured way to handle and respond to various types of errors that may occur in the application.

### Routes
- **Challenge**: Define and handle routes in the application.
- **Solution**: Route handling files are added to handle the specific routes.
- **Reason**: Separating route handling logic into separate files promotes modularity and maintainability in the codebase.

## Database
**Description**: The database component handles data storage and retrieval.

### DB Class
- **Challenge**: Implement a class that provides functions for creating, reading, updating, and deleting data and for querying data based on specific criteria.
- **Solution**: The DB Class handles data operations by utilizing Mongoose methods and models and includes functions for querying data based on different filters and criteria.
- **Reason**: Encapsulating database operations within a dedicated class promotes code organization, reusability, and maintainability. Custom querying functions enable flexible data retrieval based on specific.
---
- **Challenge**: Protect sensitive data and handle errors during data operations.
- **Solution**: Mongoose Query projections are written to exclude sensitive fields, such as passwords from query results. Each call is encapsulated in a try-catch block with the proper error messages.
- **Reason**: The exclusion of sensitive data and proper error handling enhances the security,  robustness and reliability of the application.

### Users
- **Challenge**: write challenge here
- **Solution**: write solution here
- **Reason**: write reason here

### Orders
- **Challenge**: write challenge here
- **Solution**: write solution here
- **Reason**: write reason here

## Parent Topic
**Description**: Simple description
### Child Topic
- **Challenge**: write challenge here
- **Solution**: write solution here
- **Reason**: write reason here

