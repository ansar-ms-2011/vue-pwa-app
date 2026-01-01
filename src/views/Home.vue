<script setup>
import { ref, onMounted } from 'vue'
import { db } from '@/db/posDB'

const todaySales = ref(0)
const ordersCount = ref(0)
const productCount = ref(0)
const pendingSync = ref(0)

async function loadStats() {
  const today = new Date()
  today.setHours(0, 0, 0, 0)
  const startOfDay = today.getTime()

  const orders = await db.orders.where('createdAt').aboveOrEqual(startOfDay).toArray()

  todaySales.value = orders.reduce((sum, o) => sum + (o.total || 0), 0)

  ordersCount.value = orders.length
  productCount.value = await db.products.count()
  pendingSync.value = await db.orders.where('synced').equals(0).count()
}

onMounted(loadStats)
</script>

<template>
  <div class="pos-home">
    <h1>POS Dashboard</h1>

    <div class="stats">
      <div class="card">
        <h3>Today Sales</h3>
        <p>Rs {{ todaySales }}</p>
      </div>

      <div class="card">
        <h3>Orders</h3>
        <p>{{ ordersCount }}</p>
      </div>

      <div class="card">
        <h3>Products</h3>
        <p>{{ productCount }}</p>
      </div>

      <div class="card warning">
        <h3>Pending Sync</h3>
        <p>{{ pendingSync }}</p>
      </div>
    </div>

    <div class="actions">
      <router-link to="/products" class="btn">Start Sale</router-link>
      <router-link to="/orders" class="btn secondary">View Orders</router-link>
    </div>
  </div>
</template>

<style scoped>
.pos-home {
  padding: 1rem;
  font-family: system-ui;
}

.stats {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
  gap: 1rem;
}

.card {
  padding: 1rem;
  background: #f5f5f5;
  border-radius: 8px;
  text-align: center;
  color: #4b5563;
}

.warning {
  background: #fff3cd;
}

.actions {
  margin-top: 2rem;
  display: flex;
  gap: 1rem;
}

.btn {
  padding: 1rem 1.5rem;
  background: #2563eb;
  color: white;
  border-radius: 6px;
  text-decoration: none;
}

.secondary {
  background: #4b5563;
}
</style>
