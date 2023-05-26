import { Injectable, Inject } from '@angular/core';
import { EmailPasswordPair, NewAccount } from '../../models/user';
import {
  Auth, User, user,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut
} from '@angular/fire/auth';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private user$;

  constructor(
    @Inject('project1Auth') private auth: Auth
  ) {
    this.user$ = user(auth);
  }

  create(user: NewAccount): Promise<User> {
    return createUserWithEmailAndPassword(this.auth, user.email, user.password)
      .then(result => result.user);
  }

  login(user: EmailPasswordPair): Promise<User> {
    return signInWithEmailAndPassword(this.auth, user.email, user.password)
      .then(result => result.user);
  }

  logout(): Promise<any> {
    return signOut(this.auth);
  }
}
