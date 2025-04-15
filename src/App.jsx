import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './assets/fonts/font.css'
import './App.css'
import Home from '../pages/Home'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './index.css'
import Product from "../pages/Product"

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <div>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Product />} />  {/* 根路由直接顯示 Product 頁面 */}
            <Route path="/product/:id" element={<Product />} />  {/* 這條路由也可以用來顯示 Product 頁面，並且會帶有 id 參數 */}
          </Routes>
        </BrowserRouter>

      </div>
    </>
  )
}

export default App
