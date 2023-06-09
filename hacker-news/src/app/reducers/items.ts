import { Action, createFeatureSelector, createSelector } from "@ngrx/store";
import { ItemActionTypes, ItemActions } from "../actions/items";
import { Item } from "../models/item";
import { EntityAdapter, EntityState, createEntityAdapter } from "@ngrx/entity";

export interface State extends EntityState<Item> {
    loading: boolean;
    error: any;
}

export const adapter: EntityAdapter<Item> = createEntityAdapter<Item>(
    {
        selectId: (item: Item) => item.id,
        sortComparer: false,
    }
);

export const initialState: State = adapter.getInitialState(
    {
        loading: false,
        error: null,
    }
);

export function reducer(
    state = initialState,
    action: Action,
): State {
    const itemActions = action as ItemActions
    switch (itemActions.type) {
        case ItemActionTypes.Load: {
            return {
                ...state,
                loading: true,
            };
        }
        case ItemActionTypes.LoadSuccess: {
            return adapter.upsertMany(itemActions.payload, {
                ...state,
                loading: false,
                error: null,
            });
        }
        case ItemActionTypes.LoadFail: {
            return {
                ...state,
                loading: false,
                error: itemActions.payload,
            }
        }
        default: {
            return state;
        }
    }
}

export const getItemsState = createFeatureSelector<State>('items');

export const {
    selectEntities: getItemEntities,
} = adapter.getSelectors(getItemsState);

export const getLoading = (state: State) => state.loading;

export const getError = (state: State) => state.error;

export const isItemsLoading = createSelector(
    getItemsState,
    getLoading,
);

export const getItemsError = createSelector(
    getItemsState,
    getError,
);