import React, { useCallback, useEffect } from 'react';
import { useRecoilState } from 'recoil';
import { detailState } from '../../../store/applicationState';

const interests = [
  '예술',
  '춤',
  '영화',
  '음악',
  '파티',
  '기술',
  '웰니스&뷰티',
  '가족용 오락',
  '음식',
  '정치',
];

export const Interest = () => {
  const [detailData, setDetailData] = useRecoilState(detailState);

  const handleSelectChange = useCallback(
    (e, idx) => {
      const { checked, value } = e.target;

      if (checked) {
        setDetailData((prev) => ({
          ...prev,
          interests: [...prev.interests, { content: value }],
        }));
      } else {
        setDetailData((prev) => ({
          ...prev,
          interests: prev.interests.filter(
            (interest) => interest.content !== value
          ),
        }));
      }
    },
    [setDetailData]
  );

  console.log(detailData);

  useEffect(() => {}, []);

  return (
    <div>
      <span>관심사</span>
      <div id='interest'>
        {interests.map((interest, idx) => (
          <label key={idx}>
            <input
              type='checkbox'
              id={interest}
              onChange={(e) => handleSelectChange(e, idx)}
              value={interest}
              checked={detailData.interests.some(
                (item) => item.content === interest
              )}
            />
            {interest}
          </label>
        ))}
      </div>
    </div>
  );
};
