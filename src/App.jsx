import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useState } from 'react'
import {Provider} from "react-redux"
import './assets/fonts/font.css'
import './App.css'
import './index.css'

import Home from '../pages/Home'
import Product from "../pages/Product"
import Header from './component/Header'
import Footer from './component/Footer'
import Menu from '../pages/Menu';
import store from "./redux/store"
import { ModalProvider } from "./component/ModalContext";
import Checkout from '../pages/Checkout';
import Form from '../pages/Form';
function App() {
  const [count, setCount] = useState(0)

  return (
    <ModalProvider>
      <Provider store = {store}>
        <div >
          <BrowserRouter>
            <Header /> 
            <main className="pt-24"> 
              <Routes>
                <Route path="/" element={<Home />} />  
                <Route path="/menu" element={<Menu />} />  
                <Route path="/product/:id" element={<Product />} />  
                <Route path='/checkout/step1' element={<Checkout />}/>
                <Route path='/checkout/step2' element={<Form />}/>
              </Routes>
              <Footer /> 
            </main>
          </BrowserRouter>
        </div>
      </Provider>
    </ModalProvider>
  )
}

export default App
