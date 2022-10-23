import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { ApiService } from '../api/api-service';
import { GetUserTypeService } from '../services/get-user-type.service';

@Component({
  selector: 'app-atualiza-email',
  templateUrl: './atualiza-email.page.html',
  styleUrls: ['./atualiza-email.page.scss'],
})
export class AtualizaEmailPage implements OnInit {

  isSubmitted: boolean = false;
  formGroup: FormGroup;
  idUsuarioLogado: number = 0;

  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private apiService: ApiService,
    private toastController: ToastController,
    private getUser: GetUserTypeService
  ) {
    this.formGroup = formBuilder.group({
      senhaAtual: 
      [
        '',
        Validators.compose([
          Validators.minLength(2),
          Validators.required
        ])
      ],
      novoEmailUm:
      [
        '',
        Validators.compose([
          Validators.minLength(5),
          Validators.required,
          Validators.maxLength(32),
          Validators.email
        ])
      ],
      novoEmailDois:
      [
        '',
        Validators.compose([
          Validators.minLength(5),
          Validators.required,
          Validators.maxLength(32),
          Validators.email
        ])
      ]

    })
   }

   ionViewWillEnter(){
    //Vamos verificar apenas se o usuário está logado.
    //Se não estiver, vamos redirecioná-lo para a página de login

    if(this.getUser.getUserInfo() == null){
      this.router.navigate(['/openscreen']);
    }
    //Pegando o ID do usuário logado
    let usuarioLogado = this.getUser.getUserInfo();
    console.log(usuarioLogado);
    this.idUsuarioLogado = usuarioLogado.id_cliente;
   }


   get errorControl() {
    return this.formGroup.controls;
  }

  onSubmit(){
    //Precisamos verificar primeiro, se os dois email conferem
    this.isSubmitted = true;
    if (!this.formGroup.valid) {
      this.presentToast('<b>Preencha todos os campos corretamente.</b>', 'danger');
      //irá cortar a função e não irá executar o código abaixo
      return false;
    }

    if(this.formGroup.value.novoEmailUm != this.formGroup.value.novoEmailDois){
      this.presentToast("<b>Os emails não conferem</b>", "danger");

      //Esse return false vai impedir o código de continuar, ou seja, "cortará a função"
      return false;
    }
    //Agora vamos fazer a requisição, a própria API se encarregará de ver se o email digitado pelo usuário já existe ou não, e se a senha digitada por ele está correta
    let bodyRequest = {
      requisicao: 'atualizaEmail',
      senha_atual: this.formGroup.value.senhaAtual,
      email_novo: this.formGroup.value.novoEmailUm,
      id_cliente: this.idUsuarioLogado
    }
    console.log(bodyRequest);

    return new Promise((res) => {
      this.apiService.apiPHP('controller-clientes.php', bodyRequest).subscribe((data) => {
        if(data['success'] == true){
          //Se ocorrer tudo bem, mostramos um alerta para o usuário e redirecionamos para a tela de login
          this.presentToast('<b>Email atualizado</b>', 'success');
          this.router.navigate(['/openscreen']);          
        }else if(data['msg'] == 'Esse email já pertence a outro usuário'){

          //Se o email já existir na base de dados
          this.presentToast('<b>Esse email já pertence a outro usuário</b>', 'danger');

        }else{
          //Se ele errar a senha digitada
          this.presentToast('<b>Senha incorreta. Tente novamente, por favor.</b>', 'danger');
        }
      })
    })



  }


  ngOnInit() {
  }


  async presentToast(message: string, color: string) {
    const toast = await this.toastController.create({
      message: message,
      duration: 2000,
      color: color
    });
    toast.present();
  }

}
