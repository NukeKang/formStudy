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

export const temsState = selector({
  key: 'temsState',
  get: ({ get }) => {
    const { terms } = get(applicationDataAtom);

    return {
      privacyPolicyAgreement:
        terms?.privacyPolicyAgreement === 'Y' ? true : false,
      optionalPrivacyPolicyAgreement:
        terms?.optionalPrivacyPolicyAgreement === 'Y' ? true : false,
      policyHandlingAgreement:
        terms?.policyHandlingAgreement === 'Y' ? true : false,
      termsOfUseAgreement: terms?.termsOfUseAgreement === 'Y' ? true : false,
      ageFourteenCheck: terms?.ageFourteenCheck === 'Y' ? true : false,
    };
  },

  set: ({ set }, newValue) => {
    set(applicationDataAtom, (oldValue) => ({
      ...oldValue,
      terms: {
        ...oldValue.terms,
        ...newValue,
      },
    }));
  },
});

export const personalState = selector({
  key: 'personalState',
  get: ({ get }) => {
    const { personal } = get(applicationDataAtom);

    return {
      name: personal?.name,
      nationality: personal?.nationality || '대한민국',
      gender: personal?.gender,
      birth: personal?.birth,
      email: personal?.email,
      mobileCountryCode: personal?.mobileCountryCode || '82',
      mobileNumber: personal?.mobileNumber,
      address1: personal?.address1,
      address2: personal?.address2,
      snsAccounts:
        !personal?.snsAccounts || personal?.snsAccounts.length === 0
          ? [{ type: 'NONE', snsUrl: '' }]
          : personal?.snsAccounts.map((snsAccount) => ({
              type: snsAccount.type,
              snsUrl: snsAccount.snsUrl,
            })),
      profileImages:
        !personal?.profileImages || personal?.profileImages.length === 0
          ? [{ imageUrl: '' }, { imageUrl: '' }]
          : personal?.profileImages.map((profileImage) => ({
              imageUrl: profileImage.imageUrl,
            })),
    };
  },

  set: ({ set }, newValue) => {
    set(applicationDataAtom, (oldValue) => ({
      ...oldValue,
      personal: {
        ...oldValue.personal,
        name: newValue.name,
        nationality: newValue.nationality || 'KR',
        gender: newValue.gender,
        birth: newValue.birth,
        email: newValue.email,
        mobileCountryCode: newValue.mobileCountryCode || '82',
        mobileNumber: newValue.mobileNumber,
        address1: newValue.address1,
        address2: newValue.address2,
        snsAccounts:
          !newValue?.snsAccounts || newValue?.snsAccounts.length === 0
            ? [{ type: 'NONE', snsUrl: '' }]
            : newValue.snsAccounts.map((snsAccount) => ({
                type: snsAccount.type,
                snsUrl: snsAccount.snsUrl,
              })),
        profileImages:
          !newValue?.profileImages || newValue?.profileImages.length === 0
            ? [{ imageUrl: '' }, { imageUrl: '' }]
            : newValue.profileImages.map((profileImage) => ({
                imageUrl: profileImage.imageUrl,
              })),
      },
    }));
  },
});
