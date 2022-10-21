import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { ApiService } from '../api/api-service';
import { GetUserTypeService } from '../services/get-user-type.service';

@Component({
  selector: 'app-configuracoes-conta',
  templateUrl: './configuracoes-conta.page.html',
  styleUrls: ['./configuracoes-conta.page.scss'],
})
export class ConfiguracoesContaPage implements OnInit {

  nomeUsuario: string = "";
  enderecoUsuario: any;
  telefoneContato: string = "";
  idUsuarioLogado: string = "";

  isModalOpen = false;
    formGroup: FormGroup;
  constructor(
    public formBuilder : FormBuilder,
    private router: Router,
    private alertController: AlertController,
    private getUser: GetUserTypeService,
    private apiService: ApiService,

  ) { 
    this.formGroup = formBuilder.group({
      senhaAtual: [
        "",
        Validators.compose([
          Validators.minLength(4),
          Validators.maxLength(32),
          Validators.pattern("[0-9a-z-A-Z-_]*"),
          Validators.required
        ])
      ],
      novaSenhaUm: [
        "",
        Validators.compose([
          Validators.minLength(4),
          Validators.maxLength(255),
          Validators.required
        ])
      ],
      novaSenhaDois: [
        "",
        Validators.compose([
          Validators.minLength(4),
          Validators.maxLength(255),
          Validators.required
        ])
      ],
    });
  }

  ngOnInit() {
  }

  // Método que será chamado imediatamente ao renderizar a página
  ionViewWillEnter(){

      //verificamos primeiro se o usuário está logado
      if(this.getUser.getUserInfo() == null){
        this.router.navigate(['/openscreen']);
      }
      //Se o usuário logado for um cliente...
      if(this.getUser.getUserType() == 'Cliente'){
        //se o usuário estiver logado, então pegamos os dados dele
      let currentLoggedInUser = this.getUser.getUserInfo();
      
      //Setamos os atributos com base nos dados do cliente lá no localStorage
      this.nomeUsuario = currentLoggedInUser.email_cliente;
      this.telefoneContato = currentLoggedInUser.telefoneCliente;
      this.idUsuarioLogado = currentLoggedInUser.id_cliente;

      //Em seguida, setamos o atributo enderecoUsuario com a função retrieveAddressData()
      this.retrieveAddressData();



      }
  
      
      
      

  }

  setOpen(isOpen: boolean) {
    this.isModalOpen = isOpen;
  }

  //Método responsável por fazer uma busca ao endereço do cliente na API
  retrieveAddressData(){

    //corpo da requisição
    let bodyRequest = {
      requisicao: "listarPorCliente",
      id_cliente_endereco: this.idUsuarioLogado
    }

    //fazemos a requisição
    return new Promise((res) => {
      this.apiService.apiPHP('controller-enderecos.php', bodyRequest).subscribe((data) => {
        if(data['success'] == true){
          //Se o usuário tiver um endereço cadastrado, então pegamos o endereço dele e setamos no atributo enderecoUsuario
          this.enderecoUsuario = data['result'][0];
          console.log(this.enderecoUsuario);
        }else{
          console.log(data);
        }
      })
    })

  }

  navigateAtualizarEndereco(){
    this.router.navigate(['atualizar-endereco']);
  }

  async presentAlert() {
    const alert = await this.alertController.create({
      header: 'Por favor, insira seu novo número de contato.',
      buttons: ['OK'],
      inputs: [
        {
          placeholder: 'Novo número de contato',
        },
        {
          placeholder: 'Telefone (máximo de 11 dígitos)',
          attributes: {
            maxlength: 11,
          },
          type: 'number'
        }
      ],
    });

    await alert.present();
  }





}
