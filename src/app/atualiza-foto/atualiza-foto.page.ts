import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { ApiService } from '../api/api-service';
import { GetUserTypeService } from '../services/get-user-type.service';

@Component({
  selector: 'app-atualiza-foto',
  templateUrl: './atualiza-foto.page.html',
  styleUrls: ['./atualiza-foto.page.scss'],
})
export class AtualizaFotoPage implements OnInit {
  formGroup: FormGroup;
  // isSubmitted: boolean = false;
  Novafoto_cliente: string = '';
  id_cliente: number = 0;
  filePath: string = '';
  id_usuario: number = 0;

  constructor(
    public formBuilder: FormBuilder,
    private apiService: ApiService,
    private toastController: ToastController,
    private router: Router,
    private getUser: GetUserTypeService
  ) {
    this.formGroup = formBuilder.group({
      avatar: [''],
      img: [null],
    });
  }

  //Método que é executado assim que a página é renderizada
  ionViewWillEnter() {
    //primeiro verificamos se o usuário está logado
    if (this.getUser.getUserInfo() == null) {
      this.router.navigate(['/openscreen']);
    }

    //verificamos agora o tipo de usuário logado
    if (this.getUser.getUserType() == 'Cliente') {
      let currentUser = this.getUser.getUserInfo();
      this.id_cliente = currentUser.id_cliente;
    } else {
      //Se o usuário logado for um administrador, atribuimos o id do usuário logado à variável id_usuario
      let currentUser = this.getUser.getUserInfo();
      this.id_usuario = currentUser.id_usuario;
    }
  }

  //Método que é executado quando o usuário seleciona a imagem
  onFileSelect(event) {
    //setando a imagem no formulário para visualização
    this.imagePreview(event);

    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.formGroup.get('avatar').setValue(file);
    }
  }

  //Pegando o arquivo que o usuário selecionou pelo formulário
  imagePreview(e) {
    const file = (e.target as HTMLInputElement).files[0];

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
    //Se por alguma razão o usuário clicou no botão de enviar sem ter selecionado a imagem, nós cortamos a função para ela não prosseguir e avisamos o usuário
    if (this.formGroup.get('avatar').value == '') {
      this.presentToast(
        '<b>Por favor, selecione uma imagem para enviar</b>',
        'danger'
      );
      return false;
    }

    //Primeiro faremos uma requisição para enviar a imagem para o servidor para a API, depois faremos uma outra requisição para atualizar o campo foto lá no banco de dados com o nome da imagem que acabamos de enviar
    const formData = new FormData();
    formData.append('avatar', this.formGroup.get('avatar').value);

    this.apiService.uploadFile(formData).subscribe((res) => {
      //A API retorna uma string no atributo "nomeArquivo", que é o nome do arquivo que acabamos de enviar, então pegamos esse nome e atribuímos à variável Novafoto_cliente para ser enviada na nova requisição para atualizar lá no banco de dados
      this.Novafoto_cliente = res.nomeArquivo;
      //Agora vamos fazer a requisição para atualizar o campo foto lá no banco de dados
      this.atualizaFoto();
    });
  }

  //Requisição para salvar a string com o nome da imagem no banco de dados
  atualizaFoto() {
    //Corpo da requisição
    let bodyRequest = {
      requisicao: 'atualizaFoto',
      foto_cliente: this.Novafoto_cliente,
      id_cliente: this.id_cliente,
    };

    console.log(bodyRequest);

    return new Promise((data) => {
      this.apiService
        .apiPHP('controller-clientes.php', bodyRequest)
        .subscribe((response) => {
          if (response['success'] == true) {
            console.log(response);
            
            //Vamos atualizar agora o local storge com a nova foto, para manter os dados atualizados para o cliente
            let currentLoggedInUser = this.getUser.getUserInfo();

            //O objeto já atualiza no local storage com a nova foto
            let newLocalStorage = {
              id_cliente: currentLoggedInUser.id_cliente,
              nome_cliente: currentLoggedInUser.nome_cliente,
              cpf_cliente: currentLoggedInUser.cpf_cliente,
              email_cliente: currentLoggedInUser.email_cliente,
              foto_cliente: this.Novafoto_cliente,
              id_tipo_cliente: currentLoggedInUser.id_tipo_cliente,
              telefone_cliente: currentLoggedInUser.telefone_cliente,
              razaoSocial_cliente: currentLoggedInUser.razaoSocial_cliente,
              tipo_usuario_sistema: "Cliente"
            };
            //Atualizando o local storage
            localStorage.setItem('usuario', JSON.stringify(newLocalStorage));

            //Finalmente, exibimos o toast para o usuário
            this.presentToast(
              '<b>Imagem atualizada com sucesso!</b>',
              'success'
            );

            this.router.navigate(['/tabs/tab1']);

          } else {
            this.presentToast('<b>Erro ao atualizar a foto</b>', 'danger');
          }
        });
    });
  }

  async presentToast(message: string, color) {
    const toast = await this.toastController.create({
      message: message,
      color: color,
      duration: 3000,
    });
    toast.present();
  }

  setLocalStorageData(data: any) {
    //setar dados no local storage
    localStorage.setItem('usuario', JSON.stringify(data));
  }

  ngOnInit() {}
}
