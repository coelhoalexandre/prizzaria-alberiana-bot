import commands, { getAvailableCommands } from './commands.js';
import Message from './Message.js';

const analyzeMessage = (message: Message) => {
  const command = commands[message.formattedMessageBody];
  let flag = false;

  if (typeof command === 'function') {
    if (message.chatProcess) {
      console.log('Processo cancelado.');
      message.chatProcess = null;
    }
    flag = command(message);
  }

  flag = flag || message.executeProcess();

  if (!flag) {
    const messageHours = message.date.getHours();
    let compliance = 'Olá';

    if (messageHours >= 18 || 6 > messageHours) compliance = 'Boa noite';
    else if (messageHours > 6 && 12 > messageHours) compliance = 'Bom dia';
    else compliance = 'Boa tarde';

    const commandsList = getAvailableCommands(message.senderHasRegistration);
    const prefix = '\n- ';
    const commandsListInString = commandsList
      .map((command) =>
        command.padStart(command.length + prefix.length, prefix)
      )
      .join('');

    message.sendMessage(
      `${compliance}!\n\nVocê está falando com a Pizzaria Alberiana! Envie uma mensagem com o comando do que deseja:\n${commandsListInString}`
    );
  }
};

export default analyzeMessage;
