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
        <tr v-for="(pdf, index) in pdfContents" :key="pdf.id" :class="{ highlight: pdf.field9 !== 0 }">
          <td>
            <input v-if="editableRow === index" v-model="pdfContents[index].field2" />
            <span v-else>{{ pdf.field2 }}</span>
          </td>
          <td>
            <input v-if="editableRow === index" v-model="pdfContents[index].field3" />
            <span v-else>{{ pdf.field3 }}</span>
          </td>
          <td>
            <input v-if="editableRow === index" v-model="pdfContents[index].field4" />
            <span v-else>{{ new Date(pdf.field4).toLocaleString() }}</span>
          </td>
          <td>
            <input v-if="editableRow === index" v-model="pdfContents[index].field5" />
            <span v-else>{{ pdf.field5 }}</span>
          </td>
          <td>
            <input v-if="editableRow === index" v-model="pdfContents[index].field6" />
            <span v-else>{{ pdf.field6 }}</span>
          </td>
          <td>
            <input v-if="editableRow === index" v-model="pdfContents[index].field7" />
            <span v-else>{{ pdf.field7 }}</span>
          </td>
          <td>
            <input v-if="editableRow === index" v-model="pdfContents[index].field8" />
            <span v-else>{{ pdf.field8 }}</span>
          </td>
          <td>
            <input v-if="editableRow === index" v-model="pdfContents[index].field9" />
            <span v-else>{{ pdf.field9 }}</span>
          </td>
          <td>
            <input v-if="editableRow === index" v-model="pdfContents[index].field10" />
            <span v-else>{{ pdf.field10 }}</span>
          </td>
          <td>
            <input v-if="editableRow === index" v-model="pdfContents[index].field11" />
            <span v-else>{{ pdf.field11 }}</span>
          </td>
          <td>
            <button v-if="editableRow === index" @click="updatePdfContent(pdf.id, index)">Update</button>
            <button v-else @click="editRow(index)">Edit</button>
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
      editableRow: null, // Track the row being edited
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
    editRow(index) {
      this.editableRow = index; // Set the editable row
    },
    async updatePdfContent(id, index) {
      try {
        const updatedData = this.pdfContents[index];
        await pdfService.updatePdfContent(id, updatedData);
        this.editableRow = null; // Reset the editable row after update
      } catch (error) {
        console.error('Error updating PDF content:', error);
      }
    },
  },
};
</script>

<style>
.highlight {
  background-color: lightblue; /* Light blue background color for non-zero Money Out */
}

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
