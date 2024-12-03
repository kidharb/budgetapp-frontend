<template>
  <div>
    <h1>Transaction History</h1>
    <table class="fixed-width-table alternate-rows">
      <thead>
        <tr>
          <th>Transaction Date</th>
          <th>Description</th>
          <th>Category</th>
          <th>Group</th>
          <th>Amount</th>
          <th>Balance</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(transaction, index) in transactions" :key="transaction.id">
          <td>
            <input v-if="editableRow === index" v-model="transactions[index].transaction_date" type="datetime-local" />
            <span v-else>{{ new Date(transaction.transaction_date).toLocaleString() }}</span>
          </td>
          <td>
            <input v-if="editableRow === index" v-model="transactions[index].description" />
            <span v-else>{{ transaction.description }}</span>
          </td>
          <td>
            <input v-if="editableRow === index" v-model="transactions[index].category" />
            <span v-else>{{ transaction.category }}</span>
          </td>
          <td>
            <select v-if="editableRow === index" v-model="transactions[index].group">
              <option value="Recurring">Recurring</option>
              <option value="Invest, Save and Repay">Invest, Save and Repay</option>
              <option value="Day to Day">Day to Day</option>
              <option value="Exceptions">Exceptions</option>
              <option value="Transfers">Transfers</option>
            </select>
            <span v-else>{{ transaction.group }}</span>
          </td>
          <td>
            <span>{{ getAmount(transaction) }}</span>
          </td>
          <td>
            <input v-if="editableRow === index" v-model="transactions[index].balance" />
            <span v-else>{{ transaction.balance }}</span>
          </td>
          <td>
            <button v-if="editableRow === index" @click="updateTransaction(transaction.id, index)">Update</button>
            <button v-else @click="editRow(index)">Edit</button>
            <button @click.stop="deleteTransaction(transaction.id)">Delete</button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import transactionService from '../services/transactionService';

export default {
  name: 'TransactionList',
  data() {
    return {
      transactions: [],
      editableRow: null, // Track the row being edited
    };
  },
  created() {
    this.fetchTransactions();
  },
  methods: {
    async fetchTransactions() {
      try {
        const response = await transactionService.getTransactions();
        this.transactions = response.data;
      } catch (error) {
        console.error('Error fetching transactions:', error);
      }
    },
    editRow(index) {
      this.editableRow = index; // Set the editable row
    },
    async updateTransaction(id, index) {
      try {
        const updatedData = this.transactions[index];
        if (updatedData.category === "Transfers") {
          updatedData.group = "Transfers";
        }
        await transactionService.updateTransaction(id, updatedData);
        this.editableRow = null; // Reset the editable row after update
      } catch (error) {
        console.error('Error updating transaction:', error);
      }
    },
    async deleteTransaction(id) {
      try {
        await transactionService.deleteTransaction(id); // Use the delete API
        this.fetchTransactions(); // Refresh the list after deletion
      } catch (error) {
        console.error('Error deleting transaction:', error);
      }
    },
    getAmount(transaction) {
      if (transaction.money_out != 0.0) return transaction.money_out; // Money Out
      if (transaction.money_in != 0.0) return transaction.money_in; // Money In
      if (transaction.fees != 0.0) return transaction.fees; // Fees
      return "N/A"; // Default if no amount is present
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

.fixed-width-table th:nth-child(1),
.fixed-width-table td:nth-child(1) { width: 150px; }
.fixed-width-table th:nth-child(2),
.fixed-width-table td:nth-child(2) { width: 200px; }
.fixed-width-table th:nth-child(3),
.fixed-width-table td:nth-child(3) { width: 150px; }
.fixed-width-table th:nth-child(4),
.fixed-width-table td:nth-child(4) { width: 150px; }
.fixed-width-table th:nth-child(5),
.fixed-width-table td:nth-child(5) { width: 100px; }
.fixed-width-table th:nth-child(6),
.fixed-width-table td:nth-child(6) { width: 100px; }

/* Alternating row colors */
.alternate-rows tbody tr:nth-child(odd) {
  background-color: #f2f2f2; /* Light grey */
}

.alternate-rows tbody tr:nth-child(even) {
  background-color: #d9d9d9; /* Dark grey */
}
</style>
