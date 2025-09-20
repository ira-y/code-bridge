export interface IArticle {
  id: number;
  title: string;
  authors: IAuthor[];
  url: string;
  image_url: string;
  news_site: string;
  summary: string;
  published_at: string;
  updated_at: string;
  featured: true;
  launches: ILaunch[];
  events: IEvent[];
  text?: string;
}

export interface IAuthor {
  name: string;
  socials: {
    x: string;
    youtube: string;
    instagram: string;
    linkedin: string;
    mastodon: string;
    bluesky: string
  }
}

export interface ILaunch {
  launch_id: string;
  provider: string;
}

export interface IEvent {
  event_id: number;
  provider: string;
}

export interface ISearchResponse {
  count: number;
  next: any;
  previous: any;
  results: IArticle[];
}
