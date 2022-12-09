import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home.component';
import { AuthenticationGuard } from '../../../services/authentication.guard';
import { FacturacionComponent } from '../facturacion/facturacion.component';
import { ImportFileComponent } from '../import-file/import-file.component';

const routes: Routes = [
  {
    path: 'home',
    component: HomeComponent, canActivate: [AuthenticationGuard],
   /* data: {
      breadcrumb: 'Default',
      icon: 'icofont-home bg-c-blue',
      status: false
    },*/
    children: [
      /* {
         path: 'home',
         redirectTo: 'home',
         pathMatch: 'full',
         canActivate: [AuthenticationGuard]
       },*/
      {
        path: 'fact', component: FacturacionComponent
      },
      {
        path: 'importf', component: ImportFileComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule { }
