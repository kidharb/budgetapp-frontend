// src/services/pdfService.js
import apiClient from './api';

export default {
  getPdfContents() {
    return apiClient.get('/csvcontents/');
  },
  updatePdfContent(id, updatedData) { 
    return apiClient.put(`/csvcontents/${id}/`, updatedData); 
  },
};

