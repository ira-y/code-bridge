import { Component } from '@angular/core';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { debounceTime, distinctUntilChanged, filter, map } from 'rxjs/operators';
import { Store } from '@ngrx/store';
import { loadArticles, saveSearchRequest } from '../store/actions/app.actions';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-search',
  imports: [FormsModule, MatFormFieldModule, MatInputModule, ReactiveFormsModule, MatIconModule],
  templateUrl: './search.html',
  styleUrl: './search.scss'
})
export class Search {
  lookupControl = new FormControl('');

  constructor(private store: Store) {
    this.initLookupWatcher();
  }

  initLookupWatcher(): void {
    this.lookupControl.valueChanges
      .pipe(
        filter((val): val is string =>
          typeof val === 'string' && val.trim().length > 2
        ),
        map(val => val.trim().toLowerCase()),
        debounceTime(300),
        distinctUntilChanged(),
        takeUntilDestroyed()
      )
      .subscribe((val) => {
        this.store.dispatch(saveSearchRequest({ searchRequest: val }));
        this.store.dispatch(loadArticles({ request: val }));
      });
  }
}
