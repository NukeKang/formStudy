import { baseURL } from '../configs';
import { myFetch } from './interceptor';

export const submit = async (data, step) => {
  const accessToken = JSON.parse(
    localStorage.getItem('test-token') || '{}'
  ).accessToken;

  try {
    const response = await myFetch({
      url: `${baseURL}/application/${step}`,
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify({ ...data }),
    });

    if (response.message === 'success') {
      const { application } = response.data;

      return application;
    } else {
      return null;
    }
  } catch (error) {
    console.error(error);
    return false;
  }
};
