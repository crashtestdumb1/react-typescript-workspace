import { atom, useSetRecoilState, useRecoilValue, useRecoilState } from 'recoil';
import React, { useState, useEffect } from 'react';
import styles from '@scss/app.module.scss';
import axios from 'axios'
import { PATH_PROFILE, PATH_PROFILE_PFP, PATH_PROFILE_PFP_SUFFIX, PATH_PROFILE_SUFFIX } from 'utilities/variables';
import useWallet from '@hooks/useWallet';

type MyProfile = {
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

const myProfileState: MyProfile = {
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
};

export default function PageHttpGet() {
  const address = useWallet();

  const [myProfile, setMyProfile] = useState(myProfileState);
  const profileUrl = PATH_PROFILE + address + PATH_PROFILE_SUFFIX;
  const profilePfpUrl = PATH_PROFILE_PFP + address + PATH_PROFILE_PFP_SUFFIX;
  const [myPlatformPreference, setMyPlatformPreference] = useState('');
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
          setMyProfile(response.data.profile);
          if(response.data.profile.platform_preference) {
            setMyProfile(prevMyProfile => ({ ...prevMyProfile, ...response.data.profile}));
            setMyPlatformPreference(response.data.profile.platform_preference);
            const platformAddress = response.data.profile.platforms[myPlatformPreference];
            setMyProfile(prevMyProfile => ({
              ...prevMyProfile, platformAddress: platformAddress
            }));
            console.dir('profile after updates: ' + JSON.stringify(myProfile));
          } else {
            const myPlatformPreference = 'none';
          }
        } else {
          console.error('profile data missing');
        }
      } catch (error) {
        console.error(error);
      }
    }
    fetchData();
  }, [profileUrl]);

  if (!myProfile) {
    return <p>Loading or File Missing...</p>;
  }

  return (
    <div>Axios Test
      {myProfile && (
        <p>
          <h1>{ myProfile.name } </h1>
          <img src={profilePfpUrl} alt="pfp" width="100px" />
          <p> 
            { myPlatformPreference } is your preferred platform 
            <br />
            with address: { myProfile.platformAddress }
            <br />
          </p>
          <br />
        </p>
      )}
    </div>
  );

}
