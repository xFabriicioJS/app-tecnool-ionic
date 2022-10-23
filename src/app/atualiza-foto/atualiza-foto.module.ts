import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AtualizaFotoPageRoutingModule } from './atualiza-foto-routing.module';

import { AtualizaFotoPage } from './atualiza-foto.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReactiveFormsModule,
    AtualizaFotoPageRoutingModule
  ],
  declarations: [AtualizaFotoPage]
})
export class AtualizaFotoPageModule {}
