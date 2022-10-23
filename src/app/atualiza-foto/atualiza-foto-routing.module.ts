import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AtualizaFotoPage } from './atualiza-foto.page';

const routes: Routes = [
  {
    path: '',
    component: AtualizaFotoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AtualizaFotoPageRoutingModule {}
