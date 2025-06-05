import { Response } from 'express';
import MessagingResponse from 'twilio/lib/twiml/MessagingResponse.js';

const sendMessage = (res: Response, messageBody: string) => {
  const twiml = new MessagingResponse();

  twiml.message(messageBody);
  res.type('text/xml').send(twiml.toString());
};

export default sendMessage;
