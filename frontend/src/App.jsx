import './App.css'
import Chatbot from "./pages/Chatbot/Chatbot"
import Start from "./pages/Start/Start"
import React, { useState } from 'react'

function App() {

  const [start, setStart] = useState(false)

  return (
    <div>
      {start ? (
        <Chatbot />
      ) : (
        <Start onStart={() => setStart(true)} />
      )}
    </div>
  )
}

export default App
