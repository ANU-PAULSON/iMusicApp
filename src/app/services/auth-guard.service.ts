import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from './login.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService {

  constructor(private router: Router, private loginService: LoginService) { }

  canActivate(): boolean {
    if (this.loginService.isLoggedIn()) {
      return true
    }
    this.router.navigate(['login'])
    return false;
  }
  getBearerToken(){
    // this method should return the authentication token stored in local storage
    return localStorage.getItem("token")
  }
}
