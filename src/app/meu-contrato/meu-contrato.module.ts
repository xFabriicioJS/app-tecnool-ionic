import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MeuContratoPageRoutingModule } from './meu-contrato-routing.module';

import { MeuContratoPage } from './meu-contrato.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MeuContratoPageRoutingModule
  ],
  declarations: [MeuContratoPage]
})
export class MeuContratoPageModule {}
