import { BrowserModule } from '@angular/platform-browser';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgxLoadingModule } from 'ngx-loading';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppComponent } from './app.component';
import { LoginComponent } from './components/auth/login/login.component';
import { RoutingProviders, Routing } from './app.routing';

import { AuthenticationGuard } from './services/authentication.guard';
import { ToastrModule, ToastNoAnimation, ToastNoAnimationModule } from 'ngx-toastr';
import { TokenInterceptorService } from './services/token-interceptor.service';
import { ModalModule, BsModalRef } from 'ngx-bootstrap/modal';
import { HomeComponent } from './components/pages/home/home.component';
import { SidebarComponent } from './components/pages/sidebar/sidebar.component';
import { FacturacionComponent } from './components/pages/facturacion/facturacion.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FooterSidebarComponent } from './components/pages/footer-sidebar/footer-sidebar.component';
import { HeaderPrincipalComponent } from './components/pages/header-principal/header-principal.component';
import { ClienteComponent } from './components/pages/cliente/cliente.component';
import { MatTableModule } from '@angular/material/table';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatSelectModule } from '@angular/material/select';
import { MatTooltipModule } from '@angular/material/tooltip';
import { TooltipModule } from 'ng2-tooltip-directive';
import { ProductoComponent } from './components/pages/producto/producto.component';
import { UserRegComponent } from './components/auth/user-reg/user-reg.component';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { DataTableComponent } from './components/shared/data-table/data-table.component';
import { ImportFileComponent } from './components/pages/import-file/import-file.component';
import { NgxSpinnerModule } from "ngx-spinner";
import { LoadingInterceptor } from './services/loading.interceptor';
import { PatientComponent } from './components/pages/patient/patient.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    SidebarComponent,
    FacturacionComponent,
    FooterSidebarComponent,
    HeaderPrincipalComponent,
    ClienteComponent,
    ProductoComponent,
    UserRegComponent,
    DataTableComponent,
    ImportFileComponent,
    PatientComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    ToastNoAnimationModule.forRoot(),
    ToastrModule.forRoot(),
    NgxLoadingModule.forRoot({}),
    ModalModule.forRoot(),
    Routing,
    MatTableModule,
    MatInputModule,
    MatFormFieldModule,
    MatIconModule,
    MatCheckboxModule,
    MatSelectModule,
    MatTooltipModule,
    TooltipModule,
    MatPaginatorModule,
    MatSortModule,
    NgxSpinnerModule
  ],  
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  providers: [AuthenticationGuard, {
    provide: HTTP_INTERCEPTORS,
    useClass: TokenInterceptorService,
    multi: true
  },{
    provide: HTTP_INTERCEPTORS,
    useClass: LoadingInterceptor,
    multi: true
  }, BsModalRef, RoutingProviders],
  bootstrap: [AppComponent]
})
export class AppModule { }
