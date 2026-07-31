// payment.js
import { apiFetch } from './api.js';

export async function loadPayments() {
  const payments = await apiFetch('/payments');
  const container = document.getElementById('paymentList');
  container.innerHTML = payments.map(p => `
    <tr>
      <td>${p.id}</td>
      <td>${p.orderId}</td>
      <td>${p.amount}</td>
      <td>${p.method}</td>
      <td>${p.status}</td>
      <td>
        <button onclick="editPayment('${p.id}')">Edit</button>
        <button onclick="deletePayment('${p.id}')">Hapus</button>
      </td>
    </tr>
  `).join('');
}
