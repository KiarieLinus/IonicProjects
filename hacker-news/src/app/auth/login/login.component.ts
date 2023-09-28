import { Component } from '@angular/core';
import * as fromAuth from '../reducers';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { EmailPasswordPair } from '../../models/user';
import { Login } from '../actions/auth';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  email?: string;
  password?: string;
  loading$: Observable<Boolean>;
  error$: Observable<any>;

  constructor(private store: Store<fromAuth.State>) {
    this.loading$ = this.store.pipe(select(fromAuth.
      getLoginPageLoading));
    this.error$ = this.store.pipe(select(fromAuth.
      getLoginPageError));
  }
  login(value: EmailPasswordPair) {
    this.store.dispatch(new Login(value));
  }

}
