import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertController, ToastController } from '@ionic/angular';
import { environment } from 'src/environments/environment';
import { ApiService } from '../api/api-service';
import { GetUserTypeService } from '../services/get-user-type.service';

@Component({
  selector: 'app-configuracoes-conta',
  templateUrl: './configuracoes-conta.page.html',
  styleUrls: ['./configuracoes-conta.page.scss'],
})
export class ConfiguracoesContaPage implements OnInit {
  nomeUsuario: string = '';
  enderecoUsuario: any;
  telefoneContato: string = '';
  idUsuarioLogado: string = '';
  nome: string = '';
  cpf: string = '';
  idTipoCliente: string = '';
  isModalOpen = false;
  imgUsuarioLogado: string = '';
  formGroup: FormGroup;
  constructor(
    public formBuilder: FormBuilder,
    private router: Router,
    private alertController: AlertController,
    private getUser: GetUserTypeService,
    private apiService: ApiService,
    private toastController: ToastController
  ) {
    this.formGroup = formBuilder.group({
      senhaAntiga: [
        '',
        Validators.compose([
          Validators.minLength(4),
          Validators.maxLength(32),
          Validators.pattern('[0-9a-z-A-Z-_]*'),
          Validators.required,
        ]),
      ],
      novaSenhaUm: [
        '',
        Validators.compose([
          Validators.minLength(4),
          Validators.maxLength(255),
          Validators.required,
        ]),
      ],
      novaSenhaDois: [
        '',
        Validators.compose([
          Validators.minLength(4),
          Validators.maxLength(255),
          Validators.required,
        ]),
      ],
    });
  }

  ngOnInit() {}

  // Método que será chamado imediatamente ao renderizar a página
  ionViewWillEnter() {
    //verificamos primeiro se o usuário está logado
    if (this.getUser.getUserInfo() == null) {
      this.router.navigate(['/openscreen']);
    }
    //Se o usuário logado for um cliente...
    if (this.getUser.getUserType() == 'Cliente') {
      //se o usuário estiver logado, então pegamos os dados dele
      let currentLoggedInUser = this.getUser.getUserInfo();

      //Setando a foto do cliente
      if(!currentLoggedInUser.foto_cliente){
        this.imgUsuarioLogado = 'https://www.w3schools.com/howto/img_avatar.png';
      }else{
        this.imgUsuarioLogado = environment.FILE_IMG_PATH + '/' +currentLoggedInUser.foto_cliente;
      }

      //Setamos os atributos com base nos dados do cliente lá no localStorage
      this.nomeUsuario = currentLoggedInUser.email_cliente;
      this.telefoneContato = currentLoggedInUser.telefone_cliente;
      this.idUsuarioLogado = currentLoggedInUser.id_cliente;
      this.nome = currentLoggedInUser.nome_cliente;
      this.cpf = currentLoggedInUser.cpf_cliente;
      this.idTipoCliente = currentLoggedInUser.id_tipo_cliente; 
    }else{
      //Se o usuário logado for um funcionário...
      //Pegando os dados do funcionário no localStorage
      let currentLoggedInUser = this.getUser.getUserInfo();
      //Setando a foto do usuário
      if(!currentLoggedInUser.foto_usuario){
        this.imgUsuarioLogado = 'https://www.w3schools.com/howto/img_avatar.png';
      }else{
        this.imgUsuarioLogado = environment.FILE_IMG_PATH + '/' +currentLoggedInUser.foto_usuario;
      }
    }
  }

  setOpen(isOpen: boolean) {
    this.isModalOpen = isOpen;
  }

