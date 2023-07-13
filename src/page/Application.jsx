import React, { useEffect } from 'react';
import { Terms } from '../components/Application/Terms';

import { ConnectWallet } from '../components/Common/ConnectWallet';
import { useRecoilValue } from 'recoil';
import { walletAddressAtom } from '../store/walletState';
import { getApplicationData } from '../api';
import { Personal } from '../components/Application/Personal/Personal';
import { useSetRecoilState } from 'recoil';
import { applicationDataAtom } from '../store/applicationState';
import { Job } from '../components/Application/Job';
import { Detail } from '../components/Application/Detail';

export const Application = () => {
  const walletAddress = useRecoilValue(walletAddressAtom);
  // const setApplicationData = useSetRecoilState(applicationDataAtom);

  useEffect(() => {
    if (!walletAddress) return;

    (async () => {
      const data = await getApplicationData();

      console.log(data);
    })();
  }, [walletAddress]);

  return (
    <>
      {walletAddress ? (
        <>
          <Terms />
          <Personal />
          <Job />
          <Detail />
        </>
      ) : (
        <ConnectWallet />
      )}
    </>
  );
};
