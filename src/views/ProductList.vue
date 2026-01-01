<script setup>
import { ref, onMounted } from 'vue'
import { db } from '@/db/posDB'

const products = ref([])

async function loadProducts() {
  products.value = await db.products.toArray()
}

async function addToCart(product) {
  const item = await db.cart.where('productId').equals(product.id).first()

  if (item) {
    await db.cart.update(item.id, { qty: item.qty + 1 })
  } else {
    await db.cart.add({
      productId: product.id,
      qty: 1,
    })
  }
}

onMounted(loadProducts)
</script>

<template>
  <h2>Products</h2>
  <div>
    <table class="products-table">
      <tr v-for="p in products" :key="p.id">
        <td>{{ p.name }}</td>
        <td>Rs {{ p.price }}</td>
        <td></td>
        <td>
          <button @click="addToCart(p)">Add</button>
        </td>
      </tr>
    </table>
  </div>
</template>

<style>
.products-table {
  width: 100%;
}
</style>
