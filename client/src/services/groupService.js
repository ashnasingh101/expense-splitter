import axios from 'axios';

const API_URL = 'http://localhost:5000/api/groups';

const userId = localStorage.getItem('userId');

export const createGroup = async (name) => {
  const response = await axios.post(API_URL, { name, userId });
  return response.data;
};

export const getGroups = async () => {
  const response = await axios.get(API_URL, { params: { userId } });
  return response.data;
};

export const getGroupById = async (id) => {
  const response = await axios.get(`${API_URL}/${id}`);
  return response.data;
};

export const updateGroup = async (id, data) => {
  const response = await axios.put(`${API_URL}/${id}`, data);
  return response.data;
};

export const deleteGroup = async (id) => {
  const response = await axios.delete(`${API_URL}/${id}`);
  return response.data;
};



