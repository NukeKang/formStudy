import React, { useCallback } from 'react';
import { useRecoilState } from 'recoil';
import { applicationDataAtom } from '../../../store/applicationState';

export const InputText = ({ type, id, label, page }) => {
  const [data, setApplicationData] = useRecoilState(applicationDataAtom);
  const handleTextChange = useCallback(
    (e) => {
      const { value } = e.target;
      console.log(value);

      setApplicationData((prev) => ({
        ...prev,
        [page]: {
          ...prev[page],
          [id]: value,
        },
      }));
    },
    [id, page, setApplicationData]
  );

  console.log(data);
  return (
    <div>
      <label htmlFor={id}>{label}</label>
      <input
        type={type}
        id={id}
        onChange={handleTextChange}
        autoComplete='off'
      />
    </div>
  );
};
