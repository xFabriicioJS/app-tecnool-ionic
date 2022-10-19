import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { OpenscreenPageRoutingModule } from './openscreen-routing.module';

import { OpenscreenPage } from './openscreen.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    OpenscreenPageRoutingModule
  ],
  declarations: [OpenscreenPage]
})
export class OpenscreenPageModule {}
