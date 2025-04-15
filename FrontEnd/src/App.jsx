import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {

  return (
    <div className="mockup-phone scale-75 flex items-center justify-center h-screen">
      <div className="mockup-camera"></div>
      <div className="mockup-phone-display text-white flex flex-col items-center justify-center">
        <p>It's Glowtime.</p>
        {/* Add more elements here */}
      </div>
    </div>
  )
}

export default App
