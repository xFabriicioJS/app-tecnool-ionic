import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { ApiService } from '../api/api-service';

@Component({
  selector: 'app-login',
  templateUrl: './adminlogin.page.html',
  styleUrls: ['./adminlogin.page.scss'],
})
export class AdminloginPage implements OnInit {
  formGroup: FormGroup;
  isSubmitted: boolean = false;

  constructor(
    private router: Router,
    public formBuilder: FormBuilder,
    private apiService: ApiService,
    private toastController: ToastController
  ) {
    this.formGroup = formBuilder.group({
      login: [
        '',
        Validators.compose([
          Validators.minLength(4),
          Validators.maxLength(30),
          Validators.required,
        ]),
      ],
      senha: [
        '',
        Validators.compose([
          Validators.minLength(1),
          Validators.maxLength(255),
          Validators.required,
        ]),
      ],
    });
  }

  get errorControl() {
    return this.formGroup.controls;
  }

  onSubmit() {
    this.isSubmitted = true;
    if (!this.formGroup.valid) {
      this.presentToast(
        '<b>Preencha todos os campos corretamente.</b>',
        'danger'
      );

      //corta a função
      return false;
    }
    //verificação dos dados de login do usuário com a API

    let bodyRequest = {
      requisicao: 'login',
      login: this.formGroup.value.login,
      senha: this.formGroup.value.senha,
    };

    this.apiService
      .apiPHP('controller-usuarios.php', bodyRequest)
      .subscribe((data) => {
        console.log(data);
        if (data['success'] == true) {
          this.presentToast('<b>Login efetuado com sucesso</b>', 'success');

          //setar dados no local storage
          this.setLocalStorageData(data['result']);

          //redireciona para a página inicial do app
          this.router.navigateByUrl('/tabs/tab1');
        } else {
          this.presentToast('<b>Login ou senha incorretos.</b>', 'danger');
        }
      });
  }

  //Função que será chamada para setar dados no nosso local storage, para que possamos usar em outras páginas, e sem precisar de um gerenciador de contexto global
  setLocalStorageData(data: any) {
    //setar dados no local storage
    localStorage.setItem('usuario', JSON.stringify(data));
  }

  ngOnInit() {}

  ionViewWillEnter() {
    //garantindo que o usuário/cliente não esteja logado
    localStorage.removeItem('usuario');
    localStorage.removeItem('cliente');
  }

  async presentToast(msg: string, color: string) {
    const toast = await this.toastController.create({
      message: msg,
      duration: 2000,
      color: color,
    });
    toast.present();
  }
}
