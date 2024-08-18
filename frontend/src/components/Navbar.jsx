import React, { useState } from 'react';

const Navbar = ({ roomId, userPoints, timeLeft, onStartGame }) => {
    const [showToast, setShowToast] = useState('');
    
    const copyRoomId = () => {
        navigator.clipboard.writeText(roomId);
        setShowToast('Room ID copied to clipboard!');
        setTimeout(() => setShowToast(''), 2000); // Hide toast after 2 seconds
    };

    const startGame = () => {
        onStartGame();
        setShowToast('Game started!');
        setTimeout(() => setShowToast(''), 2000); // Hide toast after 2 seconds
    };

    return (
        <nav className="bg-gray-800 text-white p-4 flex justify-between items-center relative">
            <div className="text-3xl italic font-extrabold">
                Whack A Mole
            </div>
            <div className="flex-grow flex items-center justify-center space-x-4">
                <div className="bg-green-700 p-2 rounded-lg text-xl font-semibold">
                    {userPoints} Points
                </div>
                <div className="bg-red-600 p-2 rounded-lg text-xl font-semibold">
                    Time Left: {timeLeft}s
                </div>
            </div>
            <div className="flex space-x-4">
                <button 
                    onClick={copyRoomId} 
                    className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
                >
                    Copy Room ID
                </button>
                <button 
                    onClick={startGame} 
                    className="bg-green-600 hover:bg-green-800 text-white px-4 py-2 rounded"
                >
                    Start Game
                </button>
            </div>

            {/* Toast notification */}
            {showToast && (
                <div className="absolute  right-4 bg-gray-700 text-white p-2 rounded-md shadow-md">
                    {showToast}
                </div>
            )}
        </nav>
    );
};

export default Navbar;
