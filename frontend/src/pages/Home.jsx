import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useWebSocket } from "../hooks/useSocket";
import { Spinner } from '../components/Spinner';
import Rules from '../components/Rules';

const Home = () => {
  const navigate = useNavigate();
  
  const [name, setName] = useState('');
  const [roomId, setRoomId] = useState('');

  const { socket, isConnected } = useWebSocket();

  const handleCreateRoom = () => {
    if (name) {
        socket?.send(JSON.stringify({ type: 'create_room', usersName: name }));
        localStorage.setItem("name", name);
        socket.onmessage  = (event) => {
            const message = JSON.parse(event.data);
            if (message.type === "room_joined") {
                navigate(`/room/${message.roomId}`);
            }
        };
    } else {
        alert("Please enter your name to create a room.");
    }
  };

  const handleJoinRoom = () => {
    if (name && roomId) {
        socket?.send(JSON.stringify({ type: 'join_room', usersName: name, roomId }));
        localStorage.setItem("name", name);
        socket.onmessage  = (event) => {
            const message = JSON.parse(event.data);
            if (message.type === "room_joined") {
                navigate(`/room/${message.roomId}`);
            }
        };
    } else {
        alert("Please enter your name and room ID to join a room.");
    }
  };

  return (
    <div className="relative h-max w-screen bg-slate-950 ">
      <div className="absolute bottom-0 left-0 right-0 top-0 bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-[size:14px_24px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]"></div>
      <div className="text-center pt-5 text-white">
          <h1 className="text-7xl md:text-6xl font-bold">Whack A Mole</h1>
        </div>
      
      <div className='text-white h-screen flex flex-col items-center p-4 md:flex-row md:justify-between md:p-12'>
       

        <div className='w-full max-w-lg md:w-1/3'>
          <Rules />
        </div>

        <div className="w-full max-w-lg mt-8 md:w-1/3 md:mt-0 z-20 bg-slate-950">
          <div className="p-6 rounded-lg shadow-lg mb-8">
            <h2 className="text-2xl font-semibold mb-4">Create Room</h2>
            <input
              type="text"
              placeholder="Enter your name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-4 py-2 mb-4 text-black rounded-lg"
            />
            <button
              className="w-full px-4 py-2 mb-4 bg-blue-600 hover:bg-blue-700 rounded-lg shadow-md"
              onClick={handleCreateRoom}
            >
              Create Room
            </button>
          </div>

          <div className="p-6 rounded-lg shadow-lg bg-slate-950">
            <h2 className="text-2xl font-semibold mb-4">Join Room</h2>
            <input
              type="text"
              placeholder="Enter your name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-4 py-2 mb-4 text-black rounded-lg"
            />
            <input
              type="text"
              placeholder="Enter Room ID"
              value={roomId}
              onChange={(e) => setRoomId(e.target.value)}
              className="w-full px-4 py-2 mb-4 text-black rounded-lg"
            />
            <button
              className="w-full px-4 py-2 mb-4 bg-green-600 hover:bg-green-700 rounded-lg shadow-md"
              onClick={handleJoinRoom}
            >
              Join Room
            </button>
          </div>
        </div>

        {!isConnected && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
            <Spinner />
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;
