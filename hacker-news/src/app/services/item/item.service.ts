import { Injectable } from '@angular/core';
import { Items } from 'src/app/models/items';
import { Item } from 'src/app/models/item';
import { Observable, of, combineLatest, merge, Subject } from 'rxjs';
import { map, mergeMap, filter, skip, switchAll, take, withLatestFrom, takeWhile } from 'rxjs/operators'
import { AngularFireDatabase } from '@angular/fire/compat/database';

export interface Query {
  refresh?: boolean;
  offset: number;
  limit: number;
}

@Injectable({
  providedIn: 'root'
})
export class ItemService {
  private queries: Subject<Query>;

  total = 0; //me

  constructor(private db: AngularFireDatabase) {
    this.queries = new Subject<Query>();
  }

  load(query: Query) {
    this.queries.next(query);
  }

  get(): Observable<Items> {
    const rawItemIds = this.db.list<number>('/v0/topstories')
      .valueChanges();

    rawItemIds.pipe(takeWhile((value: number[]) =>
      value.length != this.total
    )).forEach(num => {
      this.total = num.length;
    }) //me

    const itemIds = combineLatest([
      rawItemIds,
      this.queries]
    ).pipe(
      filter(([ids, query]) => query.refresh!),
      map(([ids, query]) => ids)
    );
    const selector = ({ offset, limit }: Query, ids: number[]) =>
      combineLatest((ids.slice(offset, offset + limit)
        .map(id => this.db.object<Item>('/v0/item/' + id).
          valueChanges()))
      ) as Observable<Items>;
    return merge(
      combineLatest([this.queries, itemIds]).pipe(
        map(([query, ids]) => selector(query, ids).
          pipe(take(1)))
      ),
      this.queries.pipe(
        skip(1),
        withLatestFrom(itemIds, selector)
      )
    ).pipe(switchAll());
  }
}
