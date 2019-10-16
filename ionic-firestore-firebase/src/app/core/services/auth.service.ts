import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { auth } from 'firebase';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { AuthOptions, AuthProvider, User } from './auth.type';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  authState$: Observable<firebase.User>;

  constructor(private afAuth: AngularFireAuth) {
    this.authState$ = afAuth.authState;
  }

  get isAuthenticated(): Observable<boolean> {
    return this.authState$.pipe(map(user => user != null));
  }

  signIn({isSignIn, provider, user}: AuthOptions): Promise<auth.UserCredential> {
    let authResponse: Promise<auth.UserCredential>;

    if (provider !== AuthProvider.Email) {
      authResponse = this.signInWithPopup(provider);
    } else {
      authResponse = isSignIn ? this.signInWithEmail(user) : this.signUpWithEmail(user);
    }

    return authResponse;
  }

  signOut(): Promise<void> {
    return this.afAuth.auth.signOut();
  }

  private signInWithEmail({email, password}: User): Promise<auth.UserCredential> {
    return this.afAuth.auth.signInWithEmailAndPassword(email, password);
  }

  private signUpWithEmail({name, email, password}: User): Promise<auth.UserCredential> {
    return this.afAuth.auth
    .createUserWithEmailAndPassword(email, password)
    .then(credentials => {
      credentials.user.updateProfile({displayName: name, photoURL: null});
      return credentials;
    });
  }

  private signInWithPopup(provider: AuthProvider): Promise<auth.UserCredential> {
    let providerAuth = null;

    switch (provider) {
      case AuthProvider.Facebook:
        providerAuth = new auth.FacebookAuthProvider();
        break;
    }

    return this.afAuth.auth.signInWithPopup(providerAuth);
  }
}
