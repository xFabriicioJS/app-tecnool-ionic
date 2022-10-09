import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ConfirmaChamadoPageRoutingModule } from './confirma-chamado-routing.module';

import { ConfirmaChamadoPage } from './confirma-chamado.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ConfirmaChamadoPageRoutingModule
  ],
  declarations: [ConfirmaChamadoPage]
})
export class ConfirmaChamadoPageModule {}
