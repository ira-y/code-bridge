import { createAction, props } from '@ngrx/store';
import { IArticle } from '../../shared/interfaces/article.interface';

export const loadArticles = createAction('[App] Load Articles', props<{ request: string }>());
export const loadArticlesSuccess = createAction('[App] Load Articles Success', props<{ articles: IArticle[] }>());
export const loadArticlesFailure = createAction('[App] Load Articles Failure', props<{ error: string }>());

export const saveSearchRequest = createAction('[App] Save Search Request', props<{ searchRequest: string }>());

export const clearError = createAction('[App] Clear Error');

export const loadArticle = createAction('[App] Load Article', props<{ id: number }>());
export const loadArticleSuccess = createAction('[App] Load Article Success', props<{ article: IArticle }>());
export const loadArticleFailure = createAction('[App] Load Article Failure', props<{ error: string }>());
