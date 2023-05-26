import { Action } from '@ngrx/store';
import { AuthActions, AuthActionTypes } from '../actions/auth';

export interface State {
    error: string | null;
    loading: boolean;
}

export const initialState: State = {
    error: null,
    loading: false,
};

export function reducer(
    state = initialState,
    action: Action
): State {
    const authAction = action as AuthActions;
    switch (authAction.type) {
        case AuthActionTypes.Login: {
            return {
                ...state,
                error: null,
                loading: true,
            };
        }

        case AuthActionTypes.LoginSuccess: {
            return {
                ...state,
                error: null,
                loading: false,
            };
        }

        case AuthActionTypes.LoginFailure: {
            return {
                ...state,
                error: authAction.payload,
                loading: false,
            };
        }

        default: {
            return state;
        }
    }
}

export const getError = (state: State) => state.error;
export const getLoading = (state: State) => state.loading;