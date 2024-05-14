# UserApplication

UserApplication is a Node.js web application designed to manage user registrations and logins, complete with admin functionalities to monitor user activities. This application demonstrates backend capabilities using Express.js and MongoDB, including user authentication, real-time notifications via websockets, and secure handling of sensitive information with environment variables.

# Features

## User Registration and Login:
Users can register with their name, email, mobile number, and password. An image can also be uploaded during registration.

## Email and Mobile OTP Verification: 
After registration, users receive an email verification link. Mobile OTP verification is also implemented for added security.

## Admin Panel:
Allows admins to view all user records and perform administrative tasks.

## Real-Time Updates: 
Implements websockets for real-time notifications and webhooks for external integration.


## Security: 
Uses JWT for secure authentication.

# Installation
Follow these steps to set up and run the application on your local machine:

## Prerequisites
Node.js
MongoDB
npm (Node Package Manager)

## Clone the Repository
git clone https://github.com/(yourgithubusername)/UserApplication.git

cd UserApplication

## Installing Dependencies
npm install

## Configuring Environment Variables

PORT=3000
MONGODB_URI=<MongoDB_URI>
JWT_SECRET=<JWT_Secret>
EMAIL_SERVICE=<Email_Service>
EMAIL_USERNAME=<Email>
EMAIL_PASSWORD=<Email_Password>

## Endpoints

### Register a User

POST: /users/register

### Login User

POST: /users/login

   ----Authenticate a user and return a JWT

### Verify Email

GET: /users/verify/:id

### Admin Management
  ### Admin Login

  POST: /admin/login

  ### View All Users

 GET: /admin/users

### Webhooks

### Receive Webhook

  **POST:** /webhookRoutes

-   ------- Endpoint to receive and process webhook data



#### WebSocket Events

- **WebSocket Connection**
  - Description: Establishes a WebSocket connection for real-time data transmission.
  - ### Events:
    - connect: Confirms connection establishment.
    - disconnect: Confirms disconnection.
    - webhook-event: Receives events via webhooks and broadcasts to connected clients.

