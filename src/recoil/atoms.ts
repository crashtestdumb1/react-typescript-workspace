
import { atom } from 'recoil';

export const walletAddress = atom({
    key: 'walletAddress',
    default: ''
  })
  
  type Profile = {
    name: string;
    address: string;
    platform_preference: string;
    platformAddress: string;
    platforms: Array<{
      email: string;
      keybase: string;
      instagram: string;
      twitter: string;
      discord: string;
      telegram: string;
      github: string;
    }>;
  };
  
export const profileState = atom<Profile>({
    key: 'profileState',
    default: {
      name: '',
      address: '',
      platform_preference: '',
      platformAddress: '',
      platforms: [
        {
          email: '',
          keybase: '',
          instagram: '',
          twitter: '',
          discord: '',
          telegram: '',
          github: ''
        }]
    }
  });
  
  