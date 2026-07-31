// api/customer.js
export async function handleCustomer(request, env) {
  const method = request.method;
  const url = new URL(request.url);
  const id = url.searchParams.get('id');

  if (method === 'GET') {
    if (id) {
      const customer = await getCustomerById(env.DB, id);
      return new Response(JSON.stringify(customer), { headers: { 'Content-Type': 'application/json' } });
    }
    const customers = await getAllCustomers(env.DB);
    return new Response(JSON.stringify(customers), { headers: { 'Content-Type': 'application/json' } });
  }

  if (method === 'POST') {
    const data = await request.json();
    const newCustomer = {
      id: crypto.randomUUID(),
      ...data,
      createdAt: new Date().toISOString()
    };
    await createCustomer(env.DB, newCustomer);
    return new Response(JSON.stringify(newCustomer), { status: 201 });
  }

  if (method === 'PUT') {
    if (!id) return new Response('Missing id', { status: 400 });
    const data = await request.json();
    const updated = await updateCustomer(env.DB, id, data);
    return new Response(JSON.stringify(updated), { headers: { 'Content-Type': 'application/json' } });
  }

  if (method === 'DELETE') {
    if (!id) return new Response('Missing id', { status: 400 });
    await deleteCustomer(env.DB, id);
    return new Response('Deleted', { status: 200 });
  }

  return new Response('Method Not Allowed', { status: 405 });
}

async function getAllCustomers(db) {
  const result = await db.prepare('SELECT * FROM customers ORDER BY name').all();
  return result.results;
}

async function getCustomerById(db, id) {
  return await db.prepare('SELECT * FROM customers WHERE id = ?').bind(id).first();
}

async function createCustomer(db, customer) {
  const { id, name, phone, address, createdAt } = customer;
  await db.prepare(`
    INSERT INTO customers (id, name, phone, address, createdAt)
    VALUES (?, ?, ?, ?, ?)
  `).bind(id, name, phone, address, createdAt).run();
}

async function updateCustomer(db, id, data) {
  const fields = [];
  const values = [];
  for (const [key, value] of Object.entries(data)) {
    if (key !== 'id') {
      fields.push(`${key} = ?`);
      values.push(value);
    }
  }
  values.push(id);
  const query = `UPDATE customers SET ${fields.join(', ')} WHERE id = ?`;
  await db.prepare(query).bind(...values).run();
  return getCustomerById(db, id);
}

async function deleteCustomer(db, id) {
  await db.prepare('DELETE FROM customers WHERE id = ?').bind(id).run();
}
