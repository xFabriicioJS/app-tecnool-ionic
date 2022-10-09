import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AddchamadoPage } from './addchamado.page';

const routes: Routes = [
  {
    path: '',
    component: AddchamadoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AddchamadoPageRoutingModule {}
