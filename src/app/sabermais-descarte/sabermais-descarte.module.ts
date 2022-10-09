import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SabermaisDescartePageRoutingModule } from './sabermais-descarte-routing.module';

import { SabermaisDescartePage } from './sabermais-descarte.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SabermaisDescartePageRoutingModule
  ],
  declarations: [SabermaisDescartePage]
})
export class SabermaisDescartePageModule {}
