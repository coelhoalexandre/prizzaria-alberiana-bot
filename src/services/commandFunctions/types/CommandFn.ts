import Message from '../../Message';

export type CommandFn = (message: Message) => boolean;
