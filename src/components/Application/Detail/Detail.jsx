import React, { useCallback } from 'react';
import { InputText } from '../Input/InputText';
import { Color } from './Color';
import { Interest } from './Interest';
import { useRecoilValue } from 'recoil';
import {
  applicationViewAtom,
  detailState,
} from '../../../store/applicationState';
import { submit } from '../../../api';
import { useSetRecoilState } from 'recoil';

export const Detail = () => {
  const detailData = useRecoilValue(detailState);
  const setApplicationView = useSetRecoilState(applicationViewAtom);
  const onSubmit = useCallback(
    async (e) => {
      e.preventDefault();

      const res = await submit(detailData, 'submit');

      if (res) {
        setApplicationView('PREVIEW');
      }
    },
    [detailData, setApplicationView]
  );

  const onClickPrev = useCallback(() => {
    setApplicationView('JOB');
  }, [setApplicationView]);

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
      <button onClick={onClickPrev}>{'이전'}</button>
      <button type='submit' onClick={onSubmit}>
        {'다음'}
      </button>
    </form>
  );
};
