import { useConnectedWallet } from '@terra-money/wallet-provider';
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

export default function PageReadPrint() {
  const setWalletAddress = useSetRecoilState(walletAddress);
  const connectedWallet = useConnectedWallet();
  const setData = useSetRecoilState(dataState);
  const data = useRecoilValue(dataState);

  useEffect(() => {
    if (connectedWallet !== undefined) {
      setWalletAddress(connectedWallet?.walletAddress);
    }
  }, [connectedWallet, setWalletAddress]);

  const address = connectedWallet?.walletAddress;
  const profileUrl = PATH_PROFILE + address + PATH_PROFILE_SUFFIX;
  const profilePfpUrl = PATH_PROFILE_PFP + address + PATH_PROFILE_PFP_SUFFIX;
  console.log('profileUrl: ' + profileUrl);
  console.log('profilePfpUrl: ' + profilePfpUrl);

  useEffect(() => {
    fetch(profileUrl)
    .then((response) => response.json())
    .then((json) => console.log(json));
  }, [profileUrl, setData]);

  return (
    <div>
      <h1>Read File & Print It... </h1>
      <h3>{profileUrl}</h3>
      <h3>{profilePfpUrl}</h3>
    </div>
  );
}