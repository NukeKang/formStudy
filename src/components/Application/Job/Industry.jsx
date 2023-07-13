import React, { useCallback } from 'react';
import { useSetRecoilState } from 'recoil';
import { applicationDataAtom } from '../../../store/applicationState';
const INDUSTRY_LIST = [
  { id: 1, name: 'IT' },
  { id: 2, name: '금융' },
  { id: 3, name: '제조' },
  { id: 4, name: '의료' },
  { id: 5, name: '교육' },
];

const SUB_INDUSTRY_LIST = [
  { id: 1, name: 'IT1' },
  { id: 2, name: 'IT2' },
  { id: 3, name: 'IT3' },
  { id: 4, name: 'IT4' },
  { id: 5, name: 'IT5' },
];

export const Industry = () => {
  const setApplicationData = useSetRecoilState(applicationDataAtom);
  const onChangeIndustry = useCallback(
    (e) => {
      const { value } = e.target;
      setApplicationData((prev) => ({
        ...prev,
        job: {
          ...prev.job,
          companyIndustryCategory: value,
        },
      }));
    },
    [setApplicationData]
  );

  const onChangeSubIndustry = useCallback(
    (e) => {
      const { value } = e.target;
      setApplicationData((prev) => ({
        ...prev,
        job: {
          ...prev.job,
          companyIndustrySubcategory: value,
        },
      }));
    },
    [setApplicationData]
  );

  return (
    <div>
      <label htmlFor='companyIndustryCategory'>업계</label>
      <select id='companyIndustryCategory' onChange={onChangeIndustry}>
        {INDUSTRY_LIST.map((item) => {
          return (
            <option key={item.id} value={item.name}>
              {item.name}
            </option>
          );
        })}
      </select>

      <label htmlFor='companyIndustrySubcategory'>업종</label>
      <select id='companyIndustrySubcategory' onChange={onChangeSubIndustry}>
        {SUB_INDUSTRY_LIST.map((item) => {
          return (
            <option key={item.id} value={item.name}>
              {item.name}
            </option>
          );
        })}
      </select>
    </div>
  );
};
