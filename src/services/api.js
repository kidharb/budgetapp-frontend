// src/services/api.js
import axios from 'axios';

const apiClient = axios.create({
  baseURL: 'http://127.0.0.1:8000/api', // Adjust the baseURL to match your Django server URL
  headers: {
    'Content-Type': 'application/json',
  },
});

export default apiClient;

