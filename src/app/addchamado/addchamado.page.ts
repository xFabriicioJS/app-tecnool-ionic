import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiService } from '../api/api-service';

@Component({
  selector: 'app-addchamado',
  templateUrl: './addchamado.page.html',
  styleUrls: ['./addchamado.page.scss'],
})
export class AddchamadoPage {
  formGroup: FormGroup;
  isSubmitted: boolean = false;
  foto_erro_chamado: string = '';

  constructor(public formBuilder: FormBuilder, private apiService: ApiService) {
    this.formGroup = formBuilder.group({
      tituloChamado: [
        "",
        Validators.compose([
          Validators.minLength(4),
          Validators.maxLength(32),
          Validators.pattern("[0-9a-z-A-Z-_]*"),
          Validators.required
        ])
      ],
      descriChamado: [
        "",
        Validators.compose([
          Validators.minLength(4),
          Validators.maxLength(255),
          Validators.required
        ])
      ],

    });
  }

  get errorControl() {
    return this.formGroup.controls;
  }

  onSubmit() {
    this.isSubmitted = true;

    if(!this.formGroup.valid){
      console.log('Por favor preencha todos os campos');
      return false;
    }
    //verificando se o usuário selecionou uma imagem
    if (this.formGroup.get('avatar').value != '') {
      const formData = new FormData();
      formData.append('avatar', this.formGroup.get('avatar').value);

      this.apiService.uploadFile(formData).subscribe(
        (res) => {
          this.foto_erro_chamado = res.nomeArquivo;

          let bodyRequest = {
            requisicao: 'add',
            nome_usuario: this.formGroup.value.nomeUsuario,
            email_usuario: this.formGroup.value.emailUsuario,
            id_nivel_usuario: this.formGroup.value.nivel,
            login_usuario: this.formGroup.value.loginUsuario,
            senha: this.formGroup.value.senhaUsuario,
            foto_erro_chamado: this.foto_erro_chamado,
          };

          console.log(bodyRequest);

          this.apiService
            .apiPHP('controller-usuarios.php', bodyRequest)
            .subscribe((data) => {
              console.log(bodyRequest);

              if (data['success'] === true) {
                console.log('Usuário cadastrado');
              } else {
                console.log('Erro ao cadastrar usuário');
              }
            });
        },
        (err) => {
          console.log('Erro ao cadastrar a imagem ' + err);
        }
      );
    } else {
      //Caso ele não tenha enviado uma imagem
      let bodyRequest = {
        requisicao: 'add',
        nome_usuario: this.formGroup.value.nomeUsuario,
        email_usuario: this.formGroup.value.emailUsuario,
        id_nivel_usuario: this.formGroup.value.nivel,
        login_usuario: this.formGroup.value.loginUsuario,
        senha: this.formGroup.value.senhaUsuario,
        foto_usuario: '',
      };

      console.log(bodyRequest);
    }


    // todo do something with our data like:
    // this.service.set(formData);
  }


}
