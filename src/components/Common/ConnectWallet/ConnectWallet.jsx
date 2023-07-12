import React, { useCallback } from 'react';
import { walletAddressAtom } from '../../../store/walletState';
import { useSetRecoilState } from 'recoil';
import { login } from '../../../api/login';

export const ConnectWallet = () => {
  const { ethereum } = window;
  const setWalletAddress = useSetRecoilState(walletAddressAtom);

  const connectWallet = useCallback(async () => {
    try {
      if (ethereum) {
        const accounts = await ethereum.request({
          method: 'eth_requestAccounts',
        });
        const account = accounts[0];

        const message = `W.XYZ 프로젝트는 워커힐 호텔앤리조트에서 운영하는 고객 중심의 NFT 멤버십 서비스입니다.\nThe W.XYZ project is a member's driven NFT membership service operated by Walkerhill Hotels & Resorts.`;
        const signature = await ethereum.request({
          method: 'personal_sign',
          params: [message, account],
        });

        const res = await login(account, signature);

        if (!res) {
          return false;
        }

        setWalletAddress(account);
        return true;
      }
    } catch (error) {
      console.error(error);

      return false;
    }
  }, [ethereum, setWalletAddress]);

  return <button onClick={connectWallet}>로그인 하기</button>;
};
