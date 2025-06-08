import { CommandFn } from '.';

export const profile: CommandFn = (message) => {
  if (!message.senderHasRegistration) {
    message.sendMessage(
      'Não é possível ver dados do perfil. Você ainda não esta cadastro. Para tal, envie /cadastrar.'
    );
    return true;
  }

  const { name, address } = message.senderProfile || {};

  message.sendMessage(
    `Seu perfil contém os seguintes dados:\n\nNome: ${name}\nEndereço: ${address}`
  );

  return true;
};
