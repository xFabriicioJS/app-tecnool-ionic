import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ActionSheetController } from '@ionic/angular';
import { ApiService } from '../api/api-service';
import { GetUserTypeService } from '../services/get-user-type.service';

@Component({
  selector: 'app-lista-clientes',
  templateUrl: './lista-clientes.page.html',
  styleUrls: ['./lista-clientes.page.scss'],
})
export class ListaClientesPage implements OnInit {

  clientes: any = [];
  nomePesquisado: string = '';


  constructor(
    private router: Router,
    private getUser: GetUserTypeService,
    private apiService: ApiService,
    private actionSheetCtrl: ActionSheetController
  ) { }

  //Precisamos primeiro fazer algumas verificações para garantir que o usuário está logado e que ele é um administrador, fazemos tudo isso aqui, no método ionViewWillEnter, ele é um método que é executado ao renderizar a página
  ionViewWillEnter(){
    //Resetando o array dos clientes
    this.clientes = [];

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

    //Agora fazemos a requisição para fornecer os dados para o array 'Clientes'

    //Método responsável requestAllClientes
    this.requestAllClients();

  }

  navigateInfoClientes(idCliente){
    this.router.navigate(['/info-clientes/' + idCliente]);
  }

  ngOnInit() {

  }


  requestAllClients(){

    // Corpo do objeto que será enviado para a API
    let bodyRequest = {
      requisicao: 'listar',
      nome: ''
    }

    return new Promise((res) => {
      this.apiService.apiPHP('controller-clientes.php', bodyRequest).subscribe((data) => {
        if(data['success'] == true){
          data['result'].map((cliente) => {
            this.clientes.push(cliente[0]);
          
            console.log(this.clientes);
          })
        }else{
          console.log('Ocorreu um erro ao listar os clientes')
        }
      })
    })
  }

  //Método responsável por pesquisar um cliente pelo NOME, dessa vez, usamos um método diferente, o método filter do próprio javascript, que filtra os dados de acordo com o que foi digitado no input, sem precisar ficar fazendo várias requisições a nossa API
  buscar(){
    console.log(this.nomePesquisado);
    //Colocando tudo em minúsculo	
    let nomePesquisadoLowerCase = this.nomePesquisado.toLowerCase();

    if(nomePesquisadoLowerCase !==  ''){
      this.clientes = this.clientes.filter(cliente => cliente.nome_cliente.toLowerCase().includes(nomePesquisadoLowerCase));
    }else{
      this.clientes = [];
      this.requestAllClients();
    }

  }


}
