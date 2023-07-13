import React from 'react';
import { InputText } from '../Input/InputText';
import { Color } from './Color';
import { Interest } from './Interest';

export const Detail = () => {
  return (
    <div>
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
    </div>
  );
};
