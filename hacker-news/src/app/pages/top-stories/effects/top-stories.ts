import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Action, Store } from '@ngrx/store';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { TopStoriesActionTypes } from '../actions/top-stories';
import {
    catchError,
    map,
    mergeMap,
    switchMap,
    take,
    withLatestFrom
} from 'rxjs/operators';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import * as fromTopStories from '../reducers';
import { pageSize } from '../reducers/pagination';
import * as itemActions from '../../../actions/items';
import * as topStoriesActions from '../actions/top-stories';

@Injectable({
    providedIn: 'root'
})
export class TopStoriesEffects {
    constructor(private actions$: Actions,
        private store: Store<fromTopStories.State>,
        private db: AngularFireDatabase) { }

    loadTopStories$: Observable<Action> = createEffect(() => this.actions$.pipe(
        ofType(TopStoriesActionTypes.Refresh),
        switchMap(() =>
            this.db.list<number>('/v0/topstories').valueChanges()
                .pipe(
                    take(1),
                    mergeMap((ids: number[]) => of(
                        new topStoriesActions.LoadSuccess(ids),
                        new itemActions.Load(ids.slice(0, pageSize)))),
                    catchError(error => of(new topStoriesActions.LoadFail(error))),
                ))));

    loadMore$: Observable<Action> = createEffect(() => this.actions$.pipe(
        ofType(TopStoriesActionTypes.LoadMore),
        withLatestFrom(this.store),
        map(([action, state]) => {
            const {
                pagination: {
                    offset,
                    limit,
                },
                stories: {
                    ids,
                }
            } = state.topStories;
            return new itemActions.Load(ids.slice(offset, offset + limit));
        })));
}