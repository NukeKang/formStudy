import React, { useCallback, useMemo, useState } from 'react';
import { submit } from '../../../api';
import { useSetRecoilState } from 'recoil';
import { applicationViewAtom } from '../../../store/applicationState';

export const Terms = () => {
  const setApplicationView = useSetRecoilState(applicationViewAtom);
  const checkboxes = useMemo(() => {
    return [
      {
        id: 'check-box-1',
        name: 'termsOfUseAgreement',
        label: '이용약관 동의',
        value: false,
      },
      {
        id: 'check-box-2',
        label: '개인정보 수집 이용 동의 (필수)',
        name: 'privacyPolicyAgreement',
        value: false,
      },
      {
        id: 'check-box-3',
        label: '개인정보 수집 이용 동의 (선택)',
        name: 'optionalPrivacyPolicyAgreement',
        value: false,
      },
      {
        id: 'check-box-4',
        label: '개인정보 취급 위탁 동의',
        name: 'policyHandlingAgreement',
        value: false,
      },
      {
        id: 'check-box-5',
        label: '만 14세 이상 확인',
        name: 'ageCheck',
        value: false,
      },
    ];
  }, []);
  const [checkItems, setCheckItems] = useState(
    new Array(checkboxes.length).fill(false)
  );

  const handleCheckAll = useCallback(
    (e) => {
      const { checked } = e.target;

      if (checked) {
        setCheckItems(
          new Array(checkboxes.length).fill(true).map((item, index) => {
            return item;
          })
        );
      } else {
        setCheckItems(
          new Array(checkboxes.length).fill(false).map((item, index) => {
            return item;
          })
        );
      }
    },
    [checkboxes]
  );

  const handleCheck = useCallback((e) => {
    const { checked, id } = e.target;

    if (checked) {
      setCheckItems((prev) => {
        const newCheckItems = [...prev];
        newCheckItems[id] = true;

        return newCheckItems;
      });
    } else {
      setCheckItems((prev) => {
        const newCheckItems = [...prev];
        newCheckItems[id] = false;

        return newCheckItems;
      });
    }
  }, []);

  const onSubmit = useCallback(
    async (e) => {
      e.preventDefault();

      const data = {
        privacyPolicyAgreement: checkItems[1] ? 'Y' : 'N',
        privacyPolicyDate: '23-05-05',
        optionalPrivacyPolicyAgreement: checkItems[2] ? 'Y' : 'N',
        optionalPrivacyPolicyDate: '23-05-05',
        termsOfUseAgreement: checkItems[0] ? 'Y' : 'N',
        termsOfUseDate: '23-05-05',
        policyHandlingAgreement: checkItems[3] ? 'Y' : 'N',
        policyHandlingDate: '23-05-05',
        ageCheck: checkItems[4] ? 'Y' : 'N',
        ageCheckDate: '23-01-01',
      };
      console.log(data);

      const res = await submit(data, 'agreement');

      if (res) {
        setApplicationView('PERSONAL');
      }
    },
    [checkItems, setApplicationView]
  );

  return (
    <form>
      <div>
        <input
          type='checkbox'
          id='all-agreement'
          onChange={handleCheckAll}
          checked={checkItems.every((item) => item === true)}
        />
        <label htmlFor='all-agreement'>전체 동의</label>
      </div>

      {checkboxes.map((checkbox, index) => {
        return (
          <div key={index}>
            <input
              type='checkbox'
              id={index}
              checked={checkItems[index]}
              onChange={handleCheck}
              value={'Y'}
            />
            <label htmlFor={index}>{checkbox.label}</label>
          </div>
        );
      })}

      <button type='submit' onClick={onSubmit}>
        다음
      </button>
    </form>
  );
};
