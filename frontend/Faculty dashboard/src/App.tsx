// src/App.tsx
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import Dashboard from './pages/Dashboard';
import BookingSystem from './pages/BookingSystem';
import ScheduleViewer from './pages/ScheduleViewer';
import ChatSystem from './pages/ChatSystem';
import CrowdData from './pages/CrowdData';
import ResourceManagement from './pages/ResourceManagement';
import FeedbackSubmission from './pages/FeedbackSubmission';
import FacultyProfile from './pages/FacultyProfile';
import PostRoom from './pages/PostRoom';
import RoomDetailPage from './pages/RoomDetailPage';
import PostRoomRequest from './pages/PostRoomRequest';
import LoginPage from './auth/LoginPage';
import RegisterPage from './auth/RegisterPage';
import MyBookedRooms from './pages/MyBookedRooms';


import axios from 'axios';
import EditDashboard from './pages/EditDahsboard';

interface Notification {
  id: number;
  message: string;
  read: boolean;
}

function App() {
  const [notifications, setNotifications] = useState<Notification[]>([
    { id: 1, message: 'Room 101 has been posted as available for today at 2:00 PM', read: false },
    { id: 2, message: 'Your booking for Room 305 is confirmed', read: false },
    { id: 3, message: 'New resource request from Dr. Smith', read: true },
  ]);

  // const [rooms, setRooms] = useState([]);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        await axios.get('http://localhost:8085/api/auth/check', { withCredentials: true });
        setIsAuthenticated(true);
      } catch (error) {
        setIsAuthenticated(false);
      } finally {
        setLoading(false);
      }
    };
    checkAuth();
  }, []);

  // useEffect(() => {
  //   if (isAuthenticated) {
  //     const loadRooms = async () => {
  //       try {
  //         const data = await fetchRoomPosts();
  //         setRooms(data);
  //       } catch (error) {
  //         console.error('Error loading rooms:', error);
  //       }
  //     };
  //     loadRooms();
  //   }
  // }, [isAuthenticated]);

  if (loading) {
    return <div className="flex items-center justify-center h-screen">Loading...</div>;
  }

  return (
    <Router>
      <Routes>
        <Route path="/login" element={
          isAuthenticated ? <Navigate to="/" /> : <LoginPage setIsAuthenticated={setIsAuthenticated} />
        } />
        <Route path="/register" element={
          isAuthenticated ? <Navigate to="/" /> : <RegisterPage />
        } />
        <Route path="/*" element={
          isAuthenticated ? (
            <div className="flex h-screen bg-gray-100">
              <Sidebar />
              <div className="flex flex-col flex-1 overflow-hidden">
                <Header 
                  notifications={notifications} 
                  setNotifications={setNotifications} 
                  setIsAuthenticated={setIsAuthenticated} 
                />
                <main className="flex-1 overflow-y-auto p-4">
                  <Routes>
                    <Route path="/" element={<Dashboard />} />
                    <Route path="/booking" element={<BookingSystem />} />
                    <Route path="/schedule" element={<ScheduleViewer />} />
                    <Route path="/new-room-request" element={<PostRoomRequest />} />
                    <Route path="/chat" element={<ChatSystem />} />
                    <Route path="/crowd" element={<CrowdData />} />
                    <Route path="/resources" element={<ResourceManagement />} />
                    <Route path="/feedback" element={<FeedbackSubmission />} />
                    <Route path="/profile" element={<FacultyProfile />} />
                    <Route path="/post-room" element={<PostRoom />} />
                    <Route path="/room/:id" element={<RoomDetailPage />} />
                    <Route path="/my-booked-rooms" element={<MyBookedRooms />} />
                    <Route path="/edit-dashboard" element={<EditDashboard />} />

                  </Routes>
                </main>
              </div>
            </div>
          ) : (
            <Navigate to="/login" />
          )
        } />
      </Routes>
    </Router>
  );
}

export default App;