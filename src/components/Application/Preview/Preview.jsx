import React, { useCallback } from 'react';

import { applicationViewAtom } from '../../../store/applicationState';
import { useSetRecoilState } from 'recoil';

export const Preview = () => {
  const setApplicationView = useSetRecoilState(applicationViewAtom);

  const onClickPrev = useCallback(() => {
    setApplicationView('DETAIL');
  }, [setApplicationView]);

  return (
    <div>
      Preview
      <button onClick={onClickPrev}>prev</button>
    </div>
  );
};
