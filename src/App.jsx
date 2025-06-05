import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useEffect, useState } from 'react'
import { Provider, useSelector } from "react-redux"
import './assets/fonts/font.css'
import './App.css'
import './index.css'

import Home from '../pages/Home'
import Product from "../pages/Product"
import Header from './component/Header'
import Footer from './component/Footer'
import Menu from '../pages/Menu';
import { store, persistor } from "./redux/store"
import { ModalProvider } from "./component/ModalContext";
import Checkout from '../pages/Checkout';
import Form from '../pages/Form';
import { feedCustomize } from './api/FireStore';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import Login from '../pages/Login';
import Register from '../pages/Register';
import Profile from '../pages/Profile';
import { PersistGate } from 'redux-persist/integration/react';

const queryClient = new QueryClient();
//feedCustomize();

import Success from '../pages/Success'
import { selectLightMode } from './redux/colorSlice';
import { FAQ } from '../pages/FAQ';
import { Comment } from '../pages/Comment';
import { About } from '../pages/About';
function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ModalProvider>
        <Provider store={store}>
          <PersistGate loading={null} persistor={persistor}>
            <ThemedApp />
            <div >
              <BrowserRouter>
                <Header />
                <main className="pt-24">
                  <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/menu" element={<Menu />} />
                    <Route path="/product/:id" element={<Product />} />
                    <Route path='/checkout/step1' element={<Checkout />} />
                    <Route path='/checkout/step2' element={<Form />} />
                    <Route path='/checkout/step3' element={<Success />} />
                    <Route path='auth'>
                      <Route path='login' element={<Login />} />
                      <Route path='register' element={<Register />} />
                      <Route path='profile' element={<Profile />} />
                    </Route>
                    <Route path='/FAQ' element={<FAQ />} />
                    <Route path='/comment' element={<Comment />} />
                    <Route path='/About' element={<About />} />
                  </Routes>
                  <Footer />
                </main>
              </BrowserRouter>
            </div>
          </PersistGate>
        </Provider>
      </ModalProvider>
    </QueryClientProvider>
  )
}

function ThemedApp() {
  const lightMode = useSelector(selectLightMode);

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', lightMode ? 'light' : 'dark');
  }, [lightMode]);
}
export default App
