import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { ApiService } from '../api/api-service';
import { IonModal } from '@ionic/angular';
import { OverlayEventDetail } from '@ionic/core/components';

@Component({
  selector: 'app-cadastro-cliente',
  templateUrl: './cadastro-cliente.page.html',
  styleUrls: ['./cadastro-cliente.page.scss'],
})
export class CadastroClientePage implements OnInit {
  @ViewChild(IonModal) modal: IonModal;
  name: string;

  estados = [
    'AC',
    'AL',
    'AP',
    'AM',
    'BA',
    'CE',
    'DF',
    'ES',
    'GO',
    'MA',
    'MT',
    'MS',
    'MG',
    'PA',
    'PB',
    'PR',
    'PE',
    'PI',
    'RJ',
    'RN',
    'RS',
    'RO',
    'RR',
    'SC',
    'SP',
    'SE',
    'TO',
  ];

  formGroupPf: FormGroup;
  isSubmittedPf: boolean = false;
  isSubmittedPj: boolean = false;
  formGroupPj: FormGroup;
  tipoConta: string = 'pf';

  constructor(
    private router: Router,
    private formbuilder: FormBuilder,
    private apiService: ApiService,
    private toastController: ToastController
  ) {

    //Validação do formulário de cadastro de pessoa física
    this.formGroupPf = formbuilder.group({
      nome: [
        '',
        Validators.compose([
          Validators.minLength(4),
          Validators.maxLength(60),
          Validators.required,
        ]),
      ],
      cpf: [
        '',
        Validators.compose([
          Validators.minLength(1),
          Validators.maxLength(11),
          Validators.pattern('[0-9]*'),
          Validators.required,
        ]),
      ],
      email: [
        '',
        Validators.compose([
          Validators.minLength(6),
          Validators.maxLength(32),
          Validators.email,
          Validators.required,
        ]),
      ],
      telefone: [
        '',
        Validators.compose([
          Validators.minLength(8),
          Validators.maxLength(11),
          Validators.pattern('[0-9]*'),
          Validators.required,
        ]),
      ],
      senha: [
        '',

        Validators.compose([
          Validators.minLength(4),
          Validators.maxLength(255),
          Validators.required,
        ]),
      ],
      cep: [
        '',
        Validators.compose([
          Validators.minLength(2),
          Validators.maxLength(8),
          Validators.pattern('[0-9]*'),
          Validators.required,
        ]),
      ],
      logradouro: [
        '',
        Validators.compose([
          Validators.minLength(4),
          Validators.maxLength(30),
          Validators.required,
        ]),
      ],
      numero: [
        '',
        Validators.compose([
          Validators.minLength(1),
          Validators.maxLength(5),
          Validators.required,
        ]),
      ],
      complemento: [
        '',
        Validators.compose([Validators.minLength(4), Validators.maxLength(30)]),
      ],
      bairro: [
        '',
        Validators.compose([
          Validators.minLength(4),
          Validators.maxLength(30),
          Validators.required,
        ]),
      ],
      cidade: [
        '',
        Validators.compose([
          Validators.minLength(4),
          Validators.maxLength(30),
          Validators.required,
        ]),
      ],
      estado: [
        '',
        Validators.compose([
          Validators.minLength(2),
          Validators.maxLength(2),
          Validators.required,
        ]),
      ],
    });
    this.formGroupPj = formbuilder.group({
      nome: [
        '',
        Validators.compose([
          Validators.minLength(4),
          Validators.maxLength(60),
          Validators.required,
        ]),
      ],
      cpf: [
        '',
        Validators.compose([
          Validators.minLength(1),
          Validators.maxLength(11),
          Validators.pattern('[0-9]*'),
          Validators.required,
        ]),
      ],
      telefone: [
        '',
        Validators.compose([
          Validators.minLength(3),
          Validators.maxLength(14),
          Validators.pattern('[0-9]*'),
          Validators.required,
        ]),
      ],
      cnpj: [
        '',
        Validators.compose([
          Validators.minLength(1),
          Validators.maxLength(14),
          Validators.pattern('[0-9]*'),
          Validators.required,
        ]),
      ],
      razaoSocial: [
        '',
        Validators.compose([
          Validators.minLength(4),
          Validators.maxLength(30),
          Validators.required,
        ]),
      ],
      email: [
        '',
        Validators.compose([
          Validators.minLength(6),
          Validators.maxLength(32),
          Validators.email,
          Validators.required,
        ]),
      ],
      senha: [
        '',
        Validators.compose([
          Validators.minLength(4),
          Validators.maxLength(255),
          Validators.required,
        ]),
      ],
      cep: [
        '',
        Validators.compose([
          Validators.minLength(2),
          Validators.maxLength(8),
          Validators.pattern('[0-9]*'),
          Validators.required,
        ]),
      ],
      logradouro: [
        '',
        Validators.compose([
          Validators.minLength(4),
          Validators.maxLength(30),
          Validators.required,
        ]),
      ],
      numero: [
        '',
        Validators.compose([
          Validators.minLength(1),
          Validators.maxLength(5),
          Validators.required,
        ]),
      ],
      complemento: [
        '',
        Validators.compose([Validators.minLength(4), Validators.maxLength(30)]),
      ],
      bairro: [
        '',
        Validators.compose([
          Validators.minLength(4),
          Validators.maxLength(30),
          Validators.required,
        ]),
      ],
      cidade: [
        '',
        Validators.compose([
          Validators.minLength(4),
          Validators.maxLength(30),
          Validators.required,
        ]),
      ],
      estado: [
        '',
        Validators.compose([
          Validators.minLength(2),
          Validators.maxLength(2),
          Validators.required,
        ]),
      ],
    });
  }

