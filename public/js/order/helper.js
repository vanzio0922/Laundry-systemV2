// helper.js
export function generateOrderId() {
  return 'ORD-' + Date.now() + '-' + Math.random().toString(36).substr(2, 6);
}

export function validateOrder(data) {
  const errors = [];
  if (!data.customerId) errors.push('Customer required');
  if (!data.serviceId) errors.push('Service required');
  if (!data.items || data.items.length === 0) errors.push('Items required');
  if (!data.total || data.total <= 0) errors.push('Total must be > 0');
  return { valid: errors.length === 0, errors };
}

export function formatOrder(order) {
  return {
    ...order,
    totalFormatted: `Rp ${order.total}`,
    statusLabel: order.status.toUpperCase()
  };
}
