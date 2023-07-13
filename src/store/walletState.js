import { atom } from 'recoil';
import { recoilPersist } from 'recoil-persist';

const { persistAtom } = recoilPersist();

export const walletAddressAtom = atom({
  key: 'walletAddressAtom',
  default: '',

  effects_UNSTABLE: [persistAtom],
});
