// report.js
import { apiFetch } from './api.js';

export async function loadReport(start, end) {
  const data = await apiFetch(`/reports?start=${start}&end=${end}`);
  document.getElementById('reportResult').innerHTML = `
    <p>Total Pesanan: ${data.totalOrders}</p>
    <p>Total Pendapatan: Rp ${data.totalRevenue}</p>
    <p>Total Item: ${data.totalItems}</p>
  `;
}
