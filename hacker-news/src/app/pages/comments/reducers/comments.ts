import { Action } from "@ngrx/store";
import { CommentsActions, CommentsActionTypes } from "../actions/comments";

export interface State {
    selectedItemId: number | null;
}

const initialState: State = {
    selectedItemId: null,
};

export function reducer(
    state = initialState,
    action: Action): State {
    const commentsAction = action as CommentsActions

    switch (commentsAction.type) {
        case CommentsActionTypes.LoadSuccess:
            return {
                ...state,
                selectedItemId: commentsAction.payload.id
            };
        default: {
            return state;
        }
    }
}

export const getSelectedItemId = (state: State) => state.selectedItemId;