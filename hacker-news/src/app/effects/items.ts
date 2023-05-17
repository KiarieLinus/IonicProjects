import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { combineLatest, Observable, of } from 'rxjs';
import { Action } from '@ngrx/store';
import { catchError, map, mergeMap, take } from 'rxjs/operators';
import { ItemActionTypes, Load, LoadFail, LoadSuccess } from '../actions/items';
import { Item } from '../models/item';

@Injectable()
export class ItemsEffects {
    constructor(private actions$: Actions, private db:
        AngularFireDatabase) { }

    loadItems$: Observable<Action> = createEffect(() => this.actions$.pipe(
        ofType(ItemActionTypes.Load),
        map((action: Load) => action.payload),
        mergeMap((ids: number[]) =>
            combineLatest(
                ids.map(id => this.db.object('/v0/item/' + id).
                    valueChanges().pipe(take(1))) as Observable<unknown>[] as Observable<Item>[]
            ).pipe(
                map((items: Item[]) => new LoadSuccess(items)),
                catchError(error => of(new LoadFail(error))),
            ))
    ))
}

