import { useState } from 'react'
import './assets/fonts/font.css'
import './App.css'
import Home from '../pages/Home'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './index.css'
import Product from "../pages/Product"



import Header from './component/Header'
import Footer from './component/Footer'
import Menu from '../pages/Menu';

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <div data-theme="light">
        <BrowserRouter>
          <Header /> 
          <main className="pt-24"> 
            <Routes>
              <Route path="/" element={<Home />} />  
              <Route path="/menu" element={<Menu />} />  
              <Route path="/product/:id" element={<Product />} />  
            </Routes>
            <Footer /> 
          </main>
        </BrowserRouter>
      </div>
    </>
  )
}

export default App
