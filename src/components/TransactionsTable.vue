<template>
  <div>
    <table>
      <thead>
        <tr>
          <th>Account</th>
          <th>Posting Date</th>
          <th>Transaction Date</th>
          <th>Description</th>
          <th>Original Description</th>
          <th>Category</th>
          <th>Money In</th>
          <th>Money Out</th>
          <th>Fee</th>
          <th>Balance</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="pdf in pdfs" :key="pdf.id">
          <td>{{ pdf.field2 }}</td>
          <td>{{ pdf.field3 }}</td>
          <td>{{ pdf.field4 }}</td>
          <td>{{ pdf.field5 }}</td>
          <td>{{ pdf.field6 }}</td>
          <td>{{ pdf.field7 }}</td>
          <td>{{ pdf.field8 }}</td>
          <td>{{ pdf.field9 }}</td>
          <td>{{ pdf.field10 }}</td>
          <td>{{ pdf.field11 }}</td>
          <td><button @click="deletePdf(pdf.id)">Delete</button></td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      pdfs: []
    }
  },
  mounted() {
    axios.get('/api/pdfs/')
      .then(response => {
        this.pdfs = response.data;
      })
      .catch(error => {
        console.error("There was an error!", error);
      });
  },
  methods: {
    deletePdf(id) {
      axios.delete(`/api/pdfs/${id}/`)
        .then(() => {
          this.pdfs = this.pdfs.filter(pdf => pdf.id !== id);
        })
        .catch(error => {
          console.error("There was an error!", error);
        });
    }
  }
}
</script>

<style>
/* Add your styles here */
</style>

