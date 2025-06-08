import { CommandFn } from '.';
import RegistrationProcess from '../processes/RegistrationProcess.js';

export const register: CommandFn = (message) => {
  if (message.senderHasRegistration) {
    message.sendMessage(
      `Não é possível realizar cadastro novamente. Você já está cadastro com o usuário de nome ${message.senderProfile?.name}.`
    );
    return true;
  }

  message.chatProcess = new RegistrationProcess();
  return false;
};
