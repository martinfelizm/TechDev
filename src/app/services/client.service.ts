import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Clientes } from '../models/globlaIsclass';
import { UrlApi } from '../services/varsglobal';
import { Observable } from "../../../node_modules/rxjs";

@Injectable({
  providedIn: 'root'
})
export class ClientService {
  url: string = UrlApi.urlApitest_CNet;

  constructor(private _httpC: HttpClient) { }

  getCli(): Observable<any> {
    return this._httpC.get(this.url + "cliente");
  }
  saveCli(cli) {
    //console.log(cli);
    let params = JSON.stringify(cli);
  // console.log(params.toString());
    let headers = new HttpHeaders().set('Content-Type', 'application/json');

    let bar = JSON.stringify(cli);
    let body = new HttpParams();
    body = body.set('bar', bar);

   // return this._httpC.post(this.url + 'cliente', body, { headers: headers });
    return this._httpC.post(this.url + 'cliente', params, { headers: headers });
  }
}