  //Alert que é responsável por exibir uma janela com um form para atualizar o número de contato
  async presentAlert() {
    const alert = await this.alertController.create({
      header: 'Por favor, insira seu novo número de contato.',
      buttons: [
        {
          text: 'Atualizar',
          role: 'confirm',
          handler: (alertData) => {
            //Aqui nós atualizamos o número de contato do cliente na renderização, no localStorage e claro, na API
            this.telefoneContato = alertData.telefone;

            //Local storage atual
            let currentLoggedInUser = this.getUser.getUserInfo();

            //atualizando o localStorage (com o novo número de contato)
            let newLocalStorage = {
              id_cliente: currentLoggedInUser.id_cliente,
              nome_cliente: currentLoggedInUser.nome_cliente,
              cpf_cliente: currentLoggedInUser.cpf_cliente,
              email_cliente: currentLoggedInUser.email_cliente,
              foto_cliente: currentLoggedInUser.foto_cliente,
              id_tipo_cliente: currentLoggedInUser.id_tipo_cliente,
              telefone_cliente: alertData.telefone,
              razaoSocial_cliente: currentLoggedInUser.razaoSocial_cliente,
              tipo_usuario_sistema: "Cliente"
            };
            localStorage.setItem('usuario', JSON.stringify(newLocalStorage));

            //atualizando a API agora

            //Corpo da requisição
            let bodyRequest = {
              requisicao: 'atualizaTelefone',
              id_cliente: this.idUsuarioLogado,
              telefone_cliente: alertData.telefone,
            };

            return new Promise((res) => {
              this.apiService
                .apiPHP('controller-clientes.php', bodyRequest)
                .subscribe((data) => {
                  if (data['success'] == true) {
                    this.presentToast(
                      'Telefone atualizado com sucesso!',
                      'success'
                    );
                    //Fechamos o alert
                    


                  } else {
                    this.presentToast(
                      'Erro ao atualizar o telefone!',
                      'danger'
                    );
                  }
                });
            });
          },
        },
        {
          text: 'Fechar',
          role: 'cancel',
          cssClass: 'secondary',
        },
      ],
      inputs: [
        {
          placeholder: 'Novo telefone (máximo de 11 dígitos)',
          name: 'telefone',
          attributes: {
            maxlength: 11,
            minlength: 3,
          },
          type: 'number',
        },
      ],
    });

    await alert.present();
  }
  

  //Alert que é responsável por exibir uma janela com um botão de confirmação para excluir a conta do cliente
  

  //método responsável por atualizar a senha do usuário logado

  onSubmitSenha() {
    //verificamos primeiro se o valor dos campos de nova senha são iguais
    if (
      this.formGroup.value.novaSenhaUm !== this.formGroup.value.novaSenhaDois
    ) {
      this.presentToast('As senhas não são iguais', 'danger');
    }
    //Se as senhas forem iguais, então fazemos a requisição
    //A própria API se encarregará de confirmar se a senha antiga informada pelo cliente está correta, se ela estiver correta então a senha será atualizada

    let bodyRequest = {
      requisicao: 'alterarSenha',
      senhaAntiga: this.formGroup.value.senhaAntiga,
      senhaNova: this.formGroup.value.novaSenhaDois,
      id_cliente: this.idUsuarioLogado,
    };

    this.setOpen(false);
    
    return new Promise((res) => {
      this.apiService
        .apiPHP('controller-clientes.php', bodyRequest)
        .subscribe((data) => {
          if (data['success'] == true) {
             //Fechamos o modal.

             this.setOpen(false);

            //Caso dê tudo certo, exibimos uma mensagem de sucesso
            this.presentToast('<b>Senha alterada com sucesso!</b>', 'success');

           

            //Logo em seguida, redirecionamos o usuário para a tela de login
            // this.router.navigate(['/openscreen']);
          } else {
            //Caso der algum erro, exibimos uma mensagem de erro
            this.presentToast(
              '<b>Senha atual incorreta, tente novamente.</b>',
              'danger'
            );
          }
        });
    });
  }

  async presentToast(msg: string, color: string) {
    const toast = await this.toastController.create({
      message: msg,
      duration: 3000,
      color: color,
    });
    toast.present();
  }

  navigateAtualizarEmail() {
    this.router.navigate(['/atualiza-email']);
  }

  navigateAtualizarFoto(){
    this.router.navigate(['/atualiza-foto']);
  }
}
