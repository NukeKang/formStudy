import React, { useCallback } from 'react';
import { InputText } from '../Input/InputText';
import { Color } from './Color';
import { Interest } from './Interest';
import { useRecoilValue } from 'recoil';
import { applicationDataAtom } from '../../../store/applicationState';
import { submit } from '../../../api';

export const Detail = () => {
  const applicationData = useRecoilValue(applicationDataAtom);
  const onSubmit = useCallback(
    async (e) => {
      e.preventDefault();
      const { detail } = applicationData;
      const data = {
        ...detail,
        interests: detail.interests.map((interest) => ({
          content: interest,
        })),
      };
      console.log(data);
      const res = await submit(data, 'submit');

      console.log(res);
    },
    [applicationData]
  );

  return (
    <form>
      <InputText
        type={'textarea'}
        id={'introduction'}
        label={'자기소개'}
        page={'detail'}
      />
      <InputText
        type={'textarea'}
        id={'favoriteMood'}
        label={'선호하는 분위기'}
        page={'detail'}
      />
      <Color />
      <Interest />
      <button type='submit' onClick={onSubmit}>
        {'다음'}
      </button>
    </form>
  );
};
