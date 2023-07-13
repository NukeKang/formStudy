import { baseURL } from '../configs';

export const submit = async (data, step) => {
  const accessToken = JSON.parse(
    localStorage.getItem('test-token') || '{}'
  ).accessToken;

  try {
    const response = await fetch(`${baseURL}/application/${step}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify({ ...data }),
    });

    if (response.ok) {
      const {
        data: { application },
      } = await response.json();

      console.log(application);
      return application;
    } else {
      return null;
    }
  } catch (error) {
    console.error(error);
    return false;
  }
};
