import { Response } from 'express';
import ChatProperties from '../interfaces/ChatProperties.js';
import ProcessInterface from '../interfaces/ProcessInterface.js';

enum OrderProcesses {
  INIT_ORDER,
}

export default class OrderProcess implements ProcessInterface {
  currentProcess: OrderProcesses;

  constructor() {
    this.currentProcess = OrderProcesses.INIT_ORDER;
  }

  execute(res: Response, chatProperties: ChatProperties, messageBody: string) {}
}
