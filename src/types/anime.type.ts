export interface AnimeList {
  data: Title[];
  meta: Meta;
}

export interface Title {
  id: number;
  type: Type;
  year: number;
  name: Name;
  alias: string;
  season: Season;
  poster: Poster;
  fresh_at: string;
  created_at: string;
  updated_at: string;
  is_ongoing: boolean;
  age_rating: AgeRating;
  publish_day: PublishDay;
  description?: string;
  notification?: string;
  episodes_total?: number;
  external_player: any;
  is_in_production: boolean;
  is_blocked_by_geo: boolean;
  is_blocked_by_copyrights: boolean;
  added_in_users_favorites: number;
  average_duration_of_episode?: number;
  added_in_planned_collection: number;
  added_in_watched_collection: number;
  added_in_watching_collection: number;
  added_in_postponed_collection: number;
  added_in_abandoned_collection: number;
  genres: Genre[];
  members: Member[];
  sponsor: any;
  episodes: Episode[];
}

export interface Type {
  value: string;
  description: string;
}

export interface Name {
  main: string;
  english?: string;
  alternative?: string;
}

export interface Season {
  value: string;
  description: string;
}

export interface Poster {
  startsWith(arg0: string): unknown;
  src: string;
  preview: string;
  thumbnail: string;
  optimized: Optimized;
}

export interface Optimized {
  src: string;
  preview: string;
  thumbnail: string;
}

export interface AgeRating {
  value: string;
  label: string;
  is_adult: boolean;
  description: string;
}

export interface PublishDay {
  value: number;
  description: string;
}

export interface Genre {
  id: number;
  name: string;
  image: Image;
  total_releases: number;
}

export interface Image {
  preview: string;
  thumbnail: string;
  optimized: Optimized2;
}

export interface Optimized2 {
  preview: string;
  thumbnail: string;
}

export interface Member {
  id: string;
  role: Role;
  nickname: string;
  user: any;
}

export interface Role {
  value: string;
  description: string;
}

export interface Episode {
  id: string;
  name: string;
  ordinal: number;
  opening: Opening;
  ending: Ending;
  preview: Preview;
  hls_480: string;
  hls_720: string;
  hls_1080: string;
  duration: number;
  rutube_id: any;
  youtube_id: any;
  updated_at: string;
  sort_order: number;
  release_id: number;
  name_english: any;
}

export interface Opening {
  stop: number;
  start: number;
}

export interface Ending {
  stop: number;
  start: number;
}

export interface Preview {
  src: string;
  preview: string;
  thumbnail: string;
  optimized: Optimized3;
}

export interface Optimized3 {
  src: string;
  preview: string;
  thumbnail: string;
}
export interface Meta {
  pagination: IPagination;
}

export interface IPagination {
  total: number;
  count: number;
  per_page: number;
  current_page: number;
  total_pages: number;
  links: Links;
}

export interface Links {
  next: string;
}
