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
