//Dessa vez, não iremos pegar os dados pelo actRouter, e sim, iremos fazer uma requisição findById para pegar os dados do cliente juntamente de seu endereço

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertController, ToastController } from '@ionic/angular';
import { environment } from 'src/environments/environment';
import { ApiService } from '../api/api-service';

@Component({
  selector: 'app-info-clientes',
  templateUrl: './info-clientes.page.html',
  styleUrls: ['./info-clientes.page.scss'],
})
export class InfoClientesPage implements OnInit {

  private fotoCliente: string = '';
  private nomeCliente: string = '';

  // Iremos fazer uma renderização condicional com base no valor desse atributo
  private tipoCliente: string = '';

  //Dados do cliente, iremos pegar todos os dados do cliente e alguns dados do endereço desse cliente
  private emailCliente: string = '';
  private cpfCliente: string = '';
  private telefoneCliente: string = '';
  private logradouroCliente: string = '';
  private numeroCliente: string = '';
  private complementoCliente: string = '';
  private cidadeCliente: string = '';
  private idCliente: number = 0;
  private cepCliente: string = '';

  //Informações do plano/contrato do cliente, iremos fazer uma requisição diferente para pegar esses dados
  possuiPlanoAtivo: boolean = false;
  nomePlano: string = '';
  valorPlano: string = '';
  imgPlano: string = '';

  constructor(
    private apiService: ApiService,
    private router: Router,
    private actRouter: ActivatedRoute,
    private toastController: ToastController,
    private alertController: AlertController
  ) { }

  ngOnInit() {

    this.actRouter.params.subscribe((data: any)=>{
      
      //Pegando o id do cliente que foi passado por parâmetro
      this.idCliente = data.idCliente;
      
    });
  
  }


  ionViewWillEnter(){
    //Chamado para o método que irá devolver os dados do cliente e de seu endereço
    this.requestInfoCliente(this.idCliente);  

    //Chamada para o método que irá retornar os dados do plano/contrato do cliente
    this.requestInfoPlano(this.idCliente);
  }

  //Método responsável por fazer a requisição para nossa API
  requestInfoCliente(idCliente: number){

    //Objeto que será enviado para a API, o corpo da requisição
    let bodyRequest = {
      requisicao: 'findById',
      id_cliente: idCliente
    }

    console.log(bodyRequest);

    return new Promise(res => {
       this.apiService.apiPHP('controller-clientes.php', bodyRequest).subscribe((data)=>{
        if(data['success'] == true){
          console.log(data['result'][0][0].nome_cliente);
          //Se a requisição for bem sucedida, iremos pegar os dados do cliente e do endereço

          //IF ternário responsável por verificar se o cliente possui uma foto personalizada ou não
          this.fotoCliente = data['result'][0][0].foto_cliente !== null ? environment.FILE_IMG_PATH + '/' +data['result'][0][0].foto_cliente : 'https://www.w3schools.com/howto/img_avatar.png';
          this.nomeCliente = data['result'][0][0].nome_cliente;
          this.emailCliente = data['result'][0][0].email_cliente;
          this.cpfCliente = data['result'][0][0].cpf_cliente;
          this.telefoneCliente = data['result'][0][0].telefone_cliente;
          this.logradouroCliente = data['result'][0][0].logradouro_endereco;
          this.numeroCliente = data['result'][0][0].num_endereco;
          this.cepCliente = data['result'][0][0].cep_endereco;
          this.complementoCliente = data['result'][0][0].complemento_endereco;
          this.tipoCliente = data['result'][0][0].id_tipo_cliente == 1 ? 'Pessoa física' : 'Pessoa jurídica';
          this.cidadeCliente = data['result'][0][0].cidade_endereco;

          console.log(data);

        }else{
          this.presentToast('Ocorreu um erro ao tentar buscar os dados do cliente');
        }
       })
    })
  }

  //Método responsável por trazer os dados do plano/contrato do cliente
  requestInfoPlano(idCliente: number){
    let bodyRequest = {
      requisicao: 'recuperarPlano',
      id_cliente: this.idCliente
    }

    return new Promise(res => {
      this.apiService.apiPHP('controller-clientes.php', bodyRequest).subscribe((data) => {
        if(data['success'] == true){
          this
        }
      })
    })
  }

  //Método responsável por exibir um toast caso dê algum erro na requisição
  async presentToast(message: string){
    const toast = await this.toastController.create({
      message: message,
      duration: 2000
    });
    toast.present();

  }


  
  

}
