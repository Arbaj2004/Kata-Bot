import React from 'react'
import TicketStat from '../components/TicketStat'
import VisitorCount from '../components/VisitorCount'
import { Link } from 'react-router-dom'

const AdminProfilePage = () => {
  return (
    <div>
        <div className='flex justify-between'>
          <div className='flex' >
            <TicketStat/>
          </div>
        </div>
        <VisitorCount/>
        <div className="text-center mt-10">
            <Link to={'/admin/tickets'} className="text-3xl font-bold">View Tickets</Link>
        </div>
    </div>
  )
}

export default AdminProfilePage