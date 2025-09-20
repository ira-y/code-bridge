import { createReducer, on } from '@ngrx/store';
import { initialAppState } from '../models/app.models';
import * as AppActions from '../actions/app.actions';

export const appReducer = createReducer(
  initialAppState,
  on(AppActions.loadArticles, (state) => ({
    ...state,
    loadingArticles: true,
    error: null
  })),
  on(AppActions.loadArticlesSuccess, (state, { articles }) => ({
    ...state,
    loadingArticles: false,
    articles,
    error: null
  })),
  on(AppActions.loadArticlesFailure, (state, { error }) => ({
    ...state,
    loadingArticles: false,
    error
  })),
  on(AppActions.clearError, (state) => ({
    ...state,
    error: null
  })),
  on(AppActions.saveSearchRequest, (state, { searchRequest }) => ({
    ...state,
    searchRequest
  })),
  on(AppActions.loadArticle, (state) => ({
    ...state,
    loadingArticle: true,
    error: null
  })),
  on(AppActions.loadArticleSuccess, (state, { article }) => ({
    ...state,
    loadingArticle: false,
    selectedArticle: article,
    error: null
  })),
  on(AppActions.loadArticleFailure, (state, { error }) => ({
    ...state,
    loadingArticle: false,
    error
  }))
);
