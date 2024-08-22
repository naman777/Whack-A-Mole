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
        <nav className="bg-gray-800 text-white p-4 flex flex-col sm:flex-row sm:justify-between sm:items-center space-y-2 sm:space-y-0 relative">
            <div className="text-xl sm:text-3xl italic font-extrabold text-center sm:text-left">
                Whack A Mole
            </div>
            <div className="flex-grow flex items-center justify-center space-x-4">
                <div className="bg-green-700 p-2 rounded-lg text-sm sm:text-xl font-semibold">
                    {userPoints} Points
                </div>
                <div className="bg-red-600 p-2 rounded-lg text-sm sm:text-xl font-semibold">
                    Time Left: {timeLeft}s
                </div>
            </div>
            <div className="flex space-x-2 sm:space-x-4 justify-center sm:justify-end">
                <button 
                    onClick={copyRoomId} 
                    className="bg-blue-500 hover:bg-blue-600 text-white text-sm sm:text-base px-3 py-1 sm:px-4 sm:py-2 rounded"
                >
                    Copy Room ID
                </button>
                <button 
                    onClick={startGame} 
                    className="bg-green-600 hover:bg-green-800 text-white text-sm sm:text-base px-3 py-1 sm:px-4 sm:py-2 rounded"
                >
                    Start Game
                </button>
            </div>

            {/* Toast notification */}
            {showToast && (
                <div className="absolute right-4 top-16 sm:top-auto bg-gray-700 text-white p-2 rounded-md shadow-md">
                    {showToast}
                </div>
            )}
        </nav>
    );
};

export default Navbar;