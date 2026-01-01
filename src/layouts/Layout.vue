<template>
  <div class="layout">
    <header class="header">
      <h2>Offline POS</h2>

      <nav>
        <router-link to="/">Home</router-link>
        <router-link to="/products">Products</router-link>
        <router-link to="/cart">Cart</router-link>
        <router-link to="/orders">Orders</router-link>
      </nav>
    </header>

    <main class="content">
      <router-view />
    </main>
  </div>
</template>

<style scoped>
.header {
  display: flex;
  justify-content: space-between;
  padding: 1rem;
  background: #111827;
  color: white;
}

nav a {
  color: white;
  margin-left: 1rem;
  text-decoration: none;
}

.content {
  padding: 1rem;
}
</style>
