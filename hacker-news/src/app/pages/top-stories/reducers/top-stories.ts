import { Action } from "@ngrx/store";
import { TopStoriesActionTypes, TopStoriesActions } from "../actions/top-stories";


export interface State {
    ids: number[];
    loading: boolean;
    error?: any;
}

const initialState: State = {
    ids: [],
    loading: false,
    error: null,
};

export function reducer(
    state: State = initialState,
    action: Action,
): State {
    const topStoriesAction = action as TopStoriesActions
    switch (topStoriesAction.type) {
        case TopStoriesActionTypes.Refresh:
            return {
                ...state,
                loading: true,
            };
        case TopStoriesActionTypes.LoadSuccess:
            return {
                loading: false,
                ids: topStoriesAction.payload,
                error: null,
            };
        case TopStoriesActionTypes.LoadFail:
            return {
                ...state,
                loading: false,
                error: topStoriesAction.payload,
            };
        default: {
            return state;
        }
    }
}

export const getIds = (state: State) => state.ids;

export const getLoading = (state: State) => state.loading;

export const getError = (state: State) => state.error;