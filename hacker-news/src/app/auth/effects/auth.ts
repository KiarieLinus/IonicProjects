import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import {
  AuthActionTypes,
  Login,
  LoginFailure,
  LoginSuccess,
  LogoutFailure,
  LogoutSuccess,
  Signup,
  SignupFailure,
  SignupSuccess,
} from '../actions/auth';
import { from, of } from 'rxjs';
import { catchError, map, mergeMap, tap } from 'rxjs/operators';
import { EmailPasswordPair, NewAccount } from 'src/app/models/user';

@Injectable({
  providedIn: 'root',
})
export class AuthEffects {
  constructor(
    private actions$: Actions,
    private authService: AuthService,
    private router: Router
  ) {}

  login$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActionTypes.Login),
      map((action: Login) => action.payload),
      mergeMap((pair: EmailPasswordPair) =>
        from(this.authService.login(pair)).pipe(
          mergeMap((user) => of(new LoginSuccess(user))),
          catchError((error) => of(new LoginFailure(error)))
        )
      )
    )
  );

  signup$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActionTypes.Signup),
      map((action: Signup) => action.payload),
      mergeMap((user: NewAccount) =>
        from(this.authService.create(user)).pipe(
          mergeMap((createdUser) =>
            of(new SignupSuccess(), new LoginSuccess(createdUser))
          ),
          catchError((error) => of(new SignupFailure(error)))
        )
      )
    )
  );

  loginSuccess$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(AuthActionTypes.LoginSuccess),
        tap(() => this.router.navigate(['/']))
      ),
    { dispatch: false }
  );

  logout$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActionTypes.Logout),
      mergeMap(() =>
        from(this.authService.logout()).pipe(
          map((user) => new LogoutSuccess()),
          catchError((error) => of(new LogoutFailure(error)))
        )
      )
    )
  );
}
