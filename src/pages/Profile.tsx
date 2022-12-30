import { useConnectedWallet } from '@terra-money/wallet-provider';
import { atom, useSetRecoilState, useRecoilValue, useRecoilState } from 'recoil';
import { useEffect } from 'react';
import styles from '@scss/app.module.scss';
import axios from 'axios'

export const PATH_PROFILE =
  'https://y-foundry-dao.github.io/yfd-dapp-profiles/profile/';
export const PATH_PROFILE_PFP = 'https://y-foundry-dao.github.io/yfd-dapp-profiles/profile/pfp/';
export const PATH_PROFILE_PFP_DEFAULT = 'https://y-foundry-dao.github.io/yfd-dapp-profiles/profile/pfp/default.png';
export const PATH_PROFILE_SUFFIX = '.json';
export const PATH_PROFILE_PFP_SUFFIX = '.png';
export const PATH_TEST = 'https://y-foundry-dao.github.io/yfd-dapp-profiles/profile/terra1upleyfx24jehpgfy9d79d9scps20ffuf6vy706.json';


const dataState = atom({
  key: 'dataState',
  default: {},
});

const walletAddress = atom({
  key: 'walletAddress',
  default: ''
})

const profileState = atom({
  key: 'profileState',
  default: ''
})

export default function PageProfile() {
  const setWalletAddress = useSetRecoilState(walletAddress);
  const connectedWallet = useConnectedWallet();
  const [profile, setProfile] = useRecoilState(profileState);

  const address = connectedWallet?.walletAddress;
  
  console.log('connectedWallet: ' + address);

  const profileUrl = PATH_PROFILE + address + PATH_PROFILE_SUFFIX;
  const profilePfpUrl = PATH_PROFILE_PFP + address + PATH_PROFILE_PFP_SUFFIX;
  console.log('profileUrl: ' + profileUrl);
  console.log('profilePfpUrl: ' + profilePfpUrl);

  if (connectedWallet !== undefined) {
    setWalletAddress(connectedWallet?.walletAddress);
  }
/* this shit runs away
  useEffect(() => {
    async () => {
      const response = await fetch(profileUrl);
      const json = await response.json();
      setProfile(json);
      console.log('profile', json);
    };
  });
*/
const getData: any = async () => {
  const { data } = await axios.get(profileUrl);
  return data
}

const [data, setData] = useRecoilState(dataState)
useEffect(() => {
  getData().then((res: any) => setData(res.json))
}, []);

console.log('profile',data);

return (
    <div>
      <h1>Profile</h1>
      <h3>Wallet Address: {address}</h3>
      Profile URL: {profileUrl}
      <br /><br />
      Profile PFP URL: {profilePfpUrl}
      <br />
      <img src={profilePfpUrl} className={styles.profileImage} alt="profile" />
      <br />
    </div>
  );
}