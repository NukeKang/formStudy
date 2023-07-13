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
  const [data, setApplicationData] = useRecoilState(applicationDataAtom);
  const inputList = document
    .querySelector('#interest')
    ?.querySelectorAll('input');

  console.log(inputList);

  const handleSelectChange = useCallback(
    (e) => {
      const { checked } = e.target;
      const inputListToArray = Array.from(inputList).filter((input) => {
        return input.checked;
      });

      console.log(inputListToArray);

      setApplicationData((prev) => ({
        ...prev,
        detail: {
          ...prev.detail,
          interests: inputListToArray.map((input) => input.value),
        },
      }));
    },

    [inputList, setApplicationData]
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
