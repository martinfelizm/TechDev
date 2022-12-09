import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
//components
import { LoginComponent } from './components/auth/login/login.component';
import { UserRegComponent } from './components/auth/user-reg/user-reg.component';
import { ClienteComponent } from './components/pages/cliente/cliente.component';
import { FacturacionComponent } from './components/pages/facturacion/facturacion.component';
import { HomeComponent } from './components/pages/home/home.component';
import { ImportFileComponent } from './components/pages/import-file/import-file.component';
import { PatientComponent } from './components/pages/patient/patient.component';
import { ProductoComponent } from './components/pages/producto/producto.component';
import { SidebarComponent } from './components/pages/sidebar/sidebar.component';

//guards
import { AuthenticationGuard } from './services/authentication.guard';

//Routes

const myRoutes: Routes = [
    { path: '', component: LoginComponent },
    { path: 'login', component: LoginComponent },
    { path: 'home', component: HomeComponent, canActivate:[AuthenticationGuard],
children:[
    {path: '*', component: SidebarComponent, canActivate:[AuthenticationGuard]},
    {path: 'caja', component: FacturacionComponent, canActivate:[AuthenticationGuard]},
    {path: 'cli', component: ClienteComponent, canActivate:[AuthenticationGuard]},
    {path: 'items', component: ProductoComponent, canActivate:[AuthenticationGuard]},
    {path: 'user', component: UserRegComponent, canActivate:[AuthenticationGuard]},
    {path: 'importf', component: ImportFileComponent, canActivate:[AuthenticationGuard]},
    {path: 'paci', component: PatientComponent, canActivate:[AuthenticationGuard]}

] }
];

//export routes
export const RoutingProviders: any[] = [];
export const Routing: ModuleWithProviders<any> = RouterModule.forRoot(myRoutes);//load routes


