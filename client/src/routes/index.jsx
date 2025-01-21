import { createBrowserRouter } from 'react-router-dom';
import App from '../App';
import ResetPassword from '../pages/ResetPassword';
import ForgotPassword from '../pages/ForgotPassword';
import LandingPage from '../pages/LandingPage';
import ProfilePage from '../pages/ProfilePage';
import AdminPage from '../pages/AdminPage';
import RegisterCard from '../pages/RegisterCard';
import VerifyOtp from '../pages/VerifyOtp';
import ProtectedRoute from './ProtectedRoute';
import TicketPage from '../pages/TicketPage';
import AdminProfilePage from '../pages/AdminProfilePage';
import ResponseTicket from '../pages/ResponseTicket';

const router = createBrowserRouter([
    {
        path: '/',
        element: <App />,
        children: [
            {
                path: '/',
                element: <LandingPage />
            },
            {
                path: '/reset-password/:resetToken',
                element: <ResetPassword />
            },
            {
                path: '/forgot-password',
                element: <ForgotPassword />
            },
            {
                path: '/profile',
                element: <ProfilePage/>
            },{
                path: '/register',
                element: <RegisterCard/>
            },{
                path: '/verify-otp',
                element: <VerifyOtp/>
            },
            {
                path: '/admin',
                element: (
                    <ProtectedRoute requiredRole="Admin">
                        <AdminPage />
                    </ProtectedRoute>
                ),
                // Add nested child routes for admin
                children: [
                    {
                        path: 'profile', // /admin/createBlog
                        element: (
                            // <ProtectedRoute requiredRole="Admin">
                                <AdminProfilePage/> 
                            // </ProtectedRoute>
                        ),
                    },
                    {
                        path: 'tickets', // /admin/createBlog
                        element: (
                            // <ProtectedRoute requiredRole="Admin">
                                <TicketPage /> 
                            // </ProtectedRoute>
                        ),
                    },
                    {
                        path: 'ticket/:id', // /admin/createBlog
                        element: (
                            // <ProtectedRoute requiredRole="Admin">
                                <ResponseTicket /> 
                            // </ProtectedRoute>
                        ),
                    },
                    // Add more admin-specific routes here
                ],
            },
        ]
    }
])

export default router