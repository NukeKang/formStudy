import React, { useCallback, useEffect } from 'react';
import { Terms } from '../components/Application/Terms';

import { ConnectWallet } from '../components/Common/ConnectWallet';
import { useRecoilValue } from 'recoil';
import { walletAddressAtom } from '../store/walletState';
import { getApplicationData } from '../api';
import { Personal } from '../components/Application/Personal/Personal';

import { applicationViewAtom, wholeDataAtom } from '../store/applicationState';
import { Job } from '../components/Application/Job';
import { Detail } from '../components/Application/Detail';
import { useRecoilState } from 'recoil';
import { Preview } from '../components/Application/Preview/Preview';

export const Application = () => {
  const walletAddress = useRecoilValue(walletAddressAtom);
  const [applicationView, setApplicationView] =
    useRecoilState(applicationViewAtom);
  const [wholeData, setWholeData] = useRecoilState(wholeDataAtom);

  const setPage = useCallback(
    (data) => {
      let temp = data;
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
    [setApplicationView]
  );

  const getInitialData = useCallback(async () => {
    const res = await getApplicationData();

    if (res) {
      if (res.application === null) {
        setApplicationView('TERMS');
      } else {
        setPage(res.application);
        setWholeData((prev) => ({
          ...prev,
          ...res.application,
        }));
      }
    }
  }, [setApplicationView, setPage, setWholeData]);

  useEffect(() => {
    if (!walletAddress) {
      return;
    } else {
      getInitialData();
    }
  }, [getInitialData, walletAddress]);

  console.log('전체데이터', wholeData);

  return (
    <>
      {walletAddress ? (
        <>
          {applicationView === 'TERMS' && <Terms />}
          {applicationView === 'PERSONAL' && <Personal />}
          {applicationView === 'JOB' && <Job />}
          {applicationView === 'DETAIL' && <Detail />}
          {applicationView === 'PREVIEW' && <Preview />}
        </>
      ) : (
        <ConnectWallet />
      )}
    </>
  );
};
