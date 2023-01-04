import { Dayjs } from 'dayjs'
import { DocumentData } from 'firebase/firestore'

export type FormatData = DocumentData & {
  lastname: string
  lastnameYomigana: string
  firstname: string
  firstnameYomigana: string
  birthdate: Dayjs | null
  hasIdentityIdCard: string
  hasIdentityIdCardType: string
  residencePrefectures: string
  nearStation: string
  height: string
  weight: string
  threeSize: string
  kosatsuExperienced: string
  avExperienced: string
  huzokuExperienced: string
  cupsize: string
  underBust: string
  tatoo: string
  scar: string
  pregnancyExperienced: string
  childbirthExperienced: string
}
