import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { IArticle, ISearchResponse } from '../interfaces/article.interface';
import { map, Observable, switchMap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class Article {
  http = inject(HttpClient);

  private readonly baseUrl = 'https://api.spaceflightnewsapi.net/v4';

  searchArticles(searchQuery: string, limit: number = 10, offset: number = 0): Observable<ISearchResponse> {
    const keywords = searchQuery.trim().split(/\s+/).filter(word => word.length > 0);

    if (keywords.length === 0) {
      let params = new HttpParams()
        .set('limit', limit.toString())
        .set('offset', offset.toString());
      return this.http.get<ISearchResponse>(`${this.baseUrl}/articles/`, { params });
    }

    const searchRequests = keywords.map(keyword => {
      const titleParams = new HttpParams()
        .set('title_contains', keyword)
        .set('limit', 1000)
        .set('offset', '0');

      const summaryParams = new HttpParams()
        .set('summary_contains', keyword)
        .set('limit', 1000)
        .set('offset', '0');

      return [
        this.http.get<ISearchResponse>(`${this.baseUrl}/articles/`, { params: titleParams }),
        this.http.get<ISearchResponse>(`${this.baseUrl}/articles/`, { params: summaryParams })
      ];
    }).flat();

    return new Observable<ISearchResponse>(observer => {
      Promise.all(searchRequests.map(req => req.toPromise()))
        .then(responses => {
          const allArticles: IArticle[] = [];
          const seenIds = new Set<number>();

          responses.forEach(response => {
            if (response?.results) {
              response.results.forEach(article => {
                if (!seenIds.has(article.id)) {
                  seenIds.add(article.id);
                  allArticles.push(article);
                }
              });
            }
          });

          const startIndex = offset;
          const endIndex = Math.min(startIndex + limit, allArticles.length);
          const paginatedResults = allArticles.slice(startIndex, endIndex);

          const result: ISearchResponse = {
            count: allArticles.length,
            next: endIndex < allArticles.length ? 'next_page' : null,
            previous: startIndex > 0 ? 'previous_page' : null,
            results: paginatedResults
          };

          observer.next(result);
          observer.complete();
        })
        .catch(error => {
          observer.error(error);
        });
    });
  }

  getArticleById(id: number): Observable<IArticle> {
    this.http.get(this.baseUrl);
    return this.http.get<IArticle>(`${this.baseUrl}/articles/${id}`);
  }
}
