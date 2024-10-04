import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private loggedIn = false;

  constructor(private router: Router) {}

  isLoggedIn(): boolean {
    return !!localStorage.getItem('User');
  }

  login(Data: any) {
    localStorage.setItem('User', JSON.stringify(Data));
    this.router.navigate(['/home']);
  }

  logout() {
    this.loggedIn = false;
    localStorage.removeItem('User');
    this.router.navigate(['/login']);
  }
}
