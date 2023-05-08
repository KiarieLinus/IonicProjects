import { Injectable } from '@angular/core';
import { Items } from 'src/app/models/items';
import { Observable, of, combineLatest, from } from 'rxjs';
import { map, mergeMap } from 'rxjs/operators'
import { AngularFireDatabase } from '@angular/fire/compat/database'

@Injectable({
  providedIn: 'root'
})
export class ItemService {

  constructor(private db: AngularFireDatabase) { }

  load(offset: number, limit: number): Observable<Items> {
    return this.db.list('/v0/topstories')
      .valueChanges()
      .pipe(
        map(ids => ids.slice(offset, offset + limit)),
        mergeMap((ids: any[]) => combineLatest(ids.map(
          id => this.db.object('/v0/item/' + id).valueChanges()
        ))),
        map((items: any) => ({
          offset,
          limit,
          total: limit,
          results: items,
        }))
      )
  }
}
