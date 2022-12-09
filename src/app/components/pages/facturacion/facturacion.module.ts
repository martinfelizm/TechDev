import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FacturacionRoutingModule } from './Facturacion-routing.module';
import { SharedModule } from '../../shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    FacturacionRoutingModule,
    SharedModule
  ],
  declarations: []
})
export class FacturacionModule { }
