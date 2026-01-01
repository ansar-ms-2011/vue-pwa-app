import Dexie from 'dexie'

export const db = new Dexie('posDB')

db.version(1).stores({
  products: '++id, name, price, stock',
  cart: '++id, productId, qty',
  orders: '++id, createdAt, synced',
  order_items: '++id, orderId, productId',
  meta: 'key',
})
