import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { loadArticle } from '../store/actions/app.actions';
import { selectSelectedArticle } from '../store/selectors/app.selectors';
import { AsyncPipe } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-post-details',
  imports: [AsyncPipe, MatIconModule],
  templateUrl: './post-details.html',
  styleUrl: './post-details.scss'
})
export class PostDetails implements OnInit {
  private route = inject(ActivatedRoute);
  private store = inject(Store);
  private router = inject(Router);

  chosenPost$ = this.store.select(selectSelectedArticle);

  ngOnInit(): void {
    this.fetchPost();
  }

  fetchPost(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.store.dispatch(loadArticle({ id }));
  }

  goBack(): void {
    this.router.navigate(['/articles']);
  }
}
