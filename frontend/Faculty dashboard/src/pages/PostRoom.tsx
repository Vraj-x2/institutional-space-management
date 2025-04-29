import React, { useState, useEffect } from 'react';
import { createRoomPost, deleteRoomPost, getRoomPostsByUsername } from '../services/api';

interface Room {
  id: number;
  room: string;
  date: string;
  startTime: string;
  endTime: string;
  postedBy: string;
  description: string;
  location: string;
  capacity: number;
  resources: string;
}

const RoomPostForm: React.FC = () => {
  const [formData, setFormData] = useState({
    room: '',
    date: '',
    startTime: '',
    endTime: '',
    description: '',
    location: '',
    capacity: '',
    resources: ''
  });

  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [roomPosts, setRoomPosts] = useState<Room[]>([]);

  useEffect(() => {
    const username = localStorage.getItem('username'); // Ensure username is available
    if (username) {
      getRoomPostsByUsername(username)
        .then((data) => {
          setRoomPosts(data);
        })
        .catch((err) => {
          console.error('Error fetching room posts:', err);
          setError('Failed to fetch room posts.');
        });
    }
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    const username = localStorage.getItem('username');
    if (!username) {
      setError('User not logged in. Please log in first.');
      return;
    }

    const postData = {
      ...formData,
      postedBy: username,
    };

    try {
      await createRoomPost(postData);
      setSuccess('Room post submitted successfully!');
      setFormData({
        room: '',
        date: '',
        startTime: '',
        endTime: '',
        description: '',
        location: '',
        capacity: '',
        resources: ''
      });

      const updatedPosts = await getRoomPostsByUsername(username);
      setRoomPosts(updatedPosts);
    } catch (err) {
      console.error('Error submitting room post:', err);
      setError('Failed to submit room post. Please try again.');
    }
  };

  const handleDelete = async (id: number) => {
    try {
      await deleteRoomPost(id);
      setRoomPosts(roomPosts.filter(request => request.id !== id));
    } catch {
      setError('Failed to delete room request.');
    }
  };

  return (
    <div className="w-full  mx-auto bg-gradient-to-r from-indigo-500 via-purple-500 to-blue-500 p-6 rounded-lg shadow-lg">
      <h2 className="text-3xl font-bold text-white mb-4 text-center">Submit a Room Post</h2>

      {error && <div className="text-red-600 text-center mb-4">{error}</div>}
      {success && <div className="text-green-600 text-center mb-4">{success}</div>}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Left Side: Form Inputs */}
        <form onSubmit={handleSubmit} className="space-y-6 col-span-1 bg-white p-4 rounded-lg shadow-lg">
          <div>
            <label htmlFor="room" className="block text-gray-700 font-semibold mb-2">Room</label>
            <input
              type="text"
              name="room"
              placeholder="Room"
              value={formData.room}
              onChange={handleChange}
              className="w-full p-3 border rounded-lg border-gray-300 focus:ring-2 focus:ring-blue-500 bg-gray-50"
              required
            />
          </div>

          <div>
            <label htmlFor="date" className="block text-gray-700 font-semibold mb-2">Date</label>
            <input
              type="date"
              name="date"
              value={formData.date}
              onChange={handleChange}
              className="w-full p-3 border rounded-lg border-gray-300 focus:ring-2 focus:ring-blue-500 bg-gray-50"
              required
            />
          </div>

          <div>
            <label htmlFor="startTime" className="block text-gray-700 font-semibold mb-2">Start Time</label>
            <input
              type="time"
              name="startTime"
              value={formData.startTime}
              onChange={handleChange}
              className="w-full p-3 border rounded-lg border-gray-300 focus:ring-2 focus:ring-blue-500 bg-gray-50"
              required
            />
          </div>

          <div>
            <label htmlFor="endTime" className="block text-gray-700 font-semibold mb-2">End Time</label>
            <input
              type="time"
              name="endTime"
              value={formData.endTime}
              onChange={handleChange}
              className="w-full p-3 border rounded-lg border-gray-300 focus:ring-2 focus:ring-blue-500 bg-gray-50"
              required
            />
          </div>

          <div>
            <label htmlFor="location" className="block text-gray-700 font-semibold mb-2">Location</label>
            <input
              type="text"
              name="location"
              placeholder="Location"
              value={formData.location}
              onChange={handleChange}
              className="w-full p-3 border rounded-lg border-gray-300 focus:ring-2 focus:ring-blue-500 bg-gray-50"
              required
            />
          </div>

          <div>
            <label htmlFor="capacity" className="block text-gray-700 font-semibold mb-2">Capacity</label>
            <input
              type="number"
              name="capacity"
              placeholder="Capacity"
              value={formData.capacity}
              onChange={handleChange}
              className="w-full p-3 border rounded-lg border-gray-300 focus:ring-2 focus:ring-blue-500 bg-gray-50"
              required
            />
          </div>

          <div>
            <label htmlFor="resources" className="block text-gray-700 font-semibold mb-2">Resources</label>
            <input
              type="text"
              name="resources"
              placeholder="Resources"
              value={formData.resources}
              onChange={handleChange}
              className="w-full p-3 border rounded-lg border-gray-300 focus:ring-2 focus:ring-blue-500 bg-gray-50"
            />
          </div>

          <div>
            <label htmlFor="description" className="block text-gray-700 font-semibold mb-2">Description</label>
            <textarea
              name="description"
              placeholder="Description"
              value={formData.description}
              onChange={handleChange}
              className="w-full p-3 border rounded-lg border-gray-300 focus:ring-2 focus:ring-blue-500 bg-gray-50"
              required
            ></textarea>
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-lg transition-colors duration-300"
          >
            Submit Post
          </button>
        </form>

        {/* Right Side: Display Room Posts */}
        <div className="col-span-1 bg-white p-4 border border-gray-300 rounded-lg shadow-lg">
          <h3 className="text-xl font-semibold text-gray-800 mb-4">Room Posts</h3>
          {roomPosts.length === 0 ? (
            <div className="text-gray-500">No room posts found.</div>
          ) : (
            <div className="space-y-4">
              {roomPosts.map((post) => (
                <div key={post.id} className="p-4 border-b border-gray-200 bg-gradient-to-r from-purple-200 via-pink-200 to-indigo-200 rounded-lg shadow-md">
                  <h4 className="font-semibold text-blue-600">{post.date} - {post.startTime} to {post.endTime}</h4>
                  <p className="text-gray-700">{post.description}</p>
                  <p className="text-gray-700">Room: <span className="font-semibold">{post.room}</span></p>
                  <p className="text-gray-700">Location: <span className="font-semibold">{post.location}</span></p>
                  <p className="text-gray-700">Capacity: {post.capacity}</p>
                  <p className="text-gray-700">Resources: {post.resources}</p>
                  <button
                    onClick={() => handleDelete(post.id)}
                    className="bg-red-600 text-white py-2 px-4 rounded-lg hover:bg-red-700 transition-all"
                  >
                    Delete
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default RoomPostForm;
