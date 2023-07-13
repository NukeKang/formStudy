import React, { useCallback, useEffect, useState } from 'react';
import { getApplicationData, getImageUrl, imageUpload } from '../../../api';
import { useRecoilValue } from 'recoil';
import { walletAddressAtom } from '../../../store/walletState';
import { useSetRecoilState } from 'recoil';
import { applicationDataAtom } from '../../../store/applicationState';

import './InputFile.css';

export const InputFile = ({ arrayLength, page }) => {
  const walletAddress = useRecoilValue(walletAddressAtom);
  const setApplicationData = useSetRecoilState(applicationDataAtom);
  const [blob, setBlob] = useState([null, null]);

  const onChangeFile = useCallback(
    async (e, index) => {
      const { files } = e.target;

      const formData = new FormData();
      formData.append('image', files[0]);

      const response = await imageUpload(formData, walletAddress, 'PROFILE');

      if (page === 'personal') {
        setApplicationData((prev) => {
          const newProfileImages = JSON.parse(
            JSON.stringify(prev.personal.profileImages)
          );

          newProfileImages[index].imageUrl = response.imageUrl;

          return {
            ...prev,
            personal: {
              ...prev.personal,
              profileImages: newProfileImages,
            },
          };
        });
      } else if (page === 'job') {
        setApplicationData((prev) => {
          return {
            ...prev,
            job: {
              ...prev.job,
              businessCardImageUrl: response.imageUrl,
            },
          };
        });
      }

      const blobData = await getImageUrl(response.imageUrl);
      setBlob((prev) => {
        return prev.map((item, idx) => {
          if (idx === index) {
            return blobData;
          }
          return item;
        });
      });
    },
    [walletAddress]
  );

  useEffect(() => {
    if (!walletAddress) return;

    (async () => {
      const data = await getApplicationData();

      const blobData = await Promise.all(
        data.profileImages.map((item) => getImageUrl(item.imageUrl))
      );

      setBlob(blobData);
    })();
  }, []);

  return (
    <div>
      <label htmlFor='profileImage'>프로필 사진</label>
      {new Array(arrayLength).fill(undefined).map((_, index) => {
        return (
          <div key={index}>
            <input
              id={'profileImage' + index}
              type='file'
              onChange={(e) => onChangeFile(e, index)}
              accept='image/jpg, image/jpeg, image/png'
            />
            <img src={blob[index]} alt='profile' />
          </div>
        );
      })}
    </div>
  );
};
