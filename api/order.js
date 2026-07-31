// api/order.js
import { generateOrderId, validateOrder } from '../public/js/order/helper.js';

export async function handleOrder(request, env) {
  const method = request.method;
  const url = new URL(request.url);
  const id = url.searchParams.get('id');

  if (method === 'GET') {
    if (id) {
      const order = await getOrderById(env.DB, id);
      return new Response(JSON.stringify(order), { headers: { 'Content-Type': 'application/json' } });
    }
    const orders = await getAllOrders(env.DB);
    return new Response(JSON.stringify(orders), { headers: { 'Content-Type': 'application/json' } });
  }

  if (method === 'POST') {
    const data = await request.json();
    const validation = validateOrder(data);
    if (!validation.valid) {
      return new Response(JSON.stringify({ error: validation.errors }), { status: 400 });
    }
    const orderId = generateOrderId();
    const newOrder = {
      id: orderId,
      ...data,
      status: data.status || 'new',
      createdAt: new Date().toISOString()
    };
    await createOrder(env.DB, newOrder);
    return new Response(JSON.stringify(newOrder), { status: 201 });
  }

  if (method === 'PUT') {
    const data = await request.json();
    if (!id) return new Response('Missing id', { status: 400 });
    const updated = await updateOrder(env.DB, id, data);
    return new Response(JSON.stringify(updated), { headers: { 'Content-Type': 'application/json' } });
  }

  if (method === 'DELETE') {
    if (!id) return new Response('Missing id', { status: 400 });
    await deleteOrder(env.DB, id);
    return new Response('Deleted', { status: 200 });
  }

  return new Response('Method Not Allowed', { status: 405 });
}

async function getAllOrders(db) {
  const result = await db.prepare('SELECT * FROM orders ORDER BY createdAt DESC').all();
  return result.results;
}

async function getOrderById(db, id) {
  const result = await db.prepare('SELECT * FROM orders WHERE id = ?').bind(id).first();
  return result;
}

async function createOrder(db, order) {
  const { id, customerId, serviceId, items, total, status, createdAt } = order;
  await db.prepare(`
    INSERT INTO orders (id, customerId, serviceId, items, total, status, createdAt)
    VALUES (?, ?, ?, ?, ?, ?, ?)
  `).bind(id, customerId, serviceId, JSON.stringify(items), total, status, createdAt).run();
}

async function updateOrder(db, id, data) {
  // update partial
  const fields = [];
  const values = [];
  for (const [key, value] of Object.entries(data)) {
    if (key !== 'id') {
      fields.push(`${key} = ?`);
      values.push(value);
    }
  }
  values.push(id);
  const query = `UPDATE orders SET ${fields.join(', ')} WHERE id = ?`;
  await db.prepare(query).bind(...values).run();
  return getOrderById(db, id);
}

async function deleteOrder(db, id) {
  await db.prepare('DELETE FROM orders WHERE id = ?').bind(id).run();
}
