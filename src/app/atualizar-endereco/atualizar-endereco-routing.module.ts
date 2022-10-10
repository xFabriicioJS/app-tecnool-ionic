import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AtualizarEnderecoPage } from './atualizar-endereco.page';

const routes: Routes = [
  {
    path: '',
    component: AtualizarEnderecoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AtualizarEnderecoPageRoutingModule {}
