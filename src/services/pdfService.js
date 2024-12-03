// services/pdfService.js
import axios from 'axios';

export default {
  getPdfContents() {
    return axios.get('/api/csvcontents/');
  },
  updatePdfContent(id, data) {
    return axios.put(`/api/csvcontents/${id}/`, data);
  },
  deletePdfContent(id) {
    return axios.delete(`/api/csvcontents/${id}/delete_transaction/`);
  },
};
