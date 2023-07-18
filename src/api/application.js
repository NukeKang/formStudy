import { baseURL } from '../configs';
import { myFetch } from './interceptor';

export const getApplicationData = async () => {
  const accessToken = JSON.parse(
    localStorage.getItem('test-token') || '{}'
  ).accessToken;

  try {
    const response = await myFetch({
      url: `${baseURL}/application`,
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken}`,
      },
    });

    if (response.message === 'success') {
      const { data } = response;

      return data;
    } else {
      return null;
    }
  } catch (error) {
    console.error(error);
    return false;
  }
};
