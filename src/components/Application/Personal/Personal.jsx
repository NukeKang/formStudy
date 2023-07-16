import React, { useCallback } from 'react';
import { Gender } from './Gender';
import { Country } from './Country';
import { InputText } from '../Input/InputText';
import { InputFile } from '../Input/InputFile';
import { useRecoilValue } from 'recoil';
import {
  applicationViewAtom,
  personalState,
} from '../../../store/applicationState';
import { submit } from '../../../api';
import { useSetRecoilState } from 'recoil';

export const Personal = () => {
  const personalData = useRecoilValue(personalState);
  const setApplicationView = useSetRecoilState(applicationViewAtom);

  const onSubmit = useCallback(
    async (e) => {
      e.preventDefault();

      const res = await submit(personalData, 'basic');

      if (res) {
        setApplicationView('JOB');
      }
    },
    [personalData, setApplicationView]
  );

  return (
    <form>
      <InputText type={'text'} id={'name'} label={'이름'} page={'personal'} />
      <InputText
        type={'text'}
        id={'birth'}
        label={'생년월일'}
        page={'personal'}
      />
      <Gender />
      <Country />
      <InputText
        type={'text'}
        id={'email'}
        label={'이메일 주소'}
        page={'personal'}
      />
      <InputText
        type={'text'}
        id={'mobileNumber'}
        label={'휴대폰'}
        page={'personal'}
      />
      <InputText
        type={'text'}
        id={'address1'}
        label={'주소'}
        page={'personal'}
      />
      <InputText
        type={'text'}
        id={'address2'}
        label={'상세주소'}
        page={'personal'}
      />

      <InputFile arrayLength={2} page={'personal'} />

      <button type='submit' onClick={onSubmit}>
        {'다음'}
      </button>
    </form>
  );
};
