import { useConnectedWallet } from '@terra-money/wallet-provider';
import { useSetRecoilState } from 'recoil';
import { useState } from 'react';
import { walletAddress } from 'recoil/atoms';
import { PATH_PROFILE, PATH_PROFILE_PFP, PATH_PROFILE_PFP_SUFFIX, PATH_PROFILE_SUFFIX } from 'utilities/variables';

// use local state to store profile data gathered from a remote JSON file via HTTP GET (fetch)

type FetchJson = {
  [key: string]: string | Array<{ [key: string]: string }>;
  name: string;
  address: string;
  platform_preference: string;
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

const initialFetchJson: FetchJson = {
    name: '',
    address: '',
    platform_preference: '',
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
};

export default function PageHttpGet() {
  const [fetchJson, setFetchJson] = useState<FetchJson>(initialFetchJson);
  const [error, setError] = useState(null);

  const setWalletAddress = useSetRecoilState(walletAddress);
  const connectedWallet = useConnectedWallet();

  console.log('connectedWallet: ' + connectedWallet);

  const address = connectedWallet?.walletAddress;
  const profileUrl = PATH_PROFILE + address + PATH_PROFILE_SUFFIX;
  const profilePfpUrl = PATH_PROFILE_PFP + address + PATH_PROFILE_PFP_SUFFIX;
  console.log('profileUrl: ' + profileUrl);
  console.log('profilePfpUrl: ' + profilePfpUrl);

  const fetchData = async () => {
    try {
      const response = await fetch(profileUrl);
      const data = await response.json();
      console.log('json data', data.profile);
      setFetchJson(data.profile);
      console.log('fetchJson', fetchJson);
    } catch (error) {
      console.log(error);
    }
  };
  fetchData();

  if (!fetchJson) {
    return <p>Loading or File Missing...</p>;
  } else {
  }

  return (
    <div>
      <p>Profile</p>
      {fetchJson && 
        <ul>
          <li>Name: {fetchJson.name}</li>
          <li>Address: {fetchJson.address}</li>
          <li>Platform Preference: {fetchJson.platform_preference}</li>
          <li>Platforms:</li>
        <ul>
        <>
          {Object.keys(fetchJson).map((key) => (
            <li>
              <>{key}: {fetchJson[key]}</>
            </li>
          ))}
        </>
      </ul>
    </ul>
  }
    </div>
  );
};
