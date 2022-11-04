import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { ApiService } from '../api/api-service';
import { Animation, AnimationController } from '@ionic/angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  formGroup: FormGroup;
  isSubmitted: boolean = false;


  constructor(
    private router: Router,
    public formBuilder: FormBuilder,
    private apiService: ApiService,
    private toastController: ToastController,
    ) {
    this.formGroup = formBuilder.group({
      email: [
        "",
        Validators.compose([
          Validators.minLength(4),
          Validators.maxLength(32),
          Validators.required          
        ])
      ],
      senha: [
        "",
        Validators.compose([
          Validators.minLength(4),
          Validators.maxLength(255),
          Validators.required
        ])
      ]
    });

   }

   getErrorControl(){
    return this.formGroup.controls;
   }

   onSubmit(){


    this.isSubmitted = true;
    if(!this.formGroup.valid){
      this.presentToast("Preencha todos os campos corretamente", "danger");
    }
    //verificação dos dados de login do usuário com a API

    let bodyRequest = {
      requisicao: 'login',
      email: this.formGroup.value.email,
      senha: this.formGroup.value.senha  
    }

    this.apiService.apiPHP('controller-clientes.php',bodyRequest).subscribe((data) => {
      console.log(data);
      if(data['success'] == true){

        this.presentToast("<b>Login efetuado com sucesso</b>", "success");

        //setar dados no local storage
        this.setLocalStorageData(data['result']);

        this.router.navigate(['/tabs/tab1']);
      }else{
        this.presentToast("<b>Usuário ou senha incorretos</b>", "danger");
      }
    });
   }

   //Função que será chamada para setar dados no nosso local storage, para que possamos usar em outras páginas, e sem precisar de um gerenciador de contexto global
   setLocalStorageData(data : any){
    //setar dados no local storage
    localStorage.setItem('usuario', JSON.stringify(
      
      data
      
      ));
   }

  ngOnInit() {
  }



  ionViewWillEnter(){
    //Garante que o usuário não vai para a página de login se já estiver logado
    localStorage.removeItem('usuario');
  }

  async presentToast(msg: string, color: string) {
    const toast = await this.toastController.create({
      message: msg,
      duration: 2000,
      color: color
    });
    toast.present();
  }

  navigateCadastro(){
    this.router.navigate(['/cadastro-cliente']);
  }
  

  

}
