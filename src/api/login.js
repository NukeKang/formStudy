import { baseURL } from '../configs';
import { myFetch } from './interceptor';

export const login = async (walletAddress, signature) => {
  try {
    const response = await myFetch({
      url: `${baseURL}/login`,
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

    if (response.message === 'success') {
      const { tokenSet } = response.data;

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
