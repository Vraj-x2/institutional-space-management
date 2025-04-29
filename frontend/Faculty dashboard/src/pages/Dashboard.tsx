import {
  BookOpenIcon,
  CalendarIcon,
  ClockIcon,
  Trash2Icon,
} from 'lucide-react';
import React, { useEffect, useState } from 'react';
import {
  fetchRoomPosts,
  getBookedRoomsByUsername,
  getDashboardEntriesByUsername,
  deleteDashboardEntry,
} from '../services/api';





const Dashboard: React.FC = () => {
  const [roomPosts, setRoomPosts] = useState<any[]>([]);

  const [roomPostsByUserName, setRoomPostsByUserName] = useState<any[]>([]);

  const [dashboardEntries, setDashboardEntries] = useState<any[]>([]);
 
  const [selectedDay, setSelectedDay] = useState<string>(
    new Date().toLocaleDateString('en-US', { weekday: 'long' })
  );

  const username = localStorage.getItem('username') || '';



  // Fetch user's booked rooms
  useEffect(() => {
    const getRoomPostsByUserName = async () => {
      try {
        const data = await getBookedRoomsByUsername(username);
        setRoomPostsByUserName(data);
      } catch (error) {
        console.error('Error fetching room posts:', error);
      }
    };
    getRoomPostsByUserName();
  }, [username]);

  // Fetch all room posts
  useEffect(() => {
    const getRoomPosts = async () => {
      try {
        const data = await fetchRoomPosts();
        setRoomPosts(data);
      } catch (error) {
        console.error('Error fetching room posts:', error);
      }
    };
    getRoomPosts();
  }, []);

  // Fetch dashboard entries for notifications
  useEffect(() => {
    const fetchEntries = async () => {
      try {
        if (username) {
          const data = await getDashboardEntriesByUsername(username);
          setDashboardEntries(data);
        }
      } catch (error) {
        console.error('Error fetching dashboard entries:', error);
      }
    };
    fetchEntries();
  }, [username]);

  const handleDeleteEntry = async (id: number) => {
    try {
      await deleteDashboardEntry(id);
      setDashboardEntries((prev) => prev.filter((entry) => entry.id !== id));
    } catch (error) {
      console.error('Error deleting entry:', error);
    }
  };


  const totalRoomPosts = roomPosts.length - roomPostsByUserName.length;

  return (


    <div className="px-0" id='main-dashboard'>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-800">
          {username}, Welcome to your Dashboard!
        </h1>
        <p className="text-gray-600">Here's your overview for today</p>
      </div>

      {/* Info Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        {/* Current Time */}
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <div className="flex items-center mb-4">
            <ClockIcon size={24} className="text-blue-600 mr-3" />
            <h2 className="text-lg font-semibold">Current Time</h2>
          </div>
          <p className="text-3xl font-bold text-gray-800">
            {new Date().toLocaleTimeString([], {
              hour: '2-digit',
              minute: '2-digit',
            })}
          </p>
          <p className="text-gray-600 mt-1">
            {new Date().toLocaleDateString([], {
              weekday: 'long',
              month: 'long',
              day: 'numeric',
            })}
          </p>
        </div>

        {/* Class Schedule */}
<div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
  <div className="flex items-center mb-4">
    <CalendarIcon size={24} className="text-blue-600 mr-3" />
    <h2 className="text-lg font-semibold">Your Class Schedule</h2>
  </div>
  <select
    className="w-full border border-gray-300 rounded px-3 py-2"
    value={selectedDay}
    onChange={(e) => setSelectedDay(e.target.value)}
  >
    {[
      'Monday',
      'Tuesday',
      'Wednesday',
      'Thursday',
      'Friday',
      'Saturday',
      'Sunday',
    ].map((day) => (
      <option key={day} value={day}>
        {day}
      </option>
    ))}
  </select>
  <p className="text-xl font-semibold text-gray-800 mt-3">
    {dashboardEntries.filter((entry) => entry.day === selectedDay).length > 0
      ? `You have ${dashboardEntries.filter((entry) => entry.day === selectedDay).length} class(es) on ${selectedDay}`
      : 'No classes available'}
  </p>
</div>


        {/* Room Availability */}
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <div className="flex items-center mb-4">
            <BookOpenIcon size={24} className="text-blue-600 mr-3" />
            <h2 className="text-lg font-semibold">Room Availability</h2>
          </div>
          <p className="text-3xl font-bold text-gray-800">{totalRoomPosts}</p>
          <p className="text-gray-600 mt-1">
            Available rooms posted by faculty
          </p>
        </div>
      </div>

      {/* Notifications Section */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <h2 className="text-lg font-semibold mb-4">
          Classes{' '}
          <span className="text-blue-600">{selectedDay}</span>
        </h2>
        {dashboardEntries.filter((entry) => entry.day === selectedDay)
          .length === 0 ? (
          <p className="text-gray-500">
            No activity found for {selectedDay}.
          </p>
        ) : (
          <ul className="space-y-4">
            {dashboardEntries
              .filter((entry) => entry.day === selectedDay)
              .map((entry) => (
                <li
                  key={entry.id}
                  className="border-b pb-3 flex justify-between items-center"
                >
                  <div>
                    <p className="text-gray-800 font-medium">
                      Room No: <span className="font-bold">{entry.room}</span>  /  
                      Date :{' '}
                      <span className="font-semibold">{entry.date}</span>
                    </p>
                    <p className="text-sm text-gray-500">
                      Subject: {entry.subject}
                    </p>
                    <p className="text-sm text-gray-500">
                      Time: {entry.startTime} - {entry.endTime} | Day:{' '}
                      {entry.day}
                    </p>
                    
                  </div>
                  <button
                    onClick={() => handleDeleteEntry(entry.id)}
                    className="text-red-500 hover:text-red-700 flex items-center gap-1"
                  >
                    <Trash2Icon size={16} /> Delete
                  </button>
                </li>
              ))}
          </ul>
        )}
      </div>
      
        {/* Footer */}
        <div className="mt-6 text-center text-gray-600">
          <p>&copy; {new Date().getFullYear()} Tech Innovators All rights reserved.</p>
        </div>

    </div>
  );
};

export default Dashboard;
