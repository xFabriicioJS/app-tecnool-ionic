//Dessa vez, não iremos pegar os dados pelo actRouter, e sim, iremos fazer uma requisição findById para pegar os dados do usuário

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertController, ToastController } from '@ionic/angular';
import { environment } from 'src/environments/environment';
import { ApiService } from '../api/api-service';

@Component({
  selector: 'app-info-usuarios',
  templateUrl: './info-usuarios.page.html',
  styleUrls: ['./info-usuarios.page.scss'],
})
export class InfoUsuariosPage implements OnInit {

  private idUsuario: number = 0;
  private fotoUsuario: string = '';
  private nomeUsuario: string = '';

  private nivelUsuario: string = '';


  private emailUsuario: string = '';
  private loginUsuario: string = '';
  
  
  constructor(
    private apiService: ApiService,
    private router: Router,
    private actRouter: ActivatedRoute,
    private toastController: ToastController,
    private alertController: AlertController
  ) { }

  ngOnInit() {

    this.actRouter.params.subscribe((data: any)=>{
      
      //Pegando o id do usuário que foi passado por parâmetro
      this.idUsuario = data.idUsuario;
      
    });
  
  }


  ionViewWillEnter(){
    //Chamado para o método que irá devolver os dados do usuário
    this.requestInfoUsuario(this.idUsuario);  
  }

  //Método responsável por fazer a requisição para nossa API
  requestInfoUsuario(idUsuario: number){

    //Objeto que será enviado para a API, o corpo da requisição
    let bodyRequest = {
      requisicao: 'findById',
      id_usuario: idUsuario
    }

    console.log(bodyRequest);

    return new Promise(res => {
       this.apiService.apiPHP('controller-usuarios.php', bodyRequest).subscribe((data)=>{
        if(data['success'] == true){
        
          
          //Verificando o nível do usuário, se for 1 ´é supervisor, se for 2 é tecnico 2, e etc...
          switch (data['result'][0][0].id_nivel_usuario) {
            case 1:
              this.nivelUsuario = 'Supervisor';
              break;
            case 2:
              this.nivelUsuario = 'Técnico II';
              break;
            case 3:
              this.nivelUsuario = 'Técnico I';
            case 4:
              this.nivelUsuario = 'Desligado';    
            default:
              break;
          }


          //IF ternário responsável por verificar se o cliente possui uma foto personalizada ou nã
          this.fotoUsuario = data['result'][0][0].foto_usuario !== '' ? environment.FILE_IMG_PATH + '/' +data['result'][0][0].foto_usuario : 'https://www.w3schools.com/howto/img_avatar.png';
          this.nomeUsuario = data['result'][0][0].nome_usuario;
          this.emailUsuario = data['result'][0][0].email_usuario;
          this.loginUsuario = data['result'][0][0].login_usuario;

          console.log(data);

        }else{
          this.presentToast('Ocorreu um erro ao tentar buscar os dados do cliente', 'danger');
        }
       })
    })
  }

  //Método responsável por exibir um toast caso dê algum erro na requisição
  async presentToast(message: string, color: string){
    const toast = await this.toastController.create({
      message: message,
      color: color,
      duration: 2000
    });
    toast.present();

  }


  //Método alert por fazer a requisição para atualizar o nome do usuário
  async presentAlertLoginUsuario(){
    const alert = await this.alertController.create({
      header: 'Por favor, insira o login do usuário',
      buttons: [
        {
          'text': 'OK',
          'role': 'confirm',
          handler: (alertdata)=>{
            //Faremos uma requisição para a API para atualizar o nome desse usuário
            this.requestUpdateLogin(alertdata.login);
          }
        },
        {
          'text': 'Cancelar',
          role: 'cancel'
        }
      ],

      inputs: [
        {
          placeholder: 'Login (máx 30 caracteres)',
          name: 'login',
          attributes: {
            maxlength: 30,
            minlenght: 3
          }
        },
      ],

    });

    await alert.present();
  }


  //Método alert responsável por exibir um alert para o usuário modificar o nome
  async presentAlertNome() {
    const alert = await this.alertController.create({
      header: 'Por favor, insira o nome e o nível do usuário',
      buttons: [
        {
          'text': 'OK',
          'role': 'confirm',
          handler: (alertdata)=>{
            //Faremos uma requisição para a API para atualizar o nome desse usuário
            this.requestUpdateNome(alertdata.nome);
          }
        },
        {
          'text': 'Cancelar',
          role: 'cancel'
        }
      ],

      inputs: [
        {
          placeholder: 'Nome (máx 30 caracteres)',
          name: 'nome',
          attributes: {
            maxlength: 30,
            minlenght: 3
          }
        },
      ],

    });

    await alert.present();
  }

  //Método responsável por fazer apresentar o alert para atualizar o nível do usuário

