<template>
  <div>
    <Chart />
    <TransactionsTable />
  </div>
</template>

<script>
import Chart from '@/components/Chart.vue'
import TransactionsTable from '@/components/TransactionsTable.vue'

export default {
  components: {
    Chart,
    TransactionsTable
  }
}
</script>

<style>
/* Add your styles here */
</style>

