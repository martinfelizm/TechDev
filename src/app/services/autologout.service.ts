import { Injectable } from "@angular/core";
import { Router } from '@angular/router'
//const MINUTES_UNITL_AUTO_LOGOUT = .2 // in mins
const MINUTES_UNITL_AUTO_LOGOUT = 20 // in mins
const CHECK_INTERVAL = 5000 // in ms
const STORE_KEY = 'lastAction';
@Injectable(
  {
    providedIn: 'root'
  }
)
export class AutoLogoutService {
  val: any;
  public getLastAction() {
    return parseInt(localStorage.getItem(STORE_KEY));
  }

  public setLastAction(lastAction: number) {
    localStorage.setItem(STORE_KEY, lastAction.toString());
  }

  constructor(private router: Router) {
    let valToken = localStorage.getItem('apitoken');
    this.check();
    this.initListener();
    this.initInterval();

    localStorage.setItem(STORE_KEY, Date.now().toString());
  }

  initListener() {
    document.body.addEventListener('click', () => this.reset());
    document.body.addEventListener('mouseover', () => this.reset());
    document.body.addEventListener('mouseout', () => this.reset());
    document.body.addEventListener('keydown', () => this.reset());
    document.body.addEventListener('keyup', () => this.reset());
    document.body.addEventListener('keypress', () => this.reset());
    window.addEventListener("storage", () => this.storageEvt());

  }

  reset() {

    //console.log('date got by using events',Date.now());
    this.setLastAction(Date.now());
    // console.log('store key',localStorage.getItem(STORE_KEY));

  }

  initInterval() {

    setInterval(() => {
      this.check();
    }, CHECK_INTERVAL);

  }

  check() {
    let vCC = localStorage.getItem('apitoken');
    if (vCC != null) {
     // console.log(vCC);
      const now = Date.now();
      const timeleft = this.getLastAction() + (MINUTES_UNITL_AUTO_LOGOUT * 60000);//calculando lo ultimo guardado+(minutos acordados*60000(1min=60000ms))
      //console.log(timeleft)
      const diff = timeleft - now;
     // console.log('difference', diff)
      const isTimeout = diff < 0;

   //   console.log("timeleft: " + timeleft, " Diferencia: " + diff, " Se termino el tiempo: " + isTimeout, " Ahora: " + now)

      if (isTimeout) {
        localStorage.clear();
        this.router.navigate(['']);
      }
    }


  }
  
  storageEvt() {
  //  console.log("storage");
    this.val = localStorage.getItem(STORE_KEY);
  }
}