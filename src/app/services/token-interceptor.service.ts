import { Injectable, Injector } from '@angular/core';
import { HttpInterceptor } from '@angular/common/http';
import { AuthService } from './auth.service';


@Injectable({
  providedIn: 'root'
})
export class TokenInterceptorService implements HttpInterceptor {

  constructor( private _inj: Injector) { }

  intercept(req, next){
    let authS = this._inj.get(AuthService);
    let tokenizedReq = req.clone({
      setHeaders:{
        Authorization : `Bearer ${authS.getTokens()}`
      }
    })

    return next.handle(tokenizedReq)
  }
}
