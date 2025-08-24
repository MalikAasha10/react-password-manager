import React from 'react'

const Navabar = () => {
  return (

    <nav className='bg-slate-800 text-white '>
      <div className="mycontainer flex justify-between items-center px-27  py-5 h-14">
        <div className="logo font-bold text-white text-2xl">
          <span className='text-green-500'> &lt;</span>

          <span>Pass</span><span className='text-green-500'>OP/&gt;</span>


        </div>
        {/* <ul>
          <li className='flex gap-4'>
            <a className='hover:font-bold' href="/">Home</a>
            <a className='hover:font-bold' href="#">About</a>
            <a className='hover:font-bold' href="#">Contact</a>
          </li>
        </ul> */}
        <button className='bg-green-500  rounded-full text-white my-5 flex justify-between items-center ring-white ring-2  '>
          <img className='invert p-1 w-10  '
            src="/icons/github.svg" alt="github log0" />
            <span className='font-bold px-2'>Github</span>
        
        </button>
      </div>
    </nav>


  )
}

export default Navabar
