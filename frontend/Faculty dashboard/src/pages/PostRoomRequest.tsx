import React, { useState, useEffect } from 'react';
import { createRoomRequest, deleteRoomRequest, getRoomRequestsByUsername } from '../services/api';

interface RoomRequestByUsername {
    id: number;
    date: string;
    startTime: string;
    endTime: string;
    description: string;
    location: string;
    capacity: number;
    resources: string;
    requestedBy: string;
}

const RoomRequestForm: React.FC = () => {
    const [formData, setFormData] = useState({
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
    const [roomRequests, setRoomRequests] = useState<RoomRequestByUsername[]>([]);

    useEffect(() => {
        const username = localStorage.getItem('username'); // Ensure username is available
        if (username) {
            getRoomRequestsByUsername(username)
                .then((data) => {
                    setRoomRequests(data);
                })
                .catch((err) => {
                    console.error('Error fetching room requests:', err);
                    setError('Failed to fetch room requests.');
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
    
        const requestData = {
            ...formData,
            users: { username }
        };
    
        try {
            await createRoomRequest(requestData);
            setSuccess('Room request submitted successfully!');
    
            // Reset form data
            setFormData({ date: '', startTime: '', endTime: '', description: '', location: '', capacity: '', resources: '' });
    
            // Fetch updated room requests after submitting
            const updatedRequests = await getRoomRequestsByUsername(username);
            setRoomRequests(updatedRequests);
    
        } catch (err) {
            console.error('Error submitting room request:', err);
            setError('Failed to submit room request. Please try again.');
        }
    };
    
    

    const handleDelete = async (id: number) => {
        try {
            await deleteRoomRequest(id);
            setRoomRequests(roomRequests.filter(request => request.id !== id));
        } catch {
            setError('Failed to delete room request.');
        }
    };

    return (
        <div className="w-full  mx-auto bg-gradient-to-r from-indigo-500 via-purple-500 to-blue-500 p-6 rounded-lg shadow-lg">
            <h2 className="text-3xl font-bold text-white mb-4 text-center">Submit a Room Request</h2>

            {error && <div className="text-red-600 text-left mb-4">{error}</div>}
            {success && <div className="text-green-600 text-left mb-4">{success}</div>}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Left Side: Form Inputs */}
                <form onSubmit={handleSubmit} className="space-y-6 col-span-1 bg-white p-4 rounded-lg shadow-lg">
                    <div>
                        <label htmlFor="date" className="block text-gray-700 mb-1">Date</label>
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
                        <label htmlFor="startTime" className="block text-gray-700 mb-1">Start Time</label>
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
                        <label htmlFor="endTime" className="block text-gray-700 mb-1">End Time</label>
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
                        <label htmlFor="location" className="block text-gray-700 mb-1">Location</label>
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
                        <label htmlFor="capacity" className="block text-gray-700 mb-1">Capacity</label>
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
                        <label htmlFor="resources" className="block text-gray-700 mb-1">Resources</label>
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
                        <label htmlFor="description" className="block text-gray-700 mb-1">Description</label>
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
                        Submit Request
                    </button>
                </form>

                {/* Right Side: Display Room Requests */}
                <div className="col-span-1 p-6 border border-gray-300 rounded-lg bg-gray-100 h-full max-h-[840px] overflow-y-auto">
                    <h3 className="text-xl font-semibold text-gray-800 mb-4">Room Requests</h3>
                    {roomRequests.length === 0 ? (
                        <div className="text-gray-500">No room requests found.</div>
                    ) : (
                        <div className="space-y-4">
                            {roomRequests.map((request) => (
                                <div key={request.id} className="p-4 border-b border-gray-200 bg-white rounded-lg">
                                    <h4 className="font-semibold text-blue-600">{request.date} - {request.startTime} to {request.endTime}</h4>
                                    <p className="text-gray-600">{request.id}</p>
                                    <p className="text-gray-600">{request.description}</p>
                                    <p className="text-gray-600">Location: <span className="font-semibold">{request.location}</span></p>
                                    <p className="text-gray-600">Capacity: {request.capacity}</p>
                                    <p className="text-gray-600">Resources: {request.resources}</p>
                                    
                                <button onClick={() => handleDelete(request.id)} className="bg-red-600 text-white py-1 px-3 rounded">Delete</button>
                            
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default RoomRequestForm;