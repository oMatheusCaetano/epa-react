import axios from 'axios';

const token = window.localStorage.getItem('@EPA:api-token');

const headers = { Authorization: `Bearer ${token}` };

export default axios.create({
  headers,
  baseURL: 'http://localhost:8000/api/',
});
