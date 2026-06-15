import axios from "axios";
import Cookies from "js-cookie";

const API = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000/api",
});

// Attach JWT token to every request
API.interceptors.request.use((config) => {
  const token = Cookies.get("token");
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

// Auth
export const signup = (data) => API.post("/auth/signup", data);
export const login = (data) => API.post("/auth/login", data);
export const getMe = () => API.get("/auth/me");

// Hotels
export const getHotels = () => API.get("/hotels");
export const getHotel = (id) => API.get(`/hotels/${id}`);
export const createHotel = (data) => API.post("/hotels", data);
export const updateHotel = (id, data) => API.put(`/hotels/${id}`, data);
export const deleteHotel = (id) => API.delete(`/hotels/${id}`);

export const getHotelPictures = (hotelId) => API.get(`/hotels/${hotelId}/pictures`);
export const uploadHotelPicture = (hotelId, data) => API.post(`/hotels/${hotelId}/pictures`, data);

export const deleteHotelPicture = (pictureId) =>
  API.delete(`/hotels/pictures/${pictureId}`);
// Rooms
export const getRooms = (hotelId) => API.get(`/hotels/${hotelId}/rooms`);
export const getAvailableRooms = (params) => API.get("/rooms/available", { params });
export const createRoom = (hotelId, data) => API.post(`/hotels/${hotelId}/rooms`, data);
export const updateRoom = (id, data) => API.put(`/rooms/${id}`, data);
export const deleteRoom = (id) => API.delete(`/rooms/${id}`);

// Bookings
export const createBooking = (data) => API.post("/bookings", data);
export const getMyBookings = () => API.get("/bookings/my");
export const getAllBookings = () => API.get("/bookings");
export const updateBookingStatus = (id, status) => API.put(`/bookings/${id}/status`, { status });

// Departments
export const getDepartments = () => API.get("/departments");
export const createDepartment = (data) => API.post("/departments", data);
export const updateDepartment = (id, data) => API.put(`/departments/${id}`, data);
export const deleteDepartment = (id) => API.delete(`/departments/${id}`);

// Staff
export const getStaff = (hotelId) => API.get(`/hotels/${hotelId}/staff`);
export const createStaff = (hotelId, data) => API.post(`/hotels/${hotelId}/staff`, data);
export const updateStaff = (id, data) => API.put(`/staff/${id}`, data);
export const deleteStaff = (id) => API.delete(`/staff/${id}`);

// Maintenance
export const getMaintenance = () => API.get("/maintenance");
export const createMaintenance = (data) => API.post("/maintenance", data);
export const updateMaintenance = (id, data) => API.put(`/maintenance/${id}`, data);
export const deleteMaintenance = (id) => API.delete(`/maintenance/${id}`);

// Reviews
export const getReviews = (hotelId) => API.get(`/hotels/${hotelId}/reviews`);
export const createReview = (hotelId, data) => API.post(`/hotels/${hotelId}/reviews`, data);
export const respondToReview = (id, data) => API.post(`/reviews/${id}/respond`, data);
export const getAllReviews = () => API.get("/reviews");

export default API;