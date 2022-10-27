import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { InfoClientesPage } from './info-clientes.page';

const routes: Routes = [
  {
    path: '',
    component: InfoClientesPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class InfoClientesPageRoutingModule {}
