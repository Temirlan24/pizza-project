import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { interval, Observable } from 'rxjs';
import { debounceTime, distinctUntilChanged, map, takeUntil, tap } from 'rxjs/operators';
import { BaseComponent } from '../base.component';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent extends BaseComponent implements OnInit {
  @Output() search = new EventEmitter<string>();
  time$: Observable<Date> = interval(1000).pipe(
    map(() => new Date()),
  );
  queryControl = new FormControl(null);

  constructor(private router: Router) {
    super();
  }

  ngOnInit(): void {
    this.search.emit('Pizza');

    this.queryControl.valueChanges
      .pipe(
        debounceTime(700),
        distinctUntilChanged(),
        tap(query => {
          this.search.emit(query);
        })
      )
      .pipe(takeUntil(this.destroy$))
      .subscribe();
  }
}
