import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LoadingService } from '../loading.service';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import * as moment from 'moment';
import { ApiService } from '../api/api-service';
import { GetUserTypeService } from '../services/get-user-type.service';

@Component({
  selector: 'app-comunicar-problema',
  templateUrl: './comunicar-problema.page.html',
  styleUrls: ['./comunicar-problema.page.scss'],
})
export class ComunicarProblemaPage implements OnInit {

  private formGroup: FormGroup;
  private isSubmitted = false;
  private userInfo: any = {};

  constructor(
    private router: Router,
    private toastCtrl: ToastController,
    private getUser: GetUserTypeService,
    private apiService: ApiService,
    private formBuilder: FormBuilder,
    private loadingCtrl: LoadingService
  ) { 
    this.formGroup = this.formBuilder.group({
      tipoProblema: ['',
        Validators.compose([
          Validators.required,
          Validators.minLength(4),
          Validators.maxLength(32)                    
        ])],
        descriProblema: ['',
        Validators.compose([
          Validators.required,
          Validators.minLength(4),
          Validators.maxLength(255)
        ])]

    });
  }

  ngOnInit() {
  }

  ionViewWillEnter(){
    //Vamos primeiro pegar as informações do usuário logado assim que a página for carregada
    this.userInfo = this.getUser.getUserInfo();
    console.log()
  
  }

  get errorControl() {
    return this.formGroup.controls;
  }

  onSubmit(){
    //Aqui vamos mandar os dados para a API, mas primeiro vamos verificar se os campos estão preenchidos

    this.isSubmitted = true;

    if(!this.formGroup.valid){
      //Se os campos não estiverem preenchidos, vamos mostrar uma mensagem de erro e vamos cortar a execução do método
      return false;
    }

    //montando o corpo da requisição

    let bodyRequest = {
      requisicao: 'add',
      nome_cliente: this.userInfo.nome_cliente,
      email_cliente: this.userInfo.email_cliente,
      data_relato: moment(new Date()).locale('pt-BR').format('LLL'),
      tipoProblema: this.formGroup.value.tipoProblema,
      msg_problema: this.formGroup.value.descriProblema
    }
    this.loadingCtrl.present();

    return new Promise(
      (res) => {
        this.apiService.apiPHP('controller-relatousuario.php', bodyRequest).subscribe((data) => {          
          //Vamos exibir um componente de carregamento enquanto fazemos a requisição para a API
          if(data['success'] == true){
            this.loadingCtrl.dismiss();
            this.presentToast('<b>Problema relatado com sucesso!</b>', 'success');
          }else{
            this.loadingCtrl.dismiss();
            this.presentToast('Erro ao relatar problema, tente novamente mais tarde!', 'danger');
          }
        })
      }
    );
  }

  async presentToast(msg: string, color: string) {
    const toast = await this.toastCtrl.create({
      message: msg,
      duration: 2000,
      color: color
    });
    toast.present();
  }






}
