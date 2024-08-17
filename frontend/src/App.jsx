import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Home from './pages/Home.jsx'
import { WebSocketProvider } from './hooks/useSocket.jsx'
import Game from './pages/Game.jsx'

function App() {
  
  return (
    <WebSocketProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home/>} />

          <Route path="room/:roomId" element={<Game/>}/>
        </Routes>
      </BrowserRouter>
    </WebSocketProvider>
  )
}

export default App
