// api/report.js
export async function handleReport(request, env) {
  const method = request.method;
  const url = new URL(request.url);
  const start = url.searchParams.get('start');
  const end = url.searchParams.get('end');

  if (method === 'GET') {
    if (start && end) {
      const report = await getReportByDateRange(env.DB, start, end);
      return new Response(JSON.stringify(report), { headers: { 'Content-Type': 'application/json' } });
    }
    // default: laporan hari ini
    const today = new Date().toISOString().slice(0, 10);
    const report = await getReportByDateRange(env.DB, today, today);
    return new Response(JSON.stringify(report), { headers: { 'Content-Type': 'application/json' } });
  }

  return new Response('Method Not Allowed', { status: 405 });
}

async function getReportByDateRange(db, start, end) {
  // total orders, total pendapatan, total item
  const orders = await db.prepare(`
    SELECT COUNT(*) as totalOrders, SUM(total) as totalRevenue
    FROM orders
    WHERE date(createdAt) BETWEEN ? AND ?
  `).bind(start, end).first();

  const items = await db.prepare(`
    SELECT SUM(json_extract(items, '$.count')) as totalItems
    FROM orders
    WHERE date(createdAt) BETWEEN ? AND ?
  `).bind(start, end).first();

  return {
    start,
    end,
    totalOrders: orders.totalOrders || 0,
    totalRevenue: orders.totalRevenue || 0,
    totalItems: items.totalItems || 0
  };
}
