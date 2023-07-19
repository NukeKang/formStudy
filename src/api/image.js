import { baseURL } from '../configs';
import { myFetch } from './interceptor';
const accessToken = JSON.parse(
  localStorage.getItem('test-token') || '{}'
).accessToken;

export const imageUpload = async (formData, walletAddress, type) => {
  try {
    const response = await myFetch({
      url: `${baseURL}/image/${walletAddress}/${type}`,
      method: 'POST',
      headers: {
        // !!fetch에서 formData를 사용할 때 Content-Type을 설정하지 않기
        // 'Content-Type': 'multipart/form-data',
        Authorization: `Bearer ${accessToken}`,
      },
      body: formData,
    });

    // if (response.status === 400) {
    //   console.log(1);
    // }

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

// export const getImageUrl = async (filename) => {
//   try {
//     const response = await fetch(`${baseURL}${filename}`, {
//       method: 'GET',
//       headers: {
//         Authorization: `Bearer ${accessToken}`,
//       },
//     });

//     if (response.ok) {
//       const data = await response.blob();

//       const reader = new FileReader();
//       reader.readAsDataURL(data);

//       return new Promise((resolve) => {
//         reader.onloadend = () => resolve(reader.result);
//       });
//     } else {
//       return null;
//     }
//   } catch (error) {
//     console.error(error);
//     return false;
//   }
// };

export const getImageUrl = async (filename) => {
  try {
    const response = await myFetch({
      url: `${baseURL}${filename}`,
      method: 'GET',
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
      responseType: 'blob',
    });

    if (response.message === 'success') {
      const { data } = response;

      const reader = new FileReader();
      reader.readAsDataURL(data);

      return new Promise((resolve) => {
        reader.onloadend = () => resolve(reader.result);
      });
    } else {
      return null;
    }
  } catch (error) {
    console.error(error);
    return false;
  }
};
