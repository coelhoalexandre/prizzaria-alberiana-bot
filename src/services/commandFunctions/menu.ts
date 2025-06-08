import { CommandFn } from './';

export const menu: CommandFn = (message) => {
  const pizzariaMenu = `Cardápio da Pizzaria Alberiana:\n\n(1) Calabresa\n(2) 4 Queijos\n(3) Portuguesa`;
  message.sendMessage(pizzariaMenu);
  return true;
};
