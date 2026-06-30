import React from 'react';
import { useNavigate } from 'react-router-dom';


const Logout = () => {
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem('token');
        navigate('/login');
    };

    return (
        <div className="p-4 bg-gray-900 h-full text-white">
            <button
                onClick={handleLogout}
                className="flex items-center space-x-2 text-white font-semibold hover:text-red-500 transition"
            >
                <Logout size={20} />
                <span>Logout</span>
            </button>
        </div>
    );
};

export default Logout;
