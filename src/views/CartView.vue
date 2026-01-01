<script setup>
import { ref, onMounted } from 'vue'
import { db } from '@/db/posDB'

const cartItems = ref([])
const total = ref(0)

async function loadCart() {
  const cart = await db.cart.toArray()
  let sum = 0

  cartItems.value = await Promise.all(
    cart.map(async (c) => {
      const product = await db.products.get(c.productId)
      sum += product.price * c.qty
      return { ...c, product }
    }),
  )

  total.value = sum
}

async function checkout() {
  const orderId = await db.orders.add({
    total: total.value,
    createdAt: new Date(),
    synced: false,
  })

  for (const item of cartItems.value) {
    await db.order_items.add({
      orderId,
      productId: item.productId,
      qty: item.qty,
      price: item.product.price,
    })
  }

  await db.cart.clear()
  await loadCart()
  alert('Order saved offline!')
}

onMounted(loadCart)
</script>

<template>
  <h2>Cart</h2>

  <div v-for="item in cartItems" :key="item.id">{{ item.product.name }} × {{ item.qty }}</div>

  <h3>Total: Rs {{ total }}</h3>

  <button @click="checkout">Checkout</button>
</template>
