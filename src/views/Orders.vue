<script setup>
import { ref, onMounted } from 'vue'
import { db } from '@/db/posDB'

const orders = ref([])

onMounted(async () => {
  orders.value = await db.orders.orderBy('createdAt').reverse().toArray()
})
</script>

<template>
  <h2>Offline Orders</h2>

  <div v-for="o in orders" :key="o.id">
    Order #{{ o.id }} – Rs {{ o.total }}
    <small>{{ new Date(o.createdAt).toLocaleString() }}</small>
  </div>
</template>
