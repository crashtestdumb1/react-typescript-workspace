import { useEffect } from 'react';
import { atom, useRecoilState, useSetRecoilState } from 'recoil';
import { useConnectedWallet } from '@terra-money/wallet-provider';
import { walletAddress } from '@recoil/atoms';

export default function useWallet() {
    const setWalletAddress = useSetRecoilState(walletAddress);
    const connectedWallet = useConnectedWallet();
    console.log('connectedWallet: ' + JSON.stringify(connectedWallet));

    useEffect(() => {

        if (connectedWallet !== undefined) {
            setWalletAddress(connectedWallet?.walletAddress);
        }

    }, [connectedWallet, setWalletAddress]);

    return connectedWallet?.walletAddress;
}
