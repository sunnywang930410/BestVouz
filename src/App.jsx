import { useState } from 'react'
import './assets/fonts/font.css'
import './App.css'
import Home from '../pages/Home'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './index.css'
import Product from "../pages/Product"
import Productlist from './component/Productlist'

import product from "../src/json/customize.json";
import Header from './component/Header'
import Footer from './component/Footer'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <div data-theme="light">
        <BrowserRouter>
          <Header />  {/* 導航欄 */}
          <main className="pt-24"> {/* 讓Header跟Footer可以正常顯示在所有頁面頂部 */}
            <Routes>
              <Route path="/" element={<Home />} />  {/* 根路由直接顯示 Home 頁面 */}
              <Route path="/menu" element={<Productlist product={product} />} />  {/* 這條路由可以用來顯示 Menu 頁面 */}
              {/* <Route path="/" element={<Product />} />  根路由直接顯示 Product 頁面 */}
              <Route path="/product/:id" element={<Product />} />  {/* 這條路由也可以用來顯示 Product 頁面，並且會帶有 id 參數 */}
            </Routes>
            <Footer />  {/* 頁尾 */}
          </main>
        </BrowserRouter>

      </div>
    </>
  )
}

export default App
