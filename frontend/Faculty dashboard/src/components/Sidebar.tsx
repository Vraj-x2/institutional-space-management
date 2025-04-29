import React from 'react';
import { useLocation, Link } from 'react-router-dom';
import {
  CalendarIcon,
  ClockIcon,
  MessageCircleIcon,
  UsersIcon,
  PackageIcon,
  MessageSquareIcon,
  HomeIcon,
  UserIcon,
  DoorOpenIcon,
  EditIcon,
  HammerIcon,
} from 'lucide-react';

const Sidebar: React.FC = () => {
  const location = useLocation();
  const activeTab = location.pathname.split('/')[1]; // Get first part of the URL

  const menuItems = [
    {
      id: 'dashboard',
      name: 'Dashboard',
      icon: <HomeIcon size={20} />, 
      path: '/',
    },
    {
      id: 'booking',
      name: 'Booking System',
      icon: <CalendarIcon size={20} />, 
      path: '/booking',
    },
    {
      id: 'post-room',
      name: 'Post Room',
      icon: <DoorOpenIcon size={20} />, 
      path: '/post-room',
    },
    {
      id: 'new-room-request',
      name: 'Room Request',
      icon: <PackageIcon size={20} />, 
      path: '/new-room-request',
    },
    {
      id: 'my-booked-rooms',
      name: 'My Booked Rooms',
      icon: <CalendarIcon size={20} />, 
      path: '/my-booked-rooms',
    },
    {
      id: 'edit-dashboard',
      name: 'Edit Dashboard',
      icon: <EditIcon size={20} />, 
      path: '/edit-dashboard',
    },
    {
      id: 'schedule',
      name: 'Schedule Viewer (Coming Soon)',
      icon: <HammerIcon size={20} className="text-red-500" />, 
      path: '/schedule',
      isUnderDevelopment: true,
    },
    {
      id: 'chat',
      name: 'Chat & Requests (Coming Soon)',
      icon: <HammerIcon size={20} className="text-red-500" />, 
      path: '/chat',
      isUnderDevelopment: true,
    },
    {
      id: 'crowd',
      name: 'Crowd Data (Coming Soon)',
      icon: <HammerIcon size={20} className="text-red-500" />, 
      path: '/crowd',
      isUnderDevelopment: true,
    },
    {
      id: 'resources',
      name: 'Resource Management (Coming Soon)',
      icon: <HammerIcon size={20} className="text-red-500" />, 
      path: '/resources',
      isUnderDevelopment: true,
    },
    {
      id: 'feedback',
      name: 'Feedback (Coming Soon)',
      icon: <HammerIcon size={20} className="text-red-500" />, 
      path: '/feedback',
      isUnderDevelopment: true,
    },
    {
      id: 'profile',
      name: 'Faculty Profile (Coming Soon)',
      icon: <HammerIcon size={20} className="text-red-500" />, 
      path: '/profile',
      isUnderDevelopment: true,
    },
    
  ];

  return (
    <aside className="bg-blue-800 text-white w-64 flex-shrink-0 hidden md:block">
      <div className="p-4">
        <h1 className="text-2xl font-bold">Faculty Portal</h1>
      </div>
      <nav className="mt-8">
        <ul>
          {menuItems.map(item => (
            <li key={item.id} className="mb-2">
              <Link
                to={item.path}
                className={`flex items-center w-full px-4 py-3 text-left transition-colors 
                  ${item.isUnderDevelopment ? 'text-red-500 cursor-not-allowed' : 'hover:bg-blue-700'}
                  ${activeTab === item.id ? 'bg-blue-700' : ''}`}
              >
                <span className="mr-3">{item.icon}</span>
                {item.name}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  );
};

export default Sidebar;
