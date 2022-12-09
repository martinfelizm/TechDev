import { importType } from '@angular/compiler/src/output/output_ast';
import { Injectable } from '@angular/core';
import { UrlApi } from '../services/varsglobal';
import { HttpClient } from '@angular/common/http';
import { Observable } from "../../../node_modules/rxjs";

@Injectable({
  providedIn: 'root'
})
export class DocumentService {

  url: string = UrlApi.urlApitest_CNet;
  constructor( private _httpC: HttpClient) { }

  getDocById(id):Observable<any>{
    return this._httpC.get(this.url + "DocOrdinario/"+id);
  }

  getAllDoc():Observable<any>{
    return this._httpC.get(this.url + "DocOrdinario");
  }
}
