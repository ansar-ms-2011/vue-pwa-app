<script setup>
import { ref, onMounted } from 'vue'
import { db } from '@/db/posDB'

const orders = ref([])

onMounted(async () => {
  orders.value = await db.orders.orderBy('createdAt').reverse().toArray()
})
</script>

<template>
  <h2>Orders</h2>
  <table class="">
    <tr v-for="o in orders" :key="o.id">
      <td>Order #{{ o.id }}</td>
      <td>Rs {{ o.total }}</td>
      <td>
        <small>{{ new Date(o.createdAt).toLocaleString() }}</small>
      </td>
    </tr>
  </table>
</template>
