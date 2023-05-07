import { Injectable } from '@angular/core';
import { Items } from 'src/app/models/items';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ItemService {

  constructor() { }

  load(offset: number, limit: number): Observable<Items> {
    return of({
      offset: 0,
      limit: 0,
      total: 0,
      results: [],
    })
  }
}
