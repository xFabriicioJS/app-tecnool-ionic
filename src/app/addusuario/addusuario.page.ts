import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { ApiService } from '../api/api-service';

@Component({
  selector: 'app-addusuario',
  templateUrl: './addusuario.page.html',
  styleUrls: ['./addusuario.page.scss'],
})
export class AddusuarioPage implements OnInit {
  niveis: any = [];
  formGroup: FormGroup;
  filePath: string;
  foto_usuario: string;
  isSubmitted = false;

  constructor(
    private apiService: ApiService,
    private toastController: ToastController,
    private formbuilder: FormBuilder,
    private router: Router
  ) {
    this.formGroup = formbuilder.group({
      avatar: [''],
      nomeUsuario: [
        '',
        Validators.compose([
          Validators.minLength(4),
          Validators.maxLength(30),
          Validators.required,
        ]),
      ],
      emailUsuario: [
        '',
        Validators.compose([
          Validators.minLength(4),
          Validators.maxLength(32),
          Validators.email,
          Validators.required,
        ]),
      ],
      loginUsuario: [
        '',
        Validators.compose([
          Validators.minLength(4),
          Validators.maxLength(30),
          Validators.required,
        ]),
      ],
      senhaUsuario: [
        '',
        Validators.compose([
          Validators.minLength(3),
          Validators.maxLength(255),
          Validators.required,
        ]),
      ],
      nivel: ['', Validators.required],
      img: [null],
      filename: [''],
    });
  }

  ngOnInit() {}
  onFileSelect(event) {
    //setando a imagem no formulário para visualização
    this.imagePreview(event);

    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.formGroup.get('avatar').setValue(file);
    }
  }

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

  ionViewWillEnter() {
    //useEffect
    this.niveis = [];
    this.findAllNiveis();
  }

  findAllNiveis() {
    //requisição findAll para pegar todos os niveis
    return new Promise((res) => {
      this.niveis = [];

      let bodyRequest = {
        requisicao: 'listar',
        nome: '',
      };

      this.apiService
        .apiPHP('controller-niveis.php', bodyRequest)
        .subscribe((data) => {
          if (data['result'] == '0') {
            this.ionViewWillEnter();
          } else {
            data['result'].map((nivel) => {
              this.niveis.push(nivel[0]);
            });
          }
        });
    });
  }

  get errorControl() {
    return this.formGroup.controls;
  }

   onSubmit() {
    this.isSubmitted = true;

    if (!this.formGroup.valid) {
      console.log('Por favor preencha todos os campos');
    
      console.log(this.formGroup.value);
      console.log(this.formGroup.valid);

      return false;
    }

    //verificando se o usuário selecionou uma imagem
    if (this.formGroup.get('avatar').value != '') {
      const formData = new FormData();
      formData.append('avatar', this.formGroup.get('avatar').value);

      this.apiService.uploadFile(formData).subscribe(
        (res) => {
          this.foto_usuario = res.nomeArquivo;

          let bodyRequest = {
            requisicao: 'add',
            nome_usuario: this.formGroup.value.nomeUsuario,
            email_usuario: this.formGroup.value.emailUsuario,
            id_nivel_usuario: this.formGroup.value.nivel,
            login_usuario: this.formGroup.value.loginUsuario,
            senha: this.formGroup.value.senhaUsuario,
            foto_usuario: this.foto_usuario,
          };

          console.log(bodyRequest);

          this.apiService
            .apiPHP('controller-usuarios.php', bodyRequest)
            .subscribe((data) => {
              console.log(bodyRequest);

              //Se der tudo certo com o cadastr do usuário
              if (data['success'] === true) {
                console.log('Usuário cadastrado');

                this.router.navigate(['/tabs/tab1']);
                //habilitando o toast
                this.presentToast('Usuário cadastrado', 'success');

                //Se o email do usuário já estiver cadastrado
              }else if(data['msg'] == 'Usuário já cadastrado!'){
                this.presentToast('Usuário já cadastrado!', 'danger');
              
                console.log('Usuário já cadastrado!');
              } 
              //Se houver qualquer outra falha
              else {
                console.log('Erro ao cadastrar usuário');
                this.presentToast('Erro ao cadastrar usuário', 'danger');
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

      //Agora vamos fazer a requisição para nossa API, lembrando, essa requisição é para o caso de não ter sido enviada uma imagem
      this.apiService.apiPHP('controller-usuarios.php', bodyRequest).subscribe((data) => {
        if (data['success'] === true) {
          console.log('Usuário cadastrado');

          this.router.navigate(['/tabs/tab1']);
          //habilitando o toast
          this.presentToast('Usuário cadastrado', 'success');

          //Se o email do usuário já estiver cadastrado
        }else if(data['msg'] == 'Usuário já cadastrado!'){
          this.presentToast('Usuário já cadastrado!', 'danger');
        
          console.log('Usuário já cadastrado!');
        } 
        //Se houver qualquer outra falha
        else {
          console.log('Erro ao cadastrar usuário');
          this.presentToast('Erro ao cadastrar usuário', 'danger');
        }
      });
    }
  }

  async presentToast(msg, color) {
    const toast = await this.toastController.create({
      message: msg,
      duration: 3000,
      color: color,
      icon: 'checkmark-circle-outline',
    });

    await toast.present();
  }
}
