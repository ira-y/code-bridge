import { Component, Input } from '@angular/core';
import { IArticle } from '../shared/interfaces/article.interface';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { HighlightSearchPipe } from "../shared/pipes/highlight-search.pipe";
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-article-item',
  imports: [MatCardModule, MatButtonModule, MatIconModule, HighlightSearchPipe, CommonModule],
  templateUrl: './article-item.html',
  styleUrl: './article-item.scss'
})
export class ArticleItem {
  @Input() article!: IArticle;
  @Input() searchRequest!: string | null;

  constructor(private readonly router: Router) {}

  handleCardClick(): void {
    this.router.navigate(['/articles', this.article?.id]);
  }
}
