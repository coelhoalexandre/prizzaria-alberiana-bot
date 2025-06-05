import { Response } from 'express';
import ChatProperties from '../interfaces/ChatProperties.js';
import ProcessInterface from '../interfaces/ProcessInterface.js';
import sendMessage from './sendMessage.js';

enum RegistrationProcesses {
  INIT_REGISTER,
  REGISTER_NAME,
  REGISTER_ADDRESS,
}

export default class RegistrationProcess implements ProcessInterface {
  public currentProcess: RegistrationProcesses;

  constructor() {
    this.currentProcess = RegistrationProcesses.INIT_REGISTER;
  }

  public execute(
    res: Response,
    chatProperties: ChatProperties,
    messageBody: string
  ) {
    switch (this.currentProcess) {
      case RegistrationProcesses.INIT_REGISTER:
        sendMessage(
          res,
          'Vamos fazer o cadastro!\n\nQual seria o nome que deseja registrar?'
        );
        chatProperties.profile = { name: null, address: null };
        this.currentProcess = RegistrationProcesses.REGISTER_NAME;
        break;
      case RegistrationProcesses.REGISTER_NAME:
        sendMessage(
          res,
          `Seu perfil será registrado com o nome: ${messageBody}.\n\nAgora precisamos de um endereço!\n\nUse o seguinte modelo: Rua, número. Bairro - Cidade.\n\nEnvie a mensagem com seu endereço:`
        );
        chatProperties.profile!.name = messageBody;
        this.currentProcess = RegistrationProcesses.REGISTER_ADDRESS;
        break;
      case RegistrationProcesses.REGISTER_ADDRESS:
        chatProperties.profile!.address = messageBody;
        sendMessage(
          res,
          `O endereço do perfil registrado como: ${messageBody}.\n\nParabéns! Finalizamos o cadastro. Os seus dados são:\n\nNome: ${
            chatProperties.profile!.name
          }\nEndereço: ${
            chatProperties.profile!.address
          }\n\nÉ possível ver dados do perfil com /perfil.`
        );
        chatProperties.hasRegistration = true;
        chatProperties.process = null;
        break;
      default:
        console.log('Processo não definido');
        break;
    }
  }
}
