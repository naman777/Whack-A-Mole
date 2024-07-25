import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Home from './pages/Home.jsx'
import CreateRoom from './pages/CreateRoom.jsx'
import JoinRoom from './pages/JoinRoom.jsx'

function App() {
  
    return (
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Home/>} />
            <Route path="/create-room" element={<CreateRoom/>} />
            <Route path="/join-room" element={<JoinRoom/>} />
          </Routes>
        </BrowserRouter>
        
    )
}

export default App
