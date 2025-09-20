import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { map, catchError, switchMap } from 'rxjs/operators';
import * as AppActions from '../actions/app.actions';
import { Article } from '../../shared/services/article.service';
import { Store } from '@ngrx/store';
import { loadArticle, loadArticles } from '../actions/app.actions';

@Injectable()
export class AppEffects {
  actions$ = inject(Actions);

  constructor ( private articleService: Article, private store: Store) {}

  loadArticles$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadArticles),
      switchMap(({request}) =>
        this.articleService.searchArticles(request).pipe(
          map(data => AppActions.loadArticlesSuccess({ articles: data.results })),
          catchError(error => of(AppActions.loadArticlesFailure({
            error: error.message
          })))
        )
      )
    )
  );

  loadArticle$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadArticle),
      switchMap(({id}) =>
        this.articleService.getArticleById(id).pipe(
          map(data => AppActions.loadArticleSuccess({ article: data })),
          catchError(error => of(AppActions.loadArticleFailure({
            error: error.message
          })))
        )
      )
    )
  );
}
