import React, { useCallback } from 'react';
import { personalState } from '../../../store/applicationState';

import { useRecoilState } from 'recoil';

export const Gender = () => {
  const [personalData, setPersonalData] = useRecoilState(personalState);

  const onChangeGender = useCallback(
    (e) => {
      const { value } = e.target;

      setPersonalData((prev) => ({
        ...prev,
        gender: value,
      }));
    },
    [setPersonalData]
  );

  return (
    <div>
      <label>
        성별
        <div>
          <label htmlFor='male'>남</label>
          <input
            id='male'
            type='radio'
            name='gender'
            value={'MALE'}
            onChange={onChangeGender}
            checked={personalData.gender === 'MALE' ? true : false}
          />
        </div>
        <div>
          <label htmlFor='female'>여</label>
          <input
            id='female'
            type='radio'
            value={'FEMALE'}
            name='gender'
            onChange={onChangeGender}
            checked={personalData.gender === 'FEMALE' ? true : false}
          />
        </div>
        <div>
          <label htmlFor='none'>제공안함</label>
          <input
            id='none'
            type='radio'
            value={'NOT_SPECIFIED'}
            name='gender'
            onChange={onChangeGender}
            checked={personalData.gender === 'NOT_SPECIFIED' ? true : false}
          />
        </div>
      </label>
    </div>
  );
};
