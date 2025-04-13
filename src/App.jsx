import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './assets/fonts/font.css'
import './App.css'
import Home from '../pages/Home'
import { BrowserRouter } from 'react-router'
import './index.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <div>
        <BrowserRouter>
          <Home />
        </BrowserRouter>

      </div>
    </>
  )
}

export default App
