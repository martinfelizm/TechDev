import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { finalize, tap } from 'rxjs/operators';
import { NgxSpinnerService } from "ngx-spinner";

@Injectable()

export class LoadingInterceptor implements HttpInterceptor{
    private countRequest = 0;
    private idMessage: string;
    constructor(
      public spinner: NgxSpinnerService
    ) {}

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

        this.spinner.show()

        this.countRequest++;

        return next.handle(req)

            .pipe ( tap (

                    event => console.log(event),

                    error => console.log( error )

                ), finalize(() => {

                    this.countRequest--;

                    if ( this.countRequest == 0 ) this.spinner.hide ()
                })
            );
    }
}
//import { NzMessageService } from 'ng-zorro-antd';
/*
@Injectable()
export class LoadingInterceptor implements HttpInterceptor{
    private countRequest = 0;
    private idMessage: string;

    constructor(
        public message : NzMessageService
    ){}
/*
    intercept(request: HttpRequest(unknown), next: HttpHandler): Observable<HttpEvent<unknown>>{
       if(!this.countRequest){
           this.idMessage = this.message
           .loading('Cargando...',) {nzDuration:0}).messageId;
       }

       this.counRequest++;
       return next.handle(request)
       .pipe(
           finalize( ()=>{
               this.countRequest--;
               if(!this.countRequest){
                   this.message.remove(this.idMessage);
               }
           }
           )
       )
    }
}
*/