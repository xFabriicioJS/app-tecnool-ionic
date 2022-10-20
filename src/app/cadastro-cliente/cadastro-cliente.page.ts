import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { ApiService } from '../api/api-service';

@Component({
  selector: 'app-cadastro-cliente',
  templateUrl: './cadastro-cliente.page.html',
  styleUrls: ['./cadastro-cliente.page.scss'],
})
export class CadastroClientePage implements OnInit {
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
  isSubmitted: boolean = false;
  formGroupPj: FormGroup;

  constructor(
    private router: Router,
    private formbuilder: FormBuilder,
    private apiService: ApiService,
    private toastController: ToastController
  ) {
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
        Validators.compose([
          Validators.minLength(4),
          Validators.maxLength(30),
          
        ]),
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
        Validators.compose([
          Validators.minLength(4),
          Validators.maxLength(30),
          
        ]),
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


  onSubmitPj(){
    console.log('teste');
    this.isSubmitted = true;
    if(!this.formGroupPj.valid){
      this.presentToast('Preencha todos os campos corretamente', 'danger');

      //irá cortar a função e não irá executar o código abaixo
      return false;
    }
    // {
    //   "requisicao": "add",
    //   "nome": "Fabricio",
    //   "cpf": "3933201201",
    //   "telefone": "1289473943",
    //   "cnpj": "",
    //   "razaoSocial": "",
    //   "idTipo": 1,
    //   "email": "fa@hotmail.com",
    //   "senha": "123"
    // }

     //Primeiro precisamos fazer uma requisição para o endpoint dos clientes, e desse jeito recuperar o id do cliente criado no BD e passa-lo na requisição do endereço

     let bodyRequestClientePj = {
      "requisicao": "add",
      "nome": this.formGroupPj.value.nome,
      "cpf": this.formGroupPj.value.cpf,
      "telefone": this.formGroupPj.value.telefone,
      "cnpj": this.formGroupPj.value.cnpj,
      "razaoSocial": this.formGroupPj.value.razaoSocial,
      "idTipo": 1,
      "email": this.formGroupPj.value.email,
      "senha": this.formGroupPj.value.senha
     }

     console.log(bodyRequestClientePj);
    //Primeira Requisição - Endpoint Clientes
    this.apiService.apiPHP('controller-clientes.php',bodyRequestClientePj).subscribe((data)=>{
      if(data['success'] == true){
        //Segunda Requisição - Endpoint Endereços
        let bodyRequestEndereco = {
          requisicao: "add",
          cep: this.formGroupPj.value.cep,
          logradouro_endereco: this.formGroupPj.value.logradouro,
          num_endereco: this.formGroupPj.value.numero,
          complemento_endereco: this.formGroupPj.value.complemento,
          bairro_endereco: this.formGroupPj.value.bairro,
          cidade_endereco: this.formGroupPj.value.cidade,
          estado_endereco: this.formGroupPj.value.estado,
          id_cliente_endereco: data['id'],
        }
        console.log(bodyRequestEndereco);
        this.apiService.apiPHP('controller-enderecos.php',bodyRequestEndereco).subscribe((data) => {
          if(data['success'] == true){
            this.presentToast("Cadastro realizado com sucesso", "success");
            this.router.navigate(['/login']);
          }else{
            console.log(data);
            this.presentToast("Erro ao cadastrar endereço", "danger");
          }
        })
      }else{
        this.presentToast("Erro ao cadastrar cliente", "danger");
      }
      	
    });

    }

  onSubmitPf(){
    this.isSubmitted = true;
    if(!this.formGroupPf.valid){
      this.presentToast("Preencha todos os campos corretamente", "danger");

      //irá cortar a função e não irá executar o código abaixo
      return false;
    }
   

    // {
    //   "requisicao": "add",
    //   "nome": "Fabricio",
    //   "cpf": "3933201201",
    //   "telefone": "1289473943",
    //   "cnpj": "",
    //   "razaoSocial": "",
    //   "idTipo": 1,
    //   "email": "fa@hotmail.com",
    //   "senha": "123"
    // }


    //Primeiro precisamos fazer uma requisição para o endpoint dos clientes, e desse jeito recuperar o id do cliente criado no BD e passa-lo na requisição do endereço
    let bodyRequestCliente = {
      requisicao: "add",
      nome: this.formGroupPf.value.nome,
      cpf: this.formGroupPf.value.cpf,
      telefone: this.formGroupPf.value.telefone,
      cnpj: "",
      razaoSocial: "",
      idTipo: 1,
      email: this.formGroupPf.value.email,
      senha: this.formGroupPf.value.senha,
    }

    console.log(bodyRequestCliente);
    //Primeira Requisição - Endpoint Clientes
    this.apiService.apiPHP('controller-clientes.php',bodyRequestCliente).subscribe((data) => {
      if(data['success'] == true){
        //Segunda Requisição - Endpoint Endereços
        let bodyRequestEndereco = {
          requisicao: "add",
          cep: this.formGroupPf.value.cep,
          logradouro_endereco: this.formGroupPf.value.logradouro,
          num_endereco: this.formGroupPf.value.numero,
          complemento_endereco: this.formGroupPf.value.complemento,
          bairro_endereco: this.formGroupPf.value.bairro,
          cidade_endereco: this.formGroupPf.value.cidade,
          estado_endereco: this.formGroupPf.value.estado,
          id_cliente_endereco: data['id'],
        }
        console.log(bodyRequestEndereco);
        this.apiService.apiPHP('controller-enderecos.php',bodyRequestEndereco).subscribe((data) => {
          if(data['success'] == true){
            this.presentToast("Cadastro realizado com sucesso", "success");
            this.router.navigate(['/login']);
          }else{
            console.log(data);
            this.presentToast("Erro ao cadastrar endereço", "danger");
          }
        })
      }else{
        this.presentToast("Erro ao cadastrar cliente", "danger");
      }
  });

}

async presentToast(msg: string, color: string) {
  const toast = await this.toastController.create({
    message: msg,
    duration: 2000,
    color: color
  });
  toast.present();
}

}