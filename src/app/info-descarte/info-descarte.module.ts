import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { InfoDescartePageRoutingModule } from './info-descarte-routing.module';

import { InfoDescartePage } from './info-descarte.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    InfoDescartePageRoutingModule
  ],
  declarations: [InfoDescartePage]
})
export class InfoDescartePageModule {}
