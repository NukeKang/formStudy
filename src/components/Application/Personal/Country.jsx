import React, { useCallback } from 'react';

import { useSetRecoilState } from 'recoil';
import { wholeDataAtom } from '../../../store/applicationState';
const COUNTRY_LIST = [
  { id: 1, name: '대한민국' },
  { id: 2, name: '미국' },
  { id: 3, name: '중국' },
  { id: 4, name: '일본' },
  { id: 5, name: '영국' },
];

export const Country = () => {
  const setWholeData = useSetRecoilState(wholeDataAtom);
  const onChangeCountry = useCallback(
    (e) => {
      const { value } = e.target;
      setWholeData((prev) => ({
        ...prev,
        nationality: value,
      }));
    },
    [setWholeData]
  );

  return (
    <div>
      <label htmlFor='country'>국적</label>
      <select id='country' onChange={onChangeCountry}>
        {COUNTRY_LIST.map((country) => {
          return (
            <option key={country.id} value={country.name}>
              {country.name}
            </option>
          );
        })}
      </select>
    </div>
  );
};
