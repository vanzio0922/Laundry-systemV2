// api/whatsapp.js
export async function handleWhatsApp(request, env) {
  const method = request.method;
  const url = new URL(request.url);

  if (method === 'POST') {
    const data = await request.json();
    const { to, message } = data;
    if (!to || !message) {
      return new Response('Missing to or message', { status: 400 });
    }

    // Kirim via Twilio
    const twilioAccountSid = env.TWILIO_ACCOUNT_SID;
    const twilioAuthToken = env.TWILIO_AUTH_TOKEN;
    const twilioWhatsAppNumber = env.TWILIO_WHATSAPP_NUMBER;

    if (!twilioAccountSid || !twilioAuthToken || !twilioWhatsAppNumber) {
      return new Response('Twilio not configured', { status: 500 });
    }

    const auth = btoa(`${twilioAccountSid}:${twilioAuthToken}`);
    const twilioUrl = `https://api.twilio.com/2010-04-01/Accounts/${twilioAccountSid}/Messages.json`;

    const body = new URLSearchParams({
      From: `whatsapp:${twilioWhatsAppNumber}`,
      To: `whatsapp:${to}`,
      Body: message
    });

    const response = await fetch(twilioUrl, {
      method: 'POST',
      headers: {
        'Authorization': `Basic ${auth}`,
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      body: body
    });

    const result = await response.json();
    return new Response(JSON.stringify(result), { status: response.status });
  }

  return new Response('Method Not Allowed', { status: 405 });
}
