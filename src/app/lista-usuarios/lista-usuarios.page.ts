import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ActionSheetController } from '@ionic/angular';
import { ApiService } from '../api/api-service';
import { GetUserTypeService } from '../services/get-user-type.service';

@Component({
  selector: 'app-lista-usuarios',
  templateUrl: './lista-usuarios.page.html',
  styleUrls: ['./lista-usuarios.page.scss'],
})
export class ListaUsuariosPage implements OnInit {

  usuarios: any = [];
  nomePesquisado: string = '';


  constructor(
    private router: Router,
    private getUser: GetUserTypeService,
    private apiService: ApiService,
    private actionSheetCtrl: ActionSheetController
  ) { }

  //Precisamos primeiro fazer algumas verificações para garantir que o usuário está logado e que ele é um administrador, fazemos tudo isso aqui, no método ionViewWillEnter, ele é um método que é executado ao renderizar a página
  ionViewWillEnter(){
    //Resetando o array dos usuários
    this.usuarios = [];

    //Verificando se o usuário está logado
    if(this.getUser.getUserType() == null){

      //Se o usuário não estiver logado, redirecionamos ele para a página de login
      this.router.navigate(['/openscreen']);
    }

    //Verificando se o usuário é um administrador
    if(this.getUser.getUserType() != 'Usuario'){
      //Se o usuário não for um administrador, redirecionamos ele para a página inicial
      this.router.navigate(['/tabs/tab1']);
      console.log(this.getUser.getUserType());
    }

    //Agora fazemos a requisição para fornecer os dados para o array 'Usuarios'

    //Chamada para o método responsável por forncer os dados para o array 'Usuarios'
    this.requestAllUsuarios();

  }

  navigateInfoUsuarios(idUsuario : number){
    this.router.navigate(['/info-usuarios/' + idUsuario]);
  }

  ngOnInit() {

  }


  //Método responsável por fazer a requisição para a nossa API e fornecer os dados de todos os usuários
  requestAllUsuarios(){

    // Corpo do objeto que será enviado para a API
    let bodyRequest = {
      requisicao: 'listar',
      nome: ''
    }

    // A chamada para a API, já passando o objeto com o corpo da requisição
    return new Promise((res) => {
      this.apiService.apiPHP('controller-usuarios.php', bodyRequest).subscribe((data) => {

        //Se der tudo certo...
        if(data['success'] == true){
          data['result'].map((usuario) => {
            this.usuarios.push(usuario[0]);
          
            console.log(this.usuarios);
          })
        }else{
          console.log('Ocorreu um erro ao listar os usuários')
        }
      })
    })
  }

  //Método responsável por pesquisar um usuário pelo NOME, dessa vez, usamos um método diferente, o método filter do próprio javascript, que filtra os dados de acordo com o que foi digitado no input, sem precisar ficar fazendo várias requisições a nossa API
  buscar(){
    console.log(this.nomePesquisado);
    //Colocando tudo em minúsculo	
    let nomePesquisadoLowerCase = this.nomePesquisado.toLowerCase();

    if(nomePesquisadoLowerCase !==  ''){
      this.usuarios = this.usuarios.filter(usuario => usuario.nome_usuario.toLowerCase().includes(nomePesquisadoLowerCase));
    }else{
      //Resetando o array dos usuaários para que ele não fique vazio      
      this.usuarios = [];
      this.requestAllUsuarios();
    }

  }

  navigateAddUsuario(){
    this.router.navigate(['/addusuario']);
  }


}
