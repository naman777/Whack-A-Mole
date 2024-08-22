import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Leaderboard from './Leaderboard';

const GameBoard = ({ board, onTileClick, scores }) => {
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
            className="relative bg-cover bg-center h-screen w-screen overflow-hidden bg-blue-400" 
            style={{ backgroundImage: 'url("/bg.png")' }}
        >   
            <div className='flex justify-start ml-5 mt-6'>
                <Leaderboard scores={scores} />
            </div>
            
            <motion.h1
                className="text-center text-3xl font-bold mb-4 md:text-4xl"
                initial={{ opacity: 0, y: -50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, type: 'spring' }}
                style={{ color: 'white', textShadow: '2px 2px 4px #000' }}
            >
                {/* Add title or other content here if needed */}
            </motion.h1>
            
            <div className="absolute inset-0 flex justify-center items-center mb-12 mt-4">
                <div 
                    className="
                        grid grid-cols-3 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-3 gap-2 
                        bg-cover bg-center rounded-lg pb-12 border-white"
                    style={{ backgroundImage: 'url("/soil.png")' }}
                >
                    {board.map((row, rowIndex) =>
                        row.map((cell, colIndex) => (
                            <motion.div
                                key={`${rowIndex}-${colIndex}`}
                                className="relative w-24 h-24 sm:w-32 sm:h-32 md:w-44 md:h-44 cursor-pointer bg-cover bg-center"
                                style={{ backgroundImage: 'url("/pipe.png")' }}
                                onClick={() => handleTileClick(rowIndex, colIndex)}
                                whileHover={{ scale: 1.2, rotate: 5 }}
                                whileTap={{ scale: 0.9, rotate: -5 }}
                            >
                                {cell === 'mole' && (
                                    <motion.img
                                        src="/monty-mole.png"
                                        alt="Mole"
                                        className="absolute top-0 left-0 w-16 h-16 sm:w-20 sm:h-20 md:w-28 md:h-28 ml-4 sm:ml-6 md:ml-8 mb-2"
                                        initial={{ opacity: 0, y: -20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ duration: 0.5, type: 'spring' }}
                                    />
                                )}
                                {cell === 'cactus' && (
                                    <motion.img
                                        src="/piranha-plant.png"
                                        alt="Cactus"
                                        className="absolute top-0 left-0 w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 ml-4 sm:ml-6 md:ml-10"
                                        initial={{ opacity: 0, scale: 0.8 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        transition={{ duration: 0.5, type: 'spring' }}
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
