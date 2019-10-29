import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { tap, take } from 'rxjs/operators';
import {
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  CanActivate, CanLoad,
  CanActivateChild,
  UrlSegment,
  Route,
  Router
} from '@angular/router';

import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate, CanActivateChild, CanLoad {
  constructor(private authService: AuthService, private router: Router) { }

  canLoad(route: Route, segments: UrlSegment[]): Observable<boolean> {
    const url = segments.map(seg => `/${seg}`).join('');
    return this.checkAuthState(url).pipe(take(1));
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
    return this.checkAuthState(state.url);
  }

  canActivateChild(childRoute: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
    return this.canActivate(childRoute, state);
  }

  private checkAuthState(redirect: string): Observable<boolean> {
    return this.authService.isAuthenticated.pipe(tap(isAuthenticated => {
      if (!isAuthenticated) {
        this.router.navigate(['/login'], { queryParams: { redirect } });
      }
    }));
  }
}
