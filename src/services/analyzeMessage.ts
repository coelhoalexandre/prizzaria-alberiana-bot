import { Response } from 'express';
import ChatProperties from '../interfaces/ChatProperties.js';
import getPizzariaMenu from './getPizzariaMenu.js';
import OrderProcess from './OrderProcess.js';
import RegistrationProcess from './RegistrationProcess.js';
import Message from '../interfaces/Message.js';
import sendMessage from './sendMessage.js';

const commands: Record<
  string,
  (option: { chatProperties: ChatProperties; res: Response }) => void
> = {
  '/cadastrar': ({ chatProperties, res }) => {
    if (chatProperties.hasRegistration) {
      sendMessage(
        res,
        `Não é possível realizar cadastro novamente. Você já está cadastro com o usuário de nome ${chatProperties.profile?.name}.`
      );
      return;
    }
    chatProperties.process = new RegistrationProcess();
  },
  '/cardapio': ({ res }) => sendMessage(res, getPizzariaMenu()),
  '/cardápio': ({ res }) => sendMessage(res, getPizzariaMenu()),
  '/pedir': ({ chatProperties }) =>
    (chatProperties.process = new OrderProcess()),
  '/perfil': ({ chatProperties, res }) => {
    if (!chatProperties.hasRegistration) {
      sendMessage(
        res,
        'Não é possível ver dados do perfil. Você ainda não esta cadastro. Para tal, envie /cadastrar.'
      );
      return;
    }

    sendMessage(
      res,
      `Seu perfil contém os seguintes dados:\n\nNome: ${chatProperties.profile?.name}\nEndereço: ${chatProperties.profile?.address}`
    );
  },
};

const analyzeMessage = (
  res: Response,
  chatProperties: ChatProperties,
  message: Message
) => {
  const messageBody = message.Body;
  // Adicionar formatação de acento
  const formattedCurrentMessageBody = messageBody.toLowerCase().trim();
  const command = commands[formattedCurrentMessageBody];
  let flag = false;

  if (typeof command === 'function') {
    if (chatProperties.process) {
      console.log('Processo cancelado.');
      chatProperties.process = null;
    }
    command({ chatProperties, res });
    flag = true;
  }

  if (chatProperties.process) {
    chatProperties.process.execute(res, chatProperties, messageBody);
    return;
  }

  if (!flag) {
    // Resposta se entrar em contato
    const messageHours = new Date().getHours();
    let compliance = 'Olá';

    if (messageHours >= 18 || 6 > messageHours) compliance = 'Boa noite';
    else if (messageHours > 6 && 12 > messageHours) compliance = 'Bom dia';
    else compliance = 'Boa tarde';

    const commandsGlobals = [
      '- /cardápio (em breve)\n',
      '- /ajuda (em breve)\n',
    ];
    const commandsToUnregisteredUsers = ['- /cadastrar\n'];
    const commandsToRegisteredUsers = ['- /perfil\n'];
    const currentCommands: string[] = [];

    if (chatProperties.hasRegistration)
      currentCommands.push(...commandsToRegisteredUsers);
    else currentCommands.push(...commandsToUnregisteredUsers);

    currentCommands.push(...commandsGlobals);
    currentCommands[currentCommands.length - 1].replace('\n', '');
    sendMessage(
      res,
      `${compliance}!\n\nVocê está falando com a Pizzaria Alberiana! Envie uma mensagem com o comando do que deseja:\n\n${currentCommands.join(
        ''
      )}`
    );
  }
};

export default analyzeMessage;
