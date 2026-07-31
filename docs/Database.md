# Database Schema

## customers
- id (TEXT, PK)
- name (TEXT)
- phone (TEXT)
- address (TEXT)
- createdAt (TEXT)

## services
- id (TEXT, PK)
- name (TEXT)
- price (REAL)
- description (TEXT)
- createdAt (TEXT)

## orders
- id (TEXT, PK)
- customerId (TEXT, FK)
- serviceId (TEXT, FK)
- items (TEXT, JSON)
- total (REAL)
- status (TEXT)
- createdAt (TEXT)

## payments
- id (TEXT, PK)
- orderId (TEXT, FK)
- amount (REAL)
- method (TEXT)
- status (TEXT)
- createdAt (TEXT)

## uploads
- id (TEXT, PK)
- orderId (TEXT, FK)
- url (TEXT)
- description (TEXT)
- createdAt (TEXT)
