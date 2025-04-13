import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './assets/fonts/font.css'
import './App.css'
import Home from '../pages/Home'
import Product from "../pages/Product"

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <div>
        {/* <Home /> */}
        <Product/>
      </div>
    </>
  )
}

export default App
