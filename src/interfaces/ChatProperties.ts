import ProcessInterface from './ProcessInterface.js';
import Profile from './Profile.js';

export default interface ChatProperties {
  process: ProcessInterface | null;
  sender: {
    profile?: Profile;
    hasRegistration: boolean;
  };
}
