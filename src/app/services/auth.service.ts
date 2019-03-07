import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFireDatabase } from '@angular/fire/database';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  authState: any = null;
  role: any;

  constructor(
    private _firebaseAuth: AngularFireAuth,
    private _firebaseDatabase: AngularFireDatabase
  ) {
    _firebaseAuth.authState.subscribe((auth: any) => {
      this.authState = auth;
      if (auth) {
        this._firebaseDatabase
          .object(`users/${auth.uid}`)
          .valueChanges()
          .subscribe((user: any) => {
            this.role = user.admin ? 'admin' : 'patient';
          });
      }
    });
  }

  login(loginCredentials: any) {
    return this._firebaseAuth.auth.signInWithEmailAndPassword(
      loginCredentials.email,
      loginCredentials.password
    );
  }

  async singup(signupCredentials: any) {
    return this._firebaseAuth.auth
      .createUserWithEmailAndPassword(signupCredentials.email, signupCredentials.password)
      .then((data: any) => {
        delete signupCredentials.password;
        this.createUser(signupCredentials, data.user.uid)
          .then(() => {
            console.log('user stored');
          })
          .catch(error => {
            console.log(error);
          });
      });
  }

  // Sign out from the application
  signOut() {
    return this._firebaseAuth.auth.signOut();
  }

  createUser(user: any, uid: string) {
    return this._firebaseDatabase.list(`users`).set(uid, user);
  }

  // Returns true if user is logged in
  get authenticated(): boolean {
    return this.authState !== null;
  }

  // Returns current user
  get currentUser(): any {
    return this.authenticated ? this.authState.auth : null;
  }

  // Returns current user UID
  get currentUserId(): string {
    return this.authenticated ? this.authState.uid : '';
  }

  get roleMember(): any {
    return this.role;
  }
}
