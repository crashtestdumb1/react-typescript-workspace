import { useEffect } from 'react';
import { atom, useSetRecoilState, useRecoilState } from 'recoil';
import styles from '@scss/app.module.scss';

import { PATH_PROFILE, PATH_PROFILE_PFP, PATH_PROFILE_PFP_SUFFIX, PATH_PROFILE_SUFFIX } from 'utilities/variables';
import { profileState } from '@recoil/atoms';
import useWallet from '@hooks/useWallet';

export default function PageHttpGet() {
  const address = useWallet();
  console.log ('connected wallet address: ' + address);

  const [profile, setProfile] = useRecoilState(profileState);
  console.log ('loaded profile: ' + JSON.stringify(profile));

  const profileUrl = PATH_PROFILE + address + PATH_PROFILE_SUFFIX;
  const profilePfpUrl = PATH_PROFILE_PFP + address + PATH_PROFILE_PFP_SUFFIX;

  if (!profile) {
    return <p>Loading or File Missing...</p>;
  }
  
  return (
    <div>
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
