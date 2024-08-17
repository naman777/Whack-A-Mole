import React from 'react';

const Rules = () => {

    return (
        <div className=" text-slate-200 p-6 rounded-lg shadow-md h-full">
            <h2 className="text-7xl font-bold text-center flex justify-start mb-5">Game Rules</h2>
            <ul className="list-disc pl-6 space-y-2 text-2xl  font-bold">
                <li> Click on Mole to get 10 points.</li>
                <li> On Clicking to Cactus and pipe 20 and 5 points <br/>will be deducted respectively.</li>
                <li> Time for the game is 60 seconds.</li>
                <li> Person hitting the Mole first will get the points.</li>
            </ul>
            
        </div>
    );
};

export default Rules;
