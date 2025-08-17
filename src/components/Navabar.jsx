import React from 'react'

const Navabar = () => {
  return (
    <div>
        <nav className='flex justify-between items-center bg-purple-200 px-4 h-14'>
            <div className='logo font-bold'>PassOp</div>
            <ul>
                <li className='flex gap-4'>
                    <a className='hover:font-bold' href="/">Home</a>
                    <a className='hover:font-bold' href="#">About</a>
                    <a className='hover:font-bold'  href="#">Contact</a>
                </li>
            </ul>
        </nav>
      
    </div>
  )
}

export default Navabar
