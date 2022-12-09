import { Injectable } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { CookieService } from 'ngx-cookie-service'

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private _router: Router
    , private _actRou: ActivatedRoute
    , private _cookieS: CookieService) { }

  get isLogged() {
    //this.storeTokens(165656,30);
    if (!(localStorage.getItem('apitoken') && localStorage.getItem('expired_in'))) {      
      
      this._router.navigate(['/']);
      return false;
    }
    else return true;
    
  }
  
  storeTokens(tokens,expireTime) {   
    //this._cookieS.set("apitoken", tokens);
    localStorage.setItem("apitoken", tokens);
    localStorage.setItem("expired_in", expireTime);
  }

  removeTokens() {
    localStorage.removeItem('apitoken');
    localStorage.removeItem('expired_in');
    localStorage.removeItem('loginDate');

  }  
  getTokens() {
    return localStorage.getItem('apitoken');
  }
}
