import bodyParser from 'body-parser';
import express from 'express';
import ChatProperties from './interfaces/ChatProperties.js';
import TwilioMessage from './interfaces/TwilioMessage.js';
import analyzeMessage from './services/analyzeMessage.js';
import Message from './services/Message.js';

const chats = new Map<string, ChatProperties>();

const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({ extended: false }));

app.post('/webhook', async (req, res) => {
  const twilioMessage: TwilioMessage = req.body;
  const chatProperties: ChatProperties = chats.get(twilioMessage.WaId) || {
    process: null,
    sender: { hasRegistration: false },
  };
  const message = new Message({ twilioMessage, chatProperties, response: res });

  analyzeMessage(message);

  chats.set(twilioMessage.WaId, message.chat);
});

app.post('/status', async (req, res) => {
  // Exibe status de messagem enviada, recebida e lida
  console.log('/status: ', req.body);
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
