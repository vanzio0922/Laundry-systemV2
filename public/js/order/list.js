// list.js
import { renderOrders } from './render.js';

export async function renderOrderList(container, filter) {
  await renderOrders(container, filter);
}
