// api/service.js
export async function handleService(request, env) {
  const method = request.method;
  const url = new URL(request.url);
  const id = url.searchParams.get('id');

  if (method === 'GET') {
    if (id) {
      const service = await getServiceById(env.DB, id);
      return new Response(JSON.stringify(service), { headers: { 'Content-Type': 'application/json' } });
    }
    const services = await getAllServices(env.DB);
    return new Response(JSON.stringify(services), { headers: { 'Content-Type': 'application/json' } });
  }

  if (method === 'POST') {
    const data = await request.json();
    const newService = {
      id: crypto.randomUUID(),
      ...data,
      createdAt: new Date().toISOString()
    };
    await createService(env.DB, newService);
    return new Response(JSON.stringify(newService), { status: 201 });
  }

  if (method === 'PUT') {
    if (!id) return new Response('Missing id', { status: 400 });
    const data = await request.json();
    const updated = await updateService(env.DB, id, data);
    return new Response(JSON.stringify(updated), { headers: { 'Content-Type': 'application/json' } });
  }

  if (method === 'DELETE') {
    if (!id) return new Response('Missing id', { status: 400 });
    await deleteService(env.DB, id);
    return new Response('Deleted', { status: 200 });
  }

  return new Response('Method Not Allowed', { status: 405 });
}

async function getAllServices(db) {
  const result = await db.prepare('SELECT * FROM services ORDER BY name').all();
  return result.results;
}

async function getServiceById(db, id) {
  return await db.prepare('SELECT * FROM services WHERE id = ?').bind(id).first();
}

async function createService(db, service) {
  const { id, name, price, description, createdAt } = service;
  await db.prepare(`
    INSERT INTO services (id, name, price, description, createdAt)
    VALUES (?, ?, ?, ?, ?)
  `).bind(id, name, price, description, createdAt).run();
}

async function updateService(db, id, data) {
  const fields = [];
  const values = [];
  for (const [key, value] of Object.entries(data)) {
    if (key !== 'id') {
      fields.push(`${key} = ?`);
      values.push(value);
    }
  }
  values.push(id);
  const query = `UPDATE services SET ${fields.join(', ')} WHERE id = ?`;
  await db.prepare(query).bind(...values).run();
  return getServiceById(db, id);
}

async function deleteService(db, id) {
  await db.prepare('DELETE FROM services WHERE id = ?').bind(id).run();
}
