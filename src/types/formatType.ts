import { DocumentData } from 'firebase/firestore'

export type FormatType = DocumentData & {
  lastname: string | null
  lastnameYomigana: string | null
  firstname: string | null
  firstnameYomigana: string | null
  birthdate: string | null
  hasIdentityIdCard: string | null
  hasIdentityIdCardType: string | null
  residencePrefectures: string | null
  nearStation: string | null
  height: string | null
  weight: string | null
  threeSize: string | null
  kosatsuExperienced: string | null
  avExperienced: string | null
  huzokuExperienced: string | null
  cupsize: string | null
  underBust: string | null
  tatoo: string | null
  scar: string | null
  pregnancyExperienced: string | null
  childbirthExperienced: string | null
}
