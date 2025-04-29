import React, { useState } from 'react';
import { BellIcon, UserIcon } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

interface Notification {
  id: number;
  message: string;
  read: boolean;
}

interface HeaderProps {
  notifications: Notification[];
  setNotifications: React.Dispatch<React.SetStateAction<Notification[]>>;
  setIsAuthenticated: React.Dispatch<React.SetStateAction<boolean>>;
}

const Header: React.FC<HeaderProps> = ({
  notifications,
  setNotifications,
  setIsAuthenticated
}) => {
  const [showNotifications, setShowNotifications] = useState(false);
  const unreadCount = notifications.filter(n => !n.read).length;
  const navigate = useNavigate();

  const markAsRead = (id: number) => {
    setNotifications(prev => prev.map(n => n.id === id ? {
      ...n,
      read: true
    } : n));
  };

  const markAllAsRead = () => {
    setNotifications(prev => prev.map(n => ({
      ...n,
      read: true
    })));
  };

  const handleLogout = async () => {
    try {
      await axios.post('http://localhost:8085/api/auth/logout', {}, { withCredentials: true });
      setIsAuthenticated(false);
      navigate('/login');
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  return (
    <header className="bg-white shadow-sm border-b border-gray-200">
      <div className="px-4 py-3 flex justify-between items-center">
        <div>
          <h2 className="text-xl font-semibold text-gray-800">
            Faculty Dashboard
          </h2>
        </div>
        <div className="flex items-center space-x-4">
          <div className="relative">
            <button 
              className="relative p-2 rounded-full hover:bg-gray-100" 
              onClick={() => setShowNotifications(!showNotifications)}
            >
              <BellIcon size={24} className="text-gray-600" />
              {unreadCount > 0 && (
                <span className="absolute top-0 right-0 inline-block w-5 h-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
                  {unreadCount}
                </span>
              )}
            </button>
            {showNotifications && (
              <div className="absolute right-0 mt-2 w-80 bg-white rounded-md shadow-lg z-10">
                <div className="p-3 border-b border-gray-200 flex justify-between items-center">
                  <h3 className="font-medium">Notifications</h3>
                  {unreadCount > 0 && (
                    <button 
                      className="text-sm text-blue-600 hover:text-blue-800" 
                      onClick={markAllAsRead}
                    >
                      Mark all as read
                    </button>
                  )}
                </div>
                <div className="max-h-80 overflow-y-auto">
                  {notifications.length === 0 ? (
                    <div className="p-4 text-center text-gray-500">
                      No notifications
                    </div>
                  ) : (
                    notifications.map(notification => (
                      <div 
                        key={notification.id} 
                        className={`p-3 border-b border-gray-100 hover:bg-gray-50 cursor-pointer ${notification.read ? 'bg-white' : 'bg-blue-50'}`}
                        onClick={() => markAsRead(notification.id)}
                      >
                        <p className="text-sm">{notification.message}</p>
                      </div>
                    ))
                  )}
                </div>
              </div>
            )}
          </div>
          <div className="flex items-center">
            <div className="h-8 w-8 rounded-full bg-blue-600 flex items-center justify-center text-white">
              <UserIcon size={18} />
            </div>
            <span className="ml-2 font-medium text-gray-700">{localStorage.getItem('username') || 'Guest'}</span>
          </div>
          <button 
            onClick={handleLogout}
            className="ml-4 text-red-600 hover:text-red-800 text-sm font-medium"
          >
            Logout
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;