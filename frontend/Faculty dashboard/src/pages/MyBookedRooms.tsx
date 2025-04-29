import React, { useEffect, useState } from 'react';
import { getBookedRoomsByUsername, deleteBookedRoom } from '../services/api';

interface BookedRoom {
  id: number;
  room: string;
  date: string;
  startTime: string;
  endTime: string;
  description: string;
  location: string;
  capacity: number;
  resources: string;
  bookedBy: string;
}

const MyBookedRooms: React.FC = () => {
  const [bookedRooms, setBookedRooms] = useState<BookedRoom[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const username = localStorage.getItem('username');

  useEffect(() => {
    const fetchBookedRooms = async () => {
      if (!username) {
        setError('User not logged in.');
        setLoading(false);
        return;
      }
      try {
        const rooms = await getBookedRoomsByUsername(username);
        setBookedRooms(rooms);
      } catch (err) {
        console.error('Error fetching booked rooms:', err);
        setError('Failed to load booked rooms.');
      } finally {
        setLoading(false);
      }
    };
    fetchBookedRooms();
  }, [username]);

  const handleDelete = async (id: number) => {
    try {
      await deleteBookedRoom(id);
      setBookedRooms((prevRooms) => prevRooms.filter((room) => room.id !== id));
    } catch (err) {
      console.error('Error deleting room:', err);
      setError('Failed to delete the booked room.');
    }
  };

  if (loading) {
    return <div className="text-center p-6">Loading...</div>;
  }

  if (error) {
    return <div className="text-center p-6 text-red-500">{error}</div>;
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold">My Booked Rooms</h1>
      {bookedRooms.length === 0 ? (
        <p className="text-gray-600 mt-4">No booked rooms found.</p>
      ) : (
        <div className="mt-6 overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Room</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Start Time</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">End Time</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Location</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {bookedRooms.map((room) => (
                <tr key={room.id}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{room.room}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{new Date(room.date).toLocaleDateString()}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{room.startTime}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{room.endTime}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{room.location}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">
                    <button 
                      className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-700 transition"
                      onClick={() => handleDelete(room.id)}
                    >
                      Remove
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default MyBookedRooms;
