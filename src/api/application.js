import { baseURL } from '../configs';

export const getApplicationData = async () => {
  const accessToken = JSON.parse(
    localStorage.getItem('test-token') || '{}'
  ).accessToken;

  try {
    const response = await fetch(`${baseURL}/application`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken}`,
      },
    });

    if (response.ok) {
      const { data } = await response.json();

      return data;
    } else {
      return null;
    }
  } catch (error) {
    console.error(error);
    return false;
  }
};
