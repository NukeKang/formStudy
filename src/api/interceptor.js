import { baseURL } from '../configs';

async function refreshAccessToken() {
  const token = JSON.parse(localStorage.getItem('test-token') || '{}');
  const wallet = JSON.parse(localStorage.getItem('recoil-persist') || '{}');

  try {
    const response = await myFetch({
      url: `${baseURL}/refresh`,
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        walletAddress: wallet.walletAddressAtom,
        refreshToken: token.refreshToken,
      }),
    });

    if (response && response.message === 'success') {
      const { accessToken } = response.data;

      localStorage.setItem(
        'test-token',
        JSON.stringify({ ...token, accessToken })
      );
      return accessToken;
    }
  } catch (error) {
    console.error(error);
    return false;
  }
}

function fetchRequestInterceptor(config) {
  const { url, ...options } = config;

  if (!options.method) {
    options.method = 'GET';
  }

  // if (options.responseType === 'blob') {
  //   options.headers = {
  //     ...options.headers,
  //     // Accept: '*/*',
  //   };
  // }

  return [url, options];
}

async function fetchResponseInterceptor(response) {
  try {
    if (response.headers.get('Content-Type') === 'image/png') {
      const data = await response.blob();

      return { message: 'success', data, reason: null };
    }

    if (response.ok) {
      const { data } = await response.json();
      console.log(response);

      return { message: 'success', data, reason: null };
    } else if (response.ok === false) {
      const { data } = await response.json();
      console.log(data);

      if (
        data?.code === 'INVALID_ACCESS_TOKEN' ||
        data?.code === 'EXPIRED_ACCESS_TOKEN'
      ) {
        const accessToken = await refreshAccessToken();

        if (accessToken) {
          const { url, ...options } = response.config;

          options.headers.Authorization = `Bearer ${accessToken}`;

          const newResponse = await fetch(url, options);

          if (newResponse.ok) {
            const { data } = await newResponse.json();

            return { message: 'success', data, reason: null };
          } else {
            return {
              message: 'error',
              data: null,
              reason: response.statusText,
            };
          }
        } else {
          return { message: 'error', data: null, reason: response.statusText };
        }
      }
    }
  } catch (error) {
    console.warn(error);
    return { message: 'error', data: null, reason: error };
  }
}

async function myFetch(config) {
  try {
    const [url, options] = fetchRequestInterceptor(config);
    const response = await fetch(url, options);

    const data = await fetchResponseInterceptor(response);

    return data;
  } catch (error) {
    console.warn(error);
    return { message: 'error', data: null, reason: error };
  }
}

export { myFetch };
