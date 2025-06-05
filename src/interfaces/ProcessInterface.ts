import { Response } from 'express';
import ChatProperties from './ChatProperties';

export default interface ProcessInterface {
  execute: (
    res: Response,
    chatProperties: ChatProperties,
    messageBody: string
  ) => void;
  currentProcess: number;
}
