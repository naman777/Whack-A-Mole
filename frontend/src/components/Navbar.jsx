import React from 'react';

const Navbar = ({ roomId, userPoints, timeLeft, onStartGame }) => {
    const copyRoomId = () => {
        navigator.clipboard.writeText(roomId);
    };

    return (
        <nav className="bg-gray-800 text-white p-4 flex justify-between items-center">
            <div className="text-3xl italic font-extrabold">
                Whack A Mole
            </div>
            <div className="flex-grow flex items-center justify-center space-x-4">
                <div className="bg-green-700 p-2 rounded-lg text-xl font-semibold ">
                    {userPoints} Points
                </div>
                {(
                    <div className="bg-red-600 p-2 rounded-lg text-xl font-semibold">
                        Time Left: {timeLeft}s
                    </div>
                )}
            </div>
            <div className="flex space-x-4">
                <button 
                    onClick={copyRoomId} 
                    className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
                >
                    Copy Room ID
                </button>
                <button 
                    onClick={onStartGame} 
                    className="bg-green-600 hover:bg-green-800 text-white px-4 py-2 rounded"
                >
                    Start Game
                </button>
            </div>
        </nav>
    );
};

export default Navbar;
