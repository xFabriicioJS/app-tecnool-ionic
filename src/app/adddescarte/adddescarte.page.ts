import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import formatISO9075 from 'date-fns/formatISO9075';
import { ApiService } from '../api/api-service';
import addHours from 'date-fns/addHours';
import { GetUserTypeService } from '../services/get-user-type.service';

@Component({
  selector: 'app-adddescarte',
  templateUrl: './adddescarte.page.html',
  styleUrls: ['./adddescarte.page.scss'],
})
export class AdddescartePage {
  formGroup: FormGroup;
  isSubmitted: boolean = false;
  foto_hardware: string = '';

  //mudar depois de implementar o sistema de autenticação
  id_cliente: number = 0;
  filePath: string;
  prazo_descarte: string;

  constructor(
    public formBuilder: FormBuilder,
    private toastController: ToastController,
    private router: Router,
    private apiService: ApiService,
    private getUser: GetUserTypeService
  ) {
    this.formGroup = formBuilder.group({
      avatar: [''],
      tituloHardware: [
        '',
        Validators.compose([
          Validators.minLength(4),
          Validators.maxLength(32),
          Validators.required,
        ]),
      ],
      descriHardware: [
        '',
        Validators.compose([
          Validators.minLength(4),
          Validators.maxLength(255),
          Validators.required,
        ]),
      ],
      img: [null],
    });
  }

  ionViewWillEnter() {
    //verificamos primeiro se o usuário está logado, caso não esteja, redirecionamos para a página de login
    if (this.getUser.getUserInfo() == null) {
      this.router.navigate(['/openscreen']);
    }

    //Verificamos agora o tipo de usuário logado, se ele for cliente faremos uma requisição para listar os descartes apenas do cliente logado
    if (this.getUser.getUserType() == 'Cliente') {
      let currentUser = this.getUser.getUserInfo();
      this.id_cliente = currentUser.id_cliente;
    } else {
      //Caso o usuário logado não seja um cliente, redirecionamos para a página de descartes
      this.router.navigate(['/tabs/tab2']);
    }
  }

  //validações do formulário
  get errorControl() {
    return this.formGroup.controls;
  }

  onFileSelect(event) {
    //setando a imagem selecionada para visualização no formulário

    console.log('teste');
    this.imagePreview(event);

    //se tiver o formulário tiver algum arquivo, setamos o atributo img do formulário para o arquivo selecionado

    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.formGroup.get('avatar').setValue(file);
    }
  }

  imagePreview(event) {
    const file = (event.target as HTMLInputElement).files[0];

    this.formGroup.patchValue({
      img: file,
    });

    this.formGroup.get('img').updateValueAndValidity();

    const reader = new FileReader();
    reader.onload = () => {
      this.filePath = reader.result as string;
    };
    reader.readAsDataURL(file);
  }

  onSubmit() {
    // todo do something with our data like:
    // this.service.set(formData);

    //precisamos setar isSubmitted para true para que o formulário seja validado
    this.isSubmitted = true;

    //Caso as validações do formulário não sejam satisfeitas, não prosseguimos com o envio dos dados, e cortamos a função aqui para que ela não prossiga com o "return false"
    if (!this.formGroup.valid) {
      console.log('Preencha todos os campos corretamente');
      return false;
    }

    //se o formulário for válido, prosseguimos com o envio dos dados

    //verificando se o usuário enviou uma imagem, precisamos fazer essa verificação pois dependendo se ele selecionou ou não, a requisição para a api (bodyRequest) será diferente

    //se ele selecionou uma imagem...
    if (this.formGroup.get('avatar').value !== '') {
      const formData = new FormData();

      formData.append('avatar', this.formGroup.get('avatar').value);

      //requisição para a API de upload de imagemxz
      this.apiService.uploadFile(formData).subscribe((res) => {
        //setamos o atributo foto_hardware com o nome da imagem que foi enviada para o servidor
        this.foto_hardware = res.nomeArquivo;

        //adiciona 7 dias a data atual
        this.prazo_descarte = formatISO9075(addHours(new Date(), 168));

        //montando a requisição para a API

        let bodyRequest = {
          requisicao: 'add',
          descricao: this.formGroup.get('descriHardware').value,
          nome_hard: this.formGroup.get('tituloHardware').value,
          id_cliente: this.id_cliente,
          data_abertura: formatISO9075(new Date()),
          prazo: this.prazo_descarte,
          foto: this.foto_hardware,
          status: 'Aguardando análise',
        };

        //enviando a requisição para a API
        this.apiService
          .apiPHP('controller-descartes.php', bodyRequest)
          .subscribe((data) => {
            if (data['success'] === true) {
              console.log('Descarte cadastrado');

              //redirecionando para a página de descartes
              this.router.navigate(['/tabs/tab2']);

              //mostrando mensagem de sucesso
              this.presentToast(
                '<b>Descarte cadastrado com sucesso</b>',
                'success'
              );
            } else {
              console.log('Erro ao cadastrar o descarte');

              this.presentToast('<b>Erro ao cadastrar chamado</b>', 'danger');
            }
          });
      });
    } // fim do if, caso ele não tenha selecionado uma imagem
    else {
      //adiciona 7 dias a data atual
      this.prazo_descarte = formatISO9075(addHours(new Date(), 168));

      //montando o objeto requisição com o campo imagem em branco
      let bodyRequest = {
        requisicao: 'add',
        descricao: this.formGroup.get('descriHardware').value,
        nome_hard: this.formGroup.get('tituloHardware').value,
        id_cliente: this.id_cliente,
        data_abertura: formatISO9075(new Date()),
        prazo: this.prazo_descarte,
        foto: '',
        status: 'Aguardando Analise',
      };

      //enviando a requisição para a API
      this.apiService
        .apiPHP('controller-descartes.php', bodyRequest)
        .subscribe((data) => {
          if (data['success'] === true) {
            console.log('Descarte cadastrado');

            //redirecionando para a página de confirmação
            this.navigateConfirmaDescarte(
              this.formGroup.get('tituloHardware').value,
              this.prazo_descarte,
              this.formGroup.get('descriHardware').value
            );

            //mostrando mensagem de sucesso
            this.presentToast(
              '<b>Descarte cadastrado com sucesso</b>',
              'success'
            );
          } else {
            console.log('Erro ao cadastrar o descarte');

            this.presentToast('<b>Erro ao cadastrar chamado</b>', 'danger');
          }
        });
    }
  }

  //função para mostrar mensagens de sucesso ou erro
  async presentToast(message, color) {
    const toast = await this.toastController.create({
      message: message,
      duration: 3000,
      color: color,
      icon: color === 'success' ? 'checkmark-circle' : 'close-circle',
    });

    await toast.present();
  }

  //Método para navegar para a página de Descarte
  navigateConfirmaDescarte(tituloHardware, prazoDescarte, descriHardware) {
    this.router.navigate([
      '/confirma-descarte/' +
        tituloHardware +
        '/' +
        prazoDescarte +
        '/' +
        descriHardware,
    ]);
  }
}
