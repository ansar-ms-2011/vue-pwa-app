import { db } from './posDB'

export async function seedProducts() {
  const count = await db.products.count()
  if (count === 0) {
    await db.products.bulkAdd([
      { name: 'Tea', price: 100, stock: 100 },
      { name: 'Coffee', price: 200, stock: 50 },
      { name: 'Sandwich', price: 250, stock: 30 },
    ])
  }
}
