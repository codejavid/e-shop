import React from 'react'
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import Home from './components/Home';
import { Routes,Route } from "react-router-dom";


const App = () => {
  return (
    <div className='app-layout'>
      <Header/>
       
       <main className='container'>
        <Routes>
          <Route path='/' element={<Home/>}/>
        </Routes>
       </main>
      <Footer/>
    </div>
  )
}

export default App