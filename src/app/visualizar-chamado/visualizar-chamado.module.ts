import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { VisualizarChamadoPageRoutingModule } from './visualizar-chamado-routing.module';

import { VisualizarChamadoPage } from './visualizar-chamado.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    VisualizarChamadoPageRoutingModule
  ],
  declarations: [VisualizarChamadoPage]
})
export class VisualizarChamadoPageModule {}
