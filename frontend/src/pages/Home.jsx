import React from 'react';
import Leaderboard from '../components/Leaderboard';
import Rules from '../components/Rules';

const users = [
    { name: 'User1', points: 100 },
    { name: 'User2', points: 200 },
    { name: 'User3', points: 150 },
    { name: 'User4', points: 10 },
    { name: 'User5', points: 20 },
    { name: 'User6', points: 155 },
    { name: 'User7', points: 105 },
    { name: 'User8', points: 260 },
    { name: 'User9', points: 50 },
];

const Home = () => {
    return (
        <>
            <div className='flex flex-col justify-center items-center font-extrabold text-5xl pt-4 pb-3 bg-slate-800 italic text-white'>
                Whack A Mole
            </div>
            <div className="app flex items-start gap-6 p-6 bg-slate-800 min-h-screen ">
                <div className="flex-1">
                    <Rules />
                </div>
                <div className="flex-1">
                    <Leaderboard users={users} />
                </div>
            </div>
        </>
    );
};

export default Home;
