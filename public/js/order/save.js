// save.js
import { apiFetch } from '../api.js';
import { collectItems } from './item.js';

export async function handleSaveOrder(formData) {
  const items = collectItems(formData.querySelector('#itemsContainer'));
  const order = {
    customerId: formData.querySelector('#customerId').value,
    serviceId: formData.querySelector('#serviceId').value,
    items: items,
    total: parseFloat(formData.querySelector('#total').value) || 0,
    status: 'new'
  };
  return await apiFetch('/orders', {
    method: 'POST',
    body: JSON.stringify(order)
  });
}
