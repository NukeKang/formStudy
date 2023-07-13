import { atom } from 'recoil';

export const applicationViewAtom = atom({
  key: 'applicationViewAtom',
  default: 'PERSONAL',
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
      ageFourteenCheck: '',
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
