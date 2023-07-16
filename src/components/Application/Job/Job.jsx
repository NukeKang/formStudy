import React, { useCallback } from 'react';
import { InputText } from '../Input/InputText';
import { Industry } from './Industry';
import { InputFile } from '../Input/InputFile';
import { useRecoilValue } from 'recoil';
import { applicationViewAtom, jobState } from '../../../store/applicationState';
import { submit } from '../../../api';
import { useSetRecoilState } from 'recoil';

export const Job = () => {
  const jobData = useRecoilValue(jobState);
  const setApplicationView = useSetRecoilState(applicationViewAtom);

  const onSubmit = useCallback(
    async (e) => {
      e.preventDefault();

      const res = await submit(jobData, 'job');

      if (res) {
        setApplicationView('DETAIL');
      }
    },
    [jobData, setApplicationView]
  );

  const onClickPrev = useCallback(() => {
    setApplicationView('PERSONAL');
  }, [setApplicationView]);

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
      <button onClick={onClickPrev}>이전</button>
      <button type='submit' onClick={onSubmit}>
        다음
      </button>
    </form>
  );
};
