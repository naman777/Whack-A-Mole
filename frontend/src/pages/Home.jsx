import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useWebSocket } from "../hooks/useSocket";
import { Spinner } from '../components/Spinner';

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
    <div>
      <div
      className="h-screen bg-cover bg-center w-screen"
      style={{ backgroundImage: 'url("/bg.png")' }}
      >
        <div className='flex justify-center'>

        <img src="https://acm-thapar.github.io/img/logo.png" alt="" className='w-[181px] h-[79px] shrink-0 mt-4'/>
        </div>
        <h1 className='flex justify-center text-[#343434] font-poppins text-[75px] font-bold leading-normal ' >Whack-a-mole</h1>
        <div className='flex items-center justify-center'> 

      <div className="w-full max-w-6xl  rounded-lg  p-2 flex flex-col md:flex-row items-center justify-between ">
        <div className="  p-8 flex flex-col items-center w-full md:w-2/5 mb-8 md:mb-0  bg-[#15a6dd]/90 text-white rounded-[20px] shadow-md">
          <h2 className="text-white text-2xl mb-4 font-extrabold">Create Room</h2>
          <input
            type="text"
            placeholder="Enter Username"
            className="w-full p-2 rounded-md mb-4 text-black"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <button className="bg-white text-black font-bold py-2 px-4 rounded-md mb-4 w-full hover:bg-slate-200" onClick={handleCreateRoom}>
            Create Room
          </button>
          <div className="flex items-center w-full mb-4">
            <hr className="border-white flex-grow" />
            <span className="mx-4 text-white">OR</span>
            <hr className="border-white flex-grow" />
          </div>
          <h2 className="text-white text-2xl mb-4 font-extrabold">Join Room</h2>
          <input
            type="text"
            placeholder="Enter Username"
            className="w-full p-2 rounded-md mb-4 text-black"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <input
            type="text"
            placeholder="Enter Room ID"
            className="w-full p-2 rounded-md mb-4"
            value={roomId}
            onChange={(e) => setRoomId(e.target.value)}
          />
          <button className="bg-white  text-black font-bold py-2 px-4 rounded-md w-full hover:bg-slate-200" onClick={handleJoinRoom}>
            Join Room
          </button>
        </div>
        <div className="bg-white  p-8 w-full md:w-2/5 bg-white/90 rounded-[20px] shadow-md">
          <h2 className="text-gray-800 text-4xl font-extrabold  pb-6">Rules</h2>
          <ul className="list-disc list-inside text-gray-700">
            <li>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Aliquid ullam praesentium accusantium optio eius cumque dicta fuga eaque magni? Hic.</li>
            <li>Lorem ipsum dolor sit amet consectetur adipisicing elit. Sint, officia? Modi amet ipsa ullam voluptas eius accusantium quia facere libero?.</li>
            <li>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor, sit amet consectetur adipisicing elit. Quas deleniti dolorem, enim doloremque illo illum.</li>
            <li>Nullam pretium ante sit amet urna dapibus varius. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Saepe velit expedita commodi explicabo nostrum alias.</li>
          </ul>
        </div>
      </div>
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
