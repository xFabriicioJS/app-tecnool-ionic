import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ComunicarProblemaPage } from './comunicar-problema.page';

const routes: Routes = [
  {
    path: '',
    component: ComunicarProblemaPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ComunicarProblemaPageRoutingModule {}
