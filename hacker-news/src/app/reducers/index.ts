import { ActionReducerMap } from '@ngrx/store';
import * as fromItems from './items';

export interface State {
    items: fromItems.State;
}

export const reducers: ActionReducerMap<State> = {
    items: fromItems.reducer
}