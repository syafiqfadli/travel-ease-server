# Thrift Shop Server README

## Overview

This README provides a description of the Thrift Shop Server, a backend system that supports various functionalities for a thrift shop application. The server facilitates user registration, authentication, shopping cart management, and more, enabling seamless interactions between the thrift shop's clients and the inventory.

## How the Server Works

### Installation

To set up the Thrift Shop Server, follow these steps:

1. Clone the repository from GitHub.
2. Install the required dependencies using `npm install`.
3. Run the server with `npm run start:dev` for development.

### Sign Up

New users can create accounts to access the thrift shop's services. To sign up, the client sends a `POST` request to the server's `/signup` endpoint, including the user's information such as username, email, and password. The server then validates the data, creates a new user entry in the database, and responds with a success message or an error if the registration fails.

### Log In

Users can log in to the application by sending a `POST` request to the `/login` endpoint with their credentials. The server verifies the username and password, generates a JSON Web Token (JWT) if the credentials are correct, and sends it back to the client. The client can store this token and use it for subsequent authenticated requests.

### Token Authentication

For secure interactions, the server uses token-based authentication. Clients must include the JWT in the `Authorization` header of each request to protected endpoints. The server then verifies the token's authenticity, allowing access to specific resources only for authenticated users.

### Add to Cart

Once authenticated, users can add items to their shopping cart. The client sends a `POST` request to the `/cart/add` endpoint, including the item ID and quantity to add. The server validates the input, checks item availability, and updates the user's cart in the database. If successful, it responds with the updated cart information.

### Error Handling

The server includes comprehensive error handling. In case of any unexpected issues or incorrect input from the client, the server responds with appropriate error codes and error messages to help diagnose and resolve the problem.

## Conclusion

The Thrift Shop Server is a powerful backend system that supports essential functionalities for a thrift shop application. By enabling user registration, authentication, shopping cart management, and more, it provides a seamless and secure shopping experience for users. With proper setup and integration, the Thrift Shop Server can be the backbone of a fully functional thrift shop application.
