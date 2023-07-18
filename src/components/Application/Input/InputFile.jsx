import React, { useCallback, useEffect, useState } from 'react';
import { getImageUrl, imageUpload } from '../../../api';
import { useRecoilValue } from 'recoil';
import { walletAddressAtom } from '../../../store/walletState';
import { jobState, personalState } from '../../../store/applicationState';

import './InputFile.css';
import { useRecoilState } from 'recoil';

export const InputFile = ({ arrayLength, page }) => {
  const walletAddress = useRecoilValue(walletAddressAtom);

  const [blob, setBlob] = useState([null, null]);
  const [jobBlob, setJobBlob] = useState(null);
  const [personalData, setPersonalData] = useRecoilState(personalState);
  const [jobData, setJobData] = useRecoilState(jobState);

  const onChangeFile = useCallback(
    async (e, index) => {
      const { files } = e.target;

      const formData = new FormData();
      formData.append('image', files[0]);

      const response = await imageUpload(
        formData,
        walletAddress,
        page === 'personal' ? 'PROFILE' : 'BUSINESS_CARD'
      );

      if (page === 'personal') {
        setPersonalData((prev) => {
          const newProfileImages = JSON.parse(
            JSON.stringify(prev.profileImages)
          );

          newProfileImages[index].imageUrl = response.imageUrl;

          return {
            ...prev,
            profileImages: newProfileImages,
          };
        });
      } else if (page === 'job') {
        setJobData((prev) => {
          return {
            ...prev,
            businessCardImageUrl: response.imageUrl,
          };
        });
      }
      if (response) {
        const blobData = await getImageUrl(response.imageUrl);
        setBlob((prev) => {
          return prev.map((item, idx) => {
            if (idx === index) {
              return blobData;
            }
            return item;
          });
        });
      }
    },
    [page, setJobData, setPersonalData, walletAddress]
  );

  useEffect(() => {
    if (!walletAddress) return;

    if (
      page === 'personal' &&
      personalData.profileImages[0].imageUrl === '' &&
      personalData.profileImages[1].imageUrl === ''
    ) {
      return;
    } else {
      (async () => {
        const blobData = await Promise.all(
          personalData.profileImages.map((item) => getImageUrl(item.imageUrl))
        );

        setBlob(blobData);
      })();
    }

    if (page === 'job' && jobData.businessCardImageUrl === null) {
      return;
    } else {
      (async () => {
        const blobData = await getImageUrl(jobData.businessCardImageUrl);

        setJobBlob(blobData);
      })();
    }
  }, [
    walletAddress,
    page,
    personalData.profileImages,
    jobData.businessCardImageUrl,
  ]);

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
            <img
              src={page === 'personal' ? blob[index] : jobBlob}
              alt='profile'
            />
          </div>
        );
      })}
    </div>
  );
};
