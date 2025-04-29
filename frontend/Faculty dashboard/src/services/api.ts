import axios from 'axios';

const API_BASE_URL = 'http://localhost:8085/api';

axios.defaults.withCredentials = true;

export const registerUser = async (userData: any) => {
    const response = await axios.post(`${API_BASE_URL}/auth/register`, userData);
    return response.data;
};

export const loginUser = async () => {
    const response = await axios.get(`${API_BASE_URL}/auth/login`);
    return response.data;
};

export const createRoomPost = async (roomPostData: any) => {
    const response = await axios.post(`${API_BASE_URL}/profRoomBook/roomPost`, roomPostData);
    return response.data;
};

export const fetchRoomPosts = async () => {
    const response = await axios.get(`${API_BASE_URL}/profRoomBook/roomPost`);
    return response.data;
};

export const fetchRoomPostById = async (id: number) => {
    const response = await axios.get(`${API_BASE_URL}/profRoomBook/roomPost/${id}`);
    return response.data;
};

export const updateRoomPost = async (id: number, roomPostData: any) => {
    const response = await axios.put(`${API_BASE_URL}/profRoomBook/roomPost/${id}`, roomPostData);
    return response.data;
};

export const deleteRoomPost = async (id: number) => {
    const response = await axios.delete(`${API_BASE_URL}/profRoomBook/roomPost/${id}`);
    return response.data;
};

export const getRoomPostsByUsername = async (username: string) => {
    const response = await axios.get(`${API_BASE_URL}/profRoomBook/roomPost/user/${username}`);
    return response.data;
};


export const createRoomRequest = async (roomRequest: any) => {
    try {
        const response = await axios.post(`${API_BASE_URL}/profRoomBook/roomRequest`, roomRequest, {
            headers: {
                "Content-Type": "application/json",
            },
        });
        return response.data;
    } catch (error) {
        console.error("Error submitting room request:", error);
        throw error;
    }
};

export const fetchRoomRequests = async () => {
    const response = await axios.get(`${API_BASE_URL}/profRoomBook/roomRequest`);
    return response.data;
};

export const getRoomRequestById = async (id: number) => {
    const response = await axios.get(`${API_BASE_URL}/profRoomBook/roomRequest/${id}`);
    return response.data;
};

export const updateRoomRequest = async (id: number, roomRequestData: any) => {
    const response = await axios.put(`${API_BASE_URL}/profRoomBook/roomRequest/${id}`, roomRequestData);
    return response.data;
};

export const deleteRoomRequest = async (id: number) => {
    const response = await axios.delete(`${API_BASE_URL}/profRoomBook/roomRequest/${id}`);
    return response.data;
};

export const getRoomRequestsByUsername = async (username: string) => {
    const response = await axios.get(`${API_BASE_URL}/profRoomBook/roomRequest/user/${username}`);
    return response.data;
};


export const bookRoom = async (bookedRoomData: any) => {
    const response = await axios.post(`${API_BASE_URL}/BookedRoom/book`, bookedRoomData);
    return response.data;
};

export const fetchBookedRooms = async () => {
    const response = await axios.get(`${API_BASE_URL}/BookedRoom`);
    return response.data;
};

export const getBookedRoomById = async (id: any) => {
    const response = await axios.get(`${API_BASE_URL}/BookedRoom/${id}`);
    return response.data;
};

export const getBookedRoomsByUsername = async (username: any) => {
    const response = await axios.get(`${API_BASE_URL}/BookedRoom/user/${username}`);
    return response.data;
};

export const deleteBookedRoom = async (id: any) => {
    const response = await axios.delete(`${API_BASE_URL}/BookedRoom/${id}`);
    return response.data;
};


export const addDashboardEntry = async (dashboardData: any) => {
    const response = await axios.post(`${API_BASE_URL}/dashboard/add`, dashboardData);
    return response.data;
};


export const getDashboardEntriesByUsername = async (username: string) => {
    const response = await axios.get(`${API_BASE_URL}/dashboard/user/${username}`);
    return response.data;
};


export const deleteDashboardEntry = async (id: number) => {
    const response = await axios.delete(`${API_BASE_URL}/dashboard/${id}`);
    return response.data;
};

