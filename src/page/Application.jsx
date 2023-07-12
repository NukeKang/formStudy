import React from 'react';
import { Terms } from '../components/Application/Terms';

import { ConnectWallet } from '../components/Common/ConnectWallet';
import { useRecoilValue } from 'recoil';
import { walletAddressAtom } from '../store/walletState';

export const Application = () => {
  const walletAddress = useRecoilValue(walletAddressAtom);

  return <>{walletAddress ? <Terms /> : <ConnectWallet />}</>;
};
