import React from 'react';

const Leaderboard = ({ users }) => {
    const sortedUsers = [...users].sort((a, b) => b.points - a.points);
    const topUsers = sortedUsers.slice(0, 10);

    return (
        <div className="bg-slate-600 text-slate-200 p-6 rounded-lg shadow-md h-full">
            <h2 className="text-2xl font-bold text-center mb-4">Leaderboard</h2>
            <ol className="list-decimal pl-6 space-y-2">
                {topUsers.map((user, index) => (
                    <li key={index} className="text-lg">
                        {user.name}: {user.points} points
                    </li>
                ))}
            </ol>
        </div>
    );
};

export default Leaderboard;
