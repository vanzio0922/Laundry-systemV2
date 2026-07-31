// api/upload.js
export async function handleUpload(request, env) {
  if (request.method !== 'POST') {
    return new Response('Method Not Allowed', { status: 405 });
  }

  const formData = await request.formData();
  const file = formData.get('file');
  if (!file) {
    return new Response('No file uploaded', { status: 400 });
  }

  const cloudinaryUrl = env.CLOUDINARY_URL;
  if (!cloudinaryUrl) {
    return new Response('Cloudinary not configured', { status: 500 });
  }

  // Upload ke Cloudinary menggunakan fetch
  const formDataCloudinary = new FormData();
  formDataCloudinary.append('file', file);
  formDataCloudinary.append('upload_preset', 'laundry_preset'); // ganti sesuai preset

  const response = await fetch(cloudinaryUrl, {
    method: 'POST',
    body: formDataCloudinary
  });

  if (!response.ok) {
    const error = await response.json();
    return new Response(JSON.stringify({ error }), { status: response.status });
  }

  const data = await response.json();
  // Simpan ke database uploads
  const orderId = formData.get('orderId');
  if (orderId) {
    await db.prepare(`
      INSERT INTO uploads (id, orderId, url, description, createdAt)
      VALUES (?, ?, ?, ?, ?)
    `).bind(crypto.randomUUID(), orderId, data.secure_url, 'upload', new Date().toISOString()).run();
  }

  return new Response(JSON.stringify({ url: data.secure_url }), {
    headers: { 'Content-Type': 'application/json' }
  });
}
