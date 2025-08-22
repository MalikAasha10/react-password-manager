import React from 'react'
import { useRef,useState,useEffect } from 'react'
const Manager = () => {
  const eyeRef = useRef(null);
  const [form, setform] = useState({ site: "", username: "", password: "" });
  const [passwordArray, setPasswordArray] = useState([])
  useEffect(() => {
    let password= localStorage.getItem("password");
    if(password){
      setPasswordArray(JSON.parse(password))
    }
  }, [])
  
const showPassword = (params) => {
  
      alert("Show Password Clicked")
      if (eyeRef.current.src.includes("icons/eyecross.png")) {
        eyeRef.current.src = "icons/eye.png";
      }
      else{
        eyeRef.current.src = "icons/eyecross.png";
      }
    }
const savePassword=()=>{
  setPasswordArray([...passwordArray,form])
  localStorage.setItem("password",JSON.stringify([...passwordArray,form]))
console.log(...passwordArray,form);
} 
  const handleChange = (e) => {
    setform({...form, [e.target.name]: e.target.value})
  }
  return (
    
    
    <>
      <div className="absolute inset-0 -z-10 h-full w-full
       bg-green-50 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),
       linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px]">
        <div className="absolute left-0 right-0 top-0 -z-10 m-auto h-[310px] w-[310px] rounded-full
         bg-green-400 opacity-20 blur-[100px]">
        </div></div>
      <div className=" mycontainer">

        <h1 className='text-4xl text font-bold text-center'>
          <span className='text-green-500'> &lt;</span>

          <span>Pass</span><span className='text-green-500'>OP/&gt;</span>

        </h1>
        <p className='text-green-700 text-lg text-center'>Your Own Password Manager</p>
        <div className='text-black flex flex-col p-4 gap-8 items-center'>
          <input value={form.site} onChange={handleChange} className=' bg-white rounded-full border border-green-500 w-full px-4 py-1 gap-8 justify-between ' 
          type="text" placeholder='Enter Website URL' name="site" id="site" />
          <div className="flex w-full gap-8 justify-between  ">
            <input value={form.username} onChange={handleChange} className=' bg-white rounded-full border border-green-500 w-full px-4 py-1'
            
            placeholder='Enter Username' type="text" name="username" id="username" />
             <div className="relative">

            <input value={form.password}   onChange={handleChange} className=' bg-white rounded-full border border-green-500 w-full px-4 py-1' 
            placeholder='Enter Password' type="text" name="password" id="password" />
            <span  className='absolute right-[3px] top-[4px] cursor-pointer' onClick={showPassword}>
               <img ref={eyeRef} className='p-1' width={26} src="icons/eye.png" alt="eye"  />
            </span>
           
             </div>


          </div>

          <button className='  flex justify-center item center 
          hover:bg-green-300 rounded-full font-bold text-lg bg-green-400 px-8 py-2 w-fit gap-2
          border border-green-900 ' onClick={savePassword}>
            <lord-icon
              src="https://cdn.lordicon.com/vjgknpfx.json"
              trigger="hover"
            ></lord-icon>Add Password</button>

        </div>

      </div>
    </>
  )
}

export default Manager

