// api/auth.js
// Menggunakan library jose untuk JWT (di Cloudflare Workers support)
// Pastikan menambahkan "jose" di package.json
import { SignJWT, jwtVerify } from 'jose';

// Secret key dari environment variable
const SECRET = new TextEncoder().encode(env.JWT_SECRET || 'your-secret-key');

export async function handleAuth(request, env) {
  const method = request.method;
  const url = new URL(request.url);

  if (method === 'POST' && url.pathname === '/api/auth/login') {
    const { username, password } = await request.json();
    // Validasi sederhana (bisa diganti dengan DB)
    if (username === 'admin' && password === 'password') {
      const token = await new SignJWT({ username })
        .setProtectedHeader({ alg: 'HS256' })
        .setExpirationTime('1h')
        .sign(SECRET);
      return new Response(JSON.stringify({ token }), { headers: { 'Content-Type': 'application/json' } });
    }
    return new Response('Invalid credentials', { status: 401 });
  }

  if (method === 'GET' && url.pathname === '/api/auth/verify') {
    const authHeader = request.headers.get('Authorization');
    if (!authHeader) return new Response('No token', { status: 401 });
    const token = authHeader.split(' ')[1];
    try {
      const { payload } = await jwtVerify(token, SECRET);
      return new Response(JSON.stringify({ valid: true, payload }), { headers: { 'Content-Type': 'application/json' } });
    } catch (e) {
      return new Response('Invalid token', { status: 401 });
    }
  }

  return new Response('Method Not Allowed', { status: 405 });
}
