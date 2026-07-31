// app.js
import { apiFetch } from './api.js';

document.addEventListener('DOMContentLoaded', async () => {
  // Contoh: tampilkan statistik
  try {
    const today = new Date().toISOString().slice(0, 10);
    const stats = await apiFetch(`/reports?start=${today}&end=${today}`);
    const statsDiv = document.getElementById('stats');
    statsDiv.innerHTML = `
      <p>Total Pesanan Hari Ini: ${stats.totalOrders}</p>
      <p>Total Pendapatan Hari Ini: Rp ${stats.totalRevenue}</p>
      <p>Total Item Hari Ini: ${stats.totalItems}</p>
    `;
  } catch (e) {
    console.error(e);
  }
});
