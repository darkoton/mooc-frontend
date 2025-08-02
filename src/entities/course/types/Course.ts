/* eslint-disable lingui/no-unlocalized-strings */
export interface ICourse {
  uuid: string;
  created_at: string;
  updated_at: string;
  status: string;
  name: string;
  description: string;
  price: string;
  duration: number;
  study_format: StudyFormatType;
  language: LanguageType;
  card_logo: string;
  page_logo: string;
  rating: string;
  reviews_number: number;
  hashtags: string[] | null;
  provider_url: string | null;
  start_date: string | null;
  address: string | null;
  has_certificate: boolean | null;
  has_enter_exam: boolean | null;
  discount: string | null;
  education_term: string | null;
  type_of_training: string | null;
  teacher: string | null;
  trial_lesson: string | null;
  employment: string | null;
  category: number;
  provider: string;
  subcategory: number | null;
}

export const StudyFormat = {
  Online: "Online",
  Offline: "Offline",
  Hybrid: "Hybrid",
} as const;

export type StudyFormatType = (typeof StudyFormat)[keyof typeof StudyFormat];

export const CourseStatus = {
  Published: "Published",
  Draft: "Draft",
  Archived: "Archived",
} as const;

export type CourseStatusType = (typeof CourseStatus)[keyof typeof CourseStatus];
export const Language = {
  English: "English",
  Spanish: "Spanish",
  Ukrainian: "Ukrainian",
} as const;

export type LanguageType = (typeof Language)[keyof typeof Language];
