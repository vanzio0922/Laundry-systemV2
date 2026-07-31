# Laundry-systemV2
# Laundry Bot

Sistem manajemen laundry berbasis Cloudflare Workers + D1 + Cloudinary.

## Fitur
- Manajemen pesanan, pelanggan, layanan, pembayaran
- Upload foto ke Cloudinary
- Laporan pendapatan
- Integrasi WhatsApp (Twilio)
- Autentikasi JWT

## Cara Deploy
1. Clone repositori
2. Install dependensi: `npm install`
3. Buat database D1: `npx wrangler d1 create laundry-db`
4. Jalankan migrasi: `npx wrangler d1 execute laundry-db --file=./database/schema.sql`
5. Jalankan indeks: `npx wrangler d1 execute laundry-db --file=./database/migrate.sql`
6. Isi `wrangler.jsonc` dengan konfigurasi Cloudinary, Twilio, dan JWT
7. Deploy: `npm run deploy`

## API
Lihat `docs/API.md`
