import React, { useCallback } from 'react';
import { useRecoilState } from 'recoil';
import { applicationDataAtom } from '../../../store/applicationState';

export const Gender = () => {
  const [, setApplicationData] = useRecoilState(applicationDataAtom);

  const onChangeGender = useCallback(
    (e) => {
      const { value } = e.target;
      setApplicationData((prev) => ({
        ...prev,
        personal: {
          ...prev.personal,
          gender: value,
        },
      }));
    },
    [setApplicationData]
  );

  return (
    <div>
      <label>성별</label>
      <div>
        <label htmlFor='male'>남</label>
        <input
          id='male'
          type='radio'
          value={'MALE'}
          name='gender'
          onChange={onChangeGender}
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
        />
      </div>
    </div>
  );
};
