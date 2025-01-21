// VisitorCount.jsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';

const VisitorCount = () => {    
const [count,setCount]=useState(0);
useEffect(() => {
    const fetchVisitorCount = async () => {
        try {
            const URL = `${process.env.REACT_APP_BACKEND_URL}/users/getvisitorCnt`;
            const response = await axios.get(URL, {
                withCredentials: true
            });
            console.log(response);
            localStorage.setItem('visitor', '0'); // You might want to change this logic based on your requirements
            setCount(response.data.data.count); // Ensure you access the correct path
        } catch (error) {
            console.error("Error fetching visitor count:", error);
            setCount('NA');
        }
    }
    fetchVisitorCount();
}, []);
    

  return (
    <div className="text-center mt-10">
      <h1 className="text-3xl font-bold">Visitors: {count}</h1>
    </div>
  );
};

export default VisitorCount;
