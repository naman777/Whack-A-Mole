
const Leaderboard = ({scores}) => {

    return (
        <div className="bg-slate-800 text-slate-200 p-6 rounded-lg shadow-md h-full">
            <h2 className="text-2xl font-bold text-center mb-4">Leaderboard:</h2>
            <ol className="list-decimal pl-6 space-y-2">
                {scores.map((user, index) => (
                    <li key={index} className="flex justify-normal gap-5 text-xl">
                        <span>{user.name}</span>
                        
                        <span>{user.points}</span>
                    </li>
                ))}
            </ol>
        </div>
    );
};

export default Leaderboard;
