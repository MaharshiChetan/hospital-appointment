import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AngularFireAuth } from '@angular/fire/auth';

@Injectable({
  providedIn: 'root',
})
export class LoginGuard implements CanActivate {
  constructor(private router: Router, private _firebaseAuth: AngularFireAuth) {}
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> | Promise<boolean> | boolean {
    const subscription = this._firebaseAuth.authState.subscribe(auth => {
      subscription.unsubscribe();
      if (!auth) {
        return true;
      } else {
        this.router.navigate(['home']);
      }
    });
    return true;
  }
}
