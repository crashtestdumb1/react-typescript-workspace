import { useConnectedWallet } from '@terra-money/wallet-provider';
import { atom, useSetRecoilState, useRecoilValue, useRecoilState } from 'recoil';
import { useState, useEffect } from 'react';
import styles from '@scss/app.module.scss';
import axios from 'axios'
import { PATH_PROFILE, PATH_PROFILE_PFP, PATH_PROFILE_PFP_SUFFIX, PATH_PROFILE_SUFFIX } from 'utilities/variables';

const walletAddress = atom({
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

const profileState = atom<Profile>({
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

export default function PageHttpGet() {
  const [profile, setProfile] = useRecoilState(profileState);

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

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await axios.get(profileUrl, {
          headers: {
            'Content-Type': 'application/json',
          },
        });
        if(response.data.profile) {
          console.dir('response.data.profile: ' + JSON.stringify(response.data.profile));
          setProfile(response.data.profile);
          if(response.data.profile.platform_preference) {
            console.log('preferred platform', response.data.profile.platform_preference);
            const platformPreference = response.data.profile.platform_preference;
            const platformAddress = 'none';
            setProfile({...profile,
                platformAddress: response.data.profile.platforms[platformPreference]
            });
          } else {
            const platformPreference = 'none';
          }
        } else {
          console.error('profile data missing');
        }
      } catch (error) {
        console.error(error);
      }
    }
    fetchData();
  }, [profileUrl, setProfile]);

  if (!profile) {
    return <p>Loading or File Missing...</p>;
  }

  return (
    <div>Profile
      <br />
      Wallet Address: {address}
      <br /><br />
      Profile URL: {profileUrl}
      <br /><br />
      Profile PFP URL: {profilePfpUrl}
      {profile && (
        <p>
          <img src={profilePfpUrl} className={styles.profileImage} alt="profile" />
          <br />
          <h1>{ profile.name } </h1>
          <img src={profilePfpUrl} alt="pfp" width="75px" />
          <p> 
            { profile.platform_preference } is your preferred platform 
            <br />
            with address: { profile.platformAddress }
            <br />
          </p>
          <br />
        </p>
      )}
    </div>
  );

}
