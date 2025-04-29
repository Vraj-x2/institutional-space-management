import { CalendarIcon } from 'lucide-react';
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { addDashboardEntry } from '../services/api'; // adjust path if needed

const weekdays = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

const EditDashboard: React.FC = () => {
  const navigate = useNavigate();
  const [schedule, setSchedule] = useState<{ [key: string]: string }>({});
  const [selectedDay, setSelectedDay] = useState<string>('Monday');

  const [formData, setFormData] = useState({
    room: '',
    date: '',
    startTime: '',
    endTime: '',
    day: '',
    subject: '',
  });

  useEffect(() => {
    const storedSchedule = localStorage.getItem('classSchedule');
    if (storedSchedule) {
      setSchedule(JSON.parse(storedSchedule));
    }
  }, []);



  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await addDashboardEntry(formData);
      alert("Dashboard entry added!");
      setFormData({ room: '', date: '', startTime: '', endTime: '', day: '', subject: '' });
      navigate('/');
    } catch (error) {
      console.error("Failed to add dashboard entry:", error);
    }
  };

  return (
    <div className="w-full min-h-screen bg-gray-100 py-6 px-2">
     

      {/* Room Booking Card */}
      <div className="bg-white shadow-md rounded-2xl p-6 w-full">
        <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center gap-2">
          <CalendarIcon className="w-5 h-5" /> Add Room Booking
        </h2>
        <form onSubmit={handleFormSubmit}>
          <div className="mb-4">
            <label className="block font-semibold text-gray-700 mb-1">Room</label>
            <input
              type="text"
              name="room"
              value={formData.room}
              onChange={handleFormChange}
              required
              className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="mb-4">
            <label className="block font-semibold text-gray-700 mb-1">Subject</label>
            <input
              type="text"
              name="subject"
              value={formData.subject}
              onChange={handleFormChange}
              required
              className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="mb-4">
            <label className="block font-semibold text-gray-700 mb-1">Date</label>
            <input
              type="date"
              name="date"
              value={formData.date}
              onChange={handleFormChange}
              required
              className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
            />
          </div>

       


          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block font-semibold text-gray-700 mb-1">Start Time</label>
              <input
                type="time"
                name="startTime"
                value={formData.startTime}
                onChange={handleFormChange}
                required
                className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block font-semibold text-gray-700 mb-1">End Time</label>
              <input
                type="time"
                name="endTime"
                value={formData.endTime}
                onChange={handleFormChange}
                required
                className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          <div className="mb-4">
            <label className="block font-semibold text-gray-700 mb-1">Day</label>
            <select
              name="day"
              value={formData.day}
              onChange={handleFormChange}
              required
              className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Select Day</option>
              {weekdays.map((day) => (
                <option key={day} value={day}>{day}</option>
              ))}
            </select>
          </div>

          <button
            type="submit"
            className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-md font-medium"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default EditDashboard;
