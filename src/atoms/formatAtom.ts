import { FormatData } from '@utilities/types'
import { atom } from 'recoil'

export const formatState = atom<FormatData>({
  key: 'kosatsu-format',
  default: {
    lastname: '',
    lastnameYomigana: '',
    firstname: '',
    firstnameYomigana: '',
    birthdate: null,
    hasIdentityIdCard: '無',
    hasIdentityIdCardType: '',
    residencePrefectures: '',
    nearStation: '',
    height: '',
    weight: '',
    threeSize: '',
    kosatsuExperienced: '',
    avExperienced: '',
    huzokuExperienced: '',
    cupsize: '',
    underBust: '',
    tatoo: '',
    scar: '',
    pregnancyExperienced: '',
    childbirthExperienced: '',
  },
})
