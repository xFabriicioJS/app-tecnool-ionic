import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from '../api/api-service';
import { GetUserTypeService } from '../services/get-user-type.service';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss'],
})
export class Tab3Page {
  nomeUsuarioLogado: string = '';
  emailUsuarioLogado: string = '';
  imgUsuarioLogado: string = '';

  constructor(private router: Router, private getUser: GetUserTypeService) {}

  //método que é executado assim que a página é renderizada, como um useEffect
  ionViewWillEnter() {
    //verificamos primeiro se o usuário está logado, caso não esteja, redirecionamos para a página de login
    if (this.getUser.getUserInfo() == null) {
      this.router.navigate(['/openscreen']);
    } else {
      //pegamos as informações do usuário logado para exibir nesta tela
      let user = this.getUser.getUserInfo();

      this.nomeUsuarioLogado = user.nome_cliente;
      this.emailUsuarioLogado = user.email_cliente;

      //depois de adicionar a coluna de imagem no banco de dados, vamos fazer uma requisição para pegar a imagem do usuário logado
    }
  }

  navigateConfiguracoesConta() {
    this.router.navigate(['/configuracoes-conta']);
  }

  navigateComunicarProblema() {
    this.router.navigate(['/comunicar-problema']);
  }
}
