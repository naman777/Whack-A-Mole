import React, { useEffect, useState } from 'react';
import Navbar from '../components/Navbar'; 
import { useParams } from 'react-router-dom';
import { useWebSocket } from '../hooks/useSocket';
import GameBoard from '../components/GameBoard';
import { CLICK_CELL, START_GAME } from '../hooks/messages';
import Modal from '../components/Modal';

const Game = () => {
    const [board, setBoard] = useState([
        ['empty', 'empty', 'empty'],
        ['empty', 'empty', 'empty'],
        ['empty', 'empty', 'empty'],
    ]);
    const [score, setScore] = useState(0);
    const [isGameStarted, setIsGameStarted] = useState(false);
    const [timeLeft, setTimeLeft] = useState(60);
    const {socket} = useWebSocket();
    const { roomId } = useParams();
    const [scores, setScores] = useState([]);
    const [winner, setWinner] = useState(null); 
    const name = localStorage.getItem('name');

    useEffect(() => {
        socket.onmessage = (event) => {
            const message = JSON.parse(event.data);

            if (message.type === "game_started") {
                setIsGameStarted(true);
                setTimeLeft(60);
            }

            if (message.type === "update_board") {
                setBoard(message.board);
            }

            if (message.type === "update_scores") {
                const points = message.scores.find((user) => user.name === name)?.points;
                setScore(points);
                setScores(message.scores);
            }

            if (message.type === "end_game") {
                const points = message.scores.find((user) => user.name === name)?.points;
                setScore(points);
                setScores(message.scores);
                
                const highestScorer = message.scores.reduce((prev, current) => {
                    return (prev.points > current.points) ? prev : current;
                });
                

                setWinner({
                    name: highestScorer.name,
                    points: highestScorer.points
                });
            }
        };

        return () => {
            socket.onmessage = null; 
        };
    }, [socket, name]);

    useEffect(() => {
        let timer;
        if (isGameStarted && timeLeft > 0) {
            timer = setInterval(() => {
                setTimeLeft((prevTime) => {
                    if (prevTime <= 1) {
                        clearInterval(timer);
                        setIsGameStarted(false); 
                        return 0;
                    }
                    return prevTime - 1;
                });
            }, 1000);
        }

        return () => clearInterval(timer); 
    }, [isGameStarted, timeLeft]);

    const onStartGame = () => {
        console.log("Starting game");
        socket?.send(JSON.stringify({
            type: START_GAME,
            roomId,
        }));
    };

    const handleTileClick = (row, col) => {
        const message = JSON.stringify({
            type: CLICK_CELL,
            row,
            col,
            roomId
        });
        socket.send(message);
    };

    const closeModal = () => {
        setWinner(null);
    };

    return (
        <div className='bg-blue-300 min-h-screen flex flex-col overflow-hidden'>
            <Navbar
                roomId={roomId}
                userPoints={score}
                onStartGame={onStartGame}
                timeLeft={timeLeft}
            />
            <div className='w-96 h-96 bg-blue-300'>
                <GameBoard
                    board={board}
                    onTileClick={handleTileClick}
                    scores={scores}
                />
            </div>
            {winner && (
                <Modal onClose={closeModal}>
                    <h2 className="text-xl font-bold">Game Over</h2>
                    <p>{winner.name} won with {winner.points} points!</p>
                </Modal>
            )}
        </div>
    );
};

export default Game;
