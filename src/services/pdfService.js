// src/services/pdfService.js
import apiClient from './api';

export default {
  getPdfContents() {
    return apiClient.get('/csvcontents/');
  },
  deletePdfContent(id) { 
    return apiClient.delete(`/csvcontents/${id}/`); 
  },
};

