import { Response } from 'express';
import ChatProperties from '../interfaces/ChatProperties';
import TwilioMessage from '../interfaces/TwilioMessage';
import ProcessInterface from '../interfaces/ProcessInterface';
import MessagingResponse from 'twilio/lib/twiml/MessagingResponse.js';
import Profile from '../interfaces/Profile';

export default class Message {
  public twilioMessage: TwilioMessage;
  public date: Date;
  public chat: ChatProperties;
  public body: string;
  public formattedMessageBody: string;

  private response: Response;

  constructor({
    twilioMessage,
    chatProperties,
    response,
  }: {
    twilioMessage: TwilioMessage;
    chatProperties: ChatProperties;
    response: Response;
  }) {
    this.twilioMessage = twilioMessage;
    this.date = new Date();
    this.chat = chatProperties;
    this.response = response;
    this.body = twilioMessage.Body;
    this.formattedMessageBody = this.formatMessageBody();
  }

  public get senderHasRegistration() {
    return this.chat.sender.hasRegistration;
  }

  public set senderHasRegistration(hasRegistration: boolean) {
    this.chat.sender.hasRegistration = hasRegistration;
  }

  public get senderProfile(): Profile | undefined {
    return this.chat.sender.profile;
  }

  public set senderProfile(profile: Partial<Profile>) {
    this.chat.sender.profile = this.chat.sender.profile || {
      name: null,
      address: null,
    };
    Object.assign(this.chat.sender.profile || {}, profile);
  }

  public set chatProcess(process: ProcessInterface | null) {
    this.chat.process = process;
  }

  public executeProcess = (): boolean => {
    if (!this.chat.process) return false;

    this.chat.process.execute(this);
    return true;
  };

  public sendMessage = (body: string) => {
    const twiml = new MessagingResponse();

    twiml.message(body);
    this.response.type('text/xml').send(twiml.toString());
  };

  private formatMessageBody() {
    // Decompõe cada caractere acentuado para caractere base e caractere do acento
    const normalizedText = this.body.normalize('NFD');

    // Substitui os caracteres Unicode correspondentes ao diacríticos para vazio
    const unaccentedText = normalizedText.replace(/[\u0300-\u036f]/g, '');

    // Transforma os caracteres para sua versão minuscula
    const lowerCaseText = unaccentedText.toLowerCase();

    // Remove os espaços no inicio e fim
    const formattedText = lowerCaseText.trim();

    return formattedText;
  }
}
