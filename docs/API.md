# API Documentation

## Orders
- GET /api/orders - list
- GET /api/orders?id={id} - detail
- POST /api/orders - create
- PUT /api/orders?id={id} - update
- DELETE /api/orders?id={id} - delete

## Payments
- GET /api/payments - list
- GET /api/payments?id={id} - detail
- GET /api/payments?orderId={orderId} - list by order
- POST /api/payments - create
- PUT /api/payments?id={id} - update
- DELETE /api/payments?id={id} - delete

## Customers
- GET /api/customers - list
- GET /api/customers?id={id} - detail
- POST /api/customers - create
- PUT /api/customers?id={id} - update
- DELETE /api/customers?id={id} - delete

## Services
- GET /api/services - list
- GET /api/services?id={id} - detail
- POST /api/services - create
- PUT /api/services?id={id} - update
- DELETE /api/services?id={id} - delete

## Reports
- GET /api/reports?start={date}&end={date} - laporan berdasarkan rentang tanggal

## Upload
- POST /api/upload - upload file (multipart/form-data) dengan field `file` dan `orderId`

## WhatsApp
- POST /api/whatsapp - kirim pesan WhatsApp (body: { to, message })

## Auth
- POST /api/auth/login - login (body: { username, password }) -> return { token }
- GET /api/auth/verify - verifikasi token (header Authorization: Bearer <token>)
