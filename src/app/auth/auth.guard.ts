import { Injectable } from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree} from '@angular/router';
import { AuthService } from './auth.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private router: Router, public auth: AuthService) {

  }

  // canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
  //   const token = localStorage.getItem('token');
  //   if (!token) {
  //     this.router.navigate(['login']);
  //     return false;
  //   }
  //   return true;
  // }

  canActivate(): boolean {
    if (!this.auth.isAuthenticated()) {
      this.router.navigate(['login']);
      return false;
    }
    return true;
  }

}
