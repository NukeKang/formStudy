import React, { useCallback } from 'react';

import {
  detailState,
  jobState,
  personalState,
} from '../../../store/applicationState';
import { useRecoilState } from 'recoil';

export const InputText = ({ type, id, label, page }) => {
  const [personalData, setPersonalData] = useRecoilState(personalState);
  const [jobData, setJobData] = useRecoilState(jobState);
  const [detailData, setDetailData] = useRecoilState(detailState);

  const handleTextChange = useCallback(
    (e) => {
      const { value } = e.target;

      if (page === 'personal') {
        setPersonalData((prev) => ({
          ...prev,
          [id]: value,
        }));
      } else if (page === 'job') {
        setJobData((prev) => ({
          ...prev,
          [id]: value,
        }));
      } else {
        setDetailData((prev) => ({
          ...prev,
          [id]: value,
        }));
      }
    },
    [id, page, setDetailData, setJobData, setPersonalData]
  );

  return (
    <div>
      <label htmlFor={id}>{label}</label>
      <input
        type={type}
        id={id}
        onChange={handleTextChange}
        autoComplete='off'
        value={
          page === 'personal'
            ? personalData[id]
            : page === 'job'
            ? jobData[id]
            : detailData[id]
        }
      />
    </div>
  );
};
