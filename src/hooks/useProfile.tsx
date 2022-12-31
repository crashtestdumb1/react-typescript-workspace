import axios from 'axios'
import { useRecoilState, useSetRecoilState } from 'recoil';
import { useEffect } from 'react';
import { profileState } from '@recoil/atoms';
import { PATH_PROFILE, PATH_PROFILE_PFP, PATH_PROFILE_PFP_SUFFIX, PATH_PROFILE_SUFFIX } from 'utilities/variables';

export default function useProfile(address: string) {

    const [profile, setProfile] = useRecoilState(profileState);

    const profileUrl = PATH_PROFILE + address + PATH_PROFILE_SUFFIX;
    const profilePfpUrl = PATH_PROFILE_PFP + address + PATH_PROFILE_PFP_SUFFIX;
    console.log('profileUrl: ' + profileUrl);
    console.log('profilePfpUrl: ' + profilePfpUrl);

        async function fetchData() {
            try {
            const response = await axios.get(profileUrl, {
                headers: {
                'Content-Type': 'application/json',
                },
            });
            if(response.data.profile) {
                console.dir('response.data.profile: ' + JSON.stringify(response.data.profile));
                setProfile(prevProfile => ({ ...prevProfile, ...response.data.profile}));
                console.dir('initial profile: ' + JSON.stringify(profile));
                if(response.data.profile.platform_preference) {
                    console.log('preferred platform from json', response.data.profile.platform_preference);
                    const platformPreference = response.data.profile.platform_preference;
                    console.log('platformPreference: ' + platformPreference);
                    const platformAddress = response.data.profile.platforms[platformPreference];
                    console.log('platformAddress: ' + platformAddress);
                    setProfile(prevProfile => ({
                      ...prevProfile, platformAddress: platformAddress
                    }));
                    console.log('profile with platformAddress', profile);
                }
            } else {
                console.error('profile data missing');
            }
            } catch (error) {
            console.error(error);
            }
        }
        return fetchData();
}
