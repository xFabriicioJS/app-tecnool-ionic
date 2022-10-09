import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ConfirmaChamadoPage } from './confirma-chamado.page';

const routes: Routes = [
  {
    path: '',
    component: ConfirmaChamadoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ConfirmaChamadoPageRoutingModule {}
