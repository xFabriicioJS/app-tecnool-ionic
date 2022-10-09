import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AddchamadoPageRoutingModule } from './addchamado-routing.module';

import { AddchamadoPage } from './addchamado.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AddchamadoPageRoutingModule,
    ReactiveFormsModule
  ],
  declarations: [AddchamadoPage]
})
export class AddchamadoPageModule {}
