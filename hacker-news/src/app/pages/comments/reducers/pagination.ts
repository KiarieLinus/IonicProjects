import { Action } from "@ngrx/store";
import { CommentsActions, CommentsActionTypes } from "../actions/comments";

export interface State {
    offset: number;
    limit: number;
    total: number;
};

export const pageSize = 20;

const initialState: State = {
    offset: 0,
    limit: pageSize,
    total: 0
};

export function reducer(
    state = initialState,
    action: Action,
): State {
    const commentsAction = action as CommentsActions
    switch (commentsAction.type) {
        case CommentsActionTypes.LoadMore:
            const offset = state.offset + state.limit;
            return {
                ...state,
                offset: offset < state.total ? offset : state.offset,
            };

        case CommentsActionTypes.LoadSuccess:
            return {
                ...state,
                total: (commentsAction.payload.kids &&
                    commentsAction.payload.kids.length) || 0,
            }

        default: {
            return state;
        }
    }
}