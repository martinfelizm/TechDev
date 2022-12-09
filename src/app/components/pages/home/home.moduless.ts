import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.moduless';
import { HomeComponent } from './home.component';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { FooterSidebarComponent } from '../footer-sidebar/footer-sidebar.component'
import { SharedModule } from '../../shared/shared.module';
import { ChartModule } from 'angular2-chartjs';
import { HeaderPrincipalComponent } from '../header-principal/header-principal.component';

@NgModule({
  imports: [
    CommonModule,
    HomeRoutingModule,
    SharedModule,
    ChartModule
  ],
  declarations: [HomeComponent,  HeaderPrincipalComponent]
})
export class HomeModule { }
