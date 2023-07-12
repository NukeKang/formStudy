import React, { useEffect } from 'react';
import { Terms } from '../components/Application/Terms';

import { ConnectWallet } from '../components/Common/ConnectWallet';
import { useRecoilValue } from 'recoil';
import { walletAddressAtom } from '../store/walletState';
import { getApplicationData } from '../api';

export const Application = () => {
  const walletAddress = useRecoilValue(walletAddressAtom);

  useEffect(() => {
    if (!walletAddress) return;

    (async () => {
      const data = await getApplicationData();
      console.log(data);
    })();
  }, [walletAddress]);

  return <>{walletAddress ? <Terms /> : <ConnectWallet />}</>;
};
