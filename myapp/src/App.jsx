import { useState } from 'react'
import './App.css'
import Login from './pages/Login'
import { Route, Routes } from 'react-router-dom';
import Register from './pages/Register';
import Place from './pages/Auto';
import Header from './pages/Header';
import AutoRide from './pages/AutoRide';
import Home from './component/Home';
import ERickshaw from './pages/ERickshaw';
import ErickshawRide from './pages/ErickshawRide';
import Recommendation from './pages/Recommendation';

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
   {/* Navbar will be present on all pages */}
    <Routes>
      <Route path="/" element={
        <div>
           <Header />
           <Home />
        </div>}
         />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/auto" element={
        <div>
          <Header/>
          <Place />
        </div>
        } />
      <Route path="/e-rickshaw" element={
        <div>
          <Header/>
          <ERickshaw/>
        </div>
     } />
      <Route path="/auto-ride" element={
        <div>
          <Header/>
          <AutoRide />
        </div>
       } />
       <Route path="/erickshaw-ride" element={
        <div>
          <Header/>
          <ErickshawRide />
        </div>
       } />
        <Route path="/recommendation" element={
        <div>
          <Header/>
          <Recommendation />
        </div>
       } />

    </Routes>
  </>

)
}

export default App
