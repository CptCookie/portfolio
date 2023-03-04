export interface UserFollow {
  from_id: string;
  from_login: string;
  from_name: string;
  to_id: string;
  to_name: string;
  followed_at: string;
}

export interface PagResponse<T> {
  total: number;
  data: T;
  pagination: { cursor: string };
}

export interface Schedule {
  broadcaster_id: string;
  broadcaster_login: string;
  broadcaster_name: string;
  segments: ScheduleSegment[];
  vacation: string;
}

export interface ScheduleSegment {
  canceled_until: string;
  category: {
    id: string;
    name: string;
  };
  end_time: string;
  id: string;
  is_recurring: boolean;
  start_time: string;
  title: string;
}

export interface Channel {
  id: string;
  display_name: string;
  description: string;
  profile_image_url: string;
  offline_image_url: string;
}

export interface Auth {
  access_token: string;
}

export interface TokenValidation {
  client_id: string;
  login: string;
  user_id: string;
  expires_in: number;
}
