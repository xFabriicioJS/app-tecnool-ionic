import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ComunicarProblemaPageRoutingModule } from './comunicar-problema-routing.module';

import { ComunicarProblemaPage } from './comunicar-problema.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ComunicarProblemaPageRoutingModule
  ],
  declarations: [ComunicarProblemaPage]
})
export class ComunicarProblemaPageModule {}
