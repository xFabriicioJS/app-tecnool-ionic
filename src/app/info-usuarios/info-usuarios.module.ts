import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { InfoUsuariosPageRoutingModule } from './info-usuarios-routing.module';

import { InfoUsuariosPage } from './info-usuarios.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    InfoUsuariosPageRoutingModule
  ],
  declarations: [InfoUsuariosPage]
})
export class InfoUsuariosPageModule {}
