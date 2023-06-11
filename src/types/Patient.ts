import { LanguageString } from "./LanguageString";

export interface Patient {
  id: string
  given_name: LanguageString
  surname: LanguageString
  date_of_birth: string
  country: LanguageString
  hometown: LanguageString
  sex: string
  phone: string
  camp: string,

  medical_record_num: string,
  attention_datetime: string,
  attending_resources: string,
  origin: string,
  age: string,
  local_id: string,
  address: string,
  email: string,
  educational_status: string,
  religion: string,
  marital_status: string,
  occupation: string,
  mother_name: string,
  father_name: string,
  delivery_place: string,
  delivery_datetime: string,
  gestational_age: string,
  delivery_care: string,
  delivery_via: string,
  presentation: string,
  birthing_events: string
}

export interface NewPatient {
  id: string
  given_name: string
  surname: string
  date_of_birth: string
  country: string
  hometown: string
  sex: string
  phone: string,

  medical_record_num: string,
  attention_datetime: string,
  attending_resources: string,
  origin: string,
  age: string,
  local_id: string,
  address: string,
  email: string,
  educational_status: string,
  religion: string,
  marital_status: string,
  occupation: string,
  mother_name: string,
  father_name: string,
  delivery_place: string,
  delivery_datetime: string,
  gestational_age: string,
  delivery_care: string,
  delivery_via: string,
  presentation: string,
  birthing_events: string
}