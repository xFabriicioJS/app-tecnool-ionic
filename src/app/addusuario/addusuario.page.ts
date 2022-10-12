import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
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

  constructor(
    private apiService: ApiService,
    
    private formbuilder: FormBuilder 
    ) {
      this.formGroup = formbuilder.group({
        avatar:[''],
        nomeUsuario: [
          "",
          Validators.compose([
            Validators.minLength(4),
            Validators.maxLength(30),
            Validators.pattern("[0-9a-z-A-Z-_]*"),
            Validators.required
          ])
        ],
        emailUsuario: [
          "",
          Validators.compose([
            Validators.minLength(4),
            Validators.maxLength(32),
            Validators.email,
            Validators.required
          ])
        ],
        loginUsuario: [
          "",
          Validators.compose([
            Validators.minLength(4),
            Validators.maxLength(30),
            Validators.pattern("[0-9a-z-A-Z-_]*"),
            Validators.required
          ])
        ],
        senhaUsuario: [
          "",
          Validators.compose([
            Validators.minLength(3),
            Validators.maxLength(255),
            Validators.required
          ])
        ],
        nivel: [
          "",
          Validators.required
        ],
        img:[null],
        filename: ['']

      })
    }

  ngOnInit() {
    //Preciso fazer uma requisicao findAll para pegar todos os niveis
   
  }
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
      img: file
    });

    this.formGroup.get('img').updateValueAndValidity()

    const reader = new FileReader();
    reader.onload = () => {
      this.filePath = reader.result as string;
    }
    reader.readAsDataURL(file)
  }

  ionViewWillEnter() {
    //useEffect
    this.niveis = [];
    this.findAllNiveis();
    console.log(this.niveis);
    console.log(this.niveis);
  }

  findAllNiveis() {
    //requisição findAll para pegar todos os niveis
    return new Promise((res) => {
      this.niveis = [];

      let bodyRequest = {
        requisicao: 'listar',
        nome: '',
      };

      this.apiService.apiPHP('controller-niveis.php',bodyRequest).subscribe((data) => {
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


  ////LEMBRAR PARA SETAR A VARIAVEL ""AVATAR"" COM A RESPOSTA DO JSON do upload para fazer a segunda requisicao
  
  // onSubmit(){

  //   //primeira requisicao para fazer o upload da imagem
  //   return new Promise((res) => {
  //     this.foto_usuario = '';

  //     const formData = new FormData();
  //     formData.append('avatar', this.formGroup.get('avatar').value);
      
  //     this.apiService.uploadFile(formData).subscribe((data)=> {
  //       console.log(data);
  //       this.foto_usuario = data.nomeArquivo;
  //     })
  //   });

  //   //segunda requisicao para fazer o cadastro do usuario
    
   
  // }


  onSubmit(){

    //verificando se o usuário selecionou uma imagem
      if(this.formGroup.get('avatar').value != ''){
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
                foto_usuario: this.foto_usuario   
              }

              console.log(bodyRequest);

              this.apiService.apiPHP('controller-usuarios.php', bodyRequest).subscribe((data) => {
                console.log(bodyRequest);

                if (data['success'] === true) {
                  console.log('Usuário cadastrado');
                } else {
                  console.log('Erro ao cadastrar usuário');
                }
              }) 
            },
            (err) => {  
              console.log("Erro ao cadastrar a imagem " + err)
            }
          );
      }else{
        //Caso ele não tenha enviado uma imagem
        let bodyRequest = {
          requisicao: 'add',
          nome_usuario: this.formGroup.value.nomeUsuario,
          email_usuario: this.formGroup.value.emailUsuario,
          id_nivel_usuario: this.formGroup.value.nivel,
          login_usuario: this.formGroup.value.loginUsuario,
          senha: this.formGroup.value.senhaUsuario,
          foto_usuario: ''   
        }
    
        console.log(bodyRequest);
      }

  }
  




  

  

}
