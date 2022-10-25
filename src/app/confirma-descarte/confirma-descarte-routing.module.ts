import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ConfirmaDescartePage } from './confirma-descarte.page';

const routes: Routes = [
  {
    path: '',
    component: ConfirmaDescartePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ConfirmaDescartePageRoutingModule {}
