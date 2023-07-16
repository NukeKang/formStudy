import React, { useCallback } from 'react';
import { jobState } from '../../../store/applicationState';
import { useRecoilState } from 'recoil';
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
  const [jobData, setJobData] = useRecoilState(jobState);
  const onChangeIndustry = useCallback(
    (e) => {
      const { value } = e.target;

      setJobData((prev) => ({
        ...prev,
        companyIndustryCategory: value,
      }));
    },
    [setJobData]
  );

  const onChangeSubIndustry = useCallback(
    (e) => {
      const { value } = e.target;
      setJobData((prev) => ({
        ...prev,
        companyIndustrySubcategory: value,
      }));
    },
    [setJobData]
  );

  return (
    <div>
      <label htmlFor='companyIndustryCategory'>업계</label>
      <select
        id='companyIndustryCategory'
        onChange={onChangeIndustry}
        value={jobData.companyIndustryCategory}
      >
        {INDUSTRY_LIST.map((item) => {
          return (
            <option key={item.id} value={item.name}>
              {item.name}
            </option>
          );
        })}
      </select>

      <label htmlFor='companyIndustrySubcategory'>업종</label>
      <select
        id='companyIndustrySubcategory'
        onChange={onChangeSubIndustry}
        value={jobData.companyIndustrySubcategory}
      >
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
