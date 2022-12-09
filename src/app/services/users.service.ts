import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from "../../../node_modules/rxjs";
import { CookieService } from "ngx-cookie-service";
import { UrlApi } from './varsglobal';
import { Usuarios } from "../models/globlaIsclass";

@Injectable({
  providedIn: "root"
})
export class UsersService {

  url: string = UrlApi.urlApitest_CNet;

  constructor(private http: HttpClient, private cookies: CookieService) { }

  login(user: any, win:any): Observable<any> {

    console.log(user);
    return this.http.get(this.url + "usuario/login/" + user.email + "&" + user.pass + "&" + user.fecha + "&" + user.hora + "&" + user.conectedIP + "&" + user.app+ "&" + win);
  }
  register(user: any): Observable<any> {
    return this.http.post("https://reqres.in/api/register", user.email, user.pass);
  }

  getAllUser(window: any,user: any): Observable<any> {
    return this.http.get(this.url + "usuario");
  }

  setToken(token: string) {
    this.cookies.set("token", token);
  }
  getToken() {
    return this.cookies.get("token");
  }

  saveUsu(cli) {
    console.log(cli);
    let params = JSON.stringify(cli);
    console.log(params.toString());
    let headers = new HttpHeaders().set('Content-Type', 'application/json');

    let bar = JSON.stringify(cli);
    let body = new HttpParams();
    body = body.set('bar', bar);

    // return this._httpC.post(this.url + 'cliente', body, { headers: headers });
    return this.http.post(this.url + 'usuario', params, { headers: headers });
  }

  saveImport(data,table) {
   // console.log(data);
   let usu: Usuarios[];
   usu = data as Usuarios[];
   //usu.nombre_apellido = data.nombre;
   console.log(usu);
    let params = JSON.stringify(data);
   // console.log(params.toString());
    let headers = new HttpHeaders().set('Content-Type', 'application/json');

    let bar = JSON.stringify(data);
    let body = new HttpParams();
    body = body.set('bar', bar);

    // return this._httpC.post(this.url + 'cliente', body, { headers: headers });
    return this.http.post(this.url + 'usuario/ImportD', params, { headers: headers });
  }

}