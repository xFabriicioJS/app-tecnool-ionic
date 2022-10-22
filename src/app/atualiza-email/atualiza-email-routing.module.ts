import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AtualizaEmailPage } from './atualiza-email.page';

const routes: Routes = [
  {
    path: '',
    component: AtualizaEmailPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AtualizaEmailPageRoutingModule {}
