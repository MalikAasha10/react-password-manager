import React from 'react'
import { useRef, useState, useEffect } from 'react'
import { ToastContainer, toast, Bounce } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const Manager = () => {
  const eyeRef = useRef(null);
  const passRef = useRef(null);
  const [form, setform] = useState({ site: "", username: "", password: "" });
  const [passwordArray, setPasswordArray] = useState([])
  useEffect(() => {
    let password = localStorage.getItem("password");
    if (password) {
      setPasswordArray(JSON.parse(password))
    }
  }, [])

  const showPassword = (params) => {

    passRef.current.type = 'text';
    if (eyeRef.current.src.includes("icons/eyecross.png")) {
      eyeRef.current.src = "icons/eye.png";
      passRef.current.type = 'text';
    }
    else {
      eyeRef.current.src = "icons/eyecross.png";
      passRef.current.type = 'password';
    }
  }
  const savePassword = () => {
    setPasswordArray([...passwordArray, form])
    localStorage.setItem("password", JSON.stringify([...passwordArray, form]))
    console.log(...passwordArray, form);
  }
  const handleChange = (e) => {
    setform({ ...form, [e.target.name]: e.target.value })
  }

  const copyText = (text) => {
    toast('Copied to clipboard', {
  position: "top-right",   
  autoClose: 5000,
  hideProgressBar: false,
  closeOnClick: false,
  pauseOnHover: true,
  draggable: true,
  progress: undefined,
  theme: "light",
  transition: Bounce,      
});
    navigator.clipboard.writeText(text)
  }
  return (


    <>
   <ToastContainer
  position="top-right"     
  autoClose={5000}
  hideProgressBar={false}
  newestOnTop={false}
  closeOnClick={false}
  rtl={false}
  pauseOnFocusLoss
  draggable
  pauseOnHover
  theme="light"
  transition={Bounce}      
/>
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

              <input ref={passRef} value={form.password} onChange={handleChange} className=' bg-white rounded-full border border-green-500 w-full px-4 py-1'
                placeholder='Enter Password' type="password" name="password" id="password" />
              <span className='absolute right-[3px] top-[4px] cursor-pointer' onClick={showPassword}>
                <img ref={eyeRef} className='p-1' width={26} src="icons/eye.png" alt="eye" />
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
        <div className="password">
          <h2 className='py-4 font-bold text-2xl'>Your Password</h2>
          {passwordArray.length === 0 && <div>No Passwords Saved Yet</div>}
          {passwordArray.length != 0 && <table className="table-auto w-full overflow-hidden rounded-md">
            <thead className='bg-green-800 text-white'>
              <tr>
                <th className='py-2'>Site</th>
                <th className='py-2'>Username</th>
                <th className='py-2'>Password</th>
              </tr>
            </thead>
            <tbody className='bg-green-100'>
              {passwordArray.map((item, index) => {
                return <tr key={index}>
                  <td className='py-2 border border-white text-center'>
                    <div className='flex items-center justify-center '>
                      <a href={item.site} target='_blank'>{item.site}</a>
                      <div className='lordiconcopy size-7 cursor-pointer' onClick={() => { copyText(item.site) }}>
                        <lord-icon
                          style={{ "width": "25px", "height": "25px", "paddingTop": "3px", "paddingLeft": "3px" }}
                          src="https://cdn.lordicon.com/iykgtsbt.json"
                          trigger="hover" >
                        </lord-icon>
                      </div>
                    </div>
                  </td>
                  <td className='py-2 border border-white text-center'>
                    <div className='flex items-center justify-center '>
                      <span>{item.username}</span>
                      <div className='lordiconcopy size-7 cursor-pointer' onClick={() => { copyText(item.username) }}>
                        <lord-icon
                          style={{ "width": "25px", "height": "25px", "paddingTop": "3px", "paddingLeft": "3px" }}
                          src="https://cdn.lordicon.com/iykgtsbt.json"
                          trigger="hover" >
                        </lord-icon>
                      </div>
                    </div>
                  </td>
                  <td className='py-2 border border-white text-center'>
                    <div className='flex items-center justify-center '>
                      <span>{item.password}</span>
                      <div className='lordiconcopy size-7 cursor-pointer' onClick={() => { copyText(item.password) }}>
                        <lord-icon
                          style={{ "width": "25px", "height": "25px", "paddingTop": "3px", "paddingLeft": "3px" }}
                          src="https://cdn.lordicon.com/iykgtsbt.json"
                          trigger="hover" >
                        </lord-icon>
                      </div>
                    </div>
                  </td>
                </tr>
              })}

            </tbody>
          </table>
          }

        </div>
      </div>
    </>
  )
}

export default Manager

