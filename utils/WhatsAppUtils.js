import twilio from 'twilio';
const accountSid = process.env.TWILIO_SID;
const authToken = process.env.TWILIO_TOKEN;
const client = twilio(accountSid, authToken);
const phone = process.env.ADMIN_PHONE;

export async function sendMessage(message) {
  try {
    await client.messages
      .create({ body: message, from: 'whatsapp:+14155238886', to: phone })
      .then(message => console.log(message.sid))
      .done();
  }
  catch (err) {
    console.log('Error al enviar mensaje', err);
  }
}