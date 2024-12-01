<template>
  <div>
    <h1>CSV Contents</h1>
    <table class="fixed-width-table alternate-rows">
      <thead>
        <tr>
          <th>Field2</th>
          <th>Field3</th>
          <th>Field4</th>
          <th>Field5</th>
          <th>Field6</th>
          <th>Field7</th>
          <th>Field8</th>
          <th>Field9</th>
          <th>Field10</th>
          <th>Field11</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="pdf in pdfContents" :key="pdf.id">
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
  },
};
</script>

<style>
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
