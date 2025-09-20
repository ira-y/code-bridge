import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    redirectTo: '/articles',
    pathMatch: 'full'
  },
  {
    path: 'articles',
    loadComponent: () => import('./home-page/home-page').then(c => c.HomePage)
  },
  {
    path: 'articles/:id',
    loadComponent: () => import('./article-details/post-details').then(c => c.PostDetails)
  },
  {
    path: '**',
    redirectTo: '/articles'
  }
];
