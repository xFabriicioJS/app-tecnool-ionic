import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ConfirmaDescartePageRoutingModule } from './confirma-descarte-routing.module';

import { ConfirmaDescartePage } from './confirma-descarte.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ConfirmaDescartePageRoutingModule
  ],
  declarations: [ConfirmaDescartePage]
})
export class ConfirmaDescartePageModule {}
