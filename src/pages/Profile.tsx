import { useConnectedWallet, useWallet } from '@terra-money/wallet-provider';
import { atom, useSetRecoilState, useRecoilValue } from 'recoil';
import { useEffect } from 'react';
import styles from '@scss/app.module.scss';

export const PATH_PROFILE =
  'https://y-foundry-dao.github.io/yfd-dapp-profiles/profile/';
export const PATH_PROFILE_PFP = 'https://y-foundry-dao.github.io/yfd-dapp-profiles/profile/pfp/';
export const PATH_PROFILE_PFP_DEFAULT = 'https://y-foundry-dao.github.io/yfd-dapp-profiles/profile/pfp/default.png';
export const PATH_PROFILE_SUFFIX = '.json';
export const PATH_PROFILE_PFP_SUFFIX = '.png';


const dataState = atom({
  key: 'dataState',
  default: [],
});

const walletAddress = atom({
  key: 'walletAddress',
  default: ''
})

export default function PageProfile() {
  const setWalletAddress = useSetRecoilState(walletAddress);
  const connectedWallet = useConnectedWallet();

  useEffect(() => {
    if (connectedWallet !== undefined) {
      setWalletAddress(connectedWallet?.walletAddress);
    }
  }, [connectedWallet]);

  const address = connectedWallet?.walletAddress;
  const setData = useSetRecoilState(dataState);
  const profileUrl = PATH_PROFILE + address + PATH_PROFILE_SUFFIX;
  const profilePfpUrl = PATH_PROFILE_PFP + address + PATH_PROFILE_PFP_SUFFIX;

  useEffect(() => {
    async function fetchData() {
      const response = await fetch(profileUrl);
      const data = await response.json();
      setData(data);
    }
    fetchData();
  }, [setData]);
  
  const data = useRecoilValue(dataState);
  console.log('data' + Object.keys(data));
  console.log('profileUrl: ' + profileUrl);
  console.log('profilePfpUrl: ' + profilePfpUrl);

  return (
    <>
      <h1>Profile</h1>
      Profile URL: {profileUrl}
      <br />
      Profile PFP URL: {profilePfpUrl}
      <br />
      <img src={profilePfpUrl} className={styles.profilePfp} alt="profile" />
      <br />
    </>
  );
}
