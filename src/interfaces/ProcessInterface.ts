import Message from '../services/Message';

export default interface ProcessInterface {
  execute: (message: Message) => void;
  currentProcess: number;
}
