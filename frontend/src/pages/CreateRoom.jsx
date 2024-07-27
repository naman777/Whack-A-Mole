import React, { useState } from 'react';
import {  useWebSocket } from '../hooks/useSocket';
import { useNavigate } from 'react-router-dom';

const CreateRoom = () => {
    const [roomName, setRoomName] = useState('');
    const [usersName, setUserName] = useState('');
    const [email, setEmail] = useState('');
    const [mobile, setMobile] = useState('');

    const navigate = useNavigate();
    const socket = useWebSocket();

    const handleCreateRoom = async () => {
        socket?.send(JSON.stringify({
            type:"create_room",
            roomName:roomName,
            usersName:usersName,
            email,
            mobile
        }));

        socket.onmessage  = (event) => {
            const message = JSON.parse(event.data)
            if (message.type === "room_joined") {
                navigate(`/room/${message.roomId}`);
            }
        }

    };

    return (
        <div className="h-screen flex flex-col justify-center items-center bg-slate-700">
            <h1 className="text-3xl font-bold mb-2  text-white">Create your room</h1>
            <div className="bg-white p-16 rounded-lg shadow-lg ">
                <div className="mb-4">
                    <label htmlFor="roomName" className="block text-black font-bold mb-2">Room's Name</label>
                    <input
                        type="text"
                        id="roomName"
                        className="w-full px-3 py-2 border border-gray-300 rounded-md"
                        placeholder="Enter your room's name"
                        value={roomName}
                        onChange={(e) => setRoomName(e.target.value)}
                    />
                </div>
                
                <div className="mb-4">
                    <label htmlFor="userName" className="block text-black font-bold mb-2">Username</label>
                    <input
                        type="text"
                        id="userName"
                        className="w-full px-3 py-2 border border-gray-300 rounded-md"
                        placeholder="Enter your name"
                        value={usersName}
                        onChange={(e) => setUserName(e.target.value)}
                    />
                </div>

                <div className="mb-4">
                    <label htmlFor="roomName" className="block text-black font-bold mb-2">Email</label>
                    <input
                        type="text"
                        id="Docs"
                        className="w-full px-3 py-2 border border-gray-300 rounded-md"
                        placeholder="Enter your emailId"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </div>

                <div className="mb-4">
                    <label htmlFor="roomName" className="block text-black font-bold mb-2">Mobile Number</label>
                    <input
                        type="text"
                        id="Docs"
                        className="w-full px-3 py-2 border border-gray-300 rounded-md"
                        placeholder="Enter your doc's title"
                        value={mobile}
                        onChange={(e) => setMobile(e.target.value)}
                    />
                </div>

                <button
                    className="bg-blue-500 hover:bg-blue-600 text-white font-semibold px-4 py-2 rounded-md"
                    onClick={handleCreateRoom}
                >
                    Create Room
                </button>
            </div>
        </div>
    );
};

export default CreateRoom;
