import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AtualizaEmailPageRoutingModule } from './atualiza-email-routing.module';

import { AtualizaEmailPage } from './atualiza-email.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AtualizaEmailPageRoutingModule,
    ReactiveFormsModule
  ],
  declarations: [AtualizaEmailPage]
})
export class AtualizaEmailPageModule {}
