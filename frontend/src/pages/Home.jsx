import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useWebSocket } from "../hooks/useSocket";
import { Spinner } from '../components/Spinner';

const Home = () => {
  const navigate = useNavigate();

  const [cname, setName] = useState('');
  const [jname, setJName] = useState('');
  const [roomId, setRoomId] = useState('');

  const { socket, isConnected } = useWebSocket();

  const handleCreateRoom = () => {
    if (cname) {
      socket?.send(JSON.stringify({ type: 'create_room', usersName: cname }));
      localStorage.setItem("name", cname);
      socket.onmessage = (event) => {
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
    if (jname && roomId) {
      socket?.send(JSON.stringify({ type: 'join_room', usersName: jname, roomId }));
      localStorage.setItem("name", jname);
      socket.onmessage = (event) => {
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
    <div className="relative h-screen w-screen bg-cover bg-center"
      style={{ backgroundImage: 'url("/bgimg.png")' }}>
      
      <div className="flex flex-col items-center pt-4 space-y-4 md:space-y-0">
        <img src="https://acm-thapar.github.io/img/logo.png" alt="" className='w-36 h-16 md:w-[181px] md:h-[79px]' />
        <h1 className='text-center text-[#343434] font-poppins text-4xl md:text-6xl font-bold leading-tight drop-shadow-lg'>
          Whack-a-mole
        </h1>
      </div>

      <div className="flex flex-col items-center justify-center md:flex-row md:justify-around w-full h-auto md:max-w-7xl mx-auto p-4 gap-10">
        
        {/* Create Room Section */}
        <div className="flex flex-col items-center bg-[#15a6dd]/90 text-white p-6 rounded-lg shadow-lg w-full md:w-2/5 space-y-4">
          <h2 className="text-2xl font-extrabold">Create Room</h2>
          <input
            type="text"
            placeholder="Enter Username"
            className="border-2 w-full p-2 rounded-md text-black"
            value={cname}
            onChange={(e) => setName(e.target.value)}
          />
          <button
            className="bg-white text-black font-bold py-2 px-4 rounded-md w-full hover:bg-slate-200 drop-shadow-lg"
            onClick={handleCreateRoom}
          >
            Create Room
          </button>
          
          <div className="flex items-center w-full">
            <hr className="border-white flex-grow" />
            <span className="mx-4">OR</span>
            <hr className="border-white flex-grow" />
          </div>

          {/* Join Room Section */}
          <h2 className="text-2xl font-extrabold">Join Room</h2>
          <input
            type="text"
            placeholder="Enter Username"
            className="border-2 w-full p-2 rounded-md text-black"
            value={jname}
            onChange={(e) => setJName(e.target.value)}
          />
          <input
            type="text"
            placeholder="Enter Room ID"
            className="border-2 w-full p-2 rounded-md text-black"
            value={roomId}
            onChange={(e) => setRoomId(e.target.value)}
          />
          <button
            className="bg-white text-black font-bold py-2 px-4 rounded-md w-full hover:bg-slate-200 drop-shadow-lg"
            onClick={handleJoinRoom}
          >
            Join Room
          </button>
        </div>

        {/* Rules Section */}
        <div className="bg-white p-6 rounded-lg shadow-lg w-full md:w-2/5 opacity-90">
          <h2 className="text-gray-800 text-3xl md:text-4xl font-extrabold pb-6">Rules</h2>
          <ul className="list-disc list-inside text-lg md:text-2xl text-gray-700 space-y-2">
            <li>The game lasts 1 minute—click moles to earn <b>+10</b> points.</li>
            <li>Only the first player to click a mole earns points.</li>
            <li>Clicking on an empty spot will deduct <b>5</b> points.</li>
            <li>Clicking on cacti will deduct 20 points.</li>
            <li>The player with the highest score at the end wins.</li>
            <li>Enjoy!</li>
          </ul>
        </div>
      </div>

      {!isConnected && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <Spinner />
        </div>
      )}
    </div>
  );
};

export default Home;