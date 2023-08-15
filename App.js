import './App.css';
import io from "socket.io-client";
import Chat from "./Chat.js";
import {useState,React} from 'react';

const socket = io.connect("http://localhost:3001");
var uid = 0;
function App() {
  const [username, setUsername] = useState("");
  const [room, setRoom] = useState("");
  const [showChat, setShowChat] = useState(false);

  const joinRoom = () => {
    if (username !== "" && room !== "") {
      socket.emit("join_room", room)
      setShowChat(true);
    }
  };
  uid+=1;
  return (
    <div className="App">
      {!showChat ? 
      (<div className="joinChatContainer">
        <h3>Join a Chat</h3>
        <input type="text" placeholder='john...' onChange={(event) => {setUsername(event.target.value)}} />
        <input type="text" placeholder='Room ID...' onChange={(event) => {setRoom(event.target.value)}} />
        <button onClick={joinRoom}>Join A Room</button>
      </div>)

      : (<Chat id={uid} socket={socket} username={username} room={room} />)}
    </div>
  );
}

export default App;
