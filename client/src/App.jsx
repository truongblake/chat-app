import io from "socket.io-client";
import { useState, useEffect, useRef } from "react";
import { nanoid } from "nanoid";
import Cookies from "js-cookie"

const socket = io.connect("http://localhost:3001");
const user = nanoid(4);

export default function App() {
  const [message, setMessage] = useState("");
  const [room, setRoom] = useState("");
  const [chat, setChat] = useState([]);
  // const [user, setUser] = useState("");

  const chatContainerRef = useRef(null);

  // // For online use 
  // useEffect(()=>{

  //   let user = Cookies.get("user");

  //   if (!user) {
  //     // If not, generate a random name and store it in a cookie
  //     user = nanoid(6);  // Generates a random string of length 6
  //     Cookies.set("user", user, { expires: 365 });  // Store in cookie for 365 days
  //   }

  //   setUser(user);  // Set the username in state

  // },[])

  //updates chatbox
  useEffect(() => {
    socket.on("update_chat", (newChat)=>{
      setChat(newChat)
      console.log(newChat)
    })
    // Scroll to the bottom when the chat updates
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  },[chat]);

  //send message to chat
  const sendChat = (e) => {
    e.preventDefault();
    socket.emit("chat", {message, user, room});
    setMessage("");
  };

  //join room
  const joinRoom = (e) => {
    e.preventDefault();
    socket.emit("join_room",{room});
  };


  return (
    <div className="bg-slate-300">
      <header className="flex justify-center flex-col items-center gap-3 h-[100vh] pb-6">
        <h1 className="font-semibold text-[6em]">CHAT APP</h1>
        <div ref={chatContainerRef} className="border border-black rounded-lg w-[50%] h-[50%] bg-white overflow-scroll">
        {chat.map((payload,index)=>{
          return (
            <p key={index}><span>{payload.user}:</span>{payload.message}</p>
          )
        })}
        </div>
        
        <div className="flex flex-col gap-3">
          {/* Submit Area */}
          <form onSubmit={sendChat} className="flex items-center gap-2">
            <div className="w-16">Message</div>
            <input
              className="border rounded-sm border-gray-300"
              type="text"
              name="chat"
              value={message}
              autoComplete="off"
              onChange={(e) => {
                setMessage(e.target.value);
              }}
            />
            <button type="submit" className="bg-gray-100 rounded-sm border border-black px-3 w-16">Send</button>
          </form>

          {/* Join Room Area */} 
          <form onSubmit={joinRoom} className="flex gap-2 items-center ">
            <div className="w-16">Room</div>
            <input
              className="border rounded-sm border-gray-300"
              type="text"
              name="room"
              value={room}
              autoComplete="off"
              onChange={(e) => {
                setRoom(e.target.value);
              }}
            />
            <button className="bg-gray-100 rounded-sm border border-black px-3 w-16" type="submit">Join</button>
          </form>
        </div>
      </header>
    </div>
  );
}
