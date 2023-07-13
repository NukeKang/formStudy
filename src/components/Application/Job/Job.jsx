import React, { useCallback } from 'react';
import { InputText } from '../Input/InputText';
import { Industry } from './Industry';
import { InputFile } from '../Input/InputFile';
import { useRecoilValue } from 'recoil';
import { applicationDataAtom } from '../../../store/applicationState';
import { submit } from '../../../api';

export const Job = () => {
  const applicationData = useRecoilValue(applicationDataAtom);

  const onSubmit = useCallback(
    async (e) => {
      e.preventDefault();
      const { job } = applicationData;

      const res = await submit(job, 'job');

      console.log(res);
    },
    [applicationData]
  );

  return (
    <form>
      <InputText
        type={'text'}
        id={'companyName'}
        label={'회사명'}
        page={'job'}
      />
      <Industry />
      <InputFile arrayLength={1} page={'job'} />
      <button type='submit' onClick={onSubmit}>
        다음
      </button>
    </form>
  );
};
