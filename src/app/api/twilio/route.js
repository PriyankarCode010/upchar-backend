// Download the helper library from https://www.twilio.com/docs/node/install
import twilio from "twilio";

// Twilio credentials from environment variables
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = twilio(accountSid, authToken);

export async function POST(request) {
  try {
    // Get the incoming message data
    const body = await request.json();
    const userPhone = body.phone || '+917022112496';

    // Send "Hello there!" in response to any user message
    const message = await client.messages.create({
      body: 'Hello there!',
      from: 'whatsapp:+14155238886',
      to: `whatsapp:${userPhone}`
    });

    console.log('Message SID:', message.sid);
    return Response.json({ 
      success: true, 
      messageSid: message.sid,
      sentMessage: 'Hello there!'
    });
  } catch (error) {
    console.error('Twilio error:', error);
    return Response.json({ success: false, error: error.message }, { status: 500 });
  }
}

export async function GET() {
  try {
    const message = await client.messages.create({
      body: 'Hello there!',
      from: 'whatsapp:+14155238886',
      to: 'whatsapp:+917022112496'
    });

    console.log('Message SID:', message.sid);
    return Response.json({ 
      success: true, 
      messageSid: message.sid,
      sentMessage: 'Hello there!'
    });
  } catch (error) {
    console.error('Twilio error:', error);
    return Response.json({ success: false, error: error.message }, { status: 500 });
  }
}