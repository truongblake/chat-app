
![Animation](https://github.com/user-attachments/assets/aa8f1bca-34ea-4a3f-94fd-10e90ab182fa)

# Chat-app

A real-time chat application built with the MERN stack, leveraging **Socket.io** to enable instant messaging. This project serves as a learning exercise for using WebSockets and backend integration with MongoDB to enable chat rooms with persistent chat history. Developed using **Vite** and **React**, this proof-of-concept project demonstrates real-time chat with user-defined names managed through cookies.

## Project Timeline

This project was developed in **November 2024** as a practice exercise to understand:
- WebSockets and real-time communication with **Socket.io**
- MongoDB integration for chat room and chat history storage
- MERN stack development with a focus on server-client interactions

## Features
- **Real-time Messaging**: Instant chat updates using Socket.io.
- **Persistent Chat History**: Chat rooms and their histories are saved in a MongoDB database.
- **User Identity**: Users can set a name saved via cookies for a consistent identity in the chat.

## Installation and Setup

To set up and run the project locally, follow these steps for both the **client** and **server** sides:

### Server Setup
**Clone the repository** and navigate to the server directory:

    git clone https://github.com/username/chat-app.git
    cd chat-app/server

Install dependencies:

    npm install

Start the server:

    npm start

Client Setup

Navigate to the client directory:

    cd ../client

Install dependencies:

    npm install

Start the client:

    npm run dev

Access the app: Open http://localhost:3000 in your browser.

Testing the Chat Application

    Open two browser windows or tabs and navigate to http://localhost:3000 in each.
    Both browser instances should automatically connect to the chat server, allowing you to test the real-time messaging functionality.

Dependencies
Main Dependencies

    React (^18.3.1): Frontend library for building user interfaces.
    Socket.io-client (^4.8.1): For real-time communication on the client side.
    js-cookie (^3.0.5): For handling user identity with cookies.
    nanoid (^5.0.8): For generating unique identifiers.

Development Dependencies

    Vite (^5.4.10): Development server for fast builds and HMR.
    Tailwind CSS (^3.4.14): For styling and responsive design.
    ESLint and related plugins: For code quality and linting.
