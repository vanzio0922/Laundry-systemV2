-- seed.sql
INSERT INTO customers (id, name, phone, address, createdAt) VALUES
('cust1', 'Andi', '08123456789', 'Jl. Merdeka No.1', datetime('now')),
('cust2', 'Budi', '08198765432', 'Jl. Sudirman No.2', datetime('now'));

INSERT INTO services (id, name, price, description, createdAt) VALUES
('svc1', 'Cuci Reguler', 5000, 'Cuci + setrika', datetime('now')),
('svc2', 'Cuci Express', 10000, 'Selesai 3 jam', datetime('now'));

INSERT INTO orders (id, customerId, serviceId, items, total, status, createdAt) VALUES
('ord1', 'cust1', 'svc1', '{"count":3,"weight":2.5,"notes":"kemeja"}', 12500, 'new', datetime('now'));
