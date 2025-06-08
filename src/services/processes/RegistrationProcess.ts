import ProcessInterface from '../../interfaces/ProcessInterface';
import Message from '../Message';

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

  public execute(message: Message) {
    switch (this.currentProcess) {
      case RegistrationProcesses.INIT_REGISTER:
        message.sendMessage(
          'Vamos fazer o cadastro!\n\nQual seria o nome que deseja registrar?'
        );
        this.currentProcess = RegistrationProcesses.REGISTER_NAME;
        break;
      case RegistrationProcesses.REGISTER_NAME:
        message.sendMessage(
          `Seu perfil será registrado com o nome: ${message.body}.\n\nAgora precisamos de um endereço!\n\nUse o seguinte modelo: Rua, número. Bairro - Cidade.\n\nEnvie a mensagem com seu endereço:`
        );
        message.senderProfile = { name: message.body };
        this.currentProcess = RegistrationProcesses.REGISTER_ADDRESS;
        break;
      case RegistrationProcesses.REGISTER_ADDRESS:
        message.senderProfile = { address: message.body };
        const { name, address } = message.senderProfile!;
        message.sendMessage(
          `O endereço do perfil registrado como: ${message.body}.\n\nParabéns! Finalizamos o cadastro. Os seus dados são:\n\nNome: ${name}\nEndereço: ${address}\n\nÉ possível ver dados do perfil com /perfil.`
        );
        message.senderHasRegistration = true;
        message.chatProcess = null;
        break;
      default:
        console.log('Processo não definido');
        break;
    }
  }
}
