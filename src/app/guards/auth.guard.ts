import { Injectable } from '@angular/core';
import { CanActivate, Router, UrlTree } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private router: Router) {}

  canActivate(): boolean | UrlTree {
    const token = localStorage.getItem('token'); // або sessionStorage
    if (token) {
      return true; // Доступ дозволено
    } else {
      // Перенаправлення на /auth/login
      return this.router.parseUrl('/auth/login');
    }
  }
}
