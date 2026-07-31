// detail.js
import { apiFetch } from '../api.js';

export async function renderOrderDetail(orderId, container) {
  const order = await apiFetch(`/orders?id=${orderId}`);
  container.innerHTML = `
    <h2>Detail Pesanan ${order.id}</h2>
    <p>Pelanggan: ${order.customerId}</p>
    <p>Layanan: ${order.serviceId}</p>
    <p>Total: ${order.total}</p>
    <p>Status: ${order.status}</p>
    <p>Items: ${JSON.stringify(order.items)}</p>
    <button onclick="window.location='/orders.html'">Kembali</button>
  `;
}
