// upload.js
import { apiFetch } from '../api.js';

export async function handleUpload(file, orderId) {
  const formData = new FormData();
  formData.append('file', file);
  formData.append('orderId', orderId);

  const response = await fetch('/api/upload', {
    method: 'POST',
    body: formData
  });
  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error || 'Upload failed');
  }
  const data = await response.json();
  return data.url;
}
