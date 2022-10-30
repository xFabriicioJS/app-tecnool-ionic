import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { InfoUsuariosPage } from './info-usuarios.page';

const routes: Routes = [
  {
    path: '',
    component: InfoUsuariosPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class InfoUsuariosPageRoutingModule {}
