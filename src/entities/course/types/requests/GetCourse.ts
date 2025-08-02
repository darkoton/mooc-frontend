export interface IGetCourseRequest {
  search?: string;
  ordering?: string;
  page?: string | number;
  page_size?: string | number;
  category?: number | string;
  sub_category?: number | string;
  status?: string;
  price_min?: number | string;
  price_max?: number | string;
  provider?: string | number;
  study_format?: string;
  language?: string;
  rating_min?: number | string;
  rating_max?: number | string;
  reviews_number_min?: string | number;
  reviews_number_max?: string | number;
  hashtags_list?: string;
  start_date_min?: string;
  start_date_max?: string;
  has_certificate?: boolean;
  has_enterprise_certificate?: boolean;
  discount?: number | string;
  created_at_min?: string;
  created_at_max?: string;
  q?: string;
  duration_min?: string | number;
  duration_max?: string | number;
}
