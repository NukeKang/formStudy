import React, { useCallback } from 'react';
import { useRecoilState } from 'recoil';
import { applicationDataAtom } from '../../../store/applicationState';

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
  const [, setApplicationData] = useRecoilState(applicationDataAtom);

  const handleSelectChange = useCallback(
    (e) => {
      const { checked } = e.target;

      if (checked) {
        setApplicationData((prev) => ({
          ...prev,
          detail: {
            ...prev.detail,
            interests: [...prev.detail.interests, e.target.value],
          },
        }));
      } else {
        setApplicationData((prev) => ({
          ...prev,
          detail: {
            ...prev.detail,
            interests: [
              ...prev.detail.interests.filter(
                (interest) => interest !== e.target.value
              ),
            ],
          },
        }));
      }
    },
    [setApplicationData]
  );

  return (
    <div>
      <span>관심사</span>
      <div id='interest'>
        {interests.map((interest, idx) => (
          <label key={idx}>
            <input
              type='checkbox'
              id={interest}
              onChange={handleSelectChange}
              value={interest}
            />
            {interest}
          </label>
        ))}
      </div>
    </div>
  );
};
