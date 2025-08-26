import React, { useRef, useState, useEffect } from 'react'
import { ToastContainer, toast, Bounce } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { v4 as uuidv4 } from 'uuid';

const Manager = () => {
  const eyeRef = useRef(null);
  const passRef = useRef(null);
  const [form, setform] = useState({ site: "", username: "", password: "" });
  const [passwordArray, setPasswordArray] = useState([]);

  useEffect(() => {
    let password = localStorage.getItem("password");
    if (password) {
      setPasswordArray(JSON.parse(password))
    }
  }, []);

  const showPassword = () => {
    passRef.current.type = 'text';
    if (eyeRef.current.src.includes("icons/eyecross.png")) {
      eyeRef.current.src = "icons/eye.png";
      passRef.current.type = 'text';
    } else {
      eyeRef.current.src = "icons/eyecross.png";
      passRef.current.type = 'password';
    }
  };

  const savePassword = () => {
  if (!form.site || !form.username || !form.password) {
    toast.error("⚠️ Please fill all fields before saving!", { 
      position: "top-right", 
      autoClose: 5000, 
      theme: "dark", 
      transition: Bounce 
    });
    return;
  }

  if (form.site.length <= 3 || form.username.length <= 3 || form.password.length <= 3) {
    toast.error("⚠️ Each field must be at least 4 characters long!", { 
      position: "top-right", 
      autoClose: 5000, 
      theme: "dark", 
      transition: Bounce 
    });
    return;
  }

  const newPassword = { ...form, id: uuidv4() };
  setPasswordArray([...passwordArray, newPassword]);
  localStorage.setItem("password", JSON.stringify([...passwordArray, newPassword]));

  toast.success("✅ Password saved successfully!", { 
    position: "top-right", 
    autoClose: 5000, 
    theme: "dark", 
    transition: Bounce 
  });

  setform({ site: "", username: "", password: "" });
};

 
  const deletePassword = (id) => {
    let c = confirm("Are you sure you want to delete this password?");
    if (c) {
      toast("Password deleted successfully", { position: "top-right", autoClose: 5000, theme: "dark", transition: Bounce });
      setPasswordArray(passwordArray.filter(item => item.id !== id));
      localStorage.setItem("password", JSON.stringify(passwordArray.filter(item => item.id !== id)));
    }
  };

  const editPassword = (id) => {
    setform(passwordArray.filter(item => item.id === id)[0]);
    setPasswordArray(passwordArray.filter(item => item.id !== id));
  };

  const handleChange = (e) => {
    setform({ ...form, [e.target.name]: e.target.value });
  };

  const copyText = (text) => {
    toast("Copied to clipboard", { position: "top-right", autoClose: 5000, theme: "dark", transition: Bounce });
    navigator.clipboard.writeText(text);
  };

  return (
    <>
      <ToastContainer position="top-right" autoClose={5000} theme="light" transition={Bounce} />

      <div className="absolute inset-0 -z-10 h-full w-full bg-green-50 
        bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),
        linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] 
        bg-[size:14px_24px]">
        <div className="absolute left-0 right-0 top-0 -z-10 m-auto 
          h-[310px] w-[310px] rounded-full bg-green-400 opacity-20 blur-[100px]">
        </div>
      </div>

      <div className="p-3 min-h-[88.2vh] flex flex-col items-center justify-center">

        {/* Title */}
        <h1 className="text-4xl font-bold text-center">
          <span className="text-green-500">&lt;</span>
          <span>Pass</span><span className="text-green-500">OP/&gt;</span>
        </h1>
        <p className="text-green-900 text-lg text-center mb-6">
          Your own Password Manager
        </p>

        {/* Form Section */}
        <div className="flex flex-col gap-4 items-center w-full max-w-3xl">
          <input
            value={form.site}
            onChange={handleChange}
            placeholder="Enter Website URL"
            className="rounded-full border border-green-500 w-full p-2"
            type="text" name="site" id="site"
          />

          <div className="flex flex-col md:flex-row w-full gap-4">
            <input
              value={form.username}
              onChange={handleChange}
              placeholder="Enter Username"
              className="rounded-full border border-green-500 w-full p-2"
              type="text" name="username" id="username"
            />
            <div className="relative w-full">
              <input
                ref={passRef}
                value={form.password}
                onChange={handleChange}
                placeholder="Enter Password"
                className="rounded-full border border-green-500 w-full p-2"
                type="password" name="password" id="password"
              />
              <span className="absolute right-2 top-2 cursor-pointer" onClick={showPassword}>
                <img ref={eyeRef} className="p-1" width={26} src="icons/eye.png" alt="eye" />
              </span>
            </div>
          </div>

          <button
            className="flex justify-center items-center gap-2
            hover:bg-green-300 rounded-full font-bold text-lg 
            bg-green-400 px-8 py-2 border border-green-900"
            onClick={savePassword}
          >
            <lord-icon src="https://cdn.lordicon.com/jgnvfzqg.json" trigger="hover"></lord-icon>
            Save
          </button>
        </div>

        {/* Table Section */}
       <div className="password w-full max-w-4xl mt-10">
  <h2 className="py-4 font-bold text-2xl text-center">Your Password</h2>
  {passwordArray.length === 0 && (
    <div className="text-center">No Passwords Saved Yet</div>
  )}
  {passwordArray.length !== 0 && (
    <div className="mb-10">
      <table className="w-full border-collapse rounded-md overflow-hidden text-center">
        <thead className="bg-green-800 text-white text-sm sm:text-base">
          <tr>
            <th className="py-2 px-2 sm:px-4 w-[30%]">Site</th>
            <th className="py-2 px-2 sm:px-4 w-[25%]">Username</th>
            <th className="py-2 px-2 sm:px-4 w-[25%]">Password</th>
            <th className="py-2 px-2 sm:px-4 w-[20%]">Actions</th>
          </tr>
        </thead>
        <tbody className="bg-green-100 text-sm sm:text-base">
          {passwordArray.map((item, index) => (
            <tr key={index} className="border-b border-white">
              {/* Site */}
              <td className="py-2 px-2 sm:px-4 truncate max-w-[120px] sm:max-w-[200px]">
                <div className="flex items-center justify-center gap-1 sm:gap-2">
                  <a href={item.site} target="_blank" rel="noopener noreferrer" className="truncate">
                    {item.site}
                  </a>
                  <div
                    className="cursor-pointer shrink-0"
                    onClick={() => copyText(item.site)}
                  >
                    <lord-icon
                      style={{ width: "22px", height: "22px" }}
                      src="https://cdn.lordicon.com/iykgtsbt.json"
                      trigger="hover"
                    ></lord-icon>
                  </div>
                </div>
              </td>

              {/* Username */}
              <td className="py-2 px-2 sm:px-4 truncate max-w-[100px] sm:max-w-[150px]">
                <div className="flex items-center justify-center gap-1 sm:gap-2">
                  <span className="truncate">{item.username}</span>
                  <div
                    className="cursor-pointer shrink-0"
                    onClick={() => copyText(item.username)}
                  >
                    <lord-icon
                      style={{ width: "22px", height: "22px" }}
                      src="https://cdn.lordicon.com/iykgtsbt.json"
                      trigger="hover"
                    ></lord-icon>
                  </div>
                </div>
              </td>

              {/* Password */}
              <td className="py-2 px-2 sm:px-4 truncate max-w-[100px] sm:max-w-[150px]">
                <div className="flex items-center justify-center gap-1 sm:gap-2">
                  <span className="truncate">{item.password}</span>
                  <div
                    className="cursor-pointer shrink-0"
                    onClick={() => copyText(item.password)}
                  >
                    <lord-icon
                      style={{ width: "22px", height: "22px" }}
                      src="https://cdn.lordicon.com/iykgtsbt.json"
                      trigger="hover"
                    ></lord-icon>
                  </div>
                </div>
              </td>

              {/* Actions */}
              <td className="py-2 px-2 sm:px-4 flex items-center justify-center gap-2">
                <span
                  className="cursor-pointer"
                  onClick={() => editPassword(item.id)}
                >
                  <lord-icon
                    src="https://cdn.lordicon.com/gwlusjdu.json"
                    trigger="hover"
                    style={{ width: "22px", height: "22px" }}
                  ></lord-icon>
                </span>
                <span
                  className="cursor-pointer"
                  onClick={() => deletePassword(item.id)}
                >
                  <lord-icon
                    src="https://cdn.lordicon.com/skkahier.json"
                    trigger="hover"
                    style={{ width: "22px", height: "22px" }}
                  ></lord-icon>
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )}
</div>

      </div>
    </>
  );
};

export default Manager;
