import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import formatISO9075 from 'date-fns/formatISO9075';
import { ApiService } from '../api/api-service';
import addHours from 'date-fns/addHours';

@Component({
  selector: 'app-adddescarte',
  templateUrl: './adddescarte.page.html',
  styleUrls: ['./adddescarte.page.scss'],
})
export class AdddescartePage  {
  formGroup: FormGroup;
  isSubmitted: boolean = false;
  foto_hardware: string = '';


  //mudar depois de implementar o sistema de autenticação
  id_cliente: number = 1;
  filePath: string;
  prazo_descarte: string;
  



  constructor(public formBuilder: FormBuilder, private toastController: ToastController, private router: Router, private apiService: ApiService) {
    this.formGroup = formBuilder.group({
      avatar: [
        ""
      ]
      ,tituloHardware: [
        "",
        Validators.compose([
          Validators.minLength(4),
          Validators.maxLength(32),
          Validators.pattern("[0-9a-z-A-Z-_]*"),
          Validators.required
        ])
      ],
      descriHardware: [
        "",
        Validators.compose([
          Validators.minLength(4),
          Validators.maxLength(255),
          Validators.required
        ])
      ],
      img: [null]
    });
   }


   //validações do formulário	
   get errorControl(){
    return this.formGroup.controls;

   }

   onFileSelect(event){
    //setando a imagem selecionada para visualização no formulário

    this.imagePreview(event);

    //se tiver o formulário tiver algum arquivo, setamos o atributo img do formulário para o arquivo selecionado

    if(event.target.files.length > 0){
      const file = event.target.files[0];
      this.formGroup.get('img').setValue(file);
    }

   }

   imagePreview(event){
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
    if(!this.formGroup.valid){
      console.log('Preencha todos os campos corretamente');
      return false;
    }

    //se o formulário for válido, prosseguimos com o envio dos dados

    //verificando se o usuário enviou uma imagem, precisamos fazer essa verificação pois dependendo se ele selecionou ou não, a requisição para a api (bodyRequest) será diferente


    //se ele selecionou uma imagem...
    if(this.formGroup.get('avatar').value !== ''){
      const formData = new FormData();

      formData.append('avatar', this.formGroup.get('avatar').value);

      //requisição para a API
      this.apiService.uploadFile(formData).subscribe(
        (res) => {
          //setamos o atributo foto_hardware com o nome da imagem que foi enviada para o servidor
          this.foto_hardware = res.nomeArquivo;

          //adiciona 7 dias a data atual
          this.prazo_descarte = formatISO9075(addHours(new Date(), 168));

          //montando a requisição para a API

          let bodyRequest = {
            requisicao: 'add',
            id_cliente: this.id_cliente,
            
          }



        }
      )


    }


    }

  }




