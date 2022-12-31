import { atom, useSetRecoilState, useRecoilState } from 'recoil';
import { useEffect } from 'react';
import styles from '@scss/app.module.scss';
import axios from 'axios'
import { PATH_PROFILE, PATH_PROFILE_PFP, PATH_PROFILE_PFP_SUFFIX, PATH_PROFILE_SUFFIX } from 'utilities/variables';
import useWallet from '@hooks/useWallet';

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
  const address = useWallet();

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
            const platformPreference = response.data.profile.platform_preference;
            console.log('preferred platform', platformPreference);
            setProfile(profile => ({...profile, platformAddress: response.data.profile.platforms[platformPreference]}));
            console.log('profile with platformAddress', profile);
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

  if (!profile) {
    return <p>Loading or File Missing...</p>;
  }
  const platformPreference = profile.platform_preference.charAt(0).toUpperCase() + profile.platform_preference.slice(1);
  return (
    <div>
      {profile && (
        <p>
          <img src={profilePfpUrl} className={styles.profileImage} alt="profile" />
          <br />
          <h1>{ profile.name } </h1>
          <p> 
            { platformPreference }
             {' '}is your preferred platform 
            <br />
            with identifier: <a href={ 'https://twitter.com/' + profile.platformAddress } rel="noreferrer" target="_blank">{ profile.platformAddress }</a>
            <br />
          </p>
        </p>
      )}
      <br />
      Profile
      <br />
      Wallet Address: {address}
      <br /><br />
      Profile URL: {profileUrl}
      <br /><br />
      Profile PFP URL: {profilePfpUrl}
    </div>
  );

}
