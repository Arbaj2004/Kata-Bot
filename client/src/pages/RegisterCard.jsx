import React, { useState } from 'react';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import toast, { Toaster } from 'react-hot-toast';

const RegisterCard = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [data, setData] = useState({
    email: "",
    name: "",
    password: "",
    passwordConfirm: "",
    address: ""
  });

  const navigate = useNavigate();

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setData((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    e.stopPropagation();

    const URL = `${process.env.REACT_APP_BACKEND_URL}/users/register`;
    try {
      const response = await axios.post(URL, {
        email: data.email,
        name: data.name,
        password: data.password,
        passwordConfirm: data.passwordConfirm,
        address: data.address
      },{
        withCredentials: true
      });
      
      if (response.data.status === "success") {
        toast.success("Registration successful");
        localStorage.setItem('token',response.data.token)

        setTimeout(() => {
          setData({
            email: "",
            password: "",
            passwordConfirm: "",
            address: "",
            name: "",
          });
          navigate('/verify-otp'); // Redirect to the login page
        }, 1000);
      } else {
        toast.error("Registration failed. Please try again.");
      }
    } catch (error) {
      toast.error("An error occurred during registration.");
      console.log(">>", error);
    }
  };

  return (
    <>
      <div className='flex justify-center items-center h-screen w-screen bg-black'>
        <form onSubmit={handleSubmit} className='relative w-1/4 max-w-md dark:text-white dark:bg-blue-950 h-auto rounded-2xl bg-slate-200 bg-opacity-90 flex flex-col p-6 shadow-lg'>
          <h1 className='font-sans text-2xl font-bold mb-6 text-center'>Register</h1>
          <label className="text-xs text-slate-500 dark:text-white" htmlFor="name">Name</label>
          <input
            type="text"
            id="name"
            name="name"
            className=" bg-slate-200 mt-1 rounded p-2 w-full text-sm text-black"
            required
            value={data.name}
            onChange={handleOnChange}
          />

          <label className="text-xs text-slate-500 dark:text-white" htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            className=" bg-slate-200 mt-1 rounded p-2 w-full text-sm text-black"
            required
            value={data.email}
            onChange={handleOnChange}
          />
          
          <label className="text-xs text-slate-500 dark:text-white mt-3" htmlFor="address">Address</label>
          <input
            type="text"
            id="address"
            name="address"
            className=" bg-slate-200 mt-1 rounded p-2 w-full text-sm text-black"
            required
            value={data.address}
            onChange={handleOnChange}
          />
          <div className='flex justify-between items-center'>
          <label className="text-xs text-slate-500 dark:text-white mt-3" htmlFor="password">Password</label>
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="text-xs text-slate-500 dark:text-white flex items-center"
            title={showPassword ? 'Hide password' : 'Show password'}
            >
            {showPassword ? <FaEye size={20} /> : <FaEyeSlash size={20} />}
            <p className='ml-1'> {showPassword ? 'Hide' : 'Show'}</p>
          </button>
          </div>
          <input
            type={showPassword ? 'text' : 'password'}
            id="password"
            name="password"
            className=" bg-slate-200 rounded text-black p-2 mb-2 text-sm placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 w-full"
            required
            value={data.password}
            onChange={handleOnChange}
            />
          <div className='flex justify-between'>
          <label className="text-xs text-slate-500 dark:text-white mt-3" htmlFor="passwordConfirm">Confirm Password</label>
          <button
            type="button"
            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
            className="text-xs text-slate-500 dark:text-white flex items-center"
            title={showConfirmPassword ? 'Hide password' : 'Show password'}
            >
            {showConfirmPassword ? <FaEye size={20} /> : <FaEyeSlash size={20} />}
            <p className='ml-1'> {showConfirmPassword ? 'Hide' : 'Show'}</p>
          </button>
            </div>
          <input
            type={showConfirmPassword ? 'text' : 'password'}
            id="passwordConfirm"
            name="passwordConfirm"
            className=" bg-slate-200 rounded text-black p-2 mb-2 text-sm placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 w-full"
            required
            value={data.passwordConfirm}
            onChange={handleOnChange}
          />

          <button type="submit"
            className="bg-slate-500 mt-3 rounded-3xl p-2 text-white font-semibold hover:bg-slate-800"
          >
            Register
          </button>
          <div className='flex justify-end gap-2'>
            <p className='text-xs hover:text-slate-900 text-slate-600 dark:text-white '>
              Already have an account?
            </p>
            <div onClick={()=>{navigate('/')}} className='text-xs cursor-pointer hover:text-slate-900 text-blue-700 dark:text-white font-semibold underline'>
              Sign In
            </div>
          </div>
        </form>
      </div>
    </>
  );
};

export default RegisterCard;
