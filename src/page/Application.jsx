import React, { useCallback, useEffect } from 'react';
import { Terms } from '../components/Application/Terms';

import { ConnectWallet } from '../components/Common/ConnectWallet';
import { useRecoilValue } from 'recoil';
import { walletAddressAtom } from '../store/walletState';
import { getApplicationData } from '../api';
import { Personal } from '../components/Application/Personal/Personal';
import { useSetRecoilState } from 'recoil';
import {
  applicationDataAtom,
  applicationViewAtom,
  personalState,
  temsState,
} from '../store/applicationState';
import { Job } from '../components/Application/Job';
import { Detail } from '../components/Application/Detail';
import { useRecoilState } from 'recoil';

export const Application = () => {
  const walletAddress = useRecoilValue(walletAddressAtom);
  const [applicationData, setApplicationData] =
    useRecoilState(applicationDataAtom);
  const [applicationView, setApplicationView] =
    useRecoilState(applicationViewAtom);
  const [personalData, setPersonalData] = useRecoilState(personalState);
  const [termsData, setTermsData] = useRecoilState(temsState);

  const setPage = useCallback(
    (data) => {
      let temp = data || applicationData;
      let saveStatus = 'TERMS';

      if (temp.saveStatus === 'AGREEMENT') {
        saveStatus = 'PERSONAL';
      } else if (temp.saveStatus === 'BASIC_INFO') {
        saveStatus = 'JOB';
      } else if (temp.saveStatus === 'JOB_INFO') {
        saveStatus = 'DETAIL';
      } else if (temp.saveStatus === 'SUBMIT') {
        saveStatus = 'PREVIEW';
      }

      setApplicationView(saveStatus);
    },
    [applicationData, setApplicationView]
  );

  const getInitialData = useCallback(async () => {
    const res = await getApplicationData();

    if (res) {
      if (res.application === null) {
        setApplicationView('TERMS');
      } else {
        setPage(res.application);
        setPersonalData(res.application);
        // setApplicationData({
        //   walletAddress,
        //   ...res.application,
        // });
      }
    }
  }, [walletAddress]);

  useEffect(() => {
    if (!walletAddress) {
      return;
    } else {
      getInitialData();
    }
  }, [getInitialData, walletAddress]);

  console.log(personalData);

  return (
    <>
      {walletAddress ? (
        <>
          {applicationView === 'TERMS' && <Terms />}
          {applicationView === 'PERSONAL' && <Personal />}
          {applicationView === 'JOB' && <Job />}
          {applicationView === 'DETAIL' && <Detail />}
        </>
      ) : (
        <ConnectWallet />
      )}
    </>
  );
};
