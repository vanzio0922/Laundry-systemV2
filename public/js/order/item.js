// item.js
export function addItemRow(container) {
  const row = document.createElement('div');
  row.className = 'item-row';
  row.innerHTML = `
    <input type="text" placeholder="Nama item" name="itemName">
    <input type="number" placeholder="Berat (kg)" name="itemWeight">
    <input type="text" placeholder="Catatan" name="itemNote">
    <button type="button" onclick="this.parentElement.remove()">Hapus</button>
  `;
  container.appendChild(row);
}

export function collectItems(container) {
  const rows = container.querySelectorAll('.item-row');
  return Array.from(rows).map(row => ({
    name: row.querySelector('[name="itemName"]').value,
    weight: parseFloat(row.querySelector('[name="itemWeight"]').value) || 0,
    note: row.querySelector('[name="itemNote"]').value
  }));
}
