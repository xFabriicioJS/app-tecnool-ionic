import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ConfiguracoesContaPageRoutingModule } from './configuracoes-conta-routing.module';

import { ConfiguracoesContaPage } from './configuracoes-conta.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    ConfiguracoesContaPageRoutingModule
  ],
  declarations: [ConfiguracoesContaPage]
})
export class ConfiguracoesContaPageModule {}
