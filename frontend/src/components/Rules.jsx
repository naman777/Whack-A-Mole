import React from 'react';
import {useNavigate} from "react-router-dom";

const Rules = () => {

    const navigate = useNavigate();

    const handleCreateRoom = () => {
        navigate("/create-room");
    };

    const handleJoinRoom = () => {
        navigate("join-room");
    };

    return (
        <div className=" bg-slate-600 text-slate-200 p-6 rounded-lg shadow-md h-full">
            <h2 className="text-2xl font-bold text-center mb-4">Game Rules</h2>
            <ul className="list-disc pl-6 space-y-2">
                <li>Rule 1: Description of rule 1.</li>
                <li>Rule 2: Description of rule 2.</li>
                <li>Rule 3: Description of rule 3.</li>
                <li>Rule 4: Description of rule 4.</li>
                <li>Rule 5: Description of rule 5.</li>
            </ul>
            <div className="flex justify-around mt-6">
                <button 
                    onClick={handleCreateRoom} 
                    className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition duration-300"
                >
                    Create Room
                </button>
                <button 
                    onClick={handleJoinRoom} 
                    className="bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600 transition duration-300"
                >
                    Join Room
                </button>
            </div>
        </div>
    );
};

export default Rules;
