<template>
  <div>
    <h1>Transaction History</h1>
    <table class="fixed-width-table alternate-rows">
      <thead>
        <tr>
          <th>Acc #</th>
          <th>Posting Date</th>
          <th>Transaction Date</th>
          <th>Description</th>
          <th>Original Description</th>
          <th>Category</th>
          <th>Money In</th>
          <th>Money Out</th>
          <th>Fees</th>
          <th>Balance</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="pdf in pdfContents" :key="pdf.id" :class="{ highlight: pdf.field9 !== 0 }">
          <td>{{ pdf.field2 }}</td>
          <td>{{ pdf.field3 }}</td>
          <td>{{ new Date(pdf.field4).toLocaleString() }}</td>
          <td>{{ pdf.field5 }}</td>
          <td>{{ pdf.field6 }}</td>
          <td>{{ pdf.field7 }}</td>
          <td>{{ pdf.field8 }}</td>
          <td>{{ pdf.field9 }}</td>
          <td>{{ pdf.field10 }}</td>
          <td>{{ pdf.field11 }}</td>
          <td>
            <button @click="deletePdfContent(pdf.id)">Delete</button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import pdfService from '../services/pdfService';

export default {
  name: 'PDFContentList',
  data() {
    return {
      pdfContents: [],
    };
  },
  created() {
    this.fetchPdfContents();
  },
  methods: {
    async fetchPdfContents() {
      try {
        const response = await pdfService.getPdfContents();
        this.pdfContents = response.data;
      } catch (error) {
        console.error('Error fetching PDF contents:', error);
      }
    },
    async deletePdfContent(id) {
      try {
        await pdfService.deletePdfContent(id);
        this.pdfContents = this.pdfContents.filter(content => content.id !== id);
      } catch (error) {
        console.error('Error deleting PDF content:', error);
      }
    },
  },
};
</script>

<style>
.highlight {
  background-color: lightcoral; /* Light coral background color for "Money Out" */
}
/* Existing styles */
.fixed-width-table {
  width: 100%;
  border-collapse: collapse;
}

.fixed-width-table th,
.fixed-width-table td {
  border: 1px solid #dddddd;
  text-align: left;
  padding: 8px;
}

/* Fixed widths for columns */
.fixed-width-table th:nth-child(1),
.fixed-width-table td:nth-child(1) { width: 100px; }
.fixed-width-table th:nth-child(2),
.fixed-width-table td:nth-child(2) { width: 150px; }
.fixed-width-table th:nth-child(3),
.fixed-width-table td:nth-child(3) { width: 200px; }
.fixed-width-table th:nth-child(4),
.fixed-width-table td:nth-child(4) { width: 250px; }
.fixed-width-table th:nth-child(5),
.fixed-width-table td:nth-child(5) { width: 300px; }
.fixed-width-table th:nth-child(6),
.fixed-width-table td:nth-child(6) { width: 350px; }
.fixed-width-table th:nth-child(7),
.fixed-width-table td:nth-child(7) { width: 400px; }
.fixed-width-table th:nth-child(8),
.fixed-width-table td:nth-child(8) { width: 450px; }
.fixed-width-table th:nth-child(9),
.fixed-width-table td:nth-child(9) { width: 500px; }
.fixed-width-table th:nth-child(10),
.fixed-width-table td:nth-child(10) { width: 550px; }
.fixed-width-table th:nth-child(11),
.fixed-width-table td:nth-child(11) { width: 600px; }

/* Alternating row colors */
.alternate-rows tbody tr:nth-child(odd) {
  background-color: #f2f2f2; /* Light grey */
}

.alternate-rows tbody tr:nth-child(even) {
  background-color: #d9d9d9; /* Dark grey */
}
</style>
