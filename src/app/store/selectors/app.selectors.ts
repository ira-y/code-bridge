import { createSelector } from '@ngrx/store';
import { IAppState } from '../models/app.models';
import { IState } from '../reducers';

export const selectAppState = (state: IState): IAppState => state.app;

export const selectArticles = createSelector(
  selectAppState,
  (state: IAppState) => state.articles
);

export const selectArticlesNumber = createSelector(
  selectAppState,
  (state: IAppState) => state.articles?.length
);

export const selectSearchRequest = createSelector(
  selectAppState,
  (state: IAppState) => state.searchRequest
);

export const selectSelectedArticle = createSelector(
  selectAppState,
  (state: IAppState) => state.selectedArticle
);

export const selectIsLoadingArticles = createSelector(
  selectAppState,
  (state: IAppState) => state.loadingArticles
);

