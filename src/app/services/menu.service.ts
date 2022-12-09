import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Observable } from "../../../node_modules/rxjs";
import { CookieService } from "ngx-cookie-service";
import { UrlApi } from './varsglobal';
import { Menu } from '../models/menu';

@Injectable({
  providedIn: 'root'
})
export class MenuService {
  url: string = UrlApi.urlApitest_CNet;
 menu: Observable<Menu>;
  constructor(private http: HttpClient) { }

  
  getMenu(user: any): Observable<any> {
    
    let data:any;
    //this.http.get(this.url + "menup/");
    return this.http.get(this.url + "menup/");
  }
}
