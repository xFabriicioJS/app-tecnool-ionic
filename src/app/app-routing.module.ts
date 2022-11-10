import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadChildren: () =>
      import('./tabs/tabs.module').then((m) => m.TabsPageModule),
  },
  {
    path: 'login',
    loadChildren: () =>
      import('./login/login.module').then((m) => m.LoginPageModule),
  },
  {
    path: 'addchamado',
    loadChildren: () =>
      import('./addchamado/addchamado.module').then(
        (m) => m.AddchamadoPageModule
      ),
  },
  {
    path: 'confirma-chamado/:tituloChamado/:dataLimite/:descriChamado/:tipoAtendimento',
    loadChildren: () =>
      import('./confirma-chamado/confirma-chamado.module').then(
        (m) => m.ConfirmaChamadoPageModule
      ),
  },
  {
    path: 'sabermais-descarte',
    loadChildren: () =>
      import('./sabermais-descarte/sabermais-descarte.module').then(
        (m) => m.SabermaisDescartePageModule
      ),
  },
  {
    path: 'adddescarte',
    loadChildren: () =>
      import('./adddescarte/adddescarte.module').then(
        (m) => m.AdddescartePageModule
      ),
  },
  {
    path: 'configuracoes-conta',
    loadChildren: () =>
      import('./configuracoes-conta/configuracoes-conta.module').then(
        (m) => m.ConfiguracoesContaPageModule
      ),
  },
  {
    path: 'comunicar-problema',
    loadChildren: () =>
      import('./comunicar-problema/comunicar-problema.module').then(
        (m) => m.ComunicarProblemaPageModule
      ),
  },
  {
    path: 'addusuario',
    loadChildren: () =>
      import('./addusuario/addusuario.module').then(
        (m) => m.AddusuarioPageModule
      ),
  },
  {
    path: 'visualizar-chamado/:id_chamado/:tituloChamado/:descriChamado/:dataAbertura/:dataLimite/:dataFinalizacao/:statusChamado/:foto_erro_chamado/:localAtend/:protocoloChamado/:foto_cliente/:nome_cliente',
    loadChildren: () =>
      import('./visualizar-chamado/visualizar-chamado.module').then(
        (m) => m.VisualizarChamadoPageModule
      ),
  },
  {
    path: 'info-descarte/:id_descarte/:protocolo/:nomeHardware/:descriHardware/:dataAbertura/:dataRetirada/:prazo/:status/:fotoHardware/:id_cliente',
    loadChildren: () =>
      import('./info-descarte/info-descarte.module').then(
        (m) => m.InfoDescartePageModule
      ),
  },
  {
    path: 'login',
    loadChildren: () =>
      import('./login/login.module').then((m) => m.LoginPageModule),
  },
  {
    path: 'openscreen',
    loadChildren: () =>
      import('./openscreen/openscreen.module').then(
        (m) => m.OpenscreenPageModule
      ),
  },
  {
    path: 'adminlogin',
    loadChildren: () =>
      import('./adminlogin/adminlogin.module').then(
        (m) => m.AdminloginPageModule
      ),
  },
  {
    path: 'cadastro-cliente',
    loadChildren: () =>
      import('./cadastro-cliente/cadastro-cliente.module').then(
        (m) => m.CadastroClientePageModule
      ),
  },
  {
    path: 'atualiza-email',
    loadChildren: () =>
      import('./atualiza-email/atualiza-email.module').then(
        (m) => m.AtualizaEmailPageModule
      ),
  },
  {
    path: 'atualiza-foto',
    loadChildren: () =>
      import('./atualiza-foto/atualiza-foto.module').then(
        (m) => m.AtualizaFotoPageModule
      ),
  },
  {
    path: 'meu-contrato',
    loadChildren: () =>
      import('./meu-contrato/meu-contrato.module').then(
        (m) => m.MeuContratoPageModule
      ),
  },
  {
    path: 'confirma-descarte/:tituloHardware/:prazoDescarte/:descriHardware',
    loadChildren: () =>
      import('./confirma-descarte/confirma-descarte.module').then(
        (m) => m.ConfirmaDescartePageModule
      ),
  },
  {
    path: 'lista-clientes',
    loadChildren: () =>
      import('./lista-clientes/lista-clientes.module').then(
        (m) => m.ListaClientesPageModule
      ),
  },
  {
    path: 'info-clientes/:idCliente',
    loadChildren: () =>
      import('./info-clientes/info-clientes.module').then(
        (m) => m.InfoClientesPageModule
      ),
  },
  {
    path: 'lista-usuarios',
    loadChildren: () => import('./lista-usuarios/lista-usuarios.module').then( m => m.ListaUsuariosPageModule)
  },
  {
    path: 'info-usuarios/:idUsuario',
    loadChildren: () => import('./info-usuarios/info-usuarios.module').then( m => m.InfoUsuariosPageModule)
  },
  {
    path: 'splash',
    loadChildren: () => import('./splash/splash.module').then( m => m.SplashPageModule)
  },


];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
