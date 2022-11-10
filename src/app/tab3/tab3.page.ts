import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
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
  tipoUsuarioLogado: string = '';

  constructor(private router: Router, private getUser: GetUserTypeService) {}


  //método que é executado assim que a página é renderizada, como um useEffect
  ionViewWillEnter() {
    //verificamos primeiro se o usuário está logado, caso não esteja, redirecionamos para a página de login
    if (this.getUser.getUserInfo() == null) {
      this.router.navigate(['/openscreen']);
    } else {
      //Verificamos agora se o usuário logado é um cliente ou administrador, precisamos fazer isso para a renderização condicional lá no html, que irá depender do atributo tipoUsuarioLogado
      this.tipoUsuarioLogado = this.getUser.getUserType();
      console.log(this.tipoUsuarioLogado);
      //pegamos as informações do usuário logado para exibir nesta tela
      let user = this.getUser.getUserInfo();
      

      //setando os atributos que irão vir do nosso serviço getUserInfo, caso o usuário logado seja um cliente
      if(this.tipoUsuarioLogado == 'Cliente'){
        
        //Se o usuário logado não tiver uma foto de perfil, vamos setar uma imagem padrão genérica, caso contrário, vamos setar a imagem que o usuário já tem cadastrada
        if(!user.foto_cliente || user.foto_cliente == 'null'){
          this.imgUsuarioLogado = 'https://www.w3schools.com/howto/img_avatar.png';
          console.log(this.imgUsuarioLogado);
          console.log(user.foto_cliente);
        }else{
          this.imgUsuarioLogado = environment.FILE_IMG_PATH + '/' + user.foto_cliente;
          console.log(user.foto_cliente);
        }


        this.nomeUsuarioLogado = user.nome_cliente;
        this.emailUsuarioLogado = user.email_cliente;
      }else{
        this.nomeUsuarioLogado = user.nome_usuario;
        this.emailUsuarioLogado = user.email_usuario;

        if(!user.foto_usuario || user.foto_usuario == 'null' || user.foto_usuario == ''){
          this.imgUsuarioLogado = 'https://www.w3schools.com/howto/img_avatar.png';
        }else{
          this.imgUsuarioLogado = environment.FILE_IMG_PATH + '/' + user.foto_usuario;
        }
      }
      
    }
  }

  //Método responsável por fazer o logout do usuário
  logout(){
    //Removemos as informações do usuário do localStorage
    localStorage.removeItem('usuario');
    //Redirecionamos o usuário para a página de login
    this.router.navigate(['/openscreen']);
  }

  navigateConfiguracoesConta() {
    this.router.navigate(['/configuracoes-conta']);
  }

  navigateComunicarProblema() {
    this.router.navigate(['/comunicar-problema']);
  }
  navigateMeuContrato() {
    this.router.navigate(['/meu-contrato']);
  }
  navigateUsuarios(){
    this.router.navigate(['/lista-usuarios']);
  }
  
  navigateClientes(){
    this.router.navigate(['/lista-clientes']);
  }

  
}
