import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user';
import { MenuService } from '../../../services/menu.service';
import { Menu } from '../../../models/menu';
import { Observable } from 'rxjs';
declare var jQuery: any;
declare var $: any;

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
  AuthMenu: any;
  user: any;

  constructor(private _menuS: MenuService) { }

  ngOnInit(): void {
    let someKL: any;
    //someKL = this._menuS.getMenu(User);
    this.Loadmenu();
  }

  Loadmenu() {

    this._menuS.getMenu(User).subscribe(
      response => {
        this.AuthMenu = response
        //console.log(this.AuthMenu);
      }
    )
  }

  showDropSidebar(enc) {
    let list = "list-"+enc;
    let subb = ".sub-"+ enc;
    let encc = ".encc-"+ enc;
    console.log("sub-"+ enc)

    if ($(subb).hasClass("subLi")) {
      $(subb).removeClass("subLi");
    }else{
      $(subb).addClass("subLi");
    }

    if ( $(".sidebar-dropdown").hasClass("downAfter"))
     {     
      
      $(".sidebar-dropdown").removeClass("active downAfter");
      $(".sidebar-submenu").removeClass("openSideMenu");
      $(".sidebar-submenu").addClass("closeSideMenu");
      $(".sidebar-submenu").slideUp(0);
    } else {
     // let listaC = document.getElementById("list");
      //if ($(subb).hasClass("subLi")) {
        $(".sidebar-dropdown > a").parent();
        $(".sidebar-dropdown > a").next(".sidebar-submenu");
        $(".sidebar-dropdown > a").slideDown(0);
        $(".sidebar-dropdown").addClass("active downAfter");
        $(".sidebar-submenu").removeClass("closeSideMenu");
        $(".sidebar-submenu").addClass("openSideMenu");
        $(".sidebar-submenu").slideDown(0);
      //  $(subb).removeClass("subLi");
     // }
      
    }

    /*
     $(".sidebar-dropdown").removeClass("downAfter");   
     $(".sidebar-dropdown > a").click(function() {     
       $(".sidebar-submenu").slideUp(0);
       if (
         $(".sidebar-dropdown").hasClass("downAfter")
       ) {
         
         $(this)
           .parent()
           .removeClass("active downAfter");
       } else {
        
         $(".sidebar-dropdown").removeClass("active");  
         $(this)
           .next(".sidebar-submenu")
           .slideDown(0);
         $(this)
           .parent()
           .addClass("active downAfter");
       }
     });*/
  }
  closesidebar() {
    $("#sidebar").removeClass("toggled");
  }

  showsidebar() {
    $("#sidebar").addClass("toggled");
  }

  loaduser(){
  this.user = sessionStorage.getItem("Access User");
  }
}

