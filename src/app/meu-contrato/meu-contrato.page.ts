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
     requisicao: 'recuperarPlano',
      id_cliente: idCliente 
    }

    //A própria requisição em si...
    return new Promise((res) => {
      this.api.apiPHP('controller-clientes.php', bodyRequest).subscribe((data)=>{
        if(data['success'] == true){

          //Se o resultado for true, setamos o atribuoto possuiPlanoAtivo para renderizar o conteúdo do plano ativo na tela
          console.log(data['result'][0][0]['nome_plano']);
          console.log(data['result'][0][0]['valor_plano']);

          this.possuiPlanoAtivo = true;
          this.nomePlano = data['result'][0][0]['nome_plano'];
          this.valorPlano = data['result'][0][0]['valor_plano']

          // this.valorPlano = data['valor_plano'][0][0]['valor_plano'];
          // console.log(this.valorPlano);
          this.imgPlano = environment.FILE_IMG_PATH + '/' + this.nomePlano + '.jpeg';


        }else{
          //Se o resultado for false, setamos o atributo possuiPlanoAtivo para renderizar o conteúdo de plano inativo na tela
          this.possuiPlanoAtivo = false;
        }
      })
    });
  }

}
