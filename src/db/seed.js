import { db } from './posDB'

export async function seedOnce() {
  const seeded = await db.meta.get('seeded')

  if (seeded) {
    console.log('DB already seeded')
    return
  }

  console.log('Seeding POS data...')

  await db.transaction('rw', db.products, db.meta, async () => {
    await db.products.bulkAdd([
      { name: 'Tea', price: 100, stock: 100 },
      { name: 'Coffee', price: 200, stock: 50 },
      { name: 'Sandwich', price: 250, stock: 30 },
      { name: 'Cold Drink', price: 120, stock: 80 },
    ])

    await db.meta.put({ key: 'seeded', value: true })
  })

  console.log('POS seed completed')
}
