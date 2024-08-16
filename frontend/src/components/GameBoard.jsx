import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Leaderboard from './Leaderboard';

const GameBoard = ({ board, onTileClick,scores }) => {
    const [bgColor, setBgColor] = useState('');

    const handleTileClick = (rowIndex, colIndex) => {
        const cell = board[rowIndex][colIndex];
        if (cell === 'cactus') {
            setBgColor('red');
            setTimeout(() => setBgColor(''), 1000); // Revert background color after 1 second
        }
        onTileClick(rowIndex, colIndex);
    };

    return (
        <div 
            className="relative bg-cover bg-center h-screen w-screen overflow-hidden bg-black" 
            style={{ backgroundImage: 'url("/mario-bg.jpg")' }}
        >   <div className='flex justify-start ml-5 mt-6'>
                <Leaderboard scores={scores}/>
            </div>
            <motion.h1
                className="text-center text-4xl font-bold mb-4"
                initial={{ opacity: 0, y: -50 }} // Initial state
                animate={{ opacity: 1, y: 0 }}   // Animated state
                transition={{ duration: 1, type: 'spring' }} // Transition duration and type
                style={{ color: 'white', textShadow: '2px 2px 4px #000' }} // Additional styles
            >
                {/* Add title or other content here if needed */}
            </motion.h1>
            <div className="absolute inset-0 flex justify-center items-center mb-24 mt-4">
                <div className="grid grid-cols-3 gap-1 bg-cover bg-center rounded-lg pb-12 border-white" style={{ backgroundImage: 'url("/soil.png")' }}>
                    {board.map((row, rowIndex) => 
                        row.map((cell, colIndex) => (
                            <motion.div
                                key={`${rowIndex}-${colIndex}`}
                                className="relative w-44 h-44 cursor-pointer bg-cover bg-center"
                                style={{ backgroundImage: 'url("/pipe.png")' }}
                                onClick={() => handleTileClick(rowIndex, colIndex)}
                                whileHover={{ scale: 1.2, rotate: 5 }}  // Enhanced hover animation
                                whileTap={{ scale: 0.8, rotate: -5 }}   // Enhanced tap animation
                            >
                                {cell === 'mole' && (
                                    <motion.img
                                        src="/monty-mole.png" 
                                        alt="Mole"
                                        className="absolute top-0 left-0 w-28 h-28 ml-8 mb-2" // Adjust the width and height here
                                        initial={{ opacity: 0, y: -20 }} 
                                        animate={{ opacity: 1, y: 0 }}   // Animated state
                                        transition={{ duration: 0.5, type: 'spring' }}   // Transition duration
                                    />
                                )}
                                {cell === 'cactus' && (
                                    <motion.img
                                        src="/piranha-plant.png" // Path to cactus image in public folder
                                        alt="Cactus"
                                        className="absolute top-0 left-0 w-24 h-24 ml-10" // Adjust the width and height here
                                        initial={{ opacity: 0, scale: 0.8 }} // Initial state
                                        animate={{ opacity: 1, scale: 1 }}   // Animated state
                                        transition={{ duration: 0.5, type: 'spring' }}       // Transition duration
                                    />
                                )}
                            </motion.div>
                        ))
                    )}
                </div>
            </div>
        </div>
    );
};

export default GameBoard;
