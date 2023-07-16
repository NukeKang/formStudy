import React, { useCallback, useEffect, useRef, useState } from 'react';
import { useRecoilState } from 'recoil';
import {
  applicationDataAtom,
  detailState,
} from '../../../store/applicationState';

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
  const [inputListToArray, setInputListToArray] = useState([]);

  // const inputListToArray = Array.from(inputList)?.filter((input) => {
  //   return input.checked;
  // });

  // console.log(inputListToArray);

  const handleSelectChange = useCallback(
    (e) => {
      const { checked } = e.target;

      if (checked) {
        setDetailData((prev) => ({
          ...prev,
          interests: [...prev.interests, checked],
        }));
      } else {
        setDetailData((prev) => ({
          ...prev,
          interests: prev.interests.filter(
            (interest) => interest !== e.target.value
          ),
        }));
      }
    },
    [setDetailData]
  );

  useEffect(() => {
    const inputList = document.querySelectorAll('#interest input');
    const inputListToArray = Array.from(inputList)?.filter((input) => {
      return input.checked;
    });

    setInputListToArray(inputListToArray);
  }, [detailData.interests]);

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
              checked={detailData.interests.includes(interest)}
            />
            {interest}
          </label>
        ))}
      </div>
    </div>
  );
};
