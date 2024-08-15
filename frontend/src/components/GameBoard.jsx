import React, { useState } from 'react';
import { motion } from 'framer-motion';

const GameBoard = ({ board, onTileClick }) => {
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
            className="relative bg-cover bg-center" 
            style={{ 
                backgroundImage: 'url(/soil-background.png)', 
                backgroundColor: bgColor, 
                transition: 'background-color 0.2s' // Smooth transition
            }}
        >
            <motion.h1
                className="text-center text-4xl font-bold mb-4"
                initial={{ opacity: 0, y: -50 }} // Initial state
                animate={{ opacity: 1, y: 0 }}   // Animated state
                transition={{ duration: 1, type: 'spring' }} // Transition duration and type
                style={{ color: 'white', textShadow: '2px 2px 4px #000' }} // Additional styles
            >
                Whack-A-Mole
            </motion.h1>
            <div className="grid grid-cols-3 absolute inset-0 flex justify-center items-center">
                {board.map((row, rowIndex) => 
                    row.map((cell, colIndex) => (
                        <motion.div
                            key={`${rowIndex}-${colIndex}`}
                            className="relative w-48 h-48 cursor-pointer"
                            onClick={() => handleTileClick(rowIndex, colIndex)}
                            whileHover={{ scale: 1.2, rotate: 5 }}  // Enhanced hover animation
                            whileTap={{ scale: 0.8, rotate: -5 }}   // Enhanced tap animation
                        >
                            <motion.img
                                src="/pipe.png" // Path to pipes image in public folder
                                alt="Pipe"
                                className="w-full h-full"
                                initial={{ opacity: 0.5, rotate: 0 }} // Initial state for the pipe
                                animate={{ opacity: 1, rotate: [0, 360] }} // Continuous rotation animation
                                transition={{ duration: 2, repeat: Infinity }} // Duration and repeat for rotation
                            />
                            {cell === 'mole' && (
                                <motion.img
                                    src="/monty-mole.png" // Path to mole image in public folder
                                    alt="Mole"
                                    className="absolute top-0 left-0 w-full h-full"
                                    initial={{ opacity: 0, y: -20 }} // Initial state
                                    animate={{ opacity: 1, y: 0 }}   // Animated state
                                    transition={{ duration: 0.5, type: 'spring' }}   // Transition duration
                                />
                            )}
                            {cell === 'cactus' && (
                                <motion.img
                                    src="/piranha-plant.png" // Path to cactus image in public folder
                                    alt="Cactus"
                                    className="absolute top-0 left-0 w-full h-full"
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
    );
};

export default GameBoard;
