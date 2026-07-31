// render.js
import { apiFetch } from '../api.js';
import { formatOrder } from './helper.js';

export async function renderOrders(container, filter = '') {
  const orders = await apiFetch('/orders');
  const filtered = filter ? orders.filter(o => o.status === filter) : orders;
  container.innerHTML = `
    <table>
      <thead>
        <tr>
          <th>ID</th>
          <th>Pelanggan</th>
          <th>Layanan</th>
          <th>Total</th>
          <th>Status</th>
          <th>Aksi</th>
        </tr>
      </thead>
      <tbody>
        ${filtered.map(order => `
          <tr>
            <td>${order.id}</td>
            <td>${order.customerId}</td>
            <td>${order.serviceId}</td>
            <td>${order.total}</td>
            <td>${order.status}</td>
            <td>
              <button onclick="viewOrder('${order.id}')">Detail</button>
              <button onclick="deleteOrder('${order.id}')">Hapus</button>
            </td>
          </tr>
        `).join('')}
      </tbody>
    </table>
  `;
}
