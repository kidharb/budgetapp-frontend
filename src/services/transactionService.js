import axios from 'axios';

const API_URL = '/api/'; // Adjust the URL as needed

export default {
  getTransactions() {
    return axios.get(`${API_URL}transactions/`);
  },
  updateTransaction(id, data) {
    return axios.put(`${API_URL}transactions/${id}/`, data);
  },
  deleteTransaction(id) {
    return axios.delete(`${API_URL}transactions/${id}/`);
  },
  deleteAllTransactions() {
    return axios.delete(`${API_URL}delete_all_transactions/`); // Adjust the endpoint as needed
  },
};
