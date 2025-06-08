import ProcessInterface from '../../interfaces/ProcessInterface';
import Message from '../Message';

enum OrderProcesses {
  INIT_ORDER,
}

export default class OrderProcess implements ProcessInterface {
  currentProcess: OrderProcesses;

  constructor() {
    this.currentProcess = OrderProcesses.INIT_ORDER;
  }

  execute(message: Message) {}
}
