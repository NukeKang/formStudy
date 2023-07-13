import React, { useCallback } from 'react';
import { useRecoilState } from 'recoil';
import { applicationDataAtom } from '../../../store/applicationState';

const COLOR = [
  { id: 1, name: '' },
  { id: 2, name: '' },
  { id: 3, name: '' },
];

export const Color = () => {
  const [, setApplicationData] = useRecoilState(applicationDataAtom);
  const handleTextChange = useCallback(
    (e, index) => {
      const { value } = e.target;

      setApplicationData((prev) => ({
        ...prev,
        detail: {
          ...prev.detail,
          favoriteColors: [
            ...prev.detail.favoriteColors.slice(0, index),
            { code: value },
            ...prev.detail.favoriteColors.slice(index + 1),
          ],
        },
      }));
    },
    [setApplicationData]
  );

  return (
    <div>
      <label>
        색깔
        {COLOR.map((_, index) => (
          <input
            type='text'
            name='color'
            onChange={(e) => handleTextChange(e, index)}
          />
        ))}
      </label>
    </div>
  );
};