  async presentAlertNivel() {
    const alert = await this.alertController.create({
      header: 'Insira o nível do usuário',
      buttons: [
        {
          'text': 'Confirmar',
          'role': 'confirm',
          handler: (alertdata)=>{
            //Faremos uma requisição para a API para atualizar o NÍVEL desse usuário

            //Esse alertdata contém o valor do nível do usuário que o usuário selecionou, sei lá porque
            this.requestUpdateNivel(alertdata);
          }

        },
        {
          'text': 'Cancelar',
          role: 'cancel'
        }
      ],
      inputs: [
        {
          label: 'Supervisor',
          type: 'radio',
          value: 1,
        },
        {
          label: 'Técnico II',
          type: 'radio',
          value: 2,
        },
        {
          label: 'Técnico III',
          type: 'radio',
          value: 3,
        },
        {
          label: 'Desligado',
          type: 'radio',
          value: 4,
        }
      ],
    });

    await alert.present();
  }

  
  async presentAlertEmail() {
    const alert = await this.alertController.create({
      header: 'Por favor, insira o novo email do usuário',
      buttons: [
        {
          'text': 'OK',
          'role': 'confirm',
          handler: (alertdata)=>{
            //Faremos uma requisição para a API para atualizar o email desse usuário
            this.requestUpdateEmail(alertdata.email);
          }
        },
        {
          'text': 'Cancelar',
          role: 'cancel'
        }
      ],

      inputs: [
        {
          placeholder: 'Email (máx 32 caracteres)',
          name: 'email',
          attributes: {
            maxlength: 32,
            minlenght: 3
          }
        },
      ],

    });

    await alert.present();
  }

  //Método responsável por fazer a requisição para a API para atualizar o login do usuário
  requestUpdateLogin(novoLogin: string){

    let bodyRequest = {
      requisicao: 'atualizaLogin',
      id_usuario: this.idUsuario,
      login_usuario: novoLogin
    }

    return new Promise(res => {
      this.apiService.apiPHP('controller-usuarios.php', bodyRequest).subscribe((data)=>{
        if(data['success'] == true){
          this.presentToast('<b>Login atualizado com sucesso!<b>', 'success');
          this.requestInfoUsuario(this.idUsuario);
        }else{
          this.presentToast('<b>Ocorreu um erro ao tentar atualizar o login</b>', 'danger');
        }
      })
    })
  }


  //Método responsável por fazer a requisição para a API para atualizar o nome do usuário
  requestUpdateNome(novoNome: string){

    //Objeto que será enviado para a API, o corpo da requisição
    let bodyRequest = {
      requisicao: 'atualizaNome',
      id_usuario: this.idUsuario,
      nome_usuario: novoNome
    }

    console.log(bodyRequest);

    return new Promise(res => {
       this.apiService.apiPHP('controller-usuarios.php', bodyRequest).subscribe((data)=>{
        if(data['success'] == true){
          this.presentToast('<b>Nome atualizado com sucesso!</b>', 'success');
          
          //Atualizando o nome do usuário na tela
          this.requestInfoUsuario(this.idUsuario);
        }else{
          this.presentToast('<b>Ocorreu um erro ao tentar atualizar o nome do usuário</b>', 'danger');
        }
       });
    })
  };


  //Método responsável por fazer a requisição para a API para atualizar o email do usuário
  requestUpdateEmail(novoEmail: string){
      
      //Objeto que será enviado para a API, o corpo da requisição
      let bodyRequest = {
        requisicao: 'atualizaEmail',
        id_usuario: this.idUsuario,
        email_usuario: novoEmail
      }
  
      console.log(bodyRequest);
  
      return new Promise(res => {
        this.apiService.apiPHP('controller-usuarios.php', bodyRequest).subscribe((data)=>{
          if(data['success'] == true){
            this.presentToast('<b>Email atualizado com sucesso!</b>', 'success');
            
            //Atualizando o email do usuário na tela
            this.requestInfoUsuario(this.idUsuario);
          }else{
            this.presentToast('<b>Ocorreu um erro ao tentar atualizar o email do usuário</b>', 'danger');
          }
        });
      })
  }

  requestUpdateNivel(novoNivel: number){

    //Objeto que será enviado para a API, o corpo da requisição
    let bodyRequest = {
      requisicao: 'atualizaNivel',
      id_usuario: this.idUsuario,
      id_nivel_usuario: novoNivel
    }

    console.log(bodyRequest);

    return new Promise(res => {
      this.apiService.apiPHP('controller-usuarios.php', bodyRequest).subscribe((data)=>{
        if(data['success'] == true){
          this.presentToast('<b>Nível atualizado com sucesso!</b>', 'success');
          
          //Atualizando o nível do usuário na tela
          this.requestInfoUsuario(this.idUsuario);
        }else{
          this.presentToast('<b>Ocorreu um erro ao tentar atualizar o nível do usuário</b>', 'danger');
        }
      });
    })
  }
}
