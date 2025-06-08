import { CommandFn } from '.';
import OrderProcess from '../processes/OrderProcess.js';

export const order: CommandFn = (message) => {
  message.chatProcess = new OrderProcess();
  return false;
};
