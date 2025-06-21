import twilio from 'twilio';

export async function POST(request) {
  try {
    // Parse the incoming form data from Twilio
    const formData = await request.formData();
    const incomingMessage = formData.get('Body');
    const fromNumber = formData.get('From');

    console.log('Incoming message:', incomingMessage, 'from:', fromNumber);
    console.log('Received message:', incomingMessage);

    // Create TwiML response
    const twiml = new twilio.twiml.MessagingResponse();
    twiml.message('Hello there!');

    // Return XML response
    return new Response(twiml.toString(), {
      headers: {
        'Content-Type': 'text/xml',
      },
    });
  } catch (error) {
    console.error('Error handling inbound message:', error);
    
    // Return error response
    const twiml = new twilio.twiml.MessagingResponse();
    twiml.message('Sorry, something went wrong.');
    
    return new Response(twiml.toString(), {
      headers: {
        'Content-Type': 'text/xml',
      },
    });
  }
}

export async function GET() {
  // Handle GET requests (for testing)
  const twiml = new twilio.twiml.MessagingResponse();
  twiml.message('Hello there!');
  
  return new Response(twiml.toString(), {
    headers: {
      'Content-Type': 'text/xml',
    },
  });
} 