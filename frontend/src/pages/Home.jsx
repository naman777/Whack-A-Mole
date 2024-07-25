import { useNavigate } from "react-router-dom";


const Home= () => {

    const navigate = useNavigate();

  return (
    <>
        <div className="flex flex-col items-center justify-center pt-4">
            <h1 className="text-4xl font-bold mb-8">Whack-A-Mole</h1>
        </div>
        <div className="h-screen bg-gray-100 flex flex-col items-center pt-16">
        <div className="w-full max-w-4xl flex flex-col md:flex-row justify-between bg-white shadow-md rounded-lg p-6">
            <div className="w-full md:w-1/2 p-4">
            <h2 className="text-2xl font-semibold mb-4">Leaderboard</h2>
            <div className="bg-gray-200 p-4 rounded-lg">
                {/*  leaderboard */}
                <p className="text-gray-600">Leaderboard content will go here...</p>
            </div>
            </div>
            <div className="w-full md:w-1/2 p-4">
            <h2 className="text-2xl font-semibold mb-4">Rules</h2>
            <div className="bg-gray-200 p-4 rounded-lg mb-4">
                <p className="text-gray-600 mb-2">1. The game lasts for one minute.</p>
                <p className="text-gray-600 mb-2">2. Click on the moles to get 10 points.</p>
                <p className="text-gray-600 mb-2">3. Avoid clicking on the cactus and empty space as it will deduct 20 and 5 points    respectively.</p>
                <p className="text-gray-600 mb-2">4. The player with the most points wins.</p>
            </div>
            <div className="flex justify-between">
                <button className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600" onClick={()=>{
                    navigate("/create-room")
                }}>Create Room</button>
                <button className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600" onClick={()=>{
                    navigate("/join-room")
                }}>Join Room</button>
            </div>
            </div>
        </div>
        </div>
    </>
  );
};

export default Home;