  ngOnInit() {}

  get errorControlPf() {
    return this.formGroupPf.controls;
  }

  get errorControlPj() {
    return this.formGroupPj.controls;
  }

  ionViewWillEnter() {}

  onSubmitPj() {
    this.isSubmittedPj = true;
    if (!this.formGroupPj.valid) {
      this.presentToast('Preencha todos os campos corretamente', 'danger');
      this.cancel();
      //irá cortar a função e não irá executar o código abaixo
      return false;
    }

    //Primeiro precisamos fazer uma requisição para o endpoint dos clientes, e desse jeito recuperar o id do cliente criado no BD e passa-lo na requisição do endereço

    let bodyRequestClientePj = {
      requisicao: 'add',
      nome: this.formGroupPj.value.nome,
      cpf: this.formGroupPj.value.cpf,
      telefone: this.formGroupPj.value.telefone,
      cnpj: this.formGroupPj.value.cnpj,
      razaoSocial: this.formGroupPj.value.razaoSocial,
      idTipo: 2,
      email: this.formGroupPj.value.email,
      senha: this.formGroupPj.value.senha,
    };

    //Primeira Requisição - Endpoint Clientes
    this.apiService
      .apiPHP('controller-clientes.php', bodyRequestClientePj)
      .subscribe((data) => {
        if (data['success'] == true) {
          //Segunda Requisição - Endpoint Endereços
          let bodyRequestEndereco = {
            requisicao: 'add',
            cep: this.formGroupPj.value.cep,
            logradouro_endereco: this.formGroupPj.value.logradouro,
            num_endereco: this.formGroupPj.value.numero,
            complemento_endereco: this.formGroupPj.value.complemento,
            bairro_endereco: this.formGroupPj.value.bairro,
            cidade_endereco: this.formGroupPj.value.cidade,
            estado_endereco: this.formGroupPj.value.estado,
            id_cliente_endereco: data['id'],
          };

          this.apiService
            .apiPHP('controller-enderecos.php', bodyRequestEndereco)
            .subscribe((data) => {
              if (data['success'] == true) {
                this.presentToast('Cadastro realizado com sucesso', 'success');
                this.cancel();

                this.router.navigate(['/login']);
              } else {
                this.presentToast('Erro ao cadastrar endereço', 'danger');
              }
            });
        } else {
          this.presentToast('Erro ao cadastrar cliente', 'danger');
        }
      });
  }

  cancel() {
    this.modal.dismiss(null, 'cancel');
  }

  confirm() {
    this.modal.dismiss(this.name, 'confirm');
  }

  onSubmitPf() {
    this.isSubmittedPf = true;
    if (!this.formGroupPf.valid) {
      this.presentToast('Preencha todos os campos corretamente', 'danger');
      this.cancel();
      //irá cortar a função e não irá executar o código abaixo
      return false;
    }

    //Primeiro precisamos fazer uma requisição para o endpoint dos clientes, e desse jeito recuperar o id do cliente criado no BD e passa-lo na requisição do endereço
    let bodyRequestCliente = {
      requisicao: 'add',
      nome: this.formGroupPf.value.nome,
      cpf: this.formGroupPf.value.cpf,
      telefone: this.formGroupPf.value.telefone,
      cnpj: '',
      razaoSocial: '',
      idTipo: 1,
      email: this.formGroupPf.value.email,
      senha: this.formGroupPf.value.senha,
    };

    //Primeira Requisição - Endpoint Clientes
    this.apiService
      .apiPHP('controller-clientes.php', bodyRequestCliente)
      .subscribe((data) => {
        if (data['success'] == true) {
          //Segunda Requisição - Endpoint Endereços
          let bodyRequestEndereco = {
            requisicao: 'add',
            cep: this.formGroupPf.value.cep,
            logradouro_endereco: this.formGroupPf.value.logradouro,
            num_endereco: this.formGroupPf.value.numero,
            complemento_endereco: this.formGroupPf.value.complemento,
            bairro_endereco: this.formGroupPf.value.bairro,
            cidade_endereco: this.formGroupPf.value.cidade,
            estado_endereco: this.formGroupPf.value.estado,
            id_cliente_endereco: data['id'],
          };
          this.apiService
            .apiPHP('controller-enderecos.php', bodyRequestEndereco)
            .subscribe((data) => {
              if (data['success'] == true) {
                this.presentToast('Cadastro realizado com sucesso', 'success');
                this.cancel();
                this.router.navigate(['/login']);
              } else {
                this.presentToast('Erro ao cadastrar endereço', 'danger');
              }
            });
        } else {
          this.presentToast('Erro ao cadastrar cliente', 'danger');
        }
      });
  }

  //Toast de apresentação de erros ou confirmações.
  async presentToast(msg: string, color: string) {
    const toast = await this.toastController.create({
      message: msg,
      duration: 2000,
      color: color,
    });
    toast.present();
  }
}
