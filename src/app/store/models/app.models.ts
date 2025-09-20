import { IArticle } from "../../shared/interfaces/article.interface";

export interface IAppState {
  loadingArticles: boolean;
  loadingArticle: boolean;
  error: string | null;
  articles: IArticle[];
  searchRequest: string;
  selectedArticle: IArticle | null;
}

export const initialAppState: IAppState = {
  loadingArticles: false,
  loadingArticle: false,
  error: null,
  articles: [],
  searchRequest: '',
  selectedArticle: null
};
