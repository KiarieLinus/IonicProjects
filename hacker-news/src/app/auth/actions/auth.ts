import { Action } from '@ngrx/store';
import { User, NewAccount, EmailPasswordPair } from 'src/app/models/user';

export enum AuthActionTypes {
  Login = '[Auth] Login',
  LoginSuccess = '[Auth] Login Success',
  LoginFailure = '[Auth] Login Failure',
  Signup = '[Auth] Sign Up',
  SignupSuccess = '[Auth] SignUp Success',
  SignupFailure = '[Auth] SignUp Failure',
  Logout = '[Auth] Logout',
  LogoutSuccess = '[Auth] Logout Success',
  LogoutFailure = '[Auth] Logout Failure',
}

/**
 * Every action is comprised of at least a type and an optional
 * payload. Expressing actions as classes enables powerful
 * type checking in reducer functions.
 */
export class Login implements Action {
  readonly type = AuthActionTypes.Login;

  constructor(public payload: EmailPasswordPair) {}
}

export class LoginSuccess implements Action {
  readonly type = AuthActionTypes.LoginSuccess;

  constructor(public payload: User) {}
}

export class LoginFailure implements Action {
  readonly type = AuthActionTypes.LoginFailure;

  constructor(public payload: any) {}
}

export class Signup implements Action {
  readonly type = AuthActionTypes.Signup;

  constructor(public payload: NewAccount) {}
}

export class SignupSuccess implements Action {
  readonly type = AuthActionTypes.SignupSuccess;
}

export class SignupFailure implements Action {
  readonly type = AuthActionTypes.SignupFailure;

  constructor(public payload: any) {}
}

export class Logout implements Action {
  readonly type = AuthActionTypes.Logout;
}

export class LogoutSuccess implements Action {
  readonly type = AuthActionTypes.LogoutSuccess;
}

export class LogoutFailure implements Action {
  readonly type = AuthActionTypes.LogoutFailure;

  constructor(public payload: any) {}
}

/**
 * Export a type alias of all actions in this action group
 * so that reducers can easily compose action types
 */
export type AuthActions =
  | Login
  | LoginSuccess
  | LoginFailure
  | Signup
  | SignupSuccess
  | SignupFailure
  | Logout
  | LogoutSuccess
  | LogoutFailure;
