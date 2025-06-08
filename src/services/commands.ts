import {
  order,
  profile,
  menu,
  register,
  type CommandFn,
} from './commandFunctions/index.js';

type SenderRegister = 'sender-registered' | 'sender-unregistered';
type Commands = '/cadastrar' | '/cardapio' | '/pedir' | '/perfil';
type CommandsList = [
  Commands,
  { type: 'global' | SenderRegister; fn: CommandFn }
][];

const commandsList: CommandsList = [
  ['/cadastrar', { type: 'sender-unregistered', fn: register }],
  ['/perfil', { type: 'sender-registered', fn: profile }],
  ['/cardapio', { type: 'global', fn: menu }],
  ['/pedir', { type: 'sender-registered', fn: order }],
];

const commands: Record<string, CommandFn> = {};

commandsList.forEach((command) => {
  commands[command[0]] = command[1].fn;
});

export default commands;

export const getAvailableCommands = (hasRegistration: boolean) => {
  const senderRegister: SenderRegister = hasRegistration
    ? 'sender-registered'
    : 'sender-unregistered';

  const availableCommands = commandsList
    .filter(
      (command) =>
        command[1].type === 'global' || command[1].type === senderRegister
    )
    .map((command) => command[0]);

  return availableCommands;
};
