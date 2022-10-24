import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MeuContratoPage } from './meu-contrato.page';

const routes: Routes = [
  {
    path: '',
    component: MeuContratoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MeuContratoPageRoutingModule {}
