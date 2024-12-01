// src/services/pdfService.js
import apiClient from './api';

export default {
  getPdfContents() {
    return apiClient.get('/csvcontents/');
  },
  // Add more functions for other CRUD operations as needed
};

