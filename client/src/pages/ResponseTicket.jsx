
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import Loading from '../components/Loading';
import toast from 'react-hot-toast';

const formatDate = (dateString) => {
    const date = new Date(dateString);
  
    const optionsDate = { day: '2-digit', month: '2-digit', year: 'numeric' };
    const optionsTime = { hour: '2-digit', minute: '2-digit' };
  
    const formattedDate = date.toLocaleDateString('en-GB', optionsDate); // 'dd/mm/yyyy'
    const formattedTime = date.toLocaleTimeString('en-GB', optionsTime); // 'hh:mm'
  
    return `${formattedDate} ${formattedTime}`;
};
const calculateDaysSince = (createdAt) => {
    const createdDate = new Date(createdAt);
    const today = new Date();

    // Calculate the difference in milliseconds
    const differenceInTime = today - createdDate;

    // Convert milliseconds to days
    const differenceInDays = Math.floor(differenceInTime / (1000 * 3600 * 24));

    return differenceInDays;
};


const ResponseTicket = () => {
    const token=localStorage.getItem('token')
    const navigate = useNavigate();
    const { id: ticketId } = useParams();
    const [loading, setLoading] = useState(false)
    const [data, setData] = useState({
        message:"",
        _id:ticketId
    });
    const handleOnChange = (e) => {
    const { name, value } = e.target;
    setData((prev) => ({
        ...prev,
        [name]: value
    }));
    };
    const [ticket, setTicket] = useState([]);
    const fetchTicket = async () => {
        const URL = `${process.env.REACT_APP_BACKEND_URL}/admin/getTicket/${ticketId}`;
        try {
          setLoading(true)
        const response = await axios.get(URL, { headers: { 'authorization': `Bearer ${token}` } },{
          withCredentials: true
      })
        setTicket(response.data.data.rows[0]);
        setLoading(false)
        console.log("Tickets fetched successfully>>>>", response.data.data.rows[0]);
        } catch (error) {
        console.error("Error fetching Tickets:", error);
        }
    };

    useEffect(() => {
        fetchTicket();
      }, []);

      const handleSubmit = async (e) => {
        e.preventDefault();
        e.stopPropagation();
     
        const URL = `${process.env.REACT_APP_BACKEND_URL}/admin/updateTicket/${ticketId}`;
        try {
          console.log(data);
          const response = await axios.post(URL, {
            message: data.message
          }, { headers: { 'authorization': `Bearer ${token}` } }, {
            withCredentials: true
          });
    
          if (response.data.status === "success") {
            toast.success("response sent");
            setData({
              _id:"",
              message:""
            });
            navigate('/admin/tickets')
            
          } else {
            toast.error("Login failed. Please check your credentials.");
          }
        } catch (error) {
          toast.error("Please check your email and password");
          console.log(">>", error);
        }
      };

return (
    <div className='flex justify-center items-center'>
        <div>
        <h2 className="text-3xl font-bold text-center my-8">Response this Ticket</h2>
        {
          loading && (
            <Loading/>
          )
        }
        <div >
            <div
              className="flex flex-col  rounded-lg shadow-lg overflow-hidden"
              key={ticket.id}
            >
            <div className="p-4 flex flex-col justify-between h-full  border-black border-2 border-b-0 bg-red-400">
              <h4 className="text-lg font-semibold mb-2 hover:text-blue-600 cursor-pointer"  key={ticket.id} >{ticket.Question}</h4>
              <p className="text-black-500 text-sm">Due from {calculateDaysSince(ticket.createdAt)} days &bull;{ticket.EmailID}</p>
              <p className="text-black-500 text-sm">{formatDate(ticket.createdAt)}</p>
            </div>
            <form onSubmit={handleSubmit} className='flex flex-col justify-center'>
            <div>
                <textarea
                id="message"
                name="message"
                rows="6"
                onChange={handleOnChange}
                className="p-4 w-full text-sm bg-slate-200 dark:bg-slate-600 rounded-b-lg  focus:ring-blue-500 focus:border-blue-500 dark:text-white dark:placeholder:text-slate-50 border-black border-2 text-black placeholder:text-slate-500 placeholder:font-semibold resize-none"
                placeholder="Your Message"
                value={data.message}
                required
                ></textarea>
            </div>
            <button type='submit' className="text-white bg-slate-500 p-3 px-6 hover:bg-slate-600 rounded-3xl transition-all duration-300">
              Send Response
            </button>
            </form>
          </div>
      </div>
    </div>
    </div>
  )
}

export default ResponseTicket