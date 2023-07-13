import { baseURL } from '../configs';

export const login = async (walletAddress, signature) => {
  try {
    const response = await fetch(`${baseURL}/login`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        walletAddress: walletAddress,
        signature: signature,
      }),
    });

    if (response.ok) {
      const {
        data: { tokenSet },
      } = await response.json();

      localStorage.setItem('test-token', JSON.stringify(tokenSet));

      return tokenSet;
    } else {
      return null;
    }
  } catch (error) {
    console.error(error);
    return false;
  }
};

// export const refreshAccessToken = async () => {
//   const recoilPersist = JSON.parse(
//     localStorage.getItem('recoil-persist') || '{}'
//   );

//   const token = JSON.parse(localStorage.getItem('wxyz-token') || '{}');

//   try {
//     const res: { accessToken: string } = await AxiosClient.post('/refresh', {
//       walletAddress: recoilPersist.walletAddressAtom,
//       refreshToken: token.refreshToken,
//     });
//     localStorage.setItem(
//       'wxyz-token',
//       JSON.stringify({ ...token, accessToken: res.accessToken })
//     );
//     return res.accessToken;
//   } catch (error) {
//     logout();
//     return '';
//   }
// };
