import React, { useCallback } from 'react';
import { Gender } from './Gender';
import { Country } from './Country';
import { InputText } from '../Input/InputText';
import { InputFile } from '../Input/InputFile';
import { useRecoilValue } from 'recoil';
import { applicationDataAtom } from '../../../store/applicationState';
import { submit } from '../../../api';

export const Personal = () => {
  const applicationData = useRecoilValue(applicationDataAtom);

  const onSubmit = useCallback(
    async (e) => {
      e.preventDefault();
      const { personal } = applicationData;

      const res = await submit(personal, 'basic');

      console.log(res);
    },
    [applicationData]
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
