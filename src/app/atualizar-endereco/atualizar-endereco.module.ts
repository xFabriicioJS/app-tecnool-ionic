import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AtualizarEnderecoPageRoutingModule } from './atualizar-endereco-routing.module';

import { AtualizarEnderecoPage } from './atualizar-endereco.page';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    IonicModule,
    AtualizarEnderecoPageRoutingModule
  ],
  declarations: [AtualizarEnderecoPage]
})
export class AtualizarEnderecoPageModule {}
