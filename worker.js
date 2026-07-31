// worker.js
import { handleOrder } from './api/order.js';
import { handlePayment } from './api/payment.js';
import { handleCustomer } from './api/customer.js';
import { handleService } from './api/service.js';
import { handleReport } from './api/report.js';
import { handleUpload } from './api/upload.js';
import { handleWhatsApp } from './api/whatsapp.js';
import { handleAuth } from './api/auth.js';

export default {
  async fetch(request, env, ctx) {
    const url = new URL(request.url);
    const path = url.pathname;

    // Routing API
    if (path.startsWith('/api/')) {
      const apiPath = path.slice(4); // hapus '/api/'
      const parts = apiPath.split('/');
      const resource = parts[0];

      switch (resource) {
        case 'orders':
          return handleOrder(request, env, ctx);
        case 'payments':
          return handlePayment(request, env, ctx);
        case 'customers':
          return handleCustomer(request, env, ctx);
        case 'services':
          return handleService(request, env, ctx);
        case 'reports':
          return handleReport(request, env, ctx);
        case 'upload':
          return handleUpload(request, env, ctx);
        case 'whatsapp':
          return handleWhatsApp(request, env, ctx);
        case 'auth':
          return handleAuth(request, env, ctx);
        default:
          return new Response('Not Found', { status: 404 });
      }
    }

    // Serve static assets from /public
    return env.ASSETS.fetch(request);
  }
};
