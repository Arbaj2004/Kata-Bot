import React, { useState, useRef, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaMoon, FaSun } from "react-icons/fa";
import { useDispatch, useSelector } from 'react-redux';
import { toggleDarkMode } from '../redux/darkModeSlice';
import { logout } from '../redux/userSlice'; // Action to logout the user from Redux
import LoginCard from './LoginCard';
import Avatar from './Avatar';
import axios from 'axios';
import toast from 'react-hot-toast';

const Navbar = () => {
  const navigate = useNavigate();
  const [options, setOptions] = useState(false);
  const dispatch = useDispatch();
  const darkMode = useSelector((state) => state.darkMode.darkMode);
  const user = useSelector((state) => state.user.user); // Get the user from Redux state
  const [login, setLogin] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false); 
  const menuRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
  }, [menuOpen]);

  const handleLogout = async () => {
    const URL = `${process.env.REACT_APP_BACKEND_URL}/users/logout`;
    try {
      const response = await axios.get(URL, {
        withCredentials: true,
      });
      if (response.data.status === "success") {
        toast.success("Successfully logged out");

        // Clear Redux and local storage
        dispatch(logout()); // Dispatch an action to clear Redux user state
        localStorage.removeItem('user'); // Remove user from local storage
        navigate('/'); // Redirect after logout

      } else {
        toast.error("Internal Error");
      }
    } catch (error) {
      toast.error("Internal Error");
      console.log(">>", error);
    }
    setOptions(false);
  };

  return (
    <>
      {login && (
        <div className='bg-transparent fixed inset-0 flex justify-center items-center'>
          <div className='bg-black bg-opacity-80 absolute inset-0' onClick={() => setLogin(false)} />
          <LoginCard onClose={() => setLogin(false)} />
        </div>
      )}

      <div className='sticky top-0 dark:bg-black bg-slate-100 flex justify-between items-center px-5 md:px-20 p-5 shadow-lg font-poppins tracking-wide text-lg z-20'>
        <Link to={"/"} className='text-xl shadow-2xl'>KataBot</Link>

        <div className="md:hidden flex items-center gap-8">
          <p onClick={() => dispatch(toggleDarkMode())} className='lg:hidden hover:text-blue-500'>
            {darkMode ? <FaSun /> : <FaMoon />}
          </p>
          <button onClick={() => setMenuOpen(!menuOpen)} className='text-2xl'>
            {menuOpen ? '✖️' : '☰'}
          </button>
        </div>
        <div ref={menuRef} className={`flex flex-col md:flex-row md:gap-20 gap-5 items-center transition-transform duration-300 ${menuOpen ? 'absolute left-0 top-16 w-full bg-slate-100 dark:bg-black' : 'hidden md:flex'}`}>
          <p onClick={() => dispatch(toggleDarkMode())} className='hover:text-blue-500 hidden md:block'>
            {darkMode ? <FaSun /> : <FaMoon />}
          </p>
          <Link to={"/"} className='hover:text-blue-500'>Our Team</Link>
          <Link to={"/"} className='hover:text-blue-500'>Learn</Link>
          <Link to={"/"} className='hover:text-blue-500'>Blog</Link>

          {/* Display user or Login button */}
          {user ? (
            <div className='flex items-center gap-3 cursor-pointer' onClick={() => { setOptions(!options); }}>
              <p className='hover:text-blue-500'>Hello, {user.name.split(' ')[0]}</p>
              <Avatar width={50} height={50} name={user?.name} />
            </div>
          ) : (
            <p className='bg-blue-500 cursor-pointer py-1 px-5 rounded-lg text-white mb-4' onClick={() => { setLogin(true); setMenuOpen(false); }}>
              Login
            </p>
          )}
        </div>
      </div>

      {menuOpen && (
        <div className='absolute inset-0 z-10' onClick={() => setMenuOpen(false)} />
      )}

      {options && (
        <div className='absolute right-5 top-20 bg-white dark:bg-blue-800 shadow-md rounded-lg py-2'>
          <div className='px-5 py-2 text-md flex flex-col items-center gap-3 ' >
            {
              user && (
                <>

                {
                  user?.role==="User" && (
                    <p className=' hover:text-blue-600 dark:hover:text-black cursor-pointer' onClick={()=>{navigate('/profile');}}>Profile</p>
                  )
                }{
                  user.role==='Admin' && (
                    <p className=' hover:text-blue-600 dark:hover:text-black cursor-pointer' onClick={()=>{navigate('/admin/profile');setOptions(false)}}>Admin Page</p>
                  )
                }
                </>
              )
            }
            <p className=' hover:text-blue-600 dark:hover:text-black cursor-pointer' onClick={handleLogout}>LogOut</p>
          </div>
        </div>
      )}
    </>
  );
};

export default Navbar;
