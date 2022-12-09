import { Component, Input, OnInit, Output, TemplateRef, ViewChild } from '@angular/core';
import { User } from '../../../models/user';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { UsersService } from '../../../services/users.service';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../../../services/auth.service';
import { UrlApi } from '../../../services/varsglobal';
import { HttpClient } from "@angular/common/http";
import { BsModalRef, BsModalService, ModalOptions } from 'ngx-bootstrap/modal';
import { EventEmitter } from 'events';
import { NgxSpinnerService } from "ngx-spinner";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  email: string;
  password: string;
  user: any;
  titlePage1: string = "Inicio de Sesión";
  titlePage2: string = "Entrar";
  public loading = false;
  ipAddress: string;
  myapp: string = UrlApi.App;
  fechaC: any;
  horaC: any;
  userLogin: User;
  @Output() ULoginEmit: any = new EventEmitter();
  modalRef: BsModalRef;

  constructor(
    private _router: Router,
    private _activateR: ActivatedRoute,
    private _sUsuario: UsersService,
    private _toastrS: ToastrService,
    private _authS: AuthService,
    private _http: HttpClient,
    private _modalS: BsModalService,
    public _bsModalRef: BsModalRef,
    private spinner: NgxSpinnerService
  ) { }

  ngOnInit() {
    sessionStorage.removeItem("Access User");
    this.user = [{ email: null, password: null, conectedIP: null, fecha: null, hora: null, app: null }];
    this.getIP();
    this._authS.removeTokens();

    this.spinner.show("mySpinner", {
      type: "square-jelly-box",
      size: "large",
      bdColor: "rgba(0,0,0,0.67)",
      color: "#8ebacb",
      template: "<img src='https://media.giphy.com/media/o8igknyuKs6aY/giphy.gif' />"
    });

    setTimeout(() => {
      /** spinner ends after 5 seconds */
      this.spinner.hide();
    }, 5000);
    // document.querySelector('body').setAttribute('themebg-pattern', 'theme1');
  }

  VerifUser(event) {
    this.fechaC = new Date().toLocaleDateString().replace('/', '-').replace('/', '-');
    this.horaC = new Date().toLocaleTimeString();
    this.user.conectedIP = this.ipAddress;
    this.user.fecha = this.fechaC;
    this.user.hora = this.horaC;
    this.user.app = this.myapp;

    
   // console.log(this.ipAddress, this.myapp, this.fechaC, this.horaC);
    this.loading = true;
    this._sUsuario.login(this.user,"Login").subscribe(
      response => {
        //Alert
        /*
        swal('Articulo creado!!!',
          'El Articulo se ha creado exitosamente',
          'success'
        );
*/      this.userLogin = response;        
      // sessionStorage.setItem("Access User", JSON.stringify(response));
        sessionStorage.setItem("Access User", response.nombre);
        //sessionStorage.setItem("User", response.nombre);
        // sessionStorage.getItem("KeyUsu")
        //console.log(response);
        // console.log(this.userLogin);
        this._authS.storeTokens(response.token, 30);
        this._router.navigate(['/home']);

        this.ULoginEmit.emit(this.userLogin);
        this.loading = false;
      },
      err => {
        // Display an error toast, with a title
        //this._toastrS.error('I do not think that word means what you think it means.', 'Inconceivable!')
        /*swal('Error??',
          'Credenciales digitadas no son correctas??',
          'Intentar nuevamente o reportar a Tecnologia'
        );*/
        this.loading = false;

        this._toastrS.error('Las credenciales digitadas no son correctas??', 'Error', {
          positionClass: 'toast-top-left'
        });

        console.log(err);
      }

    );

  }

  getIP() {

    this.getIPAddress().subscribe((res: any) => {
      this.ipAddress = res.ip;
    });
    /* setTimeout(() => {
       console.log('time waiting 3000');
     }, 3000);*/
  }

  getIPAddress() {
    // //'https://cors-anywhere.herokuapp.com/http://api.ipify.org/?format=json'
    return this._http.get("https://cors-anywhere.herokuapp.com/http://api.ipify.org/?format=json");
  }

  openModal(template: TemplateRef<any>) {
    //No cierra el modal dando click fuera
    let ngxModalOptions: ModalOptions = {
      backdrop: 'static',
      keyboard: false,
      animated: true
    };

    //Abriendo modal
    this.modalRef = this._modalS.show(template, ngxModalOptions);

  }

  closeModal() {
    this.modalRef.hide();
  }
}

