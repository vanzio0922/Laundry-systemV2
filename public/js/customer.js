// customer.js
import { apiFetch } from './api.js';

export async function loadCustomers() {
  const customers = await apiFetch('/customers');
  const container = document.getElementById('customerList');
  container.innerHTML = customers.map(c => `
    <tr>
      <td>${c.name}</td>
      <td>${c.phone}</td>
      <td>${c.address}</td>
      <td>
        <button onclick="editCustomer('${c.id}')">Edit</button>
        <button onclick="deleteCustomer('${c.id}')">Hapus</button>
      </td>
    </tr>
  `).join('');
}
