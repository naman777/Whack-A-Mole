import React from 'react';

const GameBoard = ({ board, onTileClick }) => {
    return (
        <div 
            className="relative bg-cover bg-center" 
            style={{ backgroundImage: 'url(/soil-background.png)' }}
        >
            <div className="grid grid-cols-3 absolute inset-0 flex justify-center items-center">
                {board.map((row, rowIndex) => 
                    row.map((cell, colIndex) => (
                        <div
                            key={`${rowIndex}-${colIndex}`}
                            className="relative w-48 h-48 cursor-pointer"
                            onClick={() => onTileClick(rowIndex, colIndex)}
                        >
                            <img
                                src="/pipe.png" // Path to pipes image in public folder
                                alt="Pipe"
                                className="w-full h-full"
                            />
                            {cell === 'mole' && (
                                <img
                                    src="/monty-mole.png" // Path to mole image in public folder
                                    alt="Mole"
                                    className="absolute top-0 left-0 w-half h-full"
                                />
                            )}
                            {cell === 'cactus' && (
                                <img
                                    src="/piranha-plant.png" // Path to cactus image in public folder
                                    alt="Cactus"
                                    className="absolute top-0 left-0 w-full h-full"
                                />
                            )}
                        </div>
                    ))
                )}
            </div>
        </div>
    );
};

export default GameBoard;
