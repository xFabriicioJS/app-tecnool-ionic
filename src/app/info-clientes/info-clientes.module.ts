import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { InfoClientesPageRoutingModule } from './info-clientes-routing.module';

import { InfoClientesPage } from './info-clientes.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    InfoClientesPageRoutingModule
  ],
  declarations: [InfoClientesPage]
})
export class InfoClientesPageModule {}
