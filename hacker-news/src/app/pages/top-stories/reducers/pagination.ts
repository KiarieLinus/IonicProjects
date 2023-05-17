import { Action } from "@ngrx/store";
import { TopStoriesActionTypes, TopStoriesActions } from "../actions/top-stories";

export const pageSize = 10;

export interface State {
    offset: number;
    limit: number;
    total: number;
}

const initialState: State = {
    offset: 0,
    limit: pageSize,
    total: 0,
};

export function reducer(
    state = initialState,
    action: Action,
): State {
    const topStoriesAction = action as TopStoriesActions
    switch (topStoriesAction.type) {
        case TopStoriesActionTypes.Refresh:
            return {
                ...state,
                offset: 0,
                limit: pageSize,
            };
        case TopStoriesActionTypes.LoadMore:
            const offset = state.offset + state.limit;
            return {
                ...state,
                offset: offset < state.total ? offset : state.offset,
            };
        case TopStoriesActionTypes.LoadSuccess:
            return {
                ...state,
                total: topStoriesAction.payload.length,
            };
        default: {
            return state;
        }
    }
}