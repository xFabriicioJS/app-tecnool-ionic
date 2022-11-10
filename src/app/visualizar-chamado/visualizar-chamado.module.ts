import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { VisualizarChamadoPageRoutingModule } from './visualizar-chamado-routing.module';

import { VisualizarChamadoPage } from './visualizar-chamado.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    VisualizarChamadoPageRoutingModule
  ],
  declarations: [VisualizarChamadoPage]
})
export class VisualizarChamadoPageModule {}
