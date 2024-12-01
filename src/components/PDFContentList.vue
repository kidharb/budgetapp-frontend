<template>
  <div>
    <h1>CSV Contents</h1>
    <table>
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
/* Alternating row colors */
.alternate-rows tbody tr:nth-child(odd) {
  background-color: #f2f2f2; /* Light grey */
}

.alternate-rows tbody tr:nth-child(even) {
  background-color: #d9d9d9; /* Dark grey */
}
</style>
