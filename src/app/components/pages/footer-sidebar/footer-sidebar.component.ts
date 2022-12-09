import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-footer-sidebar',
  templateUrl: './footer-sidebar.component.html',
  styleUrls: ['./footer-sidebar.component.css']
})
export class FooterSidebarComponent implements OnInit {

  constructor(private _authS: AuthService, private _router: Router) { }

  ngOnInit(): void {
  }

  CloseSession(){
     this._authS.removeTokens();
     this._router.navigate(['login']);
  }
}
