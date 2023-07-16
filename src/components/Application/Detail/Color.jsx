import React, { useCallback } from 'react';
import { useRecoilState } from 'recoil';
import { detailState } from '../../../store/applicationState';

const COLOR = [
  { id: 1, name: '' },
  { id: 2, name: '' },
  { id: 3, name: '' },
];

export const Color = () => {
  const [detailData, setDetailData] = useRecoilState(detailState);
  console.log(detailData);
  const handleTextChange = useCallback(
    (e, index) => {
      const { value } = e.target;

      setDetailData((prev) => ({
        ...prev,
        favoriteColors: prev.favoriteColors.map((color, i) =>
          i === index ? { ...color, code: value } : color
        ),
      }));
    },
    [setDetailData]
  );

  return (
    <div>
      <label>
        색깔
        {COLOR.map((_, index) => (
          <input
            key={index}
            type='text'
            name='color'
            value={detailData.favoriteColors[index]?.code}
            onChange={(e) => handleTextChange(e, index)}
          />
        ))}
      </label>
    </div>
  );
};
