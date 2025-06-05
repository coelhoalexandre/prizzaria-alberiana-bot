import ProcessInterface from './ProcessInterface';

export default interface ChatProperties {
  process: ProcessInterface | null;
  profile?: { name: string | null; address: string | null };
  hasRegistration: boolean;
}
