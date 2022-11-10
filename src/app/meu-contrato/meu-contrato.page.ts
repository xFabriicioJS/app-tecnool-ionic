import { Component, EnvironmentInjector, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { ApiService } from '../api/api-service';
import { GetUserTypeService } from '../services/get-user-type.service';

@Component({
  selector: 'app-meu-contrato',
  templateUrl: './meu-contrato.page.html',
  styleUrls: ['./meu-contrato.page.scss'],
})
export class MeuContratoPage implements OnInit {
  possuiPlanoAtivo: boolean = false;
  nomePlano: string = '';
  valorPlano: string = '';
  imgPlano: string = '';

  constructor(
    private api: ApiService,
    private router: Router,
    private getUser: GetUserTypeService,
  ) { }

  ngOnInit() {
  }

  teste(){
    console.log(this.nomePlano);   
  }

  //método que é executado assim que a página é renderizada, como um useEffect
  ionViewWillEnter(){
    //Primeiramente verificamos se o usuário está logado, caso não esteja, redirecionamos para a página de login
    if(this.getUser.getUserInfo() == null){
      this.router.navigate['/openscreen']
    }

    //Agora verificamos se o usuário logado é do tipo 'Cliente'

    //*É importante deixar claro, que não necessariamente precisamos fazer essas verificações, pois no seu smartphone, o cliente não conseguirá simplesmente acessar as rotas colocando o link manualmente
    if(this.getUser.getUserType() == 'Usuario'){
      this.router.navigate['/tabs/tab3'];
    }

    

    //Finalmente, agora precisamos fazer uma requisição para a API para verificar se o cliente possui plano ativo, e qual o plano que ele possui no momento

    //pegando o id do cliente logado
    let idCliente = this.getUser.getUserInfo().id_cliente;

    //Montando o objeto para requisição
    let bodyRequest = {
     requisicao: 'findById',
      id_cliente: idCliente 
    }

    //A própria requisição em si...
    return new Promise((res) => {
      this.api.apiPHP('controller-clientes.php', bodyRequest).subscribe((data)=>{
        if(data['success'] == true){
          //Irá retornar um json com os TODOS os dados do cliente
          //Pegaremos os dados do contrato na chave id_contrato_cliente
          let contrato =  data['result'][0][0]['id_contrato_cliente'];
          if(contrato === 1){
            this.possuiPlanoAtivo = true;
            this.nomePlano = 'Plano Diamante';
            this.valorPlano = 'R$ 650,00';
            this.imgPlano = 'http://localhost/api-php-v2/images/Diamante.jpeg';
          }else if(contrato === 2){
            this.possuiPlanoAtivo = true;
            this.nomePlano = 'Plano Ouro';
            this.valorPlano = 'R$ 500,00';
            this.imgPlano = 'http://localhost/api-php-v2/images/Ouro.jpeg';
          }else if(contrato === 3){
            this.possuiPlanoAtivo = true;
            this.nomePlano = 'Plano Prata';
            this.valorPlano = 'R$ 250,00';
            this.imgPlano = 'http://localhost/api-php-v2/images/Prata.jpeg';
          }else{
            this.possuiPlanoAtivo = false;
          }
        }else{
         console.log('Ocorreu um erro!');
        }
      })
    });
  }

}
