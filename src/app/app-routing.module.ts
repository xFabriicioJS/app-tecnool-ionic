import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./tabs/tabs.module').then(m => m.TabsPageModule)
  },
  {
    path: 'login',
    loadChildren: () => import('./login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'addchamado',
    loadChildren: () => import('./addchamado/addchamado.module').then( m => m.AddchamadoPageModule)
  },
  {
    path: 'confirma-chamado',
    loadChildren: () => import('./confirma-chamado/confirma-chamado.module').then( m => m.ConfirmaChamadoPageModule)
  },
  {
    path: 'sabermais-descarte',
    loadChildren: () => import('./sabermais-descarte/sabermais-descarte.module').then( m => m.SabermaisDescartePageModule)
  },
  {
    path: 'adddescarte',
    loadChildren: () => import('./adddescarte/adddescarte.module').then( m => m.AdddescartePageModule)
  },
  {
    path: 'configuracoes-conta',
    loadChildren: () => import('./configuracoes-conta/configuracoes-conta.module').then( m => m.ConfiguracoesContaPageModule)
  },
  {
    path: 'comunicar-problema',
    loadChildren: () => import('./comunicar-problema/comunicar-problema.module').then( m => m.ComunicarProblemaPageModule)
  },
  {
    path: 'addusuario',
    loadChildren: () => import('./addusuario/addusuario.module').then( m => m.AddusuarioPageModule)
  },
  {
    path: 'visualizar-chamado/:id_chamado/:tituloChamado/:descriChamado/:dataAbertura/:dataLimite/:dataFinalizacao/:statusChamado/:foto_erro_chamado/:localAtend/:protocoloChamado',
    loadChildren: () => import('./visualizar-chamado/visualizar-chamado.module').then( m => m.VisualizarChamadoPageModule)
  }


];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
