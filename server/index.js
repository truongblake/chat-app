// ACQUIRE EXPRESS FRAMEWORK
const express = require("express");
const app = express();

// ACQUIRE SERVER FUNCTION FROM SOCKET
const { Server } = require("socket.io");

// Create EXPRESS SERVER ON TOP OF THE HTTP
const http = require("http");
const server = http.createServer(app);

// ADD CORS TO EXPRESS SERVER
const cors = require("cors");
app.use(cors);

// CREATE SOCKETIO SERVER
const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
  },
});

//Import environment variable from .env
require("dotenv").config();

// Import Mongoose connection function
const connectDB = require("./config/db");

// Connect to MongoDB
connectDB();

// Chat model 
const Chat = require("./models/chat");

io.on("connection", (socket) => {

  console.log("Socket is active to be connected");

  socket.on("chat", async (payload) => {

    const message = payload.message;
    const user = payload.user;
    const room = payload.room;

    console.log(room,user,message);

    //update chat with new message
    const newChat = await Chat.findOneAndUpdate(
        { room: room },
        { $push: { messages: {user,message}} },  // Add new message to the messages array
        { new: true }  // Return the updated document
      );

    //return new chat
    io.to(newChat.room).emit("update_chat", newChat.messages);
    // console.log(newChat.messages);

  });

  socket.on("join_room", async (data) => {
    //pull from database and send back to client
    socket.leaveAll()
    try{
        //does chat exist?
        const chat = await Chat.findOne({room:data.room});
        
        if(!chat){
            throw "Chat Room Doesn't Exist";
        }

        console.log(chat)

        //client join existed chat
        socket.join(chat.room);
        console.log(socket.rooms);

        //client acquire chat history
        socket.to(chat.room).emit("update_chat",chat.messages);

    }catch(error){
        
        console.log(error);

        //create new chat for db
        const newChat = new Chat({
            room:data.room,
            messages:[],
        })

        //upload chat to db
        await newChat.save()
        console.log("created new chat and saved")

        //client joins new room
        socket.join(data.room);
        console.log("joined:", data.room)

        //send new chat back to client
        socket.emit("update_chat", newChat.messages);
    }

  });
});

server.listen(3001, () => {
  console.log("server is active...");
});
