import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { InfoDescartePage } from './info-descarte.page';

const routes: Routes = [
  {
    path: '',
    component: InfoDescartePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class InfoDescartePageRoutingModule {}
