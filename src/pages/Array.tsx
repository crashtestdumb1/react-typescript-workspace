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

export default function PageArray() {
  const setWalletAddress = useSetRecoilState(walletAddress);
  const connectedWallet = useConnectedWallet();

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

  
  const getData: any = async () => {
    const { data } = await axios.get(profileUrl);
    return data
  }

  const [data, setData] = useRecoilState(dataState)
  useEffect(() => {
    getData().then((res: any) => setData(res))
  }, []);

  const products = [
    { title: 'Cabbage', isFruit: false, id: 1 },
    { title: 'Garlic', isFruit: false, id: 2 },
    { title: 'Apple', isFruit: true, id: 3 },
  ];

  console.log('products', products);

  const listItems = products.map(product =>
    <li
      key={product.id}
      style={{
        color: product.isFruit ? 'magenta' : 'darkgreen'
      }}
    >
      {product.title}
    </li>
  );
    
  return (
    <div>
      <h1>Products Array</h1>
      <ul>{listItems}</ul>
    </div>
  );
}