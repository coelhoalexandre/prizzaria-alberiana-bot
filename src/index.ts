import bodyParser from 'body-parser';
import express from 'express';
import ChatProperties from './interfaces/ChatProperties.js';
import Message from './interfaces/Message.js';
import analyzeMessage from './services/analyzeMessage.js';

const chats = new Map<string, ChatProperties>();

const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({ extended: false }));

app.post('/webhook', async (req, res) => {
  const message: Message = req.body;
  const chatProperties: ChatProperties = chats.get(message.WaId) || {
    process: null,
    hasRegistration: false,
  };

  console.log('Mensagem: ', message);

  analyzeMessage(res, chatProperties, message);

  chats.set(message.WaId, chatProperties);
});

app.post('/status', async (req, res) => {
  // Exibe status de messagem enviada, recebida e lida
  console.log('/status: ', req.body);
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
