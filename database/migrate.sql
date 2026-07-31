-- migrate.sql
-- Jalankan perintah ini untuk membuat tabel jika belum ada
-- (sama seperti schema.sql, tetapi bisa ditambahkan indeks)
CREATE INDEX IF NOT EXISTS idx_orders_customer ON orders(customerId);
CREATE INDEX IF NOT EXISTS idx_orders_service ON orders(serviceId);
CREATE INDEX IF NOT EXISTS idx_payments_order ON payments(orderId);
CREATE INDEX IF NOT EXISTS idx_uploads_order ON uploads(orderId);
