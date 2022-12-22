import { useConnectedWallet } from '@terra-money/wallet-provider';
import { atom, useSetRecoilState, useRecoilValue, useRecoilState } from 'recoil';
import React, { useEffect } from 'react';
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

export default function PageHttpGet() {
  const setWalletAddress = useSetRecoilState(walletAddress);
  const connectedWallet = useConnectedWallet();
  const [data, setData] = useRecoilState(dataState);

  useEffect(() => {
  
    if (connectedWallet !== undefined) {
      setWalletAddress(connectedWallet?.walletAddress);
    }
  }, [connectedWallet, setWalletAddress]);

  
  console.log('connectedWallet: ' + connectedWallet);

  const address = connectedWallet?.walletAddress;
  const profileUrl = PATH_PROFILE + address + PATH_PROFILE_SUFFIX;
  const profilePfpUrl = PATH_PROFILE_PFP + address + PATH_PROFILE_PFP_SUFFIX;
  console.log('profileUrl: ' + profileUrl);
  console.log('profilePfpUrl: ' + profilePfpUrl);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await axios.get('https://my-api.com/endpoint', {
          headers: {
            'Content-Type': 'application/json',
          },
        });
        setData(response.data);
      } catch (error) {
        console.error(error);
      }
    }
    fetchData();
  }, []);

  if (!data) {
    return <p>Loading...</p>;
  }

  return <p><h1>Http Get</h1></p>;

}
