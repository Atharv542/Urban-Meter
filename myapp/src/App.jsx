import { useState } from 'react'

import Login from './pages/Login'
import { Routes, Route } from 'react-router-dom'
import Register from './pages/Register'
import VideoCall from './component/VideoCall'
import Home from './component/Home'
import GoogleContacts from './GoogleContacts'
import Navbar from './component/Navbar'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
       <Navbar/>
       <Routes>
      
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/video-call" element={<VideoCall />} />
      <Route path ="/" element={<Home/>} />
      <Route path ="/GoogleContacts" element={<GoogleContacts/>}/>
      
      <Route path="/video-call/:callId?" element={<VideoCall />} />

    </Routes>
    </>
   
  

  )
} 

export default App
