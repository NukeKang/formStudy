import { atom, selector } from 'recoil';

export const applicationViewAtom = atom({
  key: 'applicationViewAtom',
  default: '',
});

export const applicationDataAtom = atom({
  key: 'applicationDataAtom',
  default: {
    walletAddress: '',
    terms: {
      privacyPolicyAgreement: '',
      optionalPrivacyPolicyAgreement: '',
      policyHandlingAgreement: '',
      termsOfUseAgreement: '',
      ageCheck: '',
    },
    personal: {
      name: '',
      nationality: 'KR',
      gender: '',
      birth: '',
      email: '',
      mobileCountryCode: '82',
      mobileNumber: '',
      address1: '',
      address2: '',
      snsAccounts: [{ type: 'NONE', snsUrl: '' }],
      profileImages: [
        {
          imageUrl: '',
        },
        {
          imageUrl: '',
        },
      ],
    },
    job: {
      companyName: '',
      companyIndustryCategory: '',
      companyIndustrySubcategory: '',
      businessCardImageUrl: '',
    },
    detail: {
      introduction: '',
      favoriteMood: '',
      interests: [],
      favoriteColors: [],
    },
    saveStatus: 'TERMS',
  },
});

export const wholeDataAtom = atom({
  key: 'wholeDataAtom',
  default: {
    walletAddress: '',
    name: '',
    nationality: '',
    gender: '',
    email: '',
    birth: '',
    mobileNumber: '',
    address1: '',
    address2: '',
    companyName: '',
    companyIndustry: '',
    businessCardImageUrl: '',
    introduction: '',
    favoriteMood: '',
    privacyPolicyAgreement: '',
    ageCheck: '',
    termsOfUseAgreement: '',
    optionalPrivacyPolicyAgreement: '',
    profileImages: [{ imageUrl: '' }, { imageUrl: '' }],
    snsAccounts: [{ type: 'NONE', snsUrl: '' }],
    interests: [],
    favoriteColors: [{ code: '' }],
  },
});

export const termsState = selector({
  key: 'termsState',
  get: ({ get }) => {
    const data = get(wholeDataAtom);

    return {
      privacyPolicyAgreement:
        data?.privacyPolicyAgreement === 'Y' ? true : false,
      optionalPrivacyPolicyAgreement:
        data?.optionalPrivacyPolicyAgreement === 'Y' ? true : false,
      policyHandlingAgreement:
        data?.policyHandlingAgreement === 'Y' ? true : false,
      termsOfUseAgreement: data?.termsOfUseAgreement === 'Y' ? true : false,
      ageCheck: data?.ageCheck === 'Y' ? true : false,
    };
  },

  set: ({ set }, newValue) => {
    set(wholeDataAtom, (oldValue) => ({
      ...oldValue,
      privacyPolicyAgreement: newValue.privacyPolicyAgreement ? 'Y' : 'N',
      optionalPrivacyPolicyAgreement: newValue.optionalPrivacyPolicyAgreement
        ? 'Y'
        : 'N',
      policyHandlingAgreement: newValue.policyHandlingAgreement ? 'Y' : 'N',
      termsOfUseAgreement: newValue.termsOfUseAgreement ? 'Y' : 'N',
      ageCheck: newValue.ageCheck ? 'Y' : 'N',
    }));
  },
});

export const personalState = selector({
  key: 'personalState',
  get: ({ get }) => {
    const data = get(wholeDataAtom);

    return {
      name: data?.name,
      nationality: data?.nationality || '대한민국',
      gender: data?.gender,
      birth: data?.birth,
      email: data?.email,
      mobileCountryCode: data?.mobileCountryCode || '82',
      mobileNumber: data?.mobileNumber,
      address1: data?.address1,
      address2: data?.address2,
      snsAccounts: [{ type: 'NONE', snsUrl: '' }],
      profileImages:
        !data?.profileImages || data?.profileImages.length === 0
          ? [{ imageUrl: '' }, { imageUrl: '' }]
          : data?.profileImages.map((profileImage) => ({
              imageUrl: profileImage.imageUrl,
            })),
    };
  },

  set: ({ set }, newValue) => {
    set(wholeDataAtom, (oldValue) => ({
      ...oldValue,
      name: newValue.name,
      gender: newValue.gender,
      birth: newValue.birth,
      email: newValue.email,
      mobileCountryCode: newValue.mobileCountryCode,
      mobileNumber: newValue.mobileNumber,
      address1: newValue.address1,
      address2: newValue.address2,
      // snsAccounts: newValue.snsAccounts,
      profileImages: newValue.profileImages,
    }));
  },
});

export const jobState = selector({
  key: 'jobState',
  get: ({ get }) => {
    const data = get(wholeDataAtom);

    return {
      companyName: data?.companyName,
      companyIndustryCategory: data?.companyIndustryCategory,
      companyIndustrySubcategory: data?.companyIndustrySubcategory,
      businessCardImageUrl: data?.businessCardImageUrl,
    };
  },

  set: ({ set }, newValue) => {
    set(wholeDataAtom, (oldValue) => ({
      ...oldValue,
      companyName: newValue.companyName,
      companyIndustryCategory: newValue.companyIndustryCategory,
      companyIndustrySubcategory: newValue.companyIndustrySubcategory,
      businessCardImageUrl: newValue.businessCardImageUrl,
    }));
  },
});

export const detailState = selector({
  key: 'detailState',
  get: ({ get }) => {
    const data = get(wholeDataAtom);

    return {
      introduction: data?.introduction,
      favoriteMood: data?.favoriteMood,
      interests:
        data?.interests &&
        data?.interests.map(({ content }) => {
          return { content: content };
        }),
      favoriteColors:
        !data?.favoriteColors || data?.favoriteColors.length === 0
          ? [{ code: '' }, { code: '' }, { code: '' }]
          : data?.favoriteColors.map((favoriteColor) => ({
              code: favoriteColor.code,
            })),
    };
  },

  set: ({ set }, newValue) => {
    set(wholeDataAtom, (oldValue) => ({
      ...oldValue,
      introduction: newValue.introduction,
      favoriteMood: newValue.favoriteMood,
      interests: newValue.interests,
      favoriteColors: newValue.favoriteColors,
    }));
  },
});
