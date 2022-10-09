import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SabermaisDescartePage } from './sabermais-descarte.page';

const routes: Routes = [
  {
    path: '',
    component: SabermaisDescartePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SabermaisDescartePageRoutingModule {}
