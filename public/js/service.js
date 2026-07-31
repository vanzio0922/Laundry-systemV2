// service.js
import { apiFetch } from './api.js';

export async function loadServices() {
  const services = await apiFetch('/services');
  const container = document.getElementById('serviceList');
  container.innerHTML = services.map(s => `
    <tr>
      <td>${s.name}</td>
      <td>${s.price}</td>
      <td>${s.description}</td>
      <td>
        <button onclick="editService('${s.id}')">Edit</button>
        <button onclick="deleteService('${s.id}')">Hapus</button>
      </td>
    </tr>
  `).join('');
}
