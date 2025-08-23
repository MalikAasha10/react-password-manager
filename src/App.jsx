import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Navabar from './components/Navabar'
import Manager from './components/Manager'
import Footer from './components/Footer'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
     <Navabar />
     <div className='min-h-[87vh]'>  
      <Manager/>
     </div>
    <Footer /> 
   
    </>
  )
}

export default App
