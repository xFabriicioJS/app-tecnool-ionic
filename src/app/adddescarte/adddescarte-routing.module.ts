import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AdddescartePage } from './adddescarte.page';

const routes: Routes = [
  {
    path: '',
    component: AdddescartePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdddescartePageRoutingModule {}
