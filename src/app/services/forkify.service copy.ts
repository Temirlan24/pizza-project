import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { IDetailsRes, IRecipes } from '../models/forkify.model';

@Injectable({
  providedIn: 'root'
})
export class ForkifyService {
  private count = new BehaviorSubject<number>(2);
  private url = 'https://forkify-api.herokuapp.com/api';

  constructor(
    private http: HttpClient
  ) {}

  get count$() {
    return this.count.asObservable();
  }

  search(q: string): Observable<IRecipes> {
    const params = new HttpParams().set('q', q);

    return this.http.get<IRecipes>(this.url + '/search', { params });
  }

  getDetails(rId: string): Observable<IDetailsRes> {
    const params = new HttpParams().set('rId', rId);

    return this.http.get<IDetailsRes>(this.url + '/get', { params })
  }

  setCount(count: number) {
    this.count.next(count);
  }
}
