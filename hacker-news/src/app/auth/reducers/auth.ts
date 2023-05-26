import { User } from "src/app/models/user";
import { AuthActionTypes, AuthActions } from "../actions/auth";
import { Action } from "@ngrx/store";

export interface State {
    loggedIn: boolean;
    user: User | null;
    logoutError: any;
}

export const initialState: State = {
    loggedIn: false,
    user: null,
    logoutError: null,
}

export function reducer(
    state = initialState,
    action: Action
): State {
    const authAction = action as AuthActions;
    switch (authAction.type) {
        case AuthActionTypes.LoginSuccess: {
            return {
                ...state,
                loggedIn: true,
                user: authAction.payload,
                logoutError: null,
            };
        }
        case AuthActionTypes.LogoutSuccess: {
            return initialState;
        }

        case AuthActionTypes.LogoutFailure: {
            return {
                ...state,
                logoutError: authAction.payload,
            }
        }

        default: {
            return state;
        }
    }
}

export const getLoggedIn = (state: State) => state.loggedIn;
export const getUser = (state: State) => state.user;