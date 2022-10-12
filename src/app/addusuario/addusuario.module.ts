import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AddusuarioPageRoutingModule } from './addusuario-routing.module';

import { AddusuarioPage } from './addusuario.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AddusuarioPageRoutingModule,
    ReactiveFormsModule,
  ],
  declarations: [AddusuarioPage]
})
export class AddusuarioPageModule {}
