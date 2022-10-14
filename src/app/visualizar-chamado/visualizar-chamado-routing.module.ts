import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { VisualizarChamadoPage } from './visualizar-chamado.page';

const routes: Routes = [
  {
    path: '',
    component: VisualizarChamadoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class VisualizarChamadoPageRoutingModule {}
