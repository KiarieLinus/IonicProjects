import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { CommentsActionTypes } from '../actions/comments';
import * as commentsActions from '../actions/comments';
import * as itemActions from '../../../actions/items';
import { Observable, map, mergeMap, of, switchMap, take, withLatestFrom } from 'rxjs';
import { Action, Store } from '@ngrx/store';
import * as fromComments from '../reducers'
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { Item } from 'src/app/models/item';
import { pageSize } from '../reducers/pagination';

@Injectable({
    providedIn: 'root'
})
export class CommentsEffects {
    constructor(private actions$: Actions,
        private store: Store<fromComments.State>,
        private db: AngularFireDatabase) {

    }

    loadComment$: Observable<Action> = createEffect(() => this.actions$.pipe(
        ofType(CommentsActionTypes.Select),
        switchMap((action: commentsActions.Select) =>
            this.db.object<Item>(`/v0/item/${action.payload}`).valueChanges()
                .pipe(
                    take(1),
                    mergeMap(item => {
                        if (item)
                            return of(
                                new itemActions.LoadSuccess([item]),
                                new commentsActions.LoadSuccess(item),
                                new itemActions.Load((item.kids || []).slice(0,
                                    pageSize))
                            )
                        else return of()
                    })
                )

        ))
    );

    loadMore$: Observable<Action> = createEffect(() => this.actions$.pipe(
        ofType(CommentsActionTypes.LoadMore),
        withLatestFrom(this.store),
        map(([action, state]) => {
            const {
                items: { entities },
                comments: { pagination: { offset, limit },
                    comments: { selectedItemId } }
            } = state;

            const ids = entities[selectedItemId]!.kids || [];
            return new itemActions.Load(ids.slice(offset, offset + limit));
        }))
    );
}