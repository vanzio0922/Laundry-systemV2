// api/payment.js
export async function handlePayment(request, env) {
  const method = request.method;
  const url = new URL(request.url);
  const id = url.searchParams.get('id');
  const orderId = url.searchParams.get('orderId');

  if (method === 'GET') {
    if (id) {
      const payment = await getPaymentById(env.DB, id);
      return new Response(JSON.stringify(payment), { headers: { 'Content-Type': 'application/json' } });
    }
    if (orderId) {
      const payments = await getPaymentsByOrder(env.DB, orderId);
      return new Response(JSON.stringify(payments), { headers: { 'Content-Type': 'application/json' } });
    }
    const all = await getAllPayments(env.DB);
    return new Response(JSON.stringify(all), { headers: { 'Content-Type': 'application/json' } });
  }

  if (method === 'POST') {
    const data = await request.json();
    const newPayment = {
      id: crypto.randomUUID(),
      ...data,
      createdAt: new Date().toISOString()
    };
    await createPayment(env.DB, newPayment);
    return new Response(JSON.stringify(newPayment), { status: 201 });
  }

  if (method === 'PUT') {
    if (!id) return new Response('Missing id', { status: 400 });
    const data = await request.json();
    const updated = await updatePayment(env.DB, id, data);
    return new Response(JSON.stringify(updated), { headers: { 'Content-Type': 'application/json' } });
  }

  if (method === 'DELETE') {
    if (!id) return new Response('Missing id', { status: 400 });
    await deletePayment(env.DB, id);
    return new Response('Deleted', { status: 200 });
  }

  return new Response('Method Not Allowed', { status: 405 });
}

async function getAllPayments(db) {
  const result = await db.prepare('SELECT * FROM payments ORDER BY createdAt DESC').all();
  return result.results;
}

async function getPaymentById(db, id) {
  return await db.prepare('SELECT * FROM payments WHERE id = ?').bind(id).first();
}

async function getPaymentsByOrder(db, orderId) {
  const result = await db.prepare('SELECT * FROM payments WHERE orderId = ?').bind(orderId).all();
  return result.results;
}

async function createPayment(db, payment) {
  const { id, orderId, amount, method, status, createdAt } = payment;
  await db.prepare(`
    INSERT INTO payments (id, orderId, amount, method, status, createdAt)
    VALUES (?, ?, ?, ?, ?, ?)
  `).bind(id, orderId, amount, method, status, createdAt).run();
}

async function updatePayment(db, id, data) {
  const fields = [];
  const values = [];
  for (const [key, value] of Object.entries(data)) {
    if (key !== 'id') {
      fields.push(`${key} = ?`);
      values.push(value);
    }
  }
  values.push(id);
  const query = `UPDATE payments SET ${fields.join(', ')} WHERE id = ?`;
  await db.prepare(query).bind(...values).run();
  return getPaymentById(db, id);
}

async function deletePayment(db, id) {
  await db.prepare('DELETE FROM payments WHERE id = ?').bind(id).run();
}
